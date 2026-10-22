const $=s=>document.querySelector(s);
const P=JSON.parse(sessionStorage.getItem('p')||'{"n":"Traveller","t":"Mr","g":"m","l":"en"}'),NAME=P.t+' '+P.n,GAP=95,N=Z.length;
let lang=P.l,voiceOn=true,cur=-1,arrived=-1,tgt=0,speaking=false,started=false,auto=true,spin=false,day=false,eggs=0;
const visited=new Set(),keys={},rnd=(a,b)=>a+Math.random()*(b-a);$('#lang').value=lang;
const R=new THREE.WebGLRenderer({canvas:$('#c'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(62,1,.1,700);
const hemi=new THREE.HemisphereLight(0xffd0ff,0x3a1f7a,1),sun=new THREE.DirectionalLight(0xff9ad5,1.1);sun.position.set(30,50,20);S.add(hemi,sun);
// sky + theme
const sk=document.createElement('canvas');sk.width=2;sk.height=256;const skc=sk.getContext('2d'),skt=new THREE.CanvasTexture(sk);
const sky=new THREE.Mesh(new THREE.SphereGeometry(500,24,16),new THREE.MeshBasicMaterial({map:skt,side:THREE.BackSide,fog:false}));S.add(sky);
function theme(d){day=d;const g=skc.createLinearGradient(0,0,0,256),c=d?['#4fb0ff','#bfe6ff','#ffd6e8']:['#0d0630','#5a1a9a','#ff7a9c'];c.forEach((x,i)=>g.addColorStop(i/2,x));skc.fillStyle=g;skc.fillRect(0,0,2,256);skt.needsUpdate=true;
 S.fog=new THREE.Fog(d?0xcfe6ff:0x2a1458,50,260);hemi.intensity=d?1.5:1;sun.color.set(d?0xfff3d6:0xff9ad5);stars.visible=!d}
const sg=new THREE.BufferGeometry(),sp=[];for(let i=0;i<700;i++){const a=Math.random()*6.28,r=300+Math.random()*100;sp.push(Math.cos(a)*r,40+Math.random()*250,Math.sin(a)*r)}
sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));const stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:1.6,fog:false}));S.add(stars);
const moon=new THREE.Mesh(new THREE.SphereGeometry(14,24,24),new THREE.MeshBasicMaterial({color:0xfff0c0,fog:false}));S.add(moon);
// ground
const gc=document.createElement('canvas');gc.width=gc.height=128;const x=gc.getContext('2d');x.fillStyle='#24135c';x.fillRect(0,0,128,128);x.strokeStyle='#7df9ff55';x.lineWidth=3;x.strokeRect(0,0,128,128);
const gt=new THREE.CanvasTexture(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(70,70*3);
const LEN=GAP*N+300,mid=-(N-1)*GAP/2;
const gr=new THREE.Mesh(new THREE.PlaneGeometry(700,LEN),new THREE.MeshToonMaterial({map:gt,gradientMap:gm}));gr.rotation.x=-Math.PI/2;gr.position.set(0,0,mid);S.add(gr);
const rd=new THREE.Mesh(new THREE.PlaneGeometry(14,LEN),new THREE.MeshToonMaterial({color:0x1b1240,gradientMap:gm}));rd.rotation.x=-Math.PI/2;rd.position.set(0,.05,mid);S.add(rd);
[-7,7].forEach((px,i)=>{const e=new THREE.Mesh(new THREE.BoxGeometry(.4,.1,LEN),new THREE.MeshBasicMaterial({color:i?0xff6fb1:0x7dfcff}));e.position.set(px,.1,mid);S.add(e)});
const dash=new THREE.InstancedMesh(new THREE.BoxGeometry(.4,.06,3),new THREE.MeshBasicMaterial({color:0xffe9a0}),Math.floor(LEN/8)),dm=new THREE.Object3D();
for(let i=0;i<dash.count;i++){dm.position.set(0,.09,40-i*8);dm.updateMatrix();dash.setMatrixAt(i,dm.matrix)}S.add(dash);
// skyline
const wc=document.createElement('canvas');wc.width=64;wc.height=128;const w=wc.getContext('2d');w.fillStyle='#1a1050';w.fillRect(0,0,64,128);
for(let i=0;i<8;i++)for(let j=0;j<16;j++){if(Math.random()<.45){w.fillStyle=['#ffe9a0','#7df9ff','#ff9ad5'][(Math.random()*3)|0];w.fillRect(i*8+2,j*8+2,4,5)}}
const wt=new THREE.CanvasTexture(wc),wm=new THREE.MeshToonMaterial({map:wt,emissiveMap:wt,emissive:0xffffff,gradientMap:gm});
for(let i=0;i<150;i++){const h=rnd(20,85),b=new THREE.Mesh(new THREE.BoxGeometry(rnd(10,22),h,rnd(10,22)),wm);b.position.set((Math.random()<.5?-1:1)*rnd(60,170),h/2,rnd(60,-(N-1)*GAP-120));S.add(b)}
// petals
const pn=500,pa=new Float32Array(pn*3);for(let i=0;i<pn;i++){pa[i*3]=rnd(-50,50);pa[i*3+1]=rnd(0,30);pa[i*3+2]=rnd(-50,50)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));const petals=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffb7d5,size:.35}));petals.frustumCulled=false;S.add(petals);
// zone props
const spinners=[],bobs=[],add=(g,m)=>{g.add(m);return m};
const B={
home(c){const g=new THREE.Group(),b=T(new THREE.BoxGeometry(6,4,6),0xfff1e6,0,1.02);b.position.y=2;const r=T(new THREE.ConeGeometry(5.4,3,4),c);r.position.y=5.5;r.rotation.y=Math.PI/4;const t=T(new THREE.CylinderGeometry(.4,.5,3),0x8a5a3c);t.position.set(5,1.5,3);const l=T(new THREE.SphereGeometry(2.2,12,10),0xffa6cc);l.position.set(5,4.5,3);g.add(b,r,t,l);return g},
learn(c){const g=new THREE.Group(),b=T(new THREE.BoxGeometry(6,18,6),c,0,1.01);b.position.y=9;const k=T(new THREE.CylinderGeometry(2,2,.5,24),0xffffff,0xffffff,0);k.rotation.x=Math.PI/2;k.position.set(0,14,3.2);g.add(b,k);for(let i=0;i<5;i++){const wn=T(new THREE.BoxGeometry(3,.7,.2),0xffe9a0,0xffd27a,0);wn.position.set(0,2+i*2.1,3.05);g.add(wn)}return g},
obs(c){const g=new THREE.Group(),b=T(new THREE.CylinderGeometry(4,4.5,6,24),0xe6dcff,0,1.02);b.position.y=3;const d=T(new THREE.SphereGeometry(4,24,12,0,6.28,0,1.57),c);d.position.y=6;const t=T(new THREE.CylinderGeometry(.5,.7,6),0x333355);t.position.set(0,8,2);t.rotation.x=-.9;g.add(b,d,t);return g},
studio(c){const g=new THREE.Group(),b=T(new THREE.BoxGeometry(8,3,6),0x3a2a80,0,1.02);b.position.y=1.5;const ge=T(new THREE.TorusGeometry(2.6,.9,8,8),c,0x552200);ge.position.y=7;spinners.push([ge,.02]);const sc=T(new THREE.BoxGeometry(5,3,.2),0x7dfcff,0x38c8d8,0);sc.position.set(0,4.5,3.1);g.add(b,ge,sc);return g},
lib(c){const g=new THREE.Group();let y=0;for(let i=0;i<7;i++){const h=rnd(1,1.6),b=T(new THREE.BoxGeometry(rnd(4,6),h,3),[c,0x5aa9ff,0xffc46b,0x4cc98a][i%4]);b.position.set(rnd(-.4,.4),y+h/2,0);b.rotation.y=rnd(-.3,.3);y+=h;g.add(b)}
 const p1=T(new THREE.BoxGeometry(.7,9,.7),0xe5302f);p1.position.set(-5,4.5,6);const p2=p1.clone();p2.position.x=5;const bm=T(new THREE.BoxGeometry(13,.8,1),0xe5302f);bm.position.set(0,9,6);g.add(p1,p2,bm);return g},
cafe(c){const g=new THREE.Group(),b=T(new THREE.BoxGeometry(8,4,6),0xfff1e0,0,1.02);b.position.y=2;const aw=T(new THREE.BoxGeometry(8.6,.5,2),c);aw.position.set(0,4,3.5);const cu=T(new THREE.CylinderGeometry(2.4,1.8,3,20),0xffffff);cu.position.y=7;const hd=T(new THREE.TorusGeometry(1.1,.3,8,12),0xffffff);hd.position.set(2.7,7,0);g.add(b,aw,cu,hd);
 for(let i=0;i<3;i++){const s=T(new THREE.SphereGeometry(.5,8,8),0xffffff,0x888888,0);s.position.set(rnd(-.8,.8),9+i,0);bobs.push([s,s.position.y]);g.add(s)}return g},
lab(c){const g=new THREE.Group();for(let i=0;i<4;i++){const k=T(new THREE.OctahedronGeometry(rnd(1.2,2.4)),c,c,1.04);k.position.set(rnd(-3,3),rnd(4,10),rnd(-3,3));spinners.push([k,rnd(.01,.03)]);bobs.push([k,k.position.y]);g.add(k)}return g},
hub(c){const g=new THREE.Group(),p=T(new THREE.CylinderGeometry(.8,1.6,22,12),0xf6f2ff);p.position.y=11;const e=T(new THREE.BoxGeometry(3.6,2.4,.5),c,c);e.position.y=24;spinners.push([e,.02]);bobs.push([e,24]);const r=T(new THREE.TorusGeometry(3.5,.15,8,40),0xff6fb1,0xff6fb1,0);r.position.y=24;r.rotation.x=1.4;spinners.push([r,.03]);g.add(p,e,r);return g}};
const labels=[];
Z.forEach((z,i)=>{const zz=-i*GAP,col=z.col;
 const pl=new THREE.Mesh(new THREE.RingGeometry(10,11.2,48),new THREE.MeshBasicMaterial({color:col,side:2}));pl.rotation.x=-Math.PI/2;pl.position.set(0,.12,zz);S.add(pl);
 const ds=new THREE.Mesh(new THREE.CircleGeometry(10,48),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.18}));ds.rotation.x=-Math.PI/2;ds.position.set(0,.11,zz);S.add(ds);
 for(const sd of[-1,1])for(let k=0;k<3;k++){const p=B[z.type](col);p.position.set(sd*(16+k*11+rnd(0,3)),0,zz+(k-1)*16);p.rotation.y=-sd*1.4;S.add(p)}
 const cv=document.createElement('canvas');cv.width=1024;cv.height=200;const c=cv.getContext('2d');c.font='64px "Zen Dots",sans-serif';c.textAlign='center';c.shadowColor='#'+col.toString(16).padStart(6,'0');c.shadowBlur=30;c.fillStyle='#fff';c.fillText(z.title,512,115);
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true,fog:false}));sp.scale.set(40,7.8,1);sp.position.set(0,17,zz-14);S.add(sp);labels.push(sp);
 const pt=new THREE.PointLight(col,1.6,70);pt.position.set(0,9,zz);S.add(pt)});
