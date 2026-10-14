#!/usr/bin/env python3
"""Read PNG alpha geometry into phone3d.js metadata; never edit image pixels."""
import argparse
import json
import math
from pathlib import Path

from PIL import Image


def signed_area(points):
    return sum(a[0] * b[1] - b[0] * a[1]
               for a, b in zip(points, points[1:] + points[:1])) / 2


def simplify(points, tolerance):
    def rdp(line):
        if len(line) < 3:
            return line
        x, y = line[0]
        dx, dy = line[-1][0] - x, line[-1][1] - y
        denominator = math.hypot(dx, dy)
        distances = [abs(dy * (q[0] - x) - dx * (q[1] - y)) / denominator
                     if denominator else math.hypot(q[0] - x, q[1] - y)
                     for q in line[1:-1]]
        distance = max(distances, default=0)
        if distance <= tolerance:
            return [line[0], line[-1]]
        index = distances.index(distance) + 1
        return rdp(line[:index + 1])[:-1] + rdp(line[index:])

    if len(points) < 4:
        return points
    split = max(range(1, len(points)),
                key=lambda i: (points[i][0] - points[0][0]) ** 2
                + (points[i][1] - points[0][1]) ** 2)
    return rdp(points[:split + 1])[:-1] + rdp(points[split:] + [points[0]])[:-1]


def trace(source, names, columns, rows, threshold, component_area, hole_area, tolerance,
          column_boundaries=None, row_boundaries=None):
    with Image.open(source) as image:
        width, height = image.size
        alpha = image.convert('RGBA').getchannel('A').tobytes()
    if min(alpha) == 255:
        raise ValueError('Atlas needs a transparent alpha background, not opaque white.')
    xs = column_boundaries or [round(i * width / columns) for i in range(columns + 1)]
    ys = row_boundaries or [round(i * height / rows) for i in range(rows + 1)]
    for boundaries, count, limit in ((xs, columns, width), (ys, rows, height)):
        if len(boundaries) != count + 1 or boundaries[0] != 0 or boundaries[-1] != limit or any(a >= b for a, b in zip(boundaries, boundaries[1:])):
            raise ValueError('Cell boundaries must increase from zero to the image edge.')

    def solid(x, y):
        return 0 <= x < width and 0 <= y < height and alpha[y * width + x] >= threshold

    parts = []
    for index, name in enumerate(names):
        x0, x1 = xs[index % columns:index % columns + 2]
        y0, y1 = ys[index // columns:index // columns + 2]
        edges = {}

        def add(a, b):
            edges.setdefault(a, []).append(b)

        for y in range(y0, y1):
            for x in range(x0, x1):
                if not solid(x, y):
                    continue
                if not solid(x, y - 1): add((x, y), (x + 1, y))
                if not solid(x + 1, y): add((x + 1, y), (x + 1, y + 1))
                if not solid(x, y + 1): add((x + 1, y + 1), (x, y + 1))
                if not solid(x - 1, y): add((x, y + 1), (x, y))

        loops = []
        while edges:
            start = current = next(iter(edges))
            loop = []
            while current in edges:
                loop.append(current)
                following = edges[current].pop()
                if not edges[current]: del edges[current]
                current = following
                if current == start: break
            if len(loop) > 2: loops.append(loop)

        outlines = [loop for loop in loops if signed_area(loop) > component_area]
        if not outlines:
            raise ValueError(f'No usable silhouette in grid cell {index}: {name}')
        primary = max(outlines, key=signed_area)
        min_x = min(q[0] for outline in outlines for q in outline)
        max_x = max(q[0] for outline in outlines for q in outline)
        min_y = min(q[1] for outline in outlines for q in outline)
        max_y = max(q[1] for outline in outlines for q in outline)
        components = []
        for outline in outlines:
            bx0, bx1 = min(q[0] for q in outline), max(q[0] for q in outline)
            by0, by1 = min(q[1] for q in outline), max(q[1] for q in outline)
            holes = [simplify(loop, tolerance) for loop in loops
                     if signed_area(loop) < -hole_area
                     and all(bx0 <= q[0] <= bx1 and by0 <= q[1] <= by1 for q in loop)]
            components.append({'outline': simplify(outline, tolerance), 'holes': holes})
        primary_outline = simplify(primary, tolerance)
        holes = next(c['holes'] for c in components if c['outline'] == primary_outline)
        parts.append({'name': name, 'rect': [min_x, min_y, max_x - min_x, max_y - min_y],
                      'outline': primary_outline, 'holes': holes, 'components': components})
    return {'width': width, 'height': height, 'parts': parts}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--columns', type=int, default=3)
    parser.add_argument('--rows', type=int, default=2)
    parser.add_argument('--names', default='tray,camera,port,battery,cameraFront,trayBack')
    parser.add_argument('--column-boundaries', help='Optional comma-separated pixel boundaries including 0 and image width.')
    parser.add_argument('--row-boundaries', help='Optional comma-separated pixel boundaries including 0 and image height.')
    parser.add_argument('--alpha-threshold', type=int, default=128)
    parser.add_argument('--min-component-area', type=float, default=120)
    parser.add_argument('--min-hole-area', type=float, default=70)
    parser.add_argument('--tolerance', type=float, default=1.7)
    parser.add_argument('--overwrite', action='store_true')
    args = parser.parse_args()
    names = args.names.split(',')
    if args.columns < 1 or args.rows < 1 or len(names) != args.columns * args.rows:
        parser.error('Names must match the number of grid cells; dimensions must be positive.')
    if not 1 <= args.alpha_threshold <= 255 or min(args.min_component_area, args.min_hole_area, args.tolerance) < 0:
        parser.error('Invalid alpha threshold, area, or tolerance.')
    if args.input.resolve() == args.output.resolve():
        parser.error('Input image and output metadata must be different files.')
    if args.output.exists() and not args.overwrite:
        parser.error('Output exists; use a new filename or pass --overwrite explicitly.')
    data = trace(args.input, names, args.columns, args.rows, args.alpha_threshold,
                 args.min_component_area, args.min_hole_area, args.tolerance,
                 [int(v) for v in args.column_boundaries.split(',')] if args.column_boundaries else None,
                 [int(v) for v in args.row_boundaries.split(',')] if args.row_boundaries else None)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(data, separators=(',', ':')))
    for part in data['parts']:
        print(f"{part['name']}: rect={part['rect']}, components={len(part['components'])}, holes={len(part['holes'])}")


if __name__ == '__main__':
    main()
