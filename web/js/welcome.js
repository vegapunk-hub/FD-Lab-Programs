const q=s=>document.querySelector(s),st={t:'Mr',g:'m'};
const R=new THREE.WebGLRenderer({canvas:q('#c'),antialias:true,alpha:true}),S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.set(0,2,9);
S.add(new THREE.HemisphereLight(0xffffff,0x6a2fa0,1.1));const dl=new THREE.DirectionalLight(0xff9ad5,1.2);dl.position.set(4,6,5);S.add(dl);
let bot;const holder=new THREE.Group();S.add(holder);
function setBot(g){if(bot)holder.remove(bot);bot=makeRobot(g);bot.scale.setScalar(1.5);bot.position.y=-2;holder.add(bot)}setBot('m');
const rings=[2.6,3.3].map((r,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.025,8,80),new THREE.MeshBasicMaterial({color:i?0xff6fb1:0x7dfcff}));t.rotation.x=1.2;holder.add(t);return t});
const pg=new THREE.BufferGeometry(),pp=[];for(let i=0;i<500;i++)pp.push((Math.random()-.5)*30,(Math.random()-.5)*20,(Math.random()-.5)*20-4);
pg.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffc2e2,size:.09}));S.add(pts);
function rs(){R.setSize(innerWidth,innerHeight);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();holder.position.x=innerWidth>800?-3.2:0;holder.position.y=innerWidth>800?0:2.6}addEventListener('resize',rs);rs();
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
let t=0;(function L(){requestAnimationFrame(L);t+=.016;const b=bot;holder.rotation.y+=(mx*1.2-holder.rotation.y)*.06;holder.rotation.x+=(my*.4-holder.rotation.x)*.06;
 b.position.y=-2+Math.sin(t*2)*.12;b.userData.eyes.forEach(e=>e.scale.y=(t%4>3.85)?.1:1.35);b.userData.ball.scale.setScalar(1+Math.sin(t*6)*.3);
 rings[0].rotation.z=t;rings[1].rotation.z=-t*.7;pts.rotation.y=t*.02;R.render(S,C)})();
const msg="Hello, traveller! I am your AI guide. Who are you?";let i=0;(function ty(){q('#hello').textContent=msg.slice(0,i++);if(i<=msg.length)setTimeout(ty,38)})();
document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{st[b.dataset.k]=b.dataset.v;document.querySelectorAll(`[data-k=${b.dataset.k}]`).forEach(x=>x.classList.toggle('on',x===b));if(b.dataset.k==='g')setBot(b.dataset.v)});
q('#go').onclick=()=>{const n=q('#name').value.trim();if(!n){q('#name').focus();q('#hello').textContent='I need a name to greet you!';return}
 sessionStorage.setItem('p',JSON.stringify({n,t:st.t,g:st.g,l:q('#lang').value}));location.href='city.html'};
