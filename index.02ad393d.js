function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=n.parcelRequired756;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},n.parcelRequired756=i),i.register("27Lyk",(function(t,n){var r,o;e(t.exports,"register",(()=>r),(e=>r=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("27Lyk").register(JSON.parse('{"ioUUD":"index.02ad393d.js","e27TP":"icons.db6269d1.svg","fVJgR":"portfolio-m.0f8f8b0f.png","3mv4o":"designo-m.eae91568.png"}'));const s={_origin:"https://api.emailjs.com"},a=(e,t,n)=>{if(!e)throw"The user ID is required. Visit https://dashboard.emailjs.com/admin/integration";if(!t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";return!0};class d{constructor(e){this.status=e.status,this.text=e.responseText}}const l=(e,t,n={})=>new Promise(((r,o)=>{const i=new XMLHttpRequest;i.addEventListener("load",(({target:e})=>{const t=new d(e);200===t.status||"OK"===t.text?r(t):o(t)})),i.addEventListener("error",(({target:e})=>{o(new d(e))})),i.open("POST",s._origin+e,!0),Object.keys(n).forEach((e=>{i.setRequestHeader(e,n[e])})),i.send(t)}));var c,u=(e,t="https://api.emailjs.com")=>{s._userID=e,s._origin=t},m=(e,t,n,r)=>{const o=r||s._userID,i=(e=>{let t;if(t="string"==typeof e?document.querySelector(e):e,!t||"FORM"!==t.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of form";return t})(n);a(o,e,t);const d=new FormData(i);return d.append("lib_version","3.5.0"),d.append("service_id",e),d.append("template_id",t),d.append("user_id",o),l("/api/v1.0/email/send-form",d)};c=new URL(i("27Lyk").resolve("e27TP"),import.meta.url).toString();var f;f=new URL(i("27Lyk").resolve("fVJgR"),import.meta.url).toString();const g={designo:t(new URL(i("27Lyk").resolve("3mv4o"),import.meta.url).toString()),portfolio:t(f)},h=document.querySelector(".header"),v=document.querySelector(".navbar"),p=document.getElementById("navbar__btn-box--js"),b=document.getElementById("navbar-icon--js"),y=document.querySelector(".section--home"),w=document.getElementById("icon-arrow-down--js"),E=document.querySelector(".overlay");setTimeout((()=>{const e=w.classList[0];w.classList.add(`${e}--visible`)}),1800);let _=!0;function L(e="toggle"){if("toggle"===e)return b.setAttribute("href",`${t(c)}#icon-${_?"x":"three-lines"}`),E.classList.toggle("overlay--hidden"),h.classList.toggle("header--max"),void(_=!_);_||(b.setAttribute("href",`${t(c)}#icon-three-lines`),h.classList.remove("header--max"),E.classList.add("overlay--hidden"),_=!0)}function T(e){window.scrollTo({top:e})}v.addEventListener("click",(function(e){e.preventDefault();if(e.target.closest("#navbar__btn--js"))return L();const t=e.target.getAttribute("href");if(!t)return;L("close");T(document.getElementById(t.slice(1)).offsetTop-p.getBoundingClientRect().height)})),w.addEventListener("click",(function(){T(y.getBoundingClientRect().height-h.getBoundingClientRect().height)})),E.addEventListener("click",(function(){E.classList.add("overlay--hidden"),L("close")}));const x=document.querySelectorAll("img[data-src]");const I=new IntersectionObserver((function(e,t){e.forEach((e=>{if(!e.isIntersecting)return;const{target:n}=e;n.src=g[n.dataset.src],n.addEventListener("load",(()=>{n.classList.remove("blur")})),t.unobserve(n)}))}),{root:null,rootMargin:"50px",threshold:.1});x.forEach((e=>I.observe(e)));const S=document.getElementById("contact-form--js"),j=document.getElementById("name"),R=document.getElementById("email"),B=document.getElementById("message"),q=document.getElementById("form-btn--js");u("gSeSiP9lCnYcT1OoD");const k={validateLength:e=>""===e&&"Field can't be empty.",user_name:e=>{if(!/^[a-z]+(\s{1}[a-z]+)*$/i.test(e))return"Not a valid name."},user_email:e=>{if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e))return"Please enter a valid email address."},message:e=>e.length<20&&"Minimum length: 20 characters."},A=(e,t)=>{document.getElementById(`feedback-${e}--js`).innerText=t};let D=null;const O=(e,t)=>{document.getElementById("form-err--js").innerText=e,t&&(D&&clearTimeout(D),D=setTimeout((()=>{document.getElementById("form-err--js").innerText=""}),1e3*t))},H=()=>{[j,R,B].forEach((e=>{e.value=""}))};let F=0;S.addEventListener("submit",(function(e){e.preventDefault(),q.setAttribute("disabled","true");let t=!1;if([j,R,B].forEach((e=>{const n=e.value.trim(),r=k.validateLength(n);if(r)return t=!0,void A(e.name,r);const o=k[e.name](e.value);if(o)return t=!0,void A(e.name,o);A(e.name,"")})),t)return O("There was an issue with 1 or more fields."),void q.removeAttribute("disabled");q.innerText="Sending...",[j,R,B].forEach((e=>{document.getElementById(`feedback-${e.name}--js`).innerText=""})),this.contact_number.value=1e5*Math.random()|0,m("contact_service","contact_form",this).then((()=>{O("Sent!",10),H(),F=0})).catch((e=>{O("An error occurred. Please try again later.",12),F>=2&&(H(),F=0)})).finally((()=>{q.innerText="Submit",q.removeAttribute("disabled")}))}));
//# sourceMappingURL=index.02ad393d.js.map
