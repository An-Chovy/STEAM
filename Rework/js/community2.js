(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.querySelector('#universe');
  const ctx = canvas.getContext('2d', { alpha: false });
  let w=0,h=0,dpr=1,stars=[],dust=[],meteors=[],events=[],sceneScroll=0,pointer={x:0,y:0},last=0,nextMeteor=0;
  const seed = (Date.now() ^ Math.floor(Math.random()*1e9)) >>> 0;
  let state=seed;
  const rand=()=>((state=Math.imul(1664525,state)+1013904223>>>0)/4294967296);
  const palette=[[80,115,255],[108,232,255],[174,118,255],[255,84,117]];

  function resize(){dpr=Math.min(devicePixelRatio||1,1.75);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);makeField()}
  function makeField(){
    stars=Array.from({length:Math.min(700,Math.floor(w*h/1900))},()=>({x:rand()*w,y:rand()*h,r:rand()*1.35+.18,a:rand()*.72+.18,z:rand()*.9+.1,tw:rand()*6.28}));
    dust=Array.from({length:5},(_,i)=>({x:rand()*w,y:rand()*h,r:Math.max(w,h)*(rand()*.22+.18),c:palette[i%palette.length],a:rand()*.035+.012,dr:rand()*2-1}));
  }
  function meteor(t){const fromLeft=rand()>.5;meteors.push({x:fromLeft?-120:w+120,y:rand()*h*.5,vx:(fromLeft?1:-1)*(9+rand()*8),vy:3+rand()*3,life:0,max:50+rand()*35,len:130+rand()*170});nextMeteor=t+5000+rand()*15000}
  function timedEvents(t){
    if(t>28000&&!events.some(e=>e.type==='ship'))events.push({type:'ship',start:t,duration:9000,y:h*(.12+rand()*.3),dir:rand()>.5?1:-1});
    if(t>65000&&!events.some(e=>e.type==='nova'))events.push({type:'nova',start:t,duration:6500,x:w*(.2+rand()*.6),y:h*(.15+rand()*.35)});
  }
  function drawShip(e,t){const p=(t-e.start)/e.duration;if(p<0||p>1)return;const x=e.dir>0?-100+(w+200)*p:w+100-(w+200)*p;const y=e.y+Math.sin(p*8)*7;ctx.save();ctx.translate(x,y);if(e.dir<0)ctx.scale(-1,1);ctx.globalAlpha=Math.sin(Math.PI*p)*.7;const g=ctx.createLinearGradient(-110,0,20,0);g.addColorStop(0,'rgba(82,180,255,0)');g.addColorStop(1,'rgba(118,235,255,.7)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-120,0);ctx.lineTo(-12,-2);ctx.lineTo(-12,2);ctx.fill();ctx.fillStyle='#c9d7e8';ctx.beginPath();ctx.moveTo(22,0);ctx.quadraticCurveTo(3,-5,-16,-3);ctx.lineTo(-25,0);ctx.lineTo(-16,3);ctx.quadraticCurveTo(3,5,22,0);ctx.fill();ctx.fillStyle='#73ebff';ctx.fillRect(-17,-1,5,2);ctx.restore()}
  function drawNova(e,t){const p=(t-e.start)/e.duration;if(p<0||p>1)return;const peak=Math.sin(Math.PI*Math.min(1,p*1.4));ctx.save();ctx.globalCompositeOperation='screen';const r=8+p*260;const g=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r);g.addColorStop(0,`rgba(255,255,255,${.9*peak})`);g.addColorStop(.05,`rgba(126,226,255,${.55*peak})`);g.addColorStop(.24,`rgba(118,92,255,${.17*(1-p)})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(e.x,e.y,r,0,Math.PI*2);ctx.fill();ctx.restore()}
  function frame(t){
    const dt=Math.min(32,t-last||16);last=t;sceneScroll=sceneScroll+(scrollYTarget-sceneScroll)*.05;ctx.fillStyle='#02040b';ctx.fillRect(0,0,w,h);
    const bg=ctx.createRadialGradient(w*.7+pointer.x*14,h*.2+pointer.y*10,0,w*.65,h*.3,Math.max(w,h)*.9);bg.addColorStop(0,'#101838');bg.addColorStop(.35,'#060a19');bg.addColorStop(1,'#02040b');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    ctx.save();ctx.globalCompositeOperation='screen';dust.forEach((d,i)=>{const x=d.x+pointer.x*d.dr*28;const y=((d.y-sceneScroll*(.012+i*.003))%(h+d.r*2)+h+d.r*2)%(h+d.r*2)-d.r;const g=ctx.createRadialGradient(x,y,0,x,y,d.r);g.addColorStop(0,`rgba(${d.c.join(',')},${d.a})`);g.addColorStop(.45,`rgba(${d.c.join(',')},${d.a*.48})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-d.r,y-d.r,d.r*2,d.r*2)});ctx.restore();
    stars.forEach(s=>{const y=((s.y-sceneScroll*s.z*.035)%h+h)%h;const a=s.a*(.72+.28*Math.sin(t*.001+s.tw));ctx.fillStyle=`rgba(220,235,255,${a})`;ctx.beginPath();ctx.arc(s.x+pointer.x*s.z*5,y,s.r,0,Math.PI*2);ctx.fill()});
    if(!reduced&&t>nextMeteor)meteor(t);meteors.forEach(m=>{m.x+=m.vx;m.y+=m.vy;m.life++;const a=Math.sin(Math.PI*m.life/m.max);const g=ctx.createLinearGradient(m.x-m.vx/Math.abs(m.vx)*m.len,m.y-m.vy/Math.abs(m.vx)*m.len*.35,m.x,m.y);g.addColorStop(0,'rgba(100,180,255,0)');g.addColorStop(1,`rgba(240,250,255,${a})`);ctx.strokeStyle=g;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(m.x-m.vx/Math.abs(m.vx)*m.len,m.y-m.vy/Math.abs(m.vx)*m.len*.35);ctx.lineTo(m.x,m.y);ctx.stroke()});meteors=meteors.filter(m=>m.life<m.max);
    if(!reduced){timedEvents(t);events.forEach(e=>e.type==='ship'?drawShip(e,t):drawNova(e,t))}requestAnimationFrame(frame)
  }
  let scrollYTarget=0;addEventListener('scroll',()=>{scrollYTarget=window.scrollY;document.querySelector('.site-header').classList.toggle('scrolled',window.scrollY>25)},{passive:true});addEventListener('pointermove',e=>{pointer.x=e.clientX/w-.5;pointer.y=e.clientY/h-.5},{passive:true});addEventListener('resize',resize);
  resize();requestAnimationFrame(frame);

  const menu=document.querySelector('.menu-button'),nav=document.querySelector('#site-nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});nav.addEventListener('click',e=>{if(e.target.closest('a,button')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
  const reveal=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('visible',e.isIntersecting)),{threshold:.12,rootMargin:'0px 0px -7%'});document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
  const modals={registration:document.querySelector('#registrationModal'),volunteer:document.querySelector('#volunteerModal'),directions:document.querySelector('#directionsModal')};let lastFocus;
  function openModal(name){const m=modals[name];if(!m)return;lastFocus=document.activeElement;m.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>m.querySelector('input,select,a,button')?.focus(),0)}
  function closeModal(m){m.hidden=true;document.body.classList.remove('modal-open');lastFocus?.focus()}
  document.addEventListener('click',e=>{const opener=e.target.closest('[data-open]');if(opener)openModal(opener.dataset.open);const closer=e.target.closest('[data-close]');if(closer)closeModal(closer.closest('.modal'));if(e.target.classList.contains('modal'))closeModal(e.target)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){const m=document.querySelector('.modal:not([hidden])');if(m)closeModal(m)}});
  async function wireForm(id,endpoint,success){const form=document.querySelector(id);form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('[type=submit]'),status=form.querySelector('.form-status');btn.disabled=true;status.textContent='Transmitting…';try{const r=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!r.ok)throw Error();form.reset();status.textContent=success;btn.textContent='Received ✓'}catch{status.textContent='Transmission failed. Please check your connection and try again.';btn.disabled=false}})}
  wireForm('#partnerForm','https://formspree.io/f/xlgqzvbj','Registration complete. Kevin will contact you soon.');wireForm('#volunteerForm','https://formspree.io/f/xlgqzqye','You’re signed up. Our team will follow up closer to the event.');
})();