// car
const car=new THREE.Group(),wh=[];
const body=T(new THREE.SphereGeometry(1,24,16),0xff5a8a);body.scale.set(1.5,.6,2.5);body.position.y=.95;
const cab=T(new THREE.SphereGeometry(1,20,14),0xbdf4ff,0x2a8aa0);cab.scale.set(1.1,.7,1.3);cab.position.set(0,1.5,.2);
[[-1.4,1.5],[1.4,1.5],[-1.4,-1.5],[1.4,-1.5]].forEach(p=>{const q=T(new THREE.CylinderGeometry(.6,.6,.5,16),0x222233);q.rotation.z=Math.PI/2;q.position.set(p[0],.6,p[1]);car.add(q);wh.push(q)});
[-.9,.9].forEach(px=>{const l=T(new THREE.SphereGeometry(.22,8,8),0xffffaa,0xffffaa,0);l.position.set(px,1,-2.4);car.add(l)});
const glow=new THREE.Mesh(new THREE.PlaneGeometry(3.4,6),new THREE.MeshBasicMaterial({color:0x7dfcff,transparent:true,opacity:.45}));glow.rotation.x=-Math.PI/2;glow.position.y=.1;
const bot=makeRobot(P.g);bot.scale.setScalar(.5);bot.position.set(0,1.45,.3);bot.rotation.y=0;
car.add(body,cab,glow,bot);S.add(car);
// state
let X=0,Z0=40,H=0,V=0,off=0,pitch=.38,dist=15,CX=0,CY=6,CZ=55,idle=0;
function rs(){R.setSize(innerWidth,innerHeight);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()}addEventListener('resize',rs);rs();
// speech
const fill=s=>s.replace('{n}',NAME),pick=o=>o[lang]||o.en;
function say(text,l){l=l||lang;$('#sub').textContent=text;if(!('speechSynthesis' in window)||!voiceOn){speechSynthesis&&speechSynthesis.cancel();return}speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);u.lang=LC[l];u.pitch=P.g=='f'?1.35:.8;u.rate=.95;const vs=speechSynthesis.getVoices();
 const v=vs.find(v=>v.lang.replace('_','-').startsWith(LC[l]))||vs.find(v=>v.lang.startsWith(l));if(v)u.voice=v;u.onstart=()=>speaking=true;u.onend=u.onerror=()=>speaking=false;speechSynthesis.speak(u)}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),3800)}
