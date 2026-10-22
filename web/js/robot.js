const gm=new THREE.DataTexture(new Uint8Array([90,170,255]),3,1,THREE.LuminanceFormat);gm.minFilter=gm.magFilter=THREE.NearestFilter;gm.needsUpdate=true;
function T(g,c,e,s){const m=new THREE.Mesh(g,new THREE.MeshToonMaterial({color:c,emissive:e||0,gradientMap:gm}));
 if(s!==0){const o=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0x160a2a,side:THREE.BackSide}));o.scale.setScalar(s||1.05);m.add(o)}return m}
function makeRobot(gen){const f=gen=='f',c=f?0xff7ab8:0x4cc9ff,G=new THREE.Group();
 const head=T(new THREE.SphereGeometry(.9,32,24),0xf6f2ff);head.scale.set(1.12,.95,1);head.position.y=1.9;
 const vis=T(new THREE.SphereGeometry(.72,24,16),0x1a1040,0,0);vis.scale.set(1.1,.78,.5);vis.position.set(0,1.9,.62);
 const eyes=[-.3,.3].map(x=>{const e=T(new THREE.SphereGeometry(.15,16,12),0x7dfcff,0x7dfcff,0);e.scale.set(1,1.35,.4);e.position.set(x,1.95,.93);return e});
 const ch=[-.52,.52].map(x=>{const e=T(new THREE.SphereGeometry(.1,10,8),0xff8fb8,0xff6fa0,0);e.scale.set(1.3,.7,.3);e.position.set(x,1.72,.88);return e});
 const ears=[-1,1].map(s=>{const e=T(new THREE.CylinderGeometry(.28,.28,.2,16),c);e.rotation.z=Math.PI/2;e.position.set(s*1.03,1.9,0);return e});
 const ant=T(new THREE.CylinderGeometry(.04,.04,.45),0xffffff,0,0);ant.position.y=2.95;
 const ball=T(new THREE.SphereGeometry(.15,12,10),0xffd36b,0xffb300,0);ball.position.y=3.25;
 const body=T(new THREE.SphereGeometry(.62,20,16),c);body.position.y=.75;body.scale.y=.9;
 const core=T(new THREE.SphereGeometry(.14,10,8),0xffffff,0x7dfcff,0);core.position.set(0,.8,.58);
 G.add(head,vis,...eyes,...ch,...ears,ant,ball,body,core);
 if(f){[-1,1].forEach(s=>{const b=T(new THREE.ConeGeometry(.3,.55,10),0xff4f9a);b.rotation.z=-s*Math.PI/2;b.position.set(s*.55,2.65,.2);G.add(b)});const k=T(new THREE.SphereGeometry(.13,8,8),0xff4f9a,0,0);k.position.set(0,2.65,.2);G.add(k)}
 G.userData={eyes,ball,head};return G}
