// Photo-textured, limited-angle 3D assembly from the user's edited references.
import * as THREE from 'https://unpkg.com/three@0.170.0/build/three.module.js';
const PARTS=['display','battery','back','port','camera','board'];
let loadedAssets,loadedHeroAssets;
function loadAssets(){return loadedAssets ||= Promise.all([
  new THREE.TextureLoader().loadAsync(new URL('./phone-photo-atlas.png',import.meta.url).href),
  fetch(new URL('./phone-photo-shapes.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Phone shape data unavailable');return r.json();}),
  new THREE.TextureLoader().loadAsync(new URL('./phone-repair-atlas.png',import.meta.url).href),
  fetch(new URL('./phone-repair-shapes.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Repair shape data unavailable');return r.json();}),
  new THREE.TextureLoader().loadAsync(new URL('./phone-opening-atlas-v2.png',import.meta.url).href),
  fetch(new URL('./phone-opening-shapes-v2.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Opening shape data unavailable');return r.json();}),
  new THREE.TextureLoader().loadAsync(new URL('./phone-internals-atlas-v2.png',import.meta.url).href),
  fetch(new URL('./phone-internals-shapes-v2.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Internal shape data unavailable');return r.json();})
 ]); }
// Hero-only assets stay independent of the diagnostic atlas bindings.
function loadHeroAssets(){return loadedHeroAssets ||= Promise.all([
  new THREE.TextureLoader().loadAsync(new URL('./phone-photo-atlas.png',import.meta.url).href),
  fetch(new URL('./phone-photo-shapes.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Phone shape data unavailable');return r.json();}),
  new THREE.TextureLoader().loadAsync(new URL('./phone-hero-backglass-v10.png',import.meta.url).href),
  fetch(new URL('./phone-hero-backglass-shapes-v10.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Hero rear glass shape data unavailable');return r.json();}),
  new THREE.TextureLoader().loadAsync(new URL('./phone-hero-components-v3.png',import.meta.url).href),
  fetch(new URL('./phone-hero-components-shapes-v3.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Hero component shape data unavailable');return r.json();}),
  new THREE.TextureLoader().loadAsync(new URL('./phone-hero-front-v6.png',import.meta.url).href),
  fetch(new URL('./phone-hero-front-shapes-v6.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Hero front shape data unavailable');return r.json();})
 ]); }