function hi(i){document.querySelectorAll('#nav button').forEach((b,k)=>b.classList.toggle('on',k==i))}
function arrive(i){arrived=cur=i;const z=Z[i];const pn=$('#panel');pn.innerHTML='<h2>'+z.title+'</h2>'+z.cards.map((c,j)=>'<div class="k" data-j="'+j+'"><h3>'+c[0]+'</h3>'+c[1]+'</div>').join('');pn.classList.remove('off');
 pn.querySelectorAll('.k').forEach(k=>k.onclick=e=>{if(e.target.tagName=='A')return;const c=z.cards[k.dataset.j];$('#pt').textContent=c[0];$('#pb').innerHTML=c[1];$('#pop').classList.remove('hidden')});
 hi(i);say(pick(z.say));visited.add(i);
 if(z.id=='contact')toast('Remember why you started. Keep asking questions.');
 if(visited.size==N&&!window.won){window.won=1;setTimeout(()=>toast('🏆 Achievement unlocked: Full Explorer'),2500)}}
function go(i){i=Math.max(0,Math.min(N-1,i));tgt=i;cur=i;arrived=-1;auto=true;$('#mode').textContent='Free drive';$('#panel').classList.add('off');speechSynthesis.cancel();hi(i);$('#sub').textContent='On our way…'}
Z.forEach((z,i)=>{const b=document.createElement('button');b.textContent=z.nav;b.onclick=()=>go(i);$('#nav').append(b)});
$('#next').onclick=()=>{if(cur>=N-2){const o=fill(pick(OUT));$('#oq').textContent=o;$('#outro').classList.remove('hidden');say(o)}else go(cur+1)};
$('#prev').onclick=()=>go(cur-1);$('#no').onclick=()=>$('#outro').classList.add('hidden');$('#yes').onclick=()=>{$('#outro').classList.add('hidden');go(N-1)};
$('#px').onclick=()=>{$('#pop').classList.add('hidden');speechSynthesis.cancel()};$('#pr').onclick=()=>say($('#pt').textContent+'. '+$('#pb').textContent.replace(/\s+/g,' '),'en');
$('#lang').onchange=e=>{lang=e.target.value;if(started&&arrived>=0)arrive(arrived)};
$('#vt').onclick=()=>{voiceOn=!voiceOn;$('#vt').textContent=voiceOn?'Voice on':'Voice off';if(!voiceOn)speechSynthesis.cancel()};
$('#mode').onclick=()=>{auto=!auto;$('#mode').textContent=auto?'Free drive':'Auto guide';if(auto)go(Math.max(cur,0))};
$('#orbit').onclick=()=>spin=!spin;
$('#book').onclick=()=>{if(++eggs>=5){eggs=0;toast('📖 Secret chapter: the traveller has been reading for six hours and still claims to be on page twelve.')}};
$('#engine').onclick=()=>{$('#start').remove();$('#hud').classList.remove('hidden');started=true;say(fill(pick(HI)));setTimeout(()=>go(0),4500)};
addEventListener('keydown',e=>{if(e.target.tagName=='SELECT')return;const k=e.key.replace('Arrow','').toLowerCase();const m={up:'w',down:'s',left:'a',right:'d'}[k]||k;if('wasd'.includes(m)&&m.length==1){keys[m]=1;if(auto&&started){auto=false;$('#mode').textContent='Auto guide'}}});
addEventListener('keyup',e=>{const k=e.key.replace('Arrow','').toLowerCase();keys[{up:'w',down:'s',left:'a',right:'d'}[k]||k]=0});
document.querySelectorAll('.dpad button').forEach(b=>{const k=b.dataset.k;b.onpointerdown=()=>{keys[k]=1;if(auto){auto=false;$('#mode').textContent='Auto guide'}};b.onpointerup=b.onpointerleave=()=>keys[k]=0});
// 360 orbit + moon click
let drag=0,lx=0,ly=0,moved=0;const cv=$('#c');
cv.onpointerdown=e=>{drag=1;moved=0;lx=e.clientX;ly=e.clientY};
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lx,dy=e.clientY-ly;moved+=Math.abs(dx)+Math.abs(dy);off-=dx*.006;pitch=Math.max(.08,Math.min(1.3,pitch+dy*.004));lx=e.clientX;ly=e.clientY;idle=0});
addEventListener('pointerup',e=>{if(drag&&moved<6){const rc=new THREE.Raycaster();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1),C);if(rc.intersectObject(moon).length){theme(!day);toast(day?'Daytime mode':'Night mode')}}drag=0});
cv.addEventListener('wheel',e=>{dist=Math.max(8,Math.min(40,dist+e.deltaY*.02))},{passive:true});cv.ondblclick=()=>off=0;
theme(false);
// loop
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));let t=0,last=performance.now();
(function loop(now){requestAnimationFrame(loop);const k=Math.min(2,(now-last)/16.7||1);last=now;t+=.016*k;
 if(started){if(auto){const tx=0,tz=-tgt*GAP+13,dx=tx-X,dz=tz-Z0,d=Math.hypot(dx,dz);const des=d>3?Math.atan2(dx,-dz):0;H+=Math.max(-.05,Math.min(.05,wrap(des-H)))*k;
   V=Math.min(1.5,d*.05)*(Math.abs(wrap(des-H))<1?1:.3);if(d<1&&arrived!=tgt&&V<.3)arrive(tgt)}
  else{V+=((keys.w?.03:0)-(keys.s?.04:0))*k;V*=Math.pow(.985,k);H+=((keys.d?1:0)-(keys.a?1:0))*.035*Math.max(-1,Math.min(1,V*1.5))*k;
   let best=-1,bd=1e9;Z.forEach((z,i)=>{const d=Math.hypot(X,Z0+i*GAP);if(d<bd){bd=d;best=i}});if(bd<22&&arrived!=best)arrive(best);if(bd>34&&arrived>=0){arrived=-1;$('#panel').classList.add('off')}}
  X+=Math.sin(H)*V*k;Z0-=Math.cos(H)*V*k;X=Math.max(-40,Math.min(40,X));Z0=Math.max(-(N-1)*GAP-60,Math.min(60,Z0))}
 const mv=Math.abs(V)>.05;car.position.set(X,Math.sin(t*14)*(mv?.04:.01),Z0);car.rotation.y=-H;car.rotation.z=-wrap(0)*0;wh.forEach(w=>w.rotation.x+=V*.4*k);
 const ud=bot.userData;ud.eyes.forEach(e=>e.scale.y=(t%4>3.85)?.1:1.35);ud.ball.scale.setScalar(speaking?1.5+Math.sin(t*20)*.4:1);bot.position.y=1.45+Math.sin(t*3)*.04;bot.rotation.z=speaking?Math.sin(t*9)*.1:0;
 spinners.forEach(s=>s[0].rotation.y+=s[1]*k);bobs.forEach(b=>b[0].position.y=b[1]+Math.sin(t*2+b[1])*.6);
 const pa=pg.attributes.position.array;for(let i=0;i<pn;i++){pa[i*3+1]-=.04*k;pa[i*3]+=Math.sin(t+i)*.01;if(pa[i*3+1]<0)pa[i*3+1]=30}petals.position.set(X,0,Z0-10);pg.attributes.position.needsUpdate=true;
 moon.position.set(-150,130,Z0-350);sky.position.z=Z0;stars.position.z=Z0;
 idle+=k;if(spin)off+=.012*k;else if(!drag&&idle>240)off*=.97;
 const a=H+off,cd=dist,tx=X-Math.sin(a)*cd*Math.cos(pitch),ty=1.5+cd*Math.sin(pitch)+1,tz2=Z0+Math.cos(a)*cd*Math.cos(pitch);
 CX+=(tx-CX)*.08*k;CY+=(ty-CY)*.08*k;CZ+=(tz2-CZ)*.08*k;C.position.set(CX,CY,CZ);C.lookAt(X,2.2,Z0);R.render(S,C)})(last);
