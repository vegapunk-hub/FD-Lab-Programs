// Each item: [question, code, [correct, wrong, wrong, wrong], explanation]. Options are shuffled at runtime.
const L1=[
["What is React?","",["A JavaScript library for building user interfaces","A full-stack framework with routing and database","A CSS preprocessor","A web server"],"React handles the UI layer only. Routing, databases and servers need other tools, so it is a library, not a framework."],
["Who created React?","",["Facebook (Meta)","Google","Microsoft","Twitter"],"React was created by Facebook (Meta) and is now open source."],
["A React component is best defined as:","",["A reusable, self-contained piece of UI","A CSS rule set","A database record","A browser extension"],"A component has its own structure, appearance and behaviour, and can be reused many times."],
["CDN stands for:","",["Content Delivery Network","Central Data Node","Compiled DOM Notation","Code Distribution Network"],"A CDN is a network of servers worldwide that delivers library files quickly through a simple script tag."],
["Which CDN script converts JSX into plain JavaScript?","",["babel.min.js","react.development.js","react-dom.development.js","cdn.tailwindcss.com"],"Babel is the translator: it turns JSX into React.createElement() calls the browser can run."],
["ReactDOM.createRoot(element) is used to:","",["Tell React which DOM element it will manage","Install React into the project","Compile JSX","Create a new HTML file"],"createRoot() marks the given element (usually #root) as React's container. render() then draws the app inside it."],
["Which script type makes Babel process your JSX?","",["text/babel","text/javascript","text/jsx","module"],"Babel only transforms script blocks marked type=\"text/babel\"."],
["JSX stands for:","",["JavaScript XML","Java Syntax Extension","JSON eXchange","JavaScript Extra"],"JSX is a syntax extension that lets HTML-like markup be written inside JavaScript."],
["The correct attribute to apply a CSS class in JSX is:","",["className","class","cssClass","klass"],"class is a reserved word in JavaScript, so JSX uses className."],
["Custom React component names must begin with:","",["A capital letter","A lowercase letter","An underscore","A digit"],"Capitalised tags are components; lowercase tags are treated as built-in HTML elements."],
["In React, props flow:","",["From parent to child","From child to parent","Between any two components freely","Only inside the same component"],"Data flows downward in the component tree: parent to child."],
["Props received by a child component are:","",["Read-only","Freely modifiable","Stored in the DOM","Always numbers"],"Props belong to the parent. A child must never change them."],
["useState returns:","",["The current value and a setter function","Only the current value","A new component","A Promise"],"const [value, setValue] = useState(initial) uses array destructuring to take both returned items."],
["Which line correctly updates the state variable count?","",["setCount(count + 1)","count = count + 1","count++","useState(count + 1)"],"Only the setter tells React that state changed and triggers a re-render."],
["Tailwind CSS is:","",["A utility-first CSS framework","A JavaScript runtime","A React hook","A database"],"Tailwind provides small single-purpose classes like p-4 and text-xl that you combine."],
["Which Tailwind class adds padding of 16px on all sides?","",["p-4","m-4","pad-16","px-16"],"p = padding, and 1 unit = 0.25rem (4px), so p-4 = 16px."],
["Tailwind's md: prefix applies styles at:","",["768px and above","640px and above","1024px and above","Below 768px only"],"sm = 640px, md = 768px, lg = 1024px, xl = 1280px. Prefixes are mobile-first."],
["Which command creates a package.json with default values?","",["npm init -y","npm install","npm run dev","npm uninstall"],"npm init -y generates package.json without asking questions."],
["'Consistency' as a UI principle means:","",["Same colours, fonts, spacing and behaviour across screens","A different style on every page","Using as many fonts as possible","Adding more animations"],"Consistency lets users learn once and feel comfortable everywhere."],
["Which tool quickly scaffolds a modern React project?","",["Vite","Babel standalone","Font Awesome","Bootstrap"],"npm create vite@latest gives a fast dev server and auto-reload. The React code is the same as with CDN."],
// Debug
["This component is used as <welcome /> but nothing from it appears. What is the bug?","function welcome() {\n  return <h2>Hello</h2>;\n}\nroot.render(<welcome />);",["Component name is lowercase, so React treats it as an HTML tag","Missing semicolon after return","h2 is not allowed in components","render() needs two arguments"],"Component names must be PascalCase: Welcome. Lowercase JSX tags are looked up as HTML elements."],
["This code throws 'Adjacent JSX elements must be wrapped in an enclosing tag'. What is the correct fix?","function App() {\n  return (\n    <h1>Hi</h1>\n    <p>Welcome</p>\n  );\n}",["Wrap both elements in one parent <div> or a <>...</> fragment","Add a comma between the elements","Replace <p> with <span>","Move return outside the function"],"A component can return only one root element. A Fragment adds no extra DOM node."],
["Which change makes this line follow JSX rules?","return <div class=\"card\">Hi</div>;",["Change class to className","Change class to Class","Remove the quotes","Change div to section"],"JSX uses className because class is reserved in JavaScript."],
["Clicking the button changes nothing on screen. Why?","function Counter() {\n  let count = 0;\n  return (\n    <button onClick={() => count++}>\n      {count}\n    </button>\n  );\n}",["A plain variable change does not trigger a re-render; use useState","onClick is not valid in JSX","count should be declared with const","The button needs an id"],"Only state updates through the setter make React re-render. Use const [count, setCount] = React.useState(0)."],
["What rule does this component break?","function Card(props) {\n  props.name = \"Guest\";\n  return <h2>{props.name}</h2>;\n}",["Props are read-only and must not be modified","Props must be arrays","h2 cannot show props","Components cannot use strings"],"Mutating props breaks React's one-way data flow. Display them or copy to state instead."],
["Why does the alert fire on page load instead of on click?","<button onClick={handleClick()}>\n  Save\n</button>",["handleClick() is called during render; pass handleClick without ()","onClick needs lowercase","handleClick must be async","Button must be self-closing"],"Pass the function reference: onClick={handleClick}, or wrap it: onClick={() => handleClick()}."],
["What is wrong with this tag in JSX?","<img src=\"logo.png\">",["It is not closed; write <img src=\"logo.png\" />","src is not allowed","Needs a className","img must be capitalised"],"Every JSX tag must be closed. Tags with no children are self-closed with />."],
["Tailwind classes are written correctly but have no effect. Most likely cause?","<head>\n  <title>App</title>\n</head>\n<div className=\"p-4 bg-blue-600 text-white\">\n  Hi\n</div>",["The Tailwind CDN script tag is missing","bg-blue-600 does not exist","p-4 must be p-04","className must be class in Tailwind"],"Without <script src=\"https://cdn.tailwindcss.com\"><\/script> the utility classes are never generated."],
["The page stays blank and the console shows a syntax error at '<'. What is the fix?","<script>\n  function App() { return <h1>Hello</h1>; }\n  ReactDOM.createRoot(\n    document.getElementById(\"root\")\n  ).render(<App />);\n<\/script>",["Use <script type=\"text/babel\"> so JSX gets compiled","Rename getElementById","Replace <App /> with App","Add class to the script tag"],"Browsers cannot run JSX. Babel only processes scripts marked type=\"text/babel\"."],
["This line runs but the count never updates correctly. What is the mistake?","const [setCount, count] =\n  React.useState(0);",["The order is swapped; it must be [count, setCount]","useState needs two arguments","It should use let","Nothing is wrong"],"useState returns [value, setter]. The first name receives the value and the second the setter function."]
];
const L2=[
["Which is a real limitation of the CDN + Babel setup?","",["Babel compiles in the browser, so it is slower than a pre-built app","JSX cannot be used at all","Components cannot be reused","It works only offline"],"In-browser compilation and the need for internet make it good for learning, not production."],
["Babel converts <h2>Hi</h2> into:","",["React.createElement(\"h2\", null, \"Hi\")","document.createElement(\"h2\")","innerHTML = \"Hi\"","fetch(\"h2\")"],"JSX is syntax sugar for React.createElement() calls."],
["Which attribute name is correct for a <label>'s 'for' in JSX?","",["htmlFor","for","labelFor","forId"],"for is reserved in JavaScript. JSX uses htmlFor; also onclick becomes onClick, tabindex becomes tabIndex."],
["The main benefit of a Fragment (<> </>) is:","",["Grouping elements without adding an extra DOM node","Adding state to a component","Making fetch faster","Adding a wrapper div"],"A Fragment satisfies the one-root rule without extra markup in the HTML output."],
["Why does inline style in JSX use double braces, style={{ color: \"red\" }}?","",["Outer braces are the JSX expression, inner braces are a JS object","Double braces are required for every string","They create two components","It is Tailwind syntax"],"style takes a JavaScript object, so an object literal sits inside the JSX expression braces."],
["With isLoggedIn = false, what does <p>{isLoggedIn ? \"Welcome\" : \"Login\"}</p> render?","",["Login","Welcome","Nothing","An error"],"The ternary returns the second value when the condition is false."],
["What is passed to the child by <Card sem=\"5\" />?","",["The string \"5\"","The number 5","The boolean true","undefined"],"Quoted values are strings. To pass a number use curly braces: sem={5}."],
["In React, 'children' refers to:","",["Content placed between a component's opening and closing tags","A state variable","A CSS class","The names of child functions"],"props.children lets a component like Card wrap any content placed inside its tags."],
["Why must items rendered with map() have a key?","",["It lets React identify each item uniquely when the list changes","It controls the CSS styling","It is needed to store state","It sorts the list"],"Keys help React update lists efficiently. Prefer a stable id over the array index."],
["Which statement correctly compares props and state?","",["State is owned by the component; props are passed from the parent","Props can be changed by the child; state cannot","Both are read-only","State is passed down from the parent"],"Props are read-only inputs; state is private data the component can change with its setter."],
["Two <Counter /> components are placed on one page. What happens when one is clicked?","",["Only that component's count changes; each has its own state","Both counts change together","The page reloads","Both reset to 0"],"State is local to each component instance, so instances do not share it by default."],
["What happens when a state setter such as setCount() is called?","",["React re-renders the component with the new value","The whole page reloads","Nothing until the user refreshes","The component is deleted"],"The setter schedules a re-render, and only the affected component updates."],
["{show && <p>Details</p>} displays the paragraph when:","",["show is true","show is false","Always","Never"],"&& renders the right side only if the left side is truthy."],
["Which cannot be written directly inside JSX curly braces?","",["An if/else statement","A ternary expression","A function call","A variable name"],"Braces accept expressions only. Use a ternary or && for conditions."],
["The Tailwind class mx-auto does what?","",["Centres a block element horizontally","Sets margin to zero","Adds automatic top margin","Adds padding left and right"],"Auto left and right margins centre a block that has a limited width."],
["What does class=\"grid grid-cols-1 md:grid-cols-3\" produce?","",["1 column on mobile, 3 columns from 768px up","3 columns on mobile, 1 on tablet","Always 3 columns","Always 1 column"],"Unprefixed classes apply at all sizes; md: overrides them from 768px upward."],
["'Mobile-first' in Tailwind means:","",["Unprefixed classes apply everywhere and prefixes add changes for larger screens","Styles only work on phones","Prefixes apply to smaller screens","Desktop styles come first"],"You design the small layout first, then layer sm:, md:, lg: overrides."],
["Which statement correctly compares CDN and npm?","",["CDN suits learning; npm with Vite suits real projects with optimised builds","npm needs no installation at all","CDN is the standard for production","They are identical"],"CDN is a quick script tag; npm gives many component files and an optimised build."],
["In npm install -D tailwindcss, the -D flag means:","",["Install as a development-only dependency","Delete the package","Download without installing","Run in debug mode"],"-D saves the package under devDependencies in package.json."],
["Visual hierarchy in UI design means:","",["Guiding the eye to important content using size, weight, colour and position","Using many bright colours","Making all text the same size","Hiding navigation"],"Page title > section heading > body text > small notes."],
// Debug
["The console warns about a missing 'key'. Which fix is best?","students.map(s =>\n  <Card name={s.name} />\n)",["Add key={s.id} to <Card />","Rename map to forEach","Add key to the array","Make Card lowercase"],"Every element in a rendered list needs a unique, stable key. Use an id instead of the index when possible."],
["This code fails to compile. Why?","return (\n  <div>\n    {if (loggedIn) { <p>Hi</p> }}\n  </div>\n);",["if statements are not expressions; use a ternary or &&","The div needs a class","loggedIn must be a string","Braces are not allowed in JSX"],"Write {loggedIn && <p>Hi</p>} or {loggedIn ? <p>Hi</p> : null}."],
["What is rendered for the Next line?","<Student sem=\"5\" />\n\nfunction Student({ sem }) {\n  return <p>Next: {sem + 1}</p>;\n}",["Next: 51","Next: 6","Next: NaN","An error"],"sem=\"5\" is a string, so + concatenates. Pass sem={5} to get 6."],
["The heading renders empty. What is the cause?","<Card Title=\"Course\" />\n\nfunction Card({ title }) {\n  return <h3>{title}</h3>;\n}",["Prop names are case-sensitive: Title does not match title","h3 cannot contain a prop","Destructuring is not allowed","Card must be an arrow function"],"Title and title are different props, so title is undefined inside Card."],
["Clicking the button causes 'Too many re-renders'. Why?","const [open, setOpen] =\n  React.useState(false);\n\n<button onClick={setOpen(!open)}>\n  Toggle\n</button>",["setOpen(!open) runs during render; use onClick={() => setOpen(!open)}","useState(false) is invalid","open must be const","Button needs type attribute"],"Calling the setter in render triggers another render endlessly. Pass a function that calls it on click."],
["Clicking Add does not update the list on screen. What is wrong?","const [items, setItems] =\n  React.useState([]);\nfunction add() {\n  items.push(\"New\");\n}",["State was mutated directly; call setItems([...items, \"New\"])","push does not exist for arrays","useState cannot hold arrays","items must be declared with var"],"React only re-renders when the setter is called with a new value. Never modify state directly."],
["Intent: 1 column on mobile, 3 on desktop. What is the problem?","<div className=\"grid grid-cols-3\n  md:grid-cols-1\">",["The values are reversed; use grid-cols-1 md:grid-cols-3","gap-4 is missing","grid is not a Tailwind class","md: only works with flex"],"Tailwind is mobile-first: the base class is for small screens and md: overrides from 768px upward."],
["<p>BCA</p> inside <Card> never appears. Why?","function Card({ title }) {\n  return <div><h3>{title}</h3></div>;\n}\n\n<Card title=\"Course\">\n  <p>BCA</p>\n</Card>",["Card never renders {children}","<p> is not allowed inside Card","title is the wrong prop name","Card needs a key"],"Content between the tags arrives as children. The component must output {children} to display it."],
["The app does not render and the console says the target container is not a DOM element. Fix?","<div id=\"root\"></div>\n...\nReactDOM.createRoot(\n  document.getElementById(\"app\")\n).render(<App />);",["Use getElementById(\"root\") to match the div's id","Replace render with display","Rename App to app","Add a second root div"],"getElementById(\"app\") returns null because the div's id is root. The ids must match."],
["The button shows [object Object] instead of 'Save'. What is the bug?","function Btn(label) {\n  return <button>{label}</button>;\n}\n\n<Btn label=\"Save\" />",["The component receives the props object; use { label } or props.label","label is a reserved word","button cannot display text","Btn must be lowercase"],"A component's first parameter is the whole props object. Destructure it: function Btn({ label })."]
];
const D={1:{n:"Level 1",t:"Foundation",d:L1,pts:["React, CDN, Babel, root element","JSX rules and basic components","Props and useState basics","Tailwind basics and npm commands"]},2:{n:"Level 2",t:"Advanced",d:L2,pts:["Output prediction and tricky behaviour","children, keys, conditional rendering","State vs props, re-render logic","Responsive Tailwind, CDN vs npm, UI design"]}};
const $=s=>document.querySelector(s),app=$("#app"),LB="ABCD";
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
let S=null;
$("#theme").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};