function studioTexture(){
  const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,256);g.addColorStop(0,'#59616d');g.addColorStop(.5,'#c5bdc1');g.addColorStop(1,'#24252d');ctx.fillStyle=g;ctx.fillRect(0,0,512,256);
  for(const x of [75,305]){const g=ctx.createRadialGradient(x,90,10,x,90,100);g.addColorStop(0,'rgba(255,255,255,.8)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,512,256);}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.mapping=THREE.EquirectangularReflectionMapping;return t;
}
export async function mountPhone3D(visual){
  const isHero=visual.dataset.phoneScene==='hero';
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');let gl;
  try{gl=canvas.getContext('webgl2');}catch{return null;}if(!gl)return null;
  const assets=await (isHero?loadHeroAssets():loadAssets());
  const [atlas,atlasData]=assets;
  const [,,repairAtlas,repairData,openingAtlas,openingData,internalAtlas,internalData]=isHero?[]:assets;
  const [,,heroGlassAtlas,heroGlassData,heroComponentsAtlas,heroComponentsData,heroFrontAtlas,heroFrontData]=isHero?assets:[];
  for(const texture of isHero?[atlas,heroGlassAtlas,heroComponentsAtlas,heroFrontAtlas]:[atlas,repairAtlas,openingAtlas,internalAtlas]){texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;}
  const renderer=new THREE.WebGLRenderer({canvas,context:gl,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,(navigator.hardwareConcurrency||4)<=4||(navigator.deviceMemory||8)<=4?1.5:2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;
  const stage=document.createElement('div');stage.className='phone3d-stage'+(isHero?' phone3d-stage--hero':'');stage.dataset.scene=isHero?'hero':'diagnostic';stage.append(canvas);visual.prepend(stage);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-3.45,3.45,3.8,-3.8,.1,80);camera.position.z=18;
  const env=studioTexture(),pmrem=new THREE.PMREMGenerator(renderer),target=pmrem.fromEquirectangular(env);scene.environment=target.texture;env.dispose();pmrem.dispose();
  const key=new THREE.DirectionalLight(0xffe7ee,2);key.position.set(-5,5,8);scene.add(key);
  const rim=new THREE.DirectionalLight(0xd4dbff,1.2);rim.position.set(5,1,-4);scene.add(rim);
  const phone=new THREE.Group();scene.add(phone);
  const layers={},groups={},rimMaterials={},photoMaterials={};
  // Actual silhouettes from atlas alpha, including apertures in the board/chassis.
  function photoPart(name,index,w,h,depth,y=0,texture=atlas,data=atlasData){
    const source=data.parts[index],rect=source.rect;
    function position(p){return new THREE.Vector2(((p[0]-rect[0])/rect[2]-.5)*w,(.5-(p[1]-rect[1])/rect[3])*h);}
    const shape=(source.components??[source]).map(component=>{
      const outline=new THREE.Shape(component.outline.map(position));
      for(const points of component.holes)outline.holes.push(new THREE.Path(points.map(position)));
      return outline;
    });
    const group=new THREE.Group();group.name=name;group.position.y=y;phone.add(group);layers[name]=group;groups[name]=group;
    const roseBody=isHero&&['display','chassis','backGlass'].includes(name);
    const thinGlass=isHero&&name==='backGlass';
    const edgeColor=roseBody?0x764958:({tray:0x55565a,battery:0x34373d,camera:0x90908b,cameraFront:0x848786,port:0x323338,board:0x63615d,floor:0x303036}[name]??0x4d303d);
    const edgeMaterial=new THREE.MeshStandardMaterial({color:edgeColor,metalness:roseBody?.65:name==='battery'?.15:.82,roughness:roseBody?.34:name==='battery'?.6:.3,emissive:0x000000});
    rimMaterials[name]=edgeMaterial;
    const capMaterial=edgeMaterial.clone();if(name==='tray')capMaterial.color.set(0x252529);
    // Cap surfaces stay neutral when a texture aperture exposes them; only edges glow.
    const bevelThickness=thinGlass?.0015:roseBody?.024:.008;
    const volume=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelSize:thinGlass?.003:roseBody?.032:.012,bevelThickness,bevelSegments:roseBody?4:2}),[capMaterial,edgeMaterial]);volume.position.z=-depth/2;group.add(volume);
    const faceGeometry=new THREE.ShapeGeometry(shape);
    const p=faceGeometry.attributes.position,uv=faceGeometry.attributes.uv;
    for(let i=0;i<p.count;i++)uv.setXY(i,(rect[0]+(p.getX(i)/w+.5)*rect[2])/data.width,1-(rect[1]+(.5-p.getY(i)/h)*rect[3])/data.height);
    // Photographic lighting is baked into these textures; keep photo faces unlit.
    const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.12,side:THREE.DoubleSide,toneMapped:false});
    photoMaterials[name]=material;const front=new THREE.Mesh(faceGeometry,material);front.position.z=depth/2+.012;group.add(front);
    if(name==='display'){front.rotation.y=Math.PI;front.position.z=-depth/2-.012;}
    group.userData.depth=depth;group.userData.faceLift=thinGlass?.003:roseBody?bevelThickness+.005:.012;group.userData.volume=volume;group.userData.photo=front;group.userData.shape=shape;group.userData.baseY=y;
    return group;
  }
  function reverseFace(name,texture,data,index,w,h,{ownShape=false,rect=data.parts[index].rect,mirror=false}={}){
    const group=layers[name],source=data.parts[index];
    const shape=ownShape?(source.components??[source]).map(component=>{
      const position=p=>{const u=(p[0]-rect[0])/rect[2];return new THREE.Vector2((mirror?.5-u:u-.5)*w,(.5-(p[1]-rect[1])/rect[3])*h);};
      const outline=new THREE.Shape(component.outline.map(position));
      for(const points of component.holes)outline.holes.push(new THREE.Path(points.map(position)));
      return outline;
    }):group.userData.shape;
    const geometry=new THREE.ShapeGeometry(shape),p=geometry.attributes.position,uv=geometry.attributes.uv;
    for(let i=0;i<p.count;i++){
      const u=p.getX(i)/w+.5;
      uv.setXY(i,(rect[0]+(mirror?1-u:u)*rect[2])/data.width,1-(rect[1]+(.5-p.getY(i)/h)*rect[3])/data.height);
    }
    const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.12,side:THREE.DoubleSide,toneMapped:false}));group.add(mesh);group.userData.reverse=mesh;return mesh;
  }
  photoPart('display',0,3,6.48,.085);
  if(isHero){
    // One shell, a lower rear panel, detached plate/board and a seated camera.
    photoPart('chassis',0,3,6.48,.23,0,heroFrontAtlas,heroFrontData);
    photoPart('floor',1,2.307,3.198,.02,-.770,heroFrontAtlas,heroFrontData);
    // Inner film faces the open body; the opposite face is the rose exterior.
    // Register both photographs to the existing lower-cover footprint.
    const glassHeight=4.58;
    photoPart('backGlass',0,2.95,glassHeight,.008,-.85,heroGlassAtlas,heroGlassData);
    reverseFace('backGlass',heroGlassAtlas,heroGlassData,1,2.95,glassHeight,{mirror:true}).material.color.set(0xe7c9d4);
    photoPart('tray',0,2.6,2.6*heroComponentsData.parts[0].rect[3]/heroComponentsData.parts[0].rect[2],.08,-.38,heroComponentsAtlas,heroComponentsData);
    photoPart('board',1,2.35,2.35*heroComponentsData.parts[1].rect[3]/heroComponentsData.parts[1].rect[2],.09,.7,heroComponentsAtlas,heroComponentsData);
    photoPart('camera',2,2.6,2.6*heroFrontData.parts[2].rect[3]/heroFrontData.parts[2].rect[2],.14,2.0,heroFrontAtlas,heroFrontData);
  }else{
  photoPart('back',1,3,6.48,.085);
  photoPart('brokenScreen',0,3,6.48,.085,0,openingAtlas,openingData);
  const screenRect=openingData.parts[1].rect;
  reverseFace('brokenScreen',openingAtlas,openingData,1,3,6.48,{ownShape:true,mirror:true,rect:[screenRect[0],screenRect[1],openingData.parts[0].rect[2],screenRect[3]]});
  reverseFace('display',openingAtlas,openingData,1,3,6.48,{ownShape:true,mirror:true,rect:[screenRect[0],screenRect[1],openingData.parts[0].rect[2],screenRect[3]]});
  photoPart('battery',3,2.3,3.85,.16,-.85,repairAtlas,repairData);
  photoPart('board',2,2.65,2.55,.09,1.65,internalAtlas,internalData);
  photoPart('chassis',5,3,6.48,.23,0,internalAtlas,internalData);
  photoPart('innerFront',1,3,6.48,.20,0,internalAtlas,internalData);
  photoPart('backBody',4,3,6.48,.20,0,internalAtlas,internalData);
  // The battery plate is independent of the rear camera in the new references.
  photoPart('tray',2,2.64,5.96,.08,-.06,openingAtlas,openingData);
  reverseFace('tray',openingAtlas,openingData,3,2.64,5.96,{mirror:true});
  const cover=photoPart('backGlass',0,3,6.48,.075,0,internalAtlas,internalData);
  const inside=cover.userData.photo,outside=reverseFace('backGlass',atlas,atlasData,1,3,6.48);
  cover.userData.photo=outside;cover.userData.reverse=inside;
  photoPart('camera',3,2.38,2.45,.14,2.04,internalAtlas,internalData);
  photoPart('cameraFront',4,2.15,1.94,.07,2.48,repairAtlas,repairData);
  photoPart('port',2,2.64,5.76,.055,-.16,repairAtlas,repairData);
  // A solid shell under the seated tray keeps deeper photographic circuitry hidden.
  const housing=new THREE.Group();housing.name='housing';phone.add(housing);layers.housing=housing;
  const housingMaterial=new THREE.MeshStandardMaterial({color:0x271b22,metalness:.65,roughness:.4,emissive:0});rimMaterials.housing=housingMaterial;
  const housingMesh=new THREE.Mesh(new THREE.ExtrudeGeometry(layers.display.userData.shape,{depth:.24,steps:1,bevelEnabled:true,bevelSize:.014,bevelThickness:.01,bevelSegments:2}),housingMaterial);housingMesh.position.z=-.12;housing.add(housingMesh);
  // Retained hidden diagnostic geometry; the hero has no extra front glass sheet.
  const glassGroup=new THREE.Group();glassGroup.name='glass';phone.add(glassGroup);layers.glass=glassGroup;
  const glassMaterial=new THREE.MeshPhysicalMaterial({color:0xd4c6cd,roughness:.08,metalness:.04,transparent:true,opacity:.17,clearcoat:1});
  const glassMesh=new THREE.Mesh(new THREE.ExtrudeGeometry(layers.display.userData.shape,{depth:.012,steps:1,bevelEnabled:true,bevelSize:.009,bevelThickness:.006,bevelSegments:2}),glassMaterial);glassGroup.add(glassMesh);
  }
  phone.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material]){m.userData.restOpacity=m.opacity;m.userData.restTransparent=m.transparent;}});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const names=Object.keys(layers);
  let selected=Number(visual.dataset.selectedIssue??0),cameraSide=visual.dataset.cameraSide??'rear';
  let visible=false,frame=0,last=0,elapsed=0,clipTime=0,heroSpread=reduced.matches?1:0,dragging=false,dragX=0,dragY=0,dragYaw=0,dragPitch=0;
  let viewYaw=isHero?Math.PI+.16:selected===2?.16:Math.PI;
  let viewRoll=0,viewScale=1,viewField=3.8;
  const clamp=THREE.MathUtils.clamp;
  const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
  const ramp=(t,start,duration)=>smooth((t-start)/duration);
  function emptyPose(){
    const out={};
    for(const name of names)out[name]={x:0,y:0,z:0,rx:0,ry:0,rz:0,alpha:0,thickness:1,scale:1};
    if(isHero)return out;
    out.display.z=-.22;out.brokenScreen.z=-.22;out.back.z=.24;out.backGlass.z=.24;out.housing.z=.15;
    Object.assign(out.tray,{y:-.06,z:-.42});
    Object.assign(out.battery,{x:-.08,y:-.9,z:-.31});Object.assign(out.board,{y:1.65,z:-.18});
    Object.assign(out.camera,{x:-.28,y:2.04,z:.34});Object.assign(out.cameraFront,{y:2.18,z:-.48,scale:.8});
    Object.assign(out.port,{y:-.16,z:-.24});
    return out;
  }
  function closedPose(index){
    const out=emptyPose(),body=index===2?'back':index===0?'brokenScreen':'display';out[body].alpha=1;out[body].thickness=3;return out;
  }
  let currentPose=isHero?heroPose(heroSpread):closedPose(selected),startPose=isHero?currentPose:closedPose(selected);
  function blend(a,b,t){
    const out={};for(const name of names){out[name]={};for(const key of Object.keys(b[name]))out[name][key]=THREE.MathUtils.lerp(a[name][key],b[name][key],t);}return out;
  }
  // The cover pivots around its edge, exposing its real photographic underside.
  function swingScreen(p,open,detach=0){
    const angle=-2.22*open;
    Object.assign(p,{x:1.5-1.5*Math.cos(angle)+detach*.35,y:open*.025,z:-.22+1.5*Math.sin(angle)-detach*.35,ry:angle,rz:-open*.02,alpha:1-detach,thickness:3-2*open});
  }
  function firstOpened(out,open){
    // The new tray photograph already includes its attached pouch on both faces.
    out.housing.alpha=open;out.tray.alpha=open;out.cameraFront.alpha=open;
  }
  // The camera stays mounted in the body; only the plate and pouch move as a unit.
  function moveTray(out,lift,turn=0){
    const translation=new THREE.Vector3(-1.08*lift,.04*lift,-1.05*lift);
    const rotation=new THREE.Euler(-.025*lift,.12*lift+turn*Math.PI*.86,-.025*lift);
    const anchor=new THREE.Vector3(0,-.06,-.42);
    for(const name of ['tray','battery']){
      const p=out[name];
      const v=new THREE.Vector3(p.x,p.y,p.z).sub(anchor).applyEuler(rotation).add(anchor).add(translation);
      Object.assign(p,{x:v.x,y:v.y,z:v.z,rx:rotation.x,ry:rotation.y,rz:rotation.z});
    }
  }
  function rearOpening(index,t){
    const out=emptyPose(),open=ramp(t,index===2?.65:.3,.85);
    out.back.alpha=1-ramp(open,0,.22);out.back.thickness=3;
    const angle=-2.22*open;
    Object.assign(out.backGlass,{x:-1.5+1.5*Math.cos(angle),z:.24-1.5*Math.sin(angle),ry:angle,rz:open*.02,alpha:open>.001?1:0});
    out.backBody.alpha=open;out.camera.alpha=open;
    if(index===2)return {pose:out,open,tray:0,part:open,fit:0,phase:open<.02?'closed-back':open<.98?'opening-back':'removed-back'};
    const part=ramp(t,1.45,.7);
    out.camera.x*=1-part;out.camera.y-=part*1.8;out.camera.z+=part*.95;out.camera.scale=1+part*.55;
    out.backBody.alpha*=1-part*.65;out.backGlass.alpha*=1-ramp(part,.05,.65);
    return {pose:out,open,tray:0,part,fit:0,phase:part>.98?'highlighted':open<.98?'opening-back':'lifting'};
  }
  function screenReplacement(t){
    const out=emptyPose(),open=ramp(t,.8,.65),detach=ramp(t,1.9,.5),fit=ramp(t,3,.7);
    swingScreen(out.brokenScreen,open,detach);
    firstOpened(out,open*(1-fit));
    Object.assign(out.display,{x:-1.15*(1-fit),y:.08*(1-fit),z:-1.1+fit*.88,ry:.18*(1-fit),alpha:ramp(t,2.5,.3),thickness:1+2*fit});
    const phase=fit>.98?'repaired':t>=3?'fitting-screen':t>=2.5?'new-screen':detach>.98?'screen-off':open>.98?'disconnecting-screen':open>.02?'opening-screen':'broken-screen';
    return {pose:out,open,tray:0,part:fit,fit,phase};
  }
  function repairPose(index,t){
    if(index===0)return screenReplacement(t);
    if(index===2||(index===4&&cameraSide==='rear'))return rearOpening(index,t);
    const out=closedPose(index),open=ramp(t,.3,.65);
    const removesTray=[1,3,5].includes(index),trayLift=removesTray?ramp(t,1.35,.65):0;
    const part=index===1?trayLift:ramp(t,removesTray?2.05:1.25,.7);
    swingScreen(out.display,open,ramp(t,1.1,.65));firstOpened(out,open);
    if(removesTray){
      moveTray(out,trayLift,index===1?ramp(t,2.05,.7):0);
      out.innerFront.alpha=trayLift;out.cameraFront.alpha*=1-trayLift;
      if(index!==1){
        const fade=1-ramp(trayLift,.5,.5);
        for(const name of ['tray','battery'])out[name].alpha*=fade;
      }
    }
    if(index===5){
      out.innerFront.alpha*=1-part;out.chassis.alpha=part*.5;
      out.board.alpha=part;out.board.z-=part*.75;out.board.scale=1+part*.08;out.housing.alpha*=1-part*.5;
    }else if(index===3){
      out.port.alpha=trayLift;out.port.z-=part*.95;out.port.scale=1+part*.14;
      out.innerFront.alpha*=1-part*.76;out.housing.alpha*=1-part*.76;
    }else if(index===4){
      const module=out.cameraFront;
      module.y-=part*1.98;module.z-=part*.95;module.scale=.8+part*1.2;
      out.tray.alpha*=1-part*.78;out.battery.alpha=out.tray.alpha;out.housing.alpha*=1-part*.78;
    }
    const turning=index===1&&t>=2.05&&t<2.75;
    const phase=turning?'turning-plate':part>.98?'highlighted':open<.98?'opening':trayLift>.02&&trayLift<.98?'removing-plate':part>.02?'lifting':'battery-plate';
    return {pose:out,open,tray:trayLift,part,fit:0,phase};
  }
  const HERO_YAW=.5,HERO_TILT=-1.05;
  function heroPose(amount){
    const out=emptyPose();
    const depth={display:-1.62,tray:-.65,board:.2,chassis:.95,backGlass:1.55};
    for(const name of Object.keys(depth)){
      out[name].alpha=1;out[name].z=THREE.MathUtils.lerp(0,depth[name],amount);
    }
    // Floor sits deeper than the frame face and moves with the chassis.
    out.floor.alpha=1;out.floor.z=out.chassis.z+.05;Object.assign(out.floor,{x:-.007,y:-.770});
    // Camera stays seated against the chassis face throughout the opening.
    out.camera.alpha=1;out.camera.z=out.chassis.z-(layers.chassis.userData.depth+layers.camera.userData.depth)/2;
    // The horizontal board floats separately below the upper camera hardware.
    Object.assign(out.tray,{y:-.38});
    Object.assign(out.board,{x:.8,y:-1.2});
    Object.assign(out.backGlass,{y:-.85});
    // Align optical centers, accounting for the carrier's off-center flex tails.
    Object.assign(out.camera,{x:0,y:2.0});
    return out;
  }
  function orientLayer(name,frontSide,thickness){
    const group=layers[name],data=group.userData;
    if(!data.photo)return;
    group.scale.x=(frontSide?-1:1)*group.scale.y;data.photo.rotation.y=0;data.photo.position.z=(frontSide?-1:1)*(data.depth/2+(data.faceLift??.012));
    data.volume.scale.z=thickness;
    data.volume.position.z=frontSide?-data.depth/2+.008*(thickness-1):data.depth/2+.008-thickness*(data.depth+.008);
    if(data.reverse)data.reverse.position.z=(frontSide?1:-1)*(data.depth/2+(isHero&&name==='backGlass'?data.faceLift:.012));
    if(data.reverse&&(name==='display'||name==='brokenScreen'))data.reverse.visible=Math.abs(group.rotation.y)>.15;
  }
  function applyPose(pose){
    for(const name of names){
      const g=layers[name],p=pose[name];g.visible=p.alpha>.002;g.position.set(p.x,p.y,p.z);g.rotation.set(p.rx,p.ry,p.rz);g.scale.setScalar(p.scale);
      const rearView=selected===2||(selected===4&&cameraSide==='rear');
      const frontSide=isHero||(!['back','backGlass','backBody'].includes(name)&&!(name==='camera'&&rearView));
      orientLayer(name,frontSide,p.thickness);
      g.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material]){const transparent=p.alpha<.999||m.userData.restTransparent;if(m.transparent!==transparent){m.transparent=transparent;m.needsUpdate=true;}m.opacity=m.userData.restOpacity*p.alpha;m.depthWrite=p.alpha>.98;}});
    }
  }
  function select(index,side=cameraSide){
    // Screen/glass repairs restart at their before view so the sequence can replay.
    startPose=[0,2].includes(index)?closedPose(index):currentPose;
    selected=index;cameraSide=side;clipTime=0;dragYaw=0;dragPitch=0;
    stage.dataset.selectedPart=index===4&&cameraSide==='front'?'cameraFront':PARTS[index];requestDraw();
  }
  function draw(now=0){
    frame=0;if(!visible||document.hidden)return;
    const dt=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=dt;clipTime+=dt;
    let open=0,trayProgress=0,part=0,fitProgress=0,phase='closed';
    if(isHero){
      heroSpread=reduced.matches?1:THREE.MathUtils.damp(heroSpread,1,4,dt);
      if(heroSpread>.999)heroSpread=1;
      currentPose=heroPose(heroSpread);phase=heroSpread>.98?'exploded':'opening';
      phone.scale.setScalar(1);phone.position.y=-.06;
      phone.rotation.set(HERO_TILT+dragPitch,Math.PI+.16+HERO_YAW+dragYaw,-.5);
    }else{
      const repair=repairPose(selected,reduced.matches?10:clipTime);
      currentPose=reduced.matches?repair.pose:blend(startPose,repair.pose,smooth(clipTime/.32));
      open=repair.open;trayProgress=repair.tray;part=repair.part;fitProgress=repair.fit;phase=repair.phase;
      if(reduced.matches&&selected===0){
        Object.assign(currentPose.brokenScreen,{x:1.0,y:0,z:-.22,ry:0,rz:0,alpha:1,scale:.62,thickness:3});
        Object.assign(currentPose.display,{x:-1.0,y:0,z:-.22,ry:0,rz:0,alpha:1,scale:.62,thickness:3});phase='comparison';
      }
      const rearView=selected===2||(selected===4&&cameraSide==='rear');
      const targetYaw=rearView?.16:Math.PI+([1,3,4,5].includes(selected)?.12:0);
      const targetRoll=selected===3?-Math.PI/2:rearView?.012:-.012;
      const targetScale=[0,2].includes(selected)?1:selected===3?.82:.9;
      const targetField=selected===3?3.45:selected===4?3.4:3.8;
      if(!dragging)viewYaw=reduced.matches?targetYaw:THREE.MathUtils.damp(viewYaw,targetYaw,7,dt);
      viewRoll=reduced.matches?targetRoll:THREE.MathUtils.damp(viewRoll,targetRoll,6,dt);
      viewScale=reduced.matches?targetScale:THREE.MathUtils.damp(viewScale,targetScale,6,dt);
      viewField=reduced.matches?targetField:THREE.MathUtils.damp(viewField,targetField,6,dt);
      phone.scale.setScalar(viewScale);phone.position.y=0;
      phone.rotation.set((selected===3?-.16:-.065)+dragPitch,viewYaw+dragYaw+(reduced.matches||dragging?0:Math.sin(elapsed*.7)*.035),viewRoll);
      setView(viewField);
    }
    applyPose(currentPose);
    for(const material of Object.values(rimMaterials))material.emissive.set(0);
    if(!isHero&&part>.55){const focus=selected===1?'tray':selected===2?'backGlass':selected===4&&cameraSide==='front'?'cameraFront':PARTS[selected];const m=rimMaterials[focus];m.emissive.set(0x0066ff);m.emissiveIntensity=.15+part*.15;}
    stage.dataset.presentation=isHero?'exploded':selected===0?'screen-replacement':selected===2?'rear-glass-removal':'repair';
    stage.dataset.repairPhase=phase;stage.dataset.coverProgress=open.toFixed(3);stage.dataset.partProgress=part.toFixed(3);stage.dataset.plateProgress=trayProgress.toFixed(3);
    stage.dataset.cameraSide=cameraSide;stage.dataset.orientation=selected===3&&!isHero?'horizontal':'portrait';
    stage.dataset.boardVisible=String(currentPose.board.alpha>.05||(!isHero&&currentPose.innerFront.alpha>.05));stage.dataset.screenFitProgress=fitProgress.toFixed(3);
    stage.dataset.plateSide=Math.abs(currentPose.tray.ry)>Math.PI/2?'reverse':'front';
    stage.dataset.exploded=String(isHero&&heroSpread>.95);
    if(isHero){
      stage.dataset.visibleParts=names.filter(name=>currentPose[name].alpha>.002).join(',');
      stage.dataset.componentCount=String(names.length);stage.dataset.assemblyProgress=heroSpread.toFixed(3);
      stage.dataset.cameraAttached='true';stage.dataset.detachedParts='display,tray,board,backGlass';
    }
    renderer.render(scene,camera);stage.dataset.renderCount=String(Number(stage.dataset.renderCount||0)+1);
    if(!reduced.matches&&(!isHero||heroSpread<1))frame=requestAnimationFrame(draw);
  }
  function requestDraw(){if(visible&&!frame)frame=requestAnimationFrame(draw);}
  function setView(v){
    const w=stage.clientWidth,h=isHero?visual.clientHeight:w*1.1;if(!w||!h)return;
    const aspect=w/h;
    camera.top=v;camera.bottom=-v;camera.left=-v*aspect;camera.right=v*aspect;camera.updateProjectionMatrix();
  }
  function resize(){
    const w=stage.clientWidth,h=isHero?visual.clientHeight:w*1.1;if(!w||!h)return;
    setView(isHero?4.75:viewField);renderer.setSize(w,h);requestDraw();
  }
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){last=0;requestDraw();}else{cancelAnimationFrame(frame);frame=0;}},{threshold:.05}).observe(stage);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{last=0;requestDraw();}});
  reduced.addEventListener('change',()=>{requestDraw();});
  if(!isHero)visual.addEventListener('phone-selection',e=>select(e.detail.index,e.detail.cameraSide));
  if(isHero)canvas.style.touchAction='pan-y';
  canvas.addEventListener('pointerdown',e=>{dragging=true;dragX=e.clientX;dragY=e.clientY;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;const lim=isHero?[.8,.5]:[.35,.18];dragYaw=clamp(dragYaw+(e.clientX-dragX)*.005,-lim[0],lim[0]);dragPitch=clamp(dragPitch+(e.clientY-dragY)*.003,-lim[1],lim[1]);dragX=e.clientX;dragY=e.clientY;requestDraw();});
  for(const type of ['pointerup','pointercancel'])canvas.addEventListener(type,()=>{dragging=false;requestDraw();});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();visible=false;cancelAnimationFrame(frame);visual.classList.remove('phone3d-ready');stage.hidden=true;visual.closest('#diagnostico')?.querySelector('[data-repair-replay]')?.setAttribute('hidden','');});
  resize();applyPose(currentPose);if(isHero){phone.scale.setScalar(1);phone.position.y=-.06;}phone.rotation.set(isHero?-1.18:-.065,viewYaw,isHero?-.5:0);renderer.render(scene,camera);
  stage.dataset.ready='true';stage.dataset.selectedPart=isHero?'all':selected===4&&cameraSide==='front'?'cameraFront':PARTS[selected];visual.classList.add('phone3d-ready');return{stage};
}
