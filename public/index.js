(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$4=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$5=Symbol();class s$5{constructor(t,s){if(s!==e$5)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t$4&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n$7=new Map,o$5=t=>{let o=n$7.get(t);return void 0===o&&n$7.set(t,o=new s$5(t,e$5)),o},r$6=t=>o$5("string"==typeof t?t:t+""),i$5=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,o)=>e+(t=>{if(t instanceof s$5)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1]),t[0]);return o$5(n)},S$2=(e,s)=>{t$4?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s);}));},u$4=t$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$6(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$4,e$4,h$4,r$5;const o$4={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$6=(t,i)=>i!==t&&(i==i||t==t),l$5={attribute:!0,type:String,converter:o$4,reflect:!1,hasChanged:n$6};class a$4 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$5){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$5}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(u$4(i));}else void 0!==i&&s.push(u$4(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$5){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$4.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$4.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$6)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$4.finalized=!0,a$4.elementProperties=new Map,a$4.elementStyles=[],a$4.shadowRootOptions={mode:"open"},null===(e$4=(s$4=globalThis).reactiveElementPlatformSupport)||void 0===e$4||e$4.call(s$4,{ReactiveElement:a$4}),(null!==(h$4=(r$5=globalThis).reactiveElementVersions)&&void 0!==h$4?h$4:r$5.reactiveElementVersions=[]).push("1.0.0-rc.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$3,i$4,s$3,e$3;const o$3=globalThis.trustedTypes,l$4=o$3?o$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$5=`lit$${(Math.random()+"").slice(9)}$`,h$3="?"+n$5,r$4=`<${h$3}>`,u$3=document,c$4=(t="")=>u$3.createComment(t),d$3=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v$2=Array.isArray,a$3=t=>{var i;return v$2(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f$2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$2=/>/g,p$2=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g$1=/"/g,y$1=/^(?:script|style|textarea)$/i,b$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b$1(1),x$1=b$1(2),w$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c$4(),t),t,void 0,s);}return n.I(t),n},E=u$3.createTreeWalker(u$3,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f$2;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f$2?"!--"===c[1]?u=_:void 0!==c[1]?u=m$2:void 0!==c[2]?(y$1.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p$2):void 0!==c[3]&&(u=p$2):u===p$2?">"===c[0]?(u=null!=o?o:f$2,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p$2:'"'===c[3]?g$1:$):u===g$1||u===$?u=p$2:u===_||u===m$2?u=f$2:(u=p$2,o=void 0);const a=u===p$2&&t[i+1].startsWith("/>")?" ":"";h+=u===f$2?s+r$4:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$5+a):s+n$5+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$4?l$4.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$5)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$5),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y$1.test(e.tagName)){const t=e.textContent.split(n$5),i=t.length-1;if(i>0){e.textContent=o$3?o$3.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c$4()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c$4());}}}else if(8===e.nodeType)if(e.data===h$3)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$5,t+1));)d.push({type:7,index:l}),t+=n$5.length-1;}l++;}}static createElement(t,i){const s=u$3.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w$1)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d$3(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u$3).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d$3(t)?t===A$1||null==t||""===t?(this.H!==A$1&&this.R(),this.H=A$1):t!==this.H&&t!==w$1&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$3(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u$3.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v$2(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c$4()),this.k(c$4()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A$1,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A$1),this.strings=s):this.H=A$1;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d$3(t)||t!==this.H&&t!==w$1,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w$1&&(h=this.H[n]),l||(l=!d$3(h)||h!==this.H[n]),h===A$1?t=A$1:t!==A$1&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A$1?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A$1?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A$1)===w$1)return;const e=this.H,o=t===A$1&&e!==A$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A$1&&(e===A$1||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}const Z={Z:"$lit$",U:n$5,Y:h$3,q:1,X:M,tt:k,it:a$3,st:S$1,et:C,ot:H,nt:L,rt:R,lt:I,ht:z};null===(i$4=(t$3=globalThis).litHtmlPlatformSupport)||void 0===i$4||i$4.call(t$3,N,C),(null!==(s$3=(e$3=globalThis).litHtmlVersions)&&void 0!==s$3?s$3:e$3.litHtmlVersions=[]).push("2.0.0-rc.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var i$3,l$3,o$2,s$2,n$4,a$2;const c$3=a$4;(null!==(i$3=(a$2=globalThis).litElementVersions)&&void 0!==i$3?i$3:a$2.litElementVersions=[]).push("3.0.0-rc.2");class h$2 extends a$4{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w$1}}h$2.finalized=!0,h$2._$litElement$=!0,null===(o$2=(l$3=globalThis).litElementHydrateSupport)||void 0===o$2||o$2.call(l$3,{LitElement:h$2}),null===(n$4=(s$2=globalThis).litElementPlatformSupport)||void 0===n$4||n$4.call(s$2,{LitElement:h$2});const u$2={K:(t,e,r)=>{t.K(e,r);},L:t=>t.L};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i$2=t=>(...i)=>({_$litDirective$:t,values:i});class s$1{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class n$3 extends s$1{constructor(i){if(super(i),this.vt=A$1,i.type!==t$2.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A$1)return this.Vt=void 0,this.vt=r;if(r===w$1)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n$3.directiveName="unsafeHTML",n$3.resultType=1;const o$1=i$2(n$3);

    class Router {
        constructor(_rootSelector) {
            this.controllers = new Set();
            this.cache = new Map();
            this.initialized = false;
            // Do not make body the rootSelector!
            this.rootSelector = _rootSelector;
        }

        get controllerArr() {
            return Array.from(this.controllers);
        }

        // TODO: Convert to something promise based
        hasPendingCache() {
            return !Array.from(this.cache.values()).every(
                (c) => Object.keys(c).length > 0
            );
        }

        async init() {
            window.onpopstate = this.popState.bind(this);
            const promises = this.controllerArr.map((c) => c.ready);
            Promise.all(promises).then(() => {
                console.log("initialize router");
                for (const controller of this.controllerArr) {
                    controller.enter();
                }
            });

            history.replaceState(
                {
                    title: document.title,
                    path: document.location.pathname,
                },
                document.title
            );

            this.selfCache();
        }

        addController(ctrl) {
            this.controllers.add(ctrl);
        }

        removeController(ctrl) {
            this.controllers.delete(ctrl);
        }

        promiseCache(href) {
            return new Promise((resolve, reject) => {
                if (window.top !== window) return reject("window not top level");
                if (this.cache.has(href)) return resolve(this.cache.get(href));
                if (href == document.location.pathname) return resolve();

                this.cache.set(href, {});

                // Consider using a hidden shadowDom instead of hidden iframe. Cannot use DOMParser to get a DOMRect.
                let frame = document.createElement("iframe");
                frame.src = href;
                frame.style.width = "100vw";
                frame.style.height = "100vh";
                frame.style.position = "absolute";
                frame.style.left = "-150vw";
                frame.onload = (e) => {
                    let nextContainer = frame.contentWindow.document.querySelector(
                        this.rootSelector
                    );
                    console.log(
                        "loaded ",
                        href,
                        frame.contentWindow.router.controllerArr
                    );
                    const frameCache = {
                        title: frame.contentWindow.document.title,
                        sections: Array.from(nextContainer.children).map(
                            (node) => ({
                                html: node.outerHTML.trim(),
                                tagName: node.tagName,
                                rect: node.getBoundingClientRect(),
                            })
                        ),
                        href: href,
                    };
                    frame.remove();
                    this.cache.set(href, frameCache);
                    resolve(frameCache);
                };
                document.body.appendChild(frame);
            });
        }

        selfCache() {
            if (this.hasPendingCache()) {
                setTimeout(this.selfCache.bind(this), 100);
                return;
            }

            this.cache.set(document.location.pathname, {
                title: document.title,
                sections: Array.from(
                    document.querySelector(this.rootSelector).children
                ).map((node) => ({
                    html: node.outerHTML.trim(),
                    tagName: node.tagName,
                    rect: node.getBoundingClientRect(),
                })),
                href: document.location.pathname,
            });
        }

        refreshCache(...routes) {
            if (window.parent != window) return false;

            if (!routes.length) routes = Object.keys(this.cache);

            for (const href in routes) {
                if (this.cache.has(href)) this.cache.delete(href);
                this.promiseCache(href);
            }
        }

        async goTo(href, pushed = true) {
            const next = this.cache.get(href);
            const matches = [];
            console.log(next, href);

            // Compare current sections with next sections to seperate sections that don't need to transistion
            for (const i in this.controllerArr) {
                const ctrl = this.controllerArr[i];
                const matchIndex = next.sections
                    .map((s) => s.tagName)
                    .indexOf(ctrl.host.tagName);
                if (matchIndex !== -1)
                    matches.push({
                        currentIndex: parseInt(i),
                        nextIndex: matchIndex,
                        tag: ctrl.host.tagName,
                    });
            }

            // Get entering and exiting sections, removing sections that dont need to transistion.
            let entering = next.sections.filter(
                    (n, i) => !matches.map((m) => m.nextIndex).includes(i)
                ),
                exiting = this.controllerArr.filter(
                    (n, i) => !matches.map((m) => m.currentIndex).includes(i)
                );

            const exitPromise = Promise.all(
                exiting.map((el) => el.leave())
            );

            for (const i in entering) {
                let section = entering[i];
                // TODO: insert sections so that they are in the correct order
                let el = document
                    .querySelector(this.rootSelector)
                    .insertAdjacentHTML("beforeend", section.html);
            }
            await exitPromise;

            const nextState = { title: next.title, path: href };
            if (pushed) history.pushState(nextState, next.title, href);
            document.title = next.title;

            await this.controllerArr.map((c) => c.ready);

            await Promise.all(this.controllerArr.map((el) => el.enter()));
        }

        popState(event) {
            if (this.cache.has()) this.goTo(event.state.path, false);
            else document.location.reload();
        }
    }

    window.router = new Router("#app");

    var callback = function () {
        window.router.init();
    };
    if (window.top === window)
        if (document.readyState === "complete") callback();
        else document.addEventListener("DOMContentLoaded", callback);

    const animationFrame = () =>
        new Promise((resolve) => requestAnimationFrame(resolve));
    class RouteController {
        constructor(host) {
            this.host = host;
            this.state = "";
            this.createReady();
            host.addController(this);
            this.host.updateComplete.then(() => {
                this.triggerCallback("beforeEnter");
                this.resolveReady();
            });
        }

        createReady() {
            this.resolveReady?.();
            this.ready = new Promise((r) => {
                this._resolveReady = () => {
                    r(this);
                };
            });
        }

        async resolveReady() {
            this._resolveReady?.(this);
            this._resolveReady = undefined;
        }

        setEnterAnimation(animation) {
            if (!animation instanceof Animation) return false;
            animation.pause();
            this.enterAnimation = animation;
        }

        setLeaveAnimation(animation) {
            if (!animation instanceof Animation) return false;
            animation.pause();
            this.leaveAnimation = animation;
        }

        triggerCallback(callbackName) {
            if (this.host[callbackName]) {
                // console.log("calling", callbackName, this);
                return this.host[callbackName]();
            }
        }

        async enter() {
            if(this.state == "in") return false;
            await animationFrame;

            this.enterAnimation.play();
            this.triggerCallback("onEnter");

            await this.enterAnimation.finished;
            this.state = "in";
            this.triggerCallback("afterEnter");
        }

        async leave() {
            if(this.state != "in") return false;
            await animationFrame;

            this.leaveAnimation.play();
            this.triggerCallback("onLeave");

            await this.leaveAnimation.finished;
            this.state = "out";
            this.triggerCallback("afterLeave");

            this.host.remove();
        }

        hostConnected() {
            window.router.addController(this);
        }

        hostDisconnected() {
            window.router.removeController(this);
        }

        shouldTransistion() {
            return true;
        }
    }

    class HeroSection extends h$2 {
        static get styles() {
            return i$5`
            .wrapper {

                color: var(--light-0);
                padding: 6rem 1.5rem;
                text-align: center;
            }
        `;
        }

        static get properties() {
            return {};
        }

        constructor() {
            super();
            this.route = new RouteController(this);
        }

        beforeEnter() {
            this.route.setEnterAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in-out'}));
        }

        afterEnter() {
            this.beforeLeave();
        }

        beforeLeave() {
            this.route.setLeaveAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 1}, {opacity: 0}], {duration: 300, easing: 'ease-in-out'}));
        }

        render() {
            return T`<div class="wrapper">
                <slot></slot>
        </div>`;
        }
    }

    class ArticleList extends h$2 {
        static get styles() {
            return i$5`
            .wrapper {
                border-top: 1px solid var(--dark-3);
                border-bottom: 1px solid var(--dark-3);
            }
            ::slotted(.container) {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;
                padding: 3rem;
                gap: 3rem;
            }
        `;
        }

        static get properties() {
            return {};
        }

        constructor() {
            super();
            this.route = new RouteController(this);
        }

        beforeEnter() {
            this.route.setEnterAnimation(
                this.shadowRoot
                    .querySelector(".wrapper")
                    .animate(
                        [
                            { transform: "translateY(100%)", opacity: 0 },
                            { opacity: 1 },
                        ],
                        { duration: 300, easing: "ease-in-out" }
                    )
            );
        }

        afterEnter() {
            this.beforeLeave();
        }

        beforeLeave() {
            this.route.setLeaveAnimation(
                this.shadowRoot
                    .querySelector(".wrapper")
                    .animate(
                        [
                            { opacity: 1 },
                            { transform: "translateY(100%)", opacity: 0 },
                        ],
                        { duration: 300, easing: "ease-in-out" }
                    )
            );
        }

        render() {
            return T`<div class="wrapper">
            <slot></slot>
        </div>`;
        }
    }

    class ArticleView extends h$2 {
        static get styles() {
            return i$5`
            .wrapper {
                height: 100vh;
            }
        `;
        }

        static get properties() {
            return {};
        }

        constructor() {
            super();
            this.route = new RouteController(this);
        }

        beforeEnter() {
            this.route.setEnterAnimation(this.shadowRoot.querySelector('.wrapper').animate([{transform: 'translateX(100%)', opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in-out'}));
        }

        afterEnter() {
            this.beforeLeave();
        }

        beforeLeave() {
            this.route.setLeaveAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 1}, {transform: 'translateX(100%)', opacity: 0}], {duration: 300, easing: 'ease-in-out'}));
        }

        render() {
            return T`<div class="wrapper">
            <slot></slot>
        </div>`;
        }
    }

    class NavSection extends h$2 {
        static get styles() {
            return i$5`
            .wrapper {
                background-color: var(--dark-2);
                color: var(--light-0);
            }
        `;
        }

        static get properties() {
            return {};
        }

        constructor() {
            super();
            this.route = new RouteController(this);
        }

        beforeEnter() {
            this.route.setEnterAnimation(
                this.shadowRoot
                    .querySelector(".wrapper")
                    .animate([{ opacity: 0 }, { opacity: 1 }], {
                        duration: 300,
                        easing: "ease-in-out",
                    })
            );
        }

        afterEnter() {
            this.beforeLeave();
        }

        beforeLeave() {
            this.route.setLeaveAnimation(
                this.shadowRoot
                    .querySelector(".wrapper")
                    .animate([{ opacity: 1 }, { opacity: 0 }], {
                        duration: 300,
                        easing: "ease-in-out",
                    })
            );
        }

        render() {
            return T`<div class="wrapper">
            <slot></slot>
        </div>`;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const{et:t$1}=Z,i$1=o=>null===o||"object"!=typeof o&&"function"!=typeof o,n$2={HTML:1,SVG:2},v$1=(o,t)=>{var i,n;return void 0===t?void 0!==(null===(i=o)||void 0===i?void 0:i._$litType$):(null===(n=o)||void 0===n?void 0:n._$litType$)===t},l$2=o=>{var t;return void 0!==(null===(t=o)||void 0===t?void 0:t._$litDirective$)},r$3=o=>{var t;return null===(t=o)||void 0===t?void 0:t._$litDirective$},d$2=o=>void 0===o.strings,e$2=()=>document.createComment(""),u$1=(o,i,n)=>{var v;const l=o.A.parentNode,r=void 0===i?o.B:i.A;if(void 0===n){const i=l.insertBefore(e$2(),r),v=l.insertBefore(e$2(),r);n=new t$1(i,v,o,o.options);}else {const t=n.B.nextSibling,i=n.M!==o;if(i&&(null===(v=n.Q)||void 0===v||v.call(n,o),n.M=o),t!==r||i){let o=n.A;for(;o!==t;){const t=o.nextSibling;l.insertBefore(o,r),o=t;}}}return n},c$2=(o,t,i=o)=>(o.I(t,i),o),s={},f$1=(o,t=s)=>o.H=t,a$1=o=>o.H,m$1=o=>{var t;null===(t=o.P)||void 0===t||t.call(o,!1,!0);let i=o.A;const n=o.B.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o;}},p$1=o=>{o.R();};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const r$2=(i,t)=>{var s,e;const o=i.N;if(void 0===o)return !1;for(const i of o)null===(e=(s=i).O)||void 0===e||e.call(s,t,!1),r$2(i,t);return !0},o=i=>{let t,s;do{if(void 0===(t=i.M))break;s=t.N,s.delete(i),i=t;}while(0===(null==s?void 0:s.size))},h$1=i=>{for(let t;t=i.M;i=t){let s=t.N;if(void 0===s)t.N=s=new Set;else if(s.has(i))break;s.add(i),d$1(t);}};function n$1(i){void 0!==this.N?(o(this),this.M=i,h$1(this)):this.M=i;}function l$1(i,t=!1,s=0){const e=this.H,h=this.N;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(e))for(let i=s;i<e.length;i++)r$2(e[i],!1),o(e[i]);else null!=e&&(r$2(e,!1),o(e));else r$2(this,i);}const d$1=i=>{var t,e,r,o;i.type==t$2.CHILD&&(null!==(t=(r=i).P)&&void 0!==t||(r.P=l$1),null!==(e=(o=i).Q)&&void 0!==e||(o.Q=n$1));};class c$1 extends s$1{constructor(){super(...arguments),this.isConnected=!0,this.ut=w$1,this.N=void 0;}T(i,t,s){super.T(i,t,s),h$1(this);}O(i,t=!0){this.at(i),t&&(r$2(this,i),o(this));}at(t){var s,e;t!==this.isConnected&&(t?(this.isConnected=!0,this.ut!==w$1&&(this.setValue(this.ut),this.ut=w$1),null===(s=this.reconnected)||void 0===s||s.call(this)):(this.isConnected=!1,null===(e=this.disconnected)||void 0===e||e.call(this)));}S(i,t){if(!this.isConnected)throw Error(`AsyncDirective ${this.constructor.name} was rendered while its tree was disconnected.`);return super.S(i,t)}setValue(i){if(this.isConnected)if(d$2(this.Σdt))this.Σdt.I(i,this);else {const t=[...this.Σdt.H];t[this.Σct]=i,this.Σdt.I(t,this,0);}else this.ut=i;}disconnected(){}reconnected(){}}

    const i=new WeakMap;class t{constructor(t,s){this.startPaused=!1,this.disabled=!1,this.flips=new Set,this.pendingComplete=!1,this.host=t,this.flipOptions=s.flipOptions||{},this.startPaused=!!s.startPaused,this.disabled=!!s.disabled,this.onComplete=s.onComplete,i.set(this.host,this);}async add(i){var t,s;this.flips.add(i),this.startPaused&&(null===(t=i.animation)||void 0===t||t.pause()),this.pendingComplete=!0,await i.finished,this.pendingComplete&&!this.isAnimating&&(this.pendingComplete=!1,null===(s=this.onComplete)||void 0===s||s.call(this));}remove(i){this.flips.delete(i);}pause(){this.flips.forEach((i=>{var t;return null===(t=i.animation)||void 0===t?void 0:t.pause()}));}play(){this.flips.forEach((i=>{var t;return null===(t=i.animation)||void 0===t?void 0:t.play()}));}cancel(){this.flips.forEach((i=>{var t;return null===(t=i.animation)||void 0===t?void 0:t.cancel()})),this.flips.clear();}finish(){this.flips.forEach((i=>{var t;return null===(t=i.animation)||void 0===t?void 0:t.finish()})),this.flips.clear();}togglePlay(){this.isPlaying?this.pause():this.play();}get isAnimating(){return this.flips.size>0}get isPlaying(){return Array.from(this.flips).some((i=>{var t;return "running"===(null===(t=i.animation)||void 0===t?void 0:t.playState)}))}async finished(){await Promise.all(Array.from(this.flips).map((i=>i.finished)));}}

    let e$1=0;const n=new Map,r$1=new WeakSet,l=()=>new Promise((t=>requestAnimationFrame(t))),a=[{transform:"translateY(100%) scale(0)",opacity:0}],c=[{transform:"translateY(-100%) scale(0)",opacity:0}],d=[{transform:"translateX(-100%) scale(0)",opacity:0}],u=[{transform:"translateX(100%) scale(0)",opacity:0}],v=[{}],f=[{opacity:0}],p=f,m=[{opacity:0},{opacity:1}],y=[{opacity:0},{opacity:.25,offset:.75},{opacity:1}],g=(t,i)=>{const s=t-i;return 0===s?void 0:s},w=(t,i)=>{const s=t/i;return 1===s?void 0:s},b={left:(t,i)=>{const s=g(t,i);return {value:s,transform:s&&`translateX(${s}px)`}},top:(t,i)=>{const s=g(t,i);return {value:s,transform:s&&`translateY(${s}px)`}},width:(t,i)=>{const s=w(t,i);return {value:s,transform:s&&`scaleX(${s})`}},height:(t,i)=>{const s=w(t,i);return {value:s,transform:s&&`scaleY(${s})`}}},A={duration:333,easing:"ease-in-out"},F=["left","top","width","height","opacity","color","background"],j=new WeakMap;class x extends c$1{constructor(t){if(super(t),this.t=null,this.i=null,this.o=!0,this.shouldLog=!1,t.type===t$2.CHILD)throw Error("The `flip` directive must be used in attribute position.");this.createFinished();}createFinished(){var t;null===(t=this.resolveFinished)||void 0===t||t.call(this),this.finished=new Promise((t=>{this.h=t;}));}async resolveFinished(){var t;null===(t=this.h)||void 0===t||t.call(this),this.h=void 0;}render(i){return A$1}getController(){return i.get(this.l)}isDisabled(){var t;return this.options.disabled||(null===(t=this.getController())||void 0===t?void 0:t.disabled)}update(t,[i]){var s;const o=void 0===this.l;return o&&(this.l=null===(s=t.options)||void 0===s?void 0:s.host,this.l.addController(this),this.element=t.element,j.set(this.element,this)),this.optionsOrCallback=i,(o||"function"!=typeof i)&&this.u(i),this.render(i)}u(t){var i,s;t=null!=t?t:{};const o=this.getController();void 0!==o&&((t={...o.flipOptions,...t}).animationOptions={...o.flipOptions.animationOptions,...t.animationOptions}),null!==(i=(s=t).properties)&&void 0!==i||(s.properties=F),this.options=t;}v(){const t={},i=this.element.getBoundingClientRect(),s=getComputedStyle(this.element);return this.options.properties.forEach((o=>{var h;const e=null!==(h=i[o])&&void 0!==h?h:b[o]?void 0:s[o],n=Number(e);t[o]=isNaN(n)?e+"":n;})),t}p(){let t,i=!0;return this.options.guard&&(t=this.options.guard(),i=((t,i)=>{if(Array.isArray(t)){if(Array.isArray(i)&&i.length===t.length&&t.every(((t,s)=>t===i[s])))return !1}else if(i===t)return !1;return !0})(t,this.m)),this.o=this.l.hasUpdated&&!this.isDisabled()&&!this.isAnimating()&&i&&this.element.isConnected,this.o&&(this.m=Array.isArray(t)?Array.from(t):t),this.o}hostUpdate(){var t;"function"==typeof this.optionsOrCallback&&this.u(this.optionsOrCallback()),this.p()&&(this.g=this.v(),this.t=null!==(t=this.t)&&void 0!==t?t:this.element.parentNode,this.i=this.element.nextSibling);}hostUpdated(){this.flip();}reconnected(){}disconnected(){this.flipDisconnect();}resetStyles(){var t;void 0!==this._&&(this.element.setAttribute("style",null!==(t=this._)&&void 0!==t?t:""),this._=void 0);}commitStyles(){var t,i;this._=this.element.getAttribute("style"),null===(t=this.animation)||void 0===t||t.commitStyles(),null===(i=this.animation)||void 0===i||i.cancel();}async flip(){if(!this.o||!this.element.isConnected||this.options.skipInitial&&!this.isHostRendered)return;let t;this.beforeBeginFlip(),await l;const i=this.j(),s=this.$(this.options.animationOptions,i),o=this.v();if(void 0!==this.g){const{from:s,to:h}=this.k(this.g,o,i);this.log("measured",[this.g,o,s,h]),t=this.calculateFrames(s,h);}else {const s=n.get(this.options.inId);if(s){n.delete(this.options.inId);const{from:h,to:r}=this.k(s,o,i);t=this.calculateFrames(h,r),t=this.options.in?[{...this.options.in[0],...t[0]},...this.options.in.slice(1),t[1]]:t,e$1++,t.forEach((t=>t.zIndex=e$1));}else this.options.in&&(t=[...this.options.in,{}]);}this.beginFlip();const h=await this.animate(t,s);this.completeFlip(h);}async flipDisconnect(){var t;if(!this.o)return;if(void 0!==this.options.id&&n.set(this.options.id,this.g),void 0===this.options.out)return;if(this.beforeBeginFlip(),await l(),null===(t=this.t)||void 0===t?void 0:t.isConnected){const t=this.i&&this.i.parentNode===this.t?this.i:null;if(this.t.insertBefore(this.element,t),this.options.stabilizeOut){const t=this.v();this.log("stabilizing out");const i=this.g.left-t.left,s=this.g.top-t.top;!("static"===getComputedStyle(this.element).position)||0===i&&0===s||(this.element.style.position="relative"),0!==i&&(this.element.style.left=i+"px"),0!==s&&(this.element.style.top=s+"px");}}const i=this.$(this.options.animationOptions);this.beginFlip();const s=await this.animate(this.options.out,i);this.completeFlip(s),this.element.remove();}beforeBeginFlip(){this.createFinished();}beginFlip(){var t,i;null===(i=(t=this.options).onStart)||void 0===i||i.call(t,this);}completeFlip(t){var i,s;t&&(null===(s=(i=this.options).onComplete)||void 0===s||s.call(i,this)),this.g=void 0,this.flipProps=void 0,this.frames=void 0,this.resolveFinished();}j(){const t=[];for(let i=this.element.parentNode;i;i=null==i?void 0:i.parentNode){const s=j.get(i);s&&!s.isDisabled()&&s&&t.push(s);}return t}get isHostRendered(){const t=r$1.has(this.l);return t||this.l.updateComplete.then((()=>{r$1.add(this.l);})),t}$(t,i=this.j()){const s={...A};return i.forEach((t=>Object.assign(s,t.options.animationOptions))),Object.assign(s,t),s}k(t,i,s){t={...t},i={...i};const o=s.map((t=>t.flipProps)).filter((t=>void 0!==t));let h=1,e=1;return void 0!==o&&(o.forEach((t=>{t.width&&(h/=t.width),t.height&&(e/=t.height);})),void 0!==t.left&&void 0!==i.left&&(t.left=h*t.left,i.left=h*i.left),void 0!==t.top&&void 0!==i.top&&(t.top=e*t.top,i.top=e*i.top)),{from:t,to:i}}calculateFrames(t,i,s=!1){var o;const h={},e={};let n=!1;const r={};for(const s in i){const l=t[s],a=i[s];if(s in b){const t=b[s];if(void 0===l||void 0===a)continue;const i=t(l,a);void 0!==i.transform&&(r[s]=i.value,n=!0,h.transform=`${null!==(o=h.transform)&&void 0!==o?o:""} ${i.transform}`);}else l!==a&&void 0!==l&&void 0!==a&&(n=!0,h[s]=l,e[s]=a);}return h.transformOrigin=e.transformOrigin=s?"center center":"top left",this.flipProps=r,n?[h,e]:void 0}async animate(t,i=this.options.animationOptions){if(this.frames=t,this.isAnimating()||this.isDisabled())return !1;if(this.options.onFrames&&(this.frames=t=this.options.onFrames(this),this.log("modified frames",t)),void 0===t)return !1;this.log("animate",[t,i]),this.animation=this.element.animate(t,i);const s=this.getController();null==s||s.add(this);try{await this.animation.finished;}catch(t){}return null==s||s.remove(this),!0}isAnimating(){var t,i;return "running"===(null===(t=this.animation)||void 0===t?void 0:t.playState)||(null===(i=this.animation)||void 0===i?void 0:i.pending)}log(t,i){this.shouldLog&&!this.isDisabled()&&console.log(t,this.options.id,i);}}const S=i$2(x);

    const r=["top","right","bottom","left"];class e extends c$1{constructor(t){if(super(t),t.type!==t$2.ELEMENT)throw Error("The `position` directive must be used in attribute position.")}render(i,o){return A$1}update(t,[i,o]){var s;return void 0===this.l&&(this.l=null===(s=t.options)||void 0===s?void 0:s.host,this.l.addController(this)),this.U=t.element,this.W=i,this.X=null!=o?o:["left","top","width","height"],this.render(i,o)}hostUpdated(){this.Y();}Y(){var t,i;const o="function"==typeof this.W?this.W():null===(t=this.W)||void 0===t?void 0:t.value,s=o.offsetParent;if(void 0===o||!s)return;const e=o.getBoundingClientRect(),h=s.getBoundingClientRect();null===(i=this.X)||void 0===i||i.forEach((t=>{const i=r.includes(t)?e[t]-h[t]:e[t];this.U.style[t]=i+"px";}));}}const h=i$2(e);

    class CubeFlip extends h$2 {
        static properties = { shifted: {} };
        static styles = i$5`
        :host {
            display: block;
            position: relative;
            height: 150px;
        }

        .box {
            position: absolute;
            width: 100px;
            height: 100px;
            background: steelblue;
            top: calc(50% - 50px);
            border-radius: 50%;
        }

        .shifted {
            right: 0;
        }
    `;

        render() {
            const animateIn = [{transform: 'translateY(-100%)', opacity: 0}, {opacity: 1}];
            const animateOut = [{opacity: 1}, {transform: 'translateY(-100%)', opacity: 0}];
            return T`
            <button @click=${this._toggle}>Move</button>
            <div class="box ${this.shifted ? "shifted" : ""}" ${S({skipInitial: false, in: animateIn, out: animateOut})}></div>
        `;
        }

        _toggle() {
            this.shifted = !this.shifted;
        }
    }

    class RouterLink extends h$2 {
        static get styles() {
            return i$5`
        /* Just some styles to make this element look like <a>*/
            :host {
                color: #0d6efd;
                cursor: pointer;
                display: inline-block;
            }
        `;
        }

        static get properties() {
            return {
                href: { type: String },
                ready: { type: Boolean },
            };
        }

        constructor() {
            super();
            this.href = "";
            this.ready = false;
        }

        connectedCallback() {
            super.connectedCallback();
            if (window.parent != window) return false;
            this.addEventListener("click", this._navigate);
            window.router.promiseCache(this.href).then(() => (this.ready = true));
        }

        _navigate() {
            if (this.ready) window.router.goTo(this.href);
        }

        render() {
            return T`<slot></slot>`;
        }
    }

    customElements.define("hero-section", HeroSection);
    customElements.define("article-list", ArticleList);
    customElements.define("article-view", ArticleView);
    customElements.define("nav-section", NavSection);
    customElements.define("router-link", RouterLink);
    customElements.define("cube-flip", CubeFlip);

    document.body.style.visibility = "visible";

})));
