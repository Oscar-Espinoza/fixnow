/* Source artboard interactions, translated to native DOM controls. */
'use strict';
const diagnosticData = {"desktop": [{"num": "01", "title": "Pantalla", "symptom": "Vidrio roto, manchas o sin imagen.", "time": "Desde 30 min", "zone": {"top": "4px", "left": "4px", "w": "158px", "h": "328px", "r": "26px"}}, {"num": "02", "title": "Batería", "symptom": "Se descarga rápido o no carga.", "time": "Desde 45 min", "zone": {"top": "110px", "left": "30px", "w": "106px", "h": "170px", "r": "12px"}}, {"num": "03", "title": "Vidrio trasero", "symptom": "Roto o con fisuras.", "time": "Consultá por WhatsApp", "zone": {"top": "-8px", "left": "-8px", "w": "182px", "h": "352px", "r": "36px"}}, {"num": "04", "title": "Carga", "symptom": "No carga, carga lento o se corta.", "time": "Consultá por WhatsApp", "zone": {"top": "300px", "left": "55px", "w": "56px", "h": "38px", "r": "10px"}}, {"num": "05", "title": "Cámara", "symptom": "Fotos borrosas o no funciona.", "time": "Consultá por WhatsApp", "zone": {"top": "14px", "left": "14px", "w": "70px", "h": "70px", "r": "18px"}}, {"num": "06", "title": "Equipo mojado", "symptom": "No enciende o presenta fallas. Apagalo y traelo cuanto antes.", "time": "Consultá por WhatsApp", "zone": {"top": "60px", "left": "20px", "w": "126px", "h": "250px", "r": "50%"}}], "mobile": [{"num": "01", "title": "Pantalla", "symptom": "Vidrio roto, manchas o sin imagen.", "time": "Desde 30 min", "zone": {"top": "3px", "left": "3px", "w": "120px", "h": "250px", "r": "20px"}}, {"num": "02", "title": "Batería", "symptom": "Se descarga rápido o no carga.", "time": "Desde 45 min", "zone": {"top": "84px", "left": "23px", "w": "80px", "h": "130px", "r": "9px"}}, {"num": "03", "title": "Vidrio trasero", "symptom": "Roto o con fisuras.", "time": "Consultá por WhatsApp", "zone": {"top": "-7px", "left": "-7px", "w": "140px", "h": "270px", "r": "28px"}}, {"num": "04", "title": "Carga", "symptom": "No carga, carga lento o se corta.", "time": "Consultá por WhatsApp", "zone": {"top": "228px", "left": "42px", "w": "42px", "h": "30px", "r": "8px"}}, {"num": "05", "title": "Cámara", "symptom": "Fotos borrosas o no funciona.", "time": "Consultá por WhatsApp", "zone": {"top": "10px", "left": "10px", "w": "54px", "h": "54px", "r": "14px"}}, {"num": "06", "title": "Equipo mojado", "symptom": "No enciende o presenta fallas. Apagalo y traelo cuanto antes.", "time": "Lo antes posible", "zone": {"top": "46px", "left": "15px", "w": "96px", "h": "190px", "r": "50%"}}]};
let selectedIssue = 0;
let selectedCamera = 'rear';
function selectIssue(index) {
  selectedIssue = index;
  const root = document.getElementById('diagnostico');
  const variant = window.matchMedia('(min-width: 900px)').matches ? 'desktop' : 'mobile';
  const issue = {...diagnosticData[variant][index]};
  if (index === 4) {
    issue.title = selectedCamera === 'front' ? 'Cámara frontal' : 'Cámara trasera';
    issue.symptom = selectedCamera === 'front' ? 'Selfies borrosas o cámara frontal sin imagen.' : 'Fotos borrosas o cámara trasera sin imagen.';
  }
  root.querySelector('.camera-options').hidden = index !== 4;
  root.querySelectorAll('[data-camera-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.cameraView === selectedCamera));
  });
  root.querySelectorAll('[data-issue]').forEach(button => {
    const selected = Number(button.dataset.issue) === index;
    button.classList.toggle('on', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  root.querySelectorAll('[data-detail]').forEach(field => { field.textContent = issue[field.dataset.detail]; });
  updateExplodedPhone(root, index, issue.title);
  syncRepairReplay();
  scheduleWhatsAppPosition();
}
function syncRepairReplay() {
  const root = document.getElementById('diagnostico');
  root.querySelector('[data-repair-replay]').hidden = ![0, 2].includes(selectedIssue) || !root.querySelector('.phone3d-ready');
}
document.querySelectorAll('[data-issue]').forEach(button => {
  button.addEventListener('click', () => selectIssue(Number(button.dataset.issue)));
});
document.querySelectorAll('[data-camera-view]').forEach(button => {
  button.addEventListener('click', () => { selectedCamera = button.dataset.cameraView; selectIssue(4); });
});
document.querySelector('[data-repair-replay]').addEventListener('click', () => selectIssue(selectedIssue));
const menu = document.getElementById('mobile-menu');
const opener = document.querySelector('[data-menu-open]');
const closer = document.querySelector('[data-menu-close]');
let previousOverflow = '';
function closeMenu() {
  if (menu.hidden) return;
  menu.hidden = true;
  opener.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = previousOverflow;
  opener.focus();
}
opener.addEventListener('click', () => {
  previousOverflow = document.body.style.overflow;
  menu.hidden = false;
  opener.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  closer.focus();
});
closer.addEventListener('click', closeMenu);
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (menu.hidden) return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
  if (event.key === 'Tab') {
    const items = [...menu.querySelectorAll('button, a[href]')];
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
window.matchMedia('(min-width: 900px)').addEventListener('change', event => { if (event.matches) closeMenu(); selectIssue(selectedIssue); });


// Original conceptual phone layers share the diagnostic buttons as their only controls.
const selectedLayers = [['glass', 'screen'], ['battery'], ['back'], ['board'], ['back'], ['glass', 'screen', 'battery', 'board', 'back']];
function updateExplodedPhone(root, index, title) {
  const visual = root.querySelector('.phone-exploded');
  const opens = ![0, 2, 4].includes(index);
  visual.classList.toggle('is-revealed', opens);
  visual.classList.toggle('is-settled', opens);
  visual.dataset.fallbackIssue = String(index === 4 ? selectedCamera === 'front' ? 0 : 2 : index);
  const highlighted = index === 4 ? [selectedCamera === 'front' ? 'screen' : 'back'] : selectedLayers[index];
  visual.querySelectorAll('[data-layer]').forEach(layer => {
    layer.classList.toggle('is-selected', highlighted.includes(layer.dataset.layer));
  });
  visual.querySelector('.phone-caption').textContent = title;
  visual.querySelector('[data-layer="screen"] use').setAttribute('href', index === 0 ? 'assets/phone-layers.svg#screen-broken' : 'assets/phone-layers.svg#screen');
  visual.dataset.selectedIssue = String(index);
  visual.dataset.cameraSide = selectedCamera;
  visual.dispatchEvent(new CustomEvent('phone-selection', {detail: {index, cameraSide: selectedCamera}}));
}
const phoneVisuals = document.querySelectorAll('.phone-exploded');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (![0, 2].includes(Number(entry.target.dataset.fallbackIssue ?? 0))) entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.2});
  phoneVisuals.forEach(visual => observer.observe(visual));
} else {
  phoneVisuals.forEach(visual => { if (![0, 2].includes(Number(visual.dataset.fallbackIssue ?? 0))) visual.classList.add('is-revealed'); });
}