function home(){
  S=null;
  app.innerHTML=`<p class="sans" style="margin:0;color:var(--mut)">Choose a level. Each level has 30 questions: 20 multiple-choice and 10 code-debugging. Options are shuffled every attempt.</p>
  <div class="levels">${[1,2].map(l=>`<div class="lv"><span class="tag">${D[l].n}</span><h2>${D[l].t}</h2><div class="sans">30 Questions</div>
  <ul>${D[l].pts.map(p=>`<li>${p}</li>`).join("")}</ul><div class="sans" style="font-size:.85rem">Section A · 20 MCQ &nbsp;|&nbsp; Section B · 10 Code Debug</div>
  <button class="btn" onclick="start(${l})">Start ${D[l].n}</button></div>`).join("")}</div>
  <div class="topics"><b class="sans" style="color:var(--fg)">Syllabus covered:</b> Introduction to React via CDN · components · props · basic state (useState) · reusable UI components · Tailwind CSS for rapid UI design · basic UI principles and consistency · CDN and simple package tools (npm, Vite).</div>`;
}
function start(l){
  const qs=D[l].d.map(([q,code,o,e])=>{const ix=[0,1,2,3];for(let i=3;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ix[i],ix[j]]=[ix[j],ix[i]]}return{q,code,o:ix.map(i=>o[i]),a:ix.indexOf(0),e}});
  S={l,qs,p:Array(qs.length).fill(null),i:0,done:false,warn:false};quiz();
}
function quiz(){
  const q=S.qs[S.i],p=S.p[S.i],lock=p!==null||S.done,sec=S.i<20?"Section A · Multiple Choice":"Section B · Code Debug";
  const ans=S.p.filter(x=>x!==null).length,last=S.i===S.qs.length-1;
  app.innerHTML=`<div class="bar"><span>${D[S.l].n} · ${D[S.l].t}${S.done?" · Review":""}</span><span>Answered ${ans} / ${S.qs.length}</span></div>
  <div class="prog"><i style="width:${ans/S.qs.length*100}%"></i></div>
  <div class="pal">${S.qs.map((x,k)=>{const v=S.p[k];return`<button class="${k===S.i?"cur ":""}${v===null?"":v===x.a?"ok":"no"}" onclick="go(${k})">${k+1}</button>`}).join("")}</div>
  <div class="card"><div class="sec">Question ${S.i+1} of ${S.qs.length} · ${sec}</div><p class="qt">${esc(q.q)}</p>
  ${q.code?`<pre>${esc(q.code)}</pre>`:""}
  ${q.o.map((o,k)=>{const c=lock?(k===q.a?"ok":k===p?"no":""):"";return`<button class="opt ${lock?"lock ":""}${c}" ${lock?"":`onclick="pick(${k})"`}><b>${LB[k]}.</b><span>${esc(o)}</span><em>${lock?(k===q.a?"✓ Correct":k===p?"✗ Your answer":""):""}</em></button>`}).join("")}
  ${lock?`<div class="exp"><b>${p===null?"Not answered. ":p===q.a?"Correct. ":"Incorrect. "}</b>${esc(q.e)}</div>`:""}</div>
  <div class="nav"><button class="btn alt" ${S.i?"":"disabled"} onclick="go(S.i-1)">← Previous</button>
  <span style="display:flex;gap:10px;flex-wrap:wrap">${S.done?`<button class="btn alt" onclick="result()">Back to Result</button>`:`<button class="btn alt" onclick="fin()">${S.warn?`${S.qs.length-ans} unanswered · click again to finish`:"Finish Test"}</button>`}
  <button class="btn" onclick="${last?(S.done?"result()":"fin(1)"):"go(S.i+1)"}">${last?"Finish":"Next →"}</button></span></div>`;
}
function go(k){if(k<0||k>=S.qs.length)return;S.i=k;S.warn=false;quiz()}
function pick(k){if(S.p[S.i]!==null)return;S.p[S.i]=k;S.warn=false;quiz()}
function fin(force){const un=S.p.filter(x=>x===null).length;if(un&&!S.warn&&!force){S.warn=true;quiz();return}S.done=true;result()}
function result(){
  const c=(a,b)=>S.qs.slice(a,b).filter((x,k)=>S.p[a+k]===x.a).length,A=c(0,20),B=c(20,30),T=A+B,pc=Math.round(T/30*100);
  const g=pc>=85?"Excellent — exam ready":pc>=70?"Good — revise the missed topics":pc>=50?"Pass — more practice needed":"Needs revision — re-read the unit notes";
  const miss=S.qs.map((x,k)=>S.p[k]!==x.a?k:-1).filter(k=>k>=0),sk=S.p.filter(x=>x===null).length;
  app.innerHTML=`<div class="card"><div class="sec">${D[S.l].n} · ${D[S.l].t} · Result</div><div class="score">${T} / 30</div>
  <div class="sans"><b>${pc}%</b> — ${g}</div>
  <div class="rg"><div><b>${A} / 20</b>Section A · MCQ</div><div><b>${B} / 10</b>Section B · Code Debug</div><div><b>${sk}</b>Unanswered</div></div>
  <div class="miss"><div class="sec">${miss.length?"Review incorrect / skipped questions":"Perfect score — nothing to review"}</div>${miss.map(k=>`<button onclick="S.done=true;go(${k})">Q${k+1}</button>`).join("")}</div>
  <div class="nav" style="justify-content:flex-start"><button class="btn" onclick="start(${S.l})">Retry ${D[S.l].n}</button><button class="btn alt" onclick="S.done=true;go(0)">Review All</button><button class="btn alt" onclick="home()">Home</button></div></div>`;
}
document.addEventListener("keydown",e=>{if(!S||S.done&&!$(".card .opt"))return;if(e.key==="ArrowRight")go(S.i+1);else if(e.key==="ArrowLeft")go(S.i-1);else{const k="abcd1234".indexOf(e.key.toLowerCase());if(k>=0&&$(".opt"))pick(k%4)}});
home();
