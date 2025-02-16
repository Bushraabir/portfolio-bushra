import{c as ve,a as xe,r as z,j as r,m as U}from"./index-716e0fc5.js";import{g as M}from"./index-794e919d.js";import{G as R,k as be,q as ye,r as K,s as _,t as J,u as we,v as je,w as Q,i as Se,x as ze}from"./index-6c7b3069.js";import{a as W,c as ke,d as Ce,e as Me,f as Z,g as Pe,h as ee,i as te,j as Le,k as Ne}from"./index-ed983f36.js";var re={exports:{}};(function(g,w){(function(p,k){g.exports=k()})(ve,function(){var p=document,k=p.createTextNode.bind(p);function b(e,t,n){e.style.setProperty(t,n)}function o(e,t){return e.appendChild(t)}function m(e,t,n,i){var a=p.createElement("span");return t&&(a.className=t),n&&(!i&&a.setAttribute("data-"+t,n),a.textContent=n),e&&o(e,a)||a}function j(e,t){return e.getAttribute("data-"+t)}function y(e,t){return!e||e.length==0?[]:e.nodeName?[e]:[].slice.call(e[0].nodeName?e:(t||p).querySelectorAll(e))}function C(e){for(var t=[];e--;)t[e]=[];return t}function l(e,t){e&&e.some(t)}function E(e){return function(t){return e[t]}}function F(e,t,n){var i="--"+t,a=i+"-index";l(n,function(c,d){Array.isArray(c)?l(c,function(f){b(f,a,d)}):b(c,a,d)}),b(e,i+"-total",n.length)}var P={};function v(e,t,n){var i=n.indexOf(e);if(i==-1){n.unshift(e);var a=P[e];if(!a)throw new Error("plugin not loaded: "+e);l(a.depends,function(d){v(d,e,n)})}else{var c=n.indexOf(t);n.splice(i,1),n.splice(c,0,e)}return n}function u(e,t,n,i){return{by:e,depends:t,key:n,split:i}}function x(e){return v(e,0,[]).map(E(P))}function s(e){P[e.by]=e}function A(e,t,n,i,a){e.normalize();var c=[],d=document.createDocumentFragment();i&&c.push(e.previousSibling);var f=[];return y(e.childNodes).some(function(h){if(h.tagName&&!h.hasChildNodes()){f.push(h);return}if(h.childNodes&&h.childNodes.length){f.push(h),c.push.apply(c,A(h,t,n,i,a));return}var N=h.wholeText||"",H=N.trim();if(H.length){N[0]===" "&&f.push(k(" "));var he=n===""&&typeof Intl.Segmenter=="function";l(he?Array.from(new Intl.Segmenter().segment(H)).map(function(O){return O.segment}):H.split(n),function(O,pe){pe&&a&&f.push(m(d,"whitespace"," ",a));var X=m(d,t,O);c.push(X),f.push(X)}),N[N.length-1]===" "&&f.push(k(" "))}}),l(f,function(h){o(d,h)}),e.innerHTML="",o(e,d),c}var S=0;function Y(e,t){for(var n in t)e[n]=t[n];return e}var L="words",B=u(L,S,"word",function(e){return A(e,"word",/\s+/,0,1)}),D="chars",$=u(D,[L],"char",function(e,t,n){var i=[];return l(n[L],function(a,c){i.push.apply(i,A(a,"char","",t.whitespace&&c))}),i});function G(e){e=e||{};var t=e.key;return y(e.target||"[data-splitting]").map(function(n){var i=n["🍌"];if(!e.force&&i)return i;i=n["🍌"]={el:n};var a=e.by||j(n,"splitting");(!a||a=="true")&&(a=D);var c=x(a),d=Y({},e);return l(c,function(f){if(f.split){var h=f.by,N=(t?"-"+t:"")+f.key,H=f.split(n,d,i);N&&F(n,N,H),i[h]=H,n.classList.add(h)}}),n.classList.add("splitting"),i})}function ae(e){e=e||{};var t=e.target=m();return t.innerHTML=e.content,G(e),t.outerHTML}G.html=ae,G.add=s;function V(e,t,n){var i=y(t.matching||e.children,e),a={};return l(i,function(c){var d=Math.round(c[n]);(a[d]||(a[d]=[])).push(c)}),Object.keys(a).map(Number).sort(ie).map(E(a))}function ie(e,t){return e-t}var oe=u("lines",[L],"line",function(e,t,n){return V(e,{matching:n[L]},"offsetTop")}),ce=u("items",S,"item",function(e,t){return y(t.matching||e.children,e)}),se=u("rows",S,"row",function(e,t){return V(e,t,"offsetTop")}),le=u("cols",S,"col",function(e,t){return V(e,t,"offsetLeft")}),me=u("grid",["rows","cols"]),T="layout",de=u(T,S,S,function(e,t){var n=t.rows=+(t.rows||j(e,"rows")||1),i=t.columns=+(t.columns||j(e,"columns")||1);if(t.image=t.image||j(e,"image")||e.currentSrc||e.src,t.image){var a=y("img",e)[0];t.image=a&&(a.currentSrc||a.src)}t.image&&b(e,"background-image","url("+t.image+")");for(var c=n*i,d=[],f=m(S,"cell-grid");c--;){var h=m(f,"cell");m(h,"cell-inner"),d.push(h)}return o(e,f),d}),ue=u("cellRows",[T],"row",function(e,t,n){var i=t.rows,a=C(i);return l(n[T],function(c,d,f){a[Math.floor(d/(f.length/i))].push(c)}),a}),ge=u("cellColumns",[T],"col",function(e,t,n){var i=t.columns,a=C(i);return l(n[T],function(c,d){a[d%i].push(c)}),a}),fe=u("cells",["cellRows","cellColumns"],"cell",function(e,t,n){return n[T]});return s(B),s($),s(oe),s(ce),s(se),s(le),s(me),s(de),s(ue),s(ge),s(fe),G})})(re);var Ee=re.exports;const Fe=xe(Ee);function Ae(g){return R({tag:"svg",attr:{version:"1.1",viewBox:"0 0 34 32"},child:[{tag:"path",attr:{d:"M3.556 2.845v27.071h27.53v-27.071h-27.53zM28.896 27.763h-23.151v-22.765h23.151v22.765z"},child:[]},{tag:"path",attr:{d:"M16.555 10.442c-0.693-0.599-1.726-0.939-3.173-0.939-1.433 0-3.173 0.046-3.173 0.046l-0 11.103h2.326v-3.568c0 0 0.407-0.005 0.847-0.023 1.593-0.067 2.526-0.549 3.327-1.364 0.616-0.631 0.955-1.53 0.955-2.627s-0.447-2.062-1.109-2.628zM13.32 15.115c-0.375 0.004-0.533 0.016-0.786-0.008v-3.834c0 0 0.493-0.017 0.971 0 1.198 0.044 1.833 0.89 1.833 1.921-0 1.148-0.77 1.906-2.018 1.921z"},child:[]},{tag:"path",attr:{d:"M22.205 15.455c-1.005-0.356-1.324-0.559-1.324-0.949 0-0.423 0.352-0.677 0.972-0.677 0.703 0 1.767 0.454 2.136 0.658v-1.871c-0.502-0.254-1.265-0.566-2.22-0.566-2.027 0-3.334 1.169-3.334 2.728-0.017 0.965 0.636 1.655 2.329 2.231 0.955 0.322 1.206 0.767 1.206 1.191s-0.318 0.695-1.089 0.695c-0.754 0-1.86-0.431-2.329-0.718v0 1.847c0.62 0.338 1.518 0.659 2.329 0.684 2.363 0.074 3.551-1.152 3.551-2.694-0.017-1.22-0.67-2.016-2.228-2.558z"},child:[]}]})(g)}function ne(g){return R({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M222.25 51.813c-59.778.797-102.472 36.19-97.47 91.593-175.105 173.99-42.24 388.292 82.72 301.281 234.398 24.897 320.07-138.203 253.688-215.875-68.157-127.71-166.197-177.97-238.938-177zm35.28 54c59.782-.537 138.234 35.254 194.314 113.593-32.668-28.783-91.096-41.137-175.594-17.906 233.673-4.713 159.012 242.056-65.813 241.094 23.605-17.352 46.84-45.562 67.563-86.97-141.047 157.87-264.124-48.664-152.094-203.78 6.14 35.83 31.486 79.165 83.5 126.5-75.762-109.73-29.625-171.834 48.125-172.53zm20.314 112.03c-28.427-.322-54.126 19.32-60.375 48.188-7.143 32.992 13.82 65.547 46.81 72.69 32.992 7.14 65.516-13.823 72.658-46.814 7.14-32.99-13.822-65.545-46.813-72.687-4.124-.894-8.22-1.33-12.28-1.376z"},child:[]}]})(g)}function Te(g){return R({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M25 25v206h110v-3.3L99.27 192 135 156.3V25H25zm398 94c-16.5 0-31.3 3.4-41.2 8.4-10 5-13.8 10.6-13.8 14.6s3.8 9.6 13.8 14.6c9.9 5 24.7 8.4 41.2 8.4 16.5 0 31.3-3.4 41.2-8.4 10-5 13.8-10.6 13.8-14.6s-3.8-9.6-13.8-14.6c-9.9-5-24.7-8.4-41.2-8.4zm-263 37.7L124.7 192l64 64-64 64 35.3 35.3 76.3-76.3H329v37.8l72.9-60.8-72.9-60.8V233h-92.7L160 156.7zm208 12.8v34.8l62.1 51.7-62.1 51.7V366c0 8 4.8 13.8 15 18.9 10.2 5.2 25.1 8.1 40 8.1 14.9 0 29.8-2.9 40-8.1 10.2-5.1 15-10.9 15-18.9V169.5c-1.8 1.1-3.7 2.2-5.7 3.2-13.2 6.6-30.4 10.3-49.3 10.3s-36.1-3.7-49.3-10.3c-2-1-3.9-2.1-5.7-3.2zM80 361c-30.48 0-55 24.5-55 55s24.52 55 55 55c30.5 0 55-24.5 55-55s-24.5-55-55-55z"},child:[]}]})(g)}function I(g){return R({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M54.438 29.794a23.808 23.808 0 0 0-1.204.01c-4.688.157-7.914 1.736-10.113 3.935-2.932 2.932-4.761 7.689-3.588 15.305 1.174 7.616 5.683 17.754 15.272 28.941 67.894 79.21 132.935 155.56 183.703 211.969 12.273 13.637 23.693 26.08 34.125 37.135 12.095-31.902 34.57-54.144 62.902-64.715-10.825-10.199-22.936-21.313-36.197-33.248C242.93 178.358 166.578 113.314 87.369 45.42c-11.186-9.589-21.325-14.098-28.941-15.272a29.555 29.555 0 0 0-3.99-.355zm295.783 246.64c-30.461 7.627-53.241 29.185-63.608 65.219 5.652 5.785 10.956 11.085 15.78 15.707 7.58 7.264 14.095 13.007 19.21 16.957 1.776-17.225 10.045-33.062 21.645-44.691 10.601-10.628 24.496-18.006 39.125-19.092-3.871-4.836-9.14-10.751-15.63-17.524-4.838-5.047-10.415-10.623-16.522-16.576zm35.351 51.95c-10.397.137-20.929 5.28-29.582 13.955-11.537 11.565-18.674 28.85-16.267 45.7 5.334 37.342 23.749 65.81 49.46 81.237 22.727 13.636 51.452 17.35 83.643 6.983-24.222-4.01-46.475-30.706-48.197-50.65 10.63 12.814 23.94 24.547 38.426 31.75-9.881-22.578-9.201-45.452-11.088-64.321-1.352-13.522-3.891-24.982-11.377-35.162-7.486-10.18-20.423-19.8-44.74-27.907a31.062 31.062 0 0 0-10.278-1.585z"},child:[]}]})(g)}function He(g){return R({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M390.5 16h-2.2c-9.6.3-18 3.69-25.1 10.87l-30.3 30.31c3.8 4.41 7.1 9.12 9.4 13.97 1.6 3.37 2.7 6.85 2.9 10.8.2 3.96-1 8.8-4.4 12.16l-16.2 16.19 77 77.1 16.2-16.2c3.3-3.4 8.2-4.6 12.2-4.4 3.9.2 7.4 1.3 10.8 2.9 4.8 2.3 9.6 5.6 13.9 9.4l30.3-30.3c11.5-11.5 13.3-26.1 8.4-43.8-5.1-17.58-17.6-36.95-33.5-52.89-16-15.93-35.3-28.44-52.9-33.46-5.9-1.65-11.2-2.57-16.5-2.65zm-92.4 37.16l-54.5 54.54c0 .6.3 2.1 1.1 4.1 1.7 4 5.5 9.7 10 14.3 4.4 4.8 9.7 8.8 13.5 10.4 1.8.9 3.3 1.1 3.8 1.1h.1l55.2-55.22c-.1-.58-.3-1.79-1.2-3.56-1.8-3.9-5.8-9.33-10.5-13.99-4.6-4.66-10.1-8.68-14-10.52-1.7-.84-2.9-1.05-3.5-1.15zm14 69.74l-15.3 15.3 15 29.9-4.7 4.6c-3.5 3.5-5.7 9.6-5.7 16.1 0 6.4 2.2 12.5 5.7 16h.1v.1c3.5 3.5 9.6 5.7 16 5.7 6.5 0 12.6-2.2 16.1-5.7l4.6-4.7 29.9 15 15.2-15.4zm-65.3 20.5L143.3 246.8c3.9 4.5 7.3 9.1 9.5 14.2 1.5 3.5 2.7 7.3 2.6 11.5-.2 3.7-1.5 7.7-4.1 11l13.9 6.9c6.9-4.6 15.3-6.9 23.5-6.9 10.4 0 21 3.3 28.7 11.1 7.8 7.7 11 18.3 11 28.7 0 8.2-2.2 16.4-6.8 23.4l6.9 13.9c3.3-2.5 7.4-3.5 10.7-3.4 4 .1 7.6 1.1 11 2.6 5.1 2.1 10.1 5.3 14.8 9.1L368.8 265c-3.7-4.6-6.9-9.7-9.1-14.7-1.5-3.5-2.5-7.1-2.6-11-.1-3.4.9-7.4 3.4-10.7l-13.8-7c-6.9 4.7-15.2 6.9-23.5 6.9-10.4 0-21-3.3-28.7-11-7.7-7.7-11-18.3-11-28.7 0-8.3 2.2-16.6 6.9-23.5l-7-13.9c-3.2 2.6-7.2 3.9-10.9 4.1-4.2.1-8-1.1-11.6-2.6-5-2.3-9.7-5.7-14.1-9.5zm182.8 41.3l-54.5 54.6c0 .6.2 2.1 1.1 3.9 1.6 4.1 5.5 9.8 10 14.4 4.4 4.8 9.8 8.7 13.5 10.4 1.9.8 3.3 1.1 3.8 1h.2l55.1-55.1c-.1-.6-.3-1.8-1.2-3.5-1.8-3.9-5.8-9.4-10.5-14-4.7-4.7-10.1-8.7-14-10.5-1.8-.9-2.9-1.1-3.5-1.2zM403.7 269l-.1.1c0 .1.3 0 .1-.1zm-296.1-25.5l-54.43 54.6c.1.6.31 1.8 1.15 3.6 1.85 3.9 5.86 9.3 10.53 14 4.65 4.6 10.08 8.7 13.99 10.5 1.76.9 2.98 1.1 3.55 1.2l55.21-55.2v-.1c0-.5-.2-2-1.1-3.9-1.7-3.8-5.7-9-10.4-13.5-4.7-4.4-10.3-8.3-14.4-10-2-.9-3.5-1.1-4.1-1.2zm30.6 53.3l-15.4 15.3 77 77 15.4-15.3-15-29.9 4.6-4.5c3.5-3.5 5.8-9.8 5.8-16.1 0-6.4-2.3-12.6-5.8-16h-.1v-.1c-3.4-3.5-9.6-5.9-16-5.9s-12.6 2.4-16.1 5.9l-4.5 4.6zm-28 28l-16.04 16c-3.35 3.3-8.2 4.6-12.15 4.5-3.96-.2-7.43-1.4-10.8-3-4.87-2.3-9.57-5.5-13.99-9.4L26.9 363.2c-11.48 11.5-13.27 26.2-8.23 43.8 5.02 17.7 17.52 37 33.45 52.9 15.95 16 35.32 28.5 52.88 33.5 17.6 5 32.3 3.2 43.8-8.3l30.3-30.3c-3.9-4.4-7.1-9.1-9.4-14-1.6-3.4-2.8-6.8-3-10.8-.2-4 1.1-8.8 4.5-12.2l16-16zm129 50.3l-54.6 54.5c.1.6.3 1.8 1.2 3.6 1.8 3.8 5.9 9.3 10.5 14 4.7 4.6 10.1 8.7 14 10.5 1.8.8 3 1 3.6 1.1l55.1-55v-.2c0-.5-.2-1.9-1-3.8-1.7-3.8-5.7-9.1-10.4-13.6-4.7-4.4-10.3-8.3-14.4-10-1.9-.9-3.4-1.1-4-1.1zm29.8 28.7c0 .2.1-.1 0-.1z"},child:[]}]})(g)}const Re="/portfolio-bushra/assets/skill-9f96d57a.png",q=[{category:"Physics & Mathematics",items:[{name:"Physics",icon:r.jsx(ne,{})},{name:"Mathematics",icon:r.jsx(be,{})}]},{category:"Programming",items:[{name:"C",icon:r.jsx(W,{})},{name:"C++",icon:r.jsx(W,{})},{name:"Python",icon:r.jsx(ye,{})}]},{category:"Frontend",items:[{name:"React.js",icon:r.jsx(K,{})},{name:"Three.js",icon:r.jsx(ke,{})},{name:"GSAP",icon:r.jsx(Ce,{})},{name:"Framer Motion",icon:r.jsx(Me,{})}]},{category:"HTML & CSS",items:[{name:"HTML",icon:r.jsx(Z,{})},{name:"CSS",icon:r.jsx(Pe,{})}]},{category:"Backend",items:[{name:"Firebase",icon:r.jsx(ee,{})}]},{category:"Tools",items:[{name:"Vite",icon:r.jsx(te,{})}]},{category:"3D Modeling & Design",items:[{name:"Blender",icon:r.jsx(_,{})},{name:"Illustrator",icon:r.jsx(Le,{})},{name:"Photoshop",icon:r.jsx(Ae,{})},{name:"Krita",icon:r.jsx(Ne,{})}]},{category:"Art & Craft",items:[{name:"Acrylic Painting",icon:r.jsx(I,{})},{name:"Sketching",icon:r.jsx(I,{})},{name:"Sculpting",icon:r.jsx(I,{})},{name:"Crafting",icon:r.jsx(Te,{})}]},{category:"Other Interests",items:[{name:"Guitar",icon:r.jsx(J,{})},{name:"Skating",icon:r.jsx(He,{})},{name:"Swimming",icon:r.jsx(we,{})}]},{category:"Soft Skills",items:[{name:"Problem Solving",icon:r.jsx(je,{})},{name:"Teamwork",icon:r.jsx(Q,{})},{name:"Leadership",icon:r.jsx(Se,{})},{name:"Communication",icon:r.jsx(ze,{})}]}],Ye=["All",...q.map(g=>g.category)],De={"Physics & Mathematics":r.jsx(ne,{}),Programming:r.jsx(W,{}),Frontend:r.jsx(K,{}),"HTML & CSS":r.jsx(Z,{}),Backend:r.jsx(ee,{}),Tools:r.jsx(te,{}),"3D Modeling & Design":r.jsx(_,{}),"Art & Craft":r.jsx(I,{}),"Other Interests":r.jsx(J,{}),"Soft Skills":r.jsx(Q,{})},Ge=({skillCategory:g})=>{const w=z.useRef(null),p=z.useRef(null),[k,b]=z.useState(!1),[o,m]=z.useState(!1);z.useEffect(()=>{window.matchMedia("(hover: none)").matches&&m(!0)},[]),z.useEffect(()=>{if(p.current){Fe({target:p.current,by:"chars"});const l=p.current.querySelectorAll(".char");M.from(l,{duration:.8,opacity:0,y:30,ease:"power4.out",stagger:.05})}},[]),z.useEffect(()=>{k?M.to(w.current,{duration:.6,rotationY:180,scale:1.2,ease:"power3.out"}):M.to(w.current,{duration:.6,rotationY:0,scale:1,ease:"power3.out"})},[k]);const j=()=>{M.to(w.current,{duration:.6,rotationY:180,scale:1.05,ease:"power3.out"})},y=()=>{M.to(w.current,{duration:.6,rotationY:0,scale:1,ease:"power3.out"})},C=()=>{b(l=>!l)};return r.jsx(U.div,{className:"flip-card",initial:{opacity:0,y:50,rotateY:10},whileInView:{opacity:1,y:0,rotateY:0},transition:{duration:.6,ease:"easeOut"},viewport:{once:!0},...o?{onClick:C}:{onMouseEnter:j,onMouseLeave:y},children:r.jsxs("div",{className:"flip-card-inner",ref:w,children:[r.jsx("div",{className:"flip-card-front",ref:p,children:r.jsx("div",{className:"category-icon",children:De[g.category]})}),r.jsx("div",{className:"flip-card-back",children:r.jsx("div",{className:"card-items",children:g.items.map((l,E)=>r.jsxs(U.div,{className:"card-item-inner",whileHover:{scale:1.3,rotate:3},transition:{type:"spring",stiffness:300,damping:15},children:[r.jsx("span",{className:"icon",children:l.icon}),r.jsx("p",{children:l.name})]},E))})})]})})},Oe=()=>{const g=z.useRef(null),[w,p]=z.useState("All"),k=w==="All"?q:q.filter(o=>o.category===w),b=Re;return z.useEffect(()=>{const o=g.current,m=o.querySelector(".section-magnifying-glass");m.style.background=`url(${b}) no-repeat center center`;let j=0,y=0;const C=new Image;C.src=b,C.onload=()=>{j=C.naturalWidth,y=C.naturalHeight};const l=3.5,E=(v,u,x)=>{const s=m.offsetWidth,A=m.offsetHeight,S=j?j*l:x.width*l,Y=y?y*l:x.height*l;m.style.backgroundSize=`${S}px ${Y}px`;const L=v/x.width,B=u/x.height,D=-(L*S)+s/2,$=-(B*Y)+A/2;M.to(m,{duration:.3,overwrite:"auto",left:`${v-s/2}px`,top:`${u-A/2}px`,backgroundPosition:`${D}px ${$}px`,ease:"power3.out"})},F=v=>{let u,x;const s=o.getBoundingClientRect();v.type==="pointermove"?(u=v.clientX-s.left,x=v.clientY-s.top):v.type==="touchmove"&&(u=v.touches[0].clientX-s.left,x=v.touches[0].clientY-s.top),u>=0&&x>=0&&u<=s.width&&x<=s.height?(M.to(m,{duration:.3,overwrite:"auto",opacity:1,ease:"power3.out"}),E(u,x,s)):M.to(m,{duration:.3,overwrite:"auto",opacity:0,ease:"power3.out"})},P=()=>{M.to(m,{duration:.3,overwrite:"auto",opacity:0,ease:"power3.out"})};return o.addEventListener("pointermove",F),o.addEventListener("pointerleave",P),o.addEventListener("touchmove",F),o.addEventListener("touchend",P),()=>{o.removeEventListener("pointermove",F),o.removeEventListener("pointerleave",P),o.removeEventListener("touchmove",F),o.removeEventListener("touchend",P)}},[b]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        :root {
          --primary-color: #fbf8cc;
          --secondary-color: #fde4cf;
          --accent-color: #2a1b3d;
          --dark-teal: #1d3557;
          --border-color: rgba(255, 255, 255, 0.3);
          --overlay-bg: rgba(0, 0, 0, 0.6);
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          width: 100%;
          height: 100%;
          font-family: 'Playfair Display', serif;
          background-color: var(--accent-color);
        }
        .skill-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(29,53,87,0.9), rgba(29,53,87,0.7)), url(${b}) center/cover no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 2rem;
          overflow: hidden;
          color: var(--secondary-color);
        }
        .section-magnifying-glass {
          position: absolute;
          height: 240px;
          width: 240px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 0 30px rgba(0,0,0,0.7);
          border: 2px solid var(--primary-color);
        }
        .content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
          max-width: 1200px;
        }
        .content h1 {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          color: var(--primary-color);
          text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
        }
        .btn-group {
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .btn-group button {
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          font-size: 1rem;
          font-weight: 600;
          border: 2px solid var(--primary-color);
          background: transparent;
          color: var(--primary-color);
          cursor: pointer;
          transition: background 0.3s, color 0.3s, transform 0.3s;
        }
        .btn-group button.active,
        .btn-group button:hover {
          background: var(--primary-color);
          color: var(--accent-color);
          transform: translateY(-3px);
        }
        .grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          width: 100%;
          margin: 2rem auto 0;
        }
        .flip-card {
          perspective: 1500px;
          width: 100%;
          max-width: 280px;
          height: 320px;
          margin: 0 auto;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .flip-card-front {
          background: linear-gradient(135deg, var(--overlay-bg), rgba(0,0,0,0.15));
          border: 2px solid var(--border-color);
        }
        .flip-card-back {
          background: linear-gradient(135deg, rgba(0,0,0,0.25), rgba(0,0,0,0.1));
          border: 2px solid var(--border-color);
          transform: rotateY(180deg);
          overflow: hidden;
        }
        .category-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          color: var(--primary-color);
          transition: transform 0.3s ease;
        }
        .flip-card:hover .category-icon {
          transform: scale(1.1);
        }
        .card-items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          width: 100%;
          justify-items: center;
          align-items: center;
        }
        .card-item-inner {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
          border-radius: 0.75rem;
          padding: 0.8rem;
          text-align: center;
          color: var(--accent-color);
          font-family: 'Source Code Pro', monospace;
          width: 100%;
          transition: transform 0.3s;
        }
        .card-item-inner .icon {
          display: block;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--accent-color);
        }
        .card-item-inner p {
          font-size: 0.9rem;
        }
        @media (max-width: 1024px) {
          .content h1 {
            font-size: 3rem;
          }
          .grid {
            gap: 1.5rem;
          }
        }
        @media (max-width: 768px) {
          .content h1 {
            font-size: 2.5rem;
          }
          .btn-group button {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
          }
          .flip-card {
            max-width: 240px;
            height: 280px;
          }
          .category-icon {
            font-size: 2.5rem;
          }
          .card-item-inner .icon {
            font-size: 1.75rem;
          }
        }
        @media (max-width: 480px) {
          .content h1 {
            font-size: 2rem;
          }
          .btn-group button {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
          .grid {
            gap: 1rem;
          }
          .flip-card {
            max-width: 220px;
            height: 260px;
          }
        }
      `}),r.jsxs("div",{ref:g,className:"skill-section",children:[r.jsx("div",{className:"section-magnifying-glass"}),r.jsxs("div",{className:"content",children:[r.jsx("h1",{className:"split-text","data-splitting":!0,children:"My Skill Set"}),r.jsx("div",{className:"btn-group",children:Ye.map((o,m)=>r.jsx("button",{className:w===o?"active":"",onClick:()=>p(o),children:o},m))}),r.jsx("div",{className:"grid",children:k.map((o,m)=>r.jsx(Ge,{skillCategory:o},m))})]})]})]})};export{Oe as default};