// Lift the floating contact control above diagnostic controls if they intersect it.
const whatsappFloat = document.querySelector('.whatsapp-float');
let floatFrame = 0;
function positionWhatsApp() {
  floatFrame = 0;
  whatsappFloat.hidden = false;
  whatsappFloat.style.setProperty('--wa-lift', '0px');
  const initial = whatsappFloat.getBoundingClientRect();
  const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
  const controls = [...document.querySelectorAll('[data-issue], [data-camera-view], [data-repair-replay]')].map(button => button.getBoundingClientRect()).filter(rect => rect.width && rect.height);
  let top = initial.top;
  for (let pass = 0; pass < controls.length; pass++) {
    const overlaps = controls.filter(rect => rect.left < initial.right && rect.right > initial.left && rect.top < top + initial.height + 8 && rect.bottom > top - 8);
    if (!overlaps.length) break;
    top = Math.min(...overlaps.map(rect => rect.top)) - initial.height - 12;
  }
  // On exceptionally short viewports, keep controls usable until space returns.
  whatsappFloat.hidden = top < headerBottom + 12;
  whatsappFloat.style.setProperty('--wa-lift', Math.max(0, initial.top - top) + 'px');
}
function scheduleWhatsAppPosition() {
  if (!floatFrame) floatFrame = requestAnimationFrame(positionWhatsApp);
}
window.addEventListener('scroll', scheduleWhatsAppPosition, {passive: true});
window.addEventListener('resize', scheduleWhatsAppPosition);
window.addEventListener('load', scheduleWhatsAppPosition);
if (document.fonts) document.fonts.ready.then(scheduleWhatsAppPosition);
scheduleWhatsAppPosition();


// The hero and diagnostic card share assets, but have separate animation roles.
let phone3DModule;
const sceneHosts = document.querySelectorAll('.hero-phone, #diagnostico .phone-exploded');
const phone3DHosts = new WeakSet();
async function loadPhoneScene(visual) {
  if (!visual.clientWidth || !visual.clientHeight || phone3DHosts.has(visual)) return;
  phone3DHosts.add(visual);
  try {
    phone3DModule ||= import('./assets/phone3d.js');
    const module = await phone3DModule;
    await module.mountPhone3D(visual);
    syncRepairReplay();
    scheduleWhatsAppPosition();
  } catch {
    // The original hero illustration / diagnostic SVG remains on load failure.
    visual.classList.remove('phone3d-ready');
    visual.querySelector('.phone3d-stage')?.remove();
  }
}
if ('IntersectionObserver' in window) {
  const nearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) loadPhoneScene(entry.target); });
  }, {rootMargin: '200px 0px'});
  sceneHosts.forEach(host => nearObserver.observe(host));
} else { sceneHosts.forEach(loadPhoneScene); }
window.addEventListener('resize', () => {
  sceneHosts.forEach(host => {
    const rect = host.getBoundingClientRect();
    if (rect.bottom >= -200 && rect.top <= innerHeight + 200) loadPhoneScene(host);
  });
});
