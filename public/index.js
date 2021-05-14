(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$2,i$3,s$4,e$2;const o$4=globalThis.trustedTypes,l$2=o$4?o$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$4=`lit$${(Math.random()+"").slice(9)}$`,h$2="?"+n$4,r$2=`<${h$2}>`,u$1=document,c$1=(t="")=>u$1.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$2=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),x=b(2),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c$1(),t),t,void 0,s);}return n.I(t),n},E=u$1.createTreeWalker(u$1,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m?u=f:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$2:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$4+a):s+n$4+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$2?l$2.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$4)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$4),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$4),i=t.length-1;if(i>0){e.textContent=o$4?o$4.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c$1()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c$1());}}}else if(8===e.nodeType)if(e.data===h$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$4,t+1));)d.push({type:7,index:l}),t+=n$4.length-1;}l++;}}static createElement(t,i){const s=u$1.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u$1).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$2(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u$1.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c$1()),this.k(c$1()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}const Z={Z:"$lit$",U:n$4,Y:h$2,q:1,X:M,tt:k,it:a$2,st:S$1,et:C,ot:H,nt:L,rt:R,lt:I,ht:z};null===(i$3=(t$2=globalThis).litHtmlPlatformSupport)||void 0===i$3||i$3.call(t$2,N,C),(null!==(s$4=(e$2=globalThis).litHtmlVersions)&&void 0!==s$4?s$4:e$2.litHtmlVersions=[]).push("2.0.0-rc.2");

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$1=Symbol();class n$3{constructor(t,n){if(n!==e$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t$1&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const s$3=t=>new n$3(t+"",e$1),o$3=new Map,r$1=(t,...s)=>{const r=s.reduce(((e,s,o)=>e+(t=>{if(t instanceof n$3)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[o+1]),t[0]);let i=o$3.get(r);return void 0===i&&o$3.set(r,i=new n$3(r,e$1)),i},i$2=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style");n.textContent=t.cssText,e.appendChild(n);}));},S=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return s$3(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$2,e,h$1,r;const o$2={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$2=(t,i)=>i!==t&&(i==i||t==t),l$1={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$2};class a$1 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$1}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i));}else void 0!==i&&s.push(S(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$1){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$2.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$2.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$2)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.shadowRootOptions={mode:"open"},null===(e=(s$2=globalThis).reactiveElementPlatformSupport)||void 0===e||e.call(s$2,{ReactiveElement:a$1}),(null!==(h$1=(r=globalThis).reactiveElementVersions)&&void 0!==h$1?h$1:r.reactiveElementVersions=[]).push("1.0.0-rc.1");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var i$1,l,o$1,s$1,n$1,a;const c=a$1;(null!==(i$1=(a=globalThis).litElementVersions)&&void 0!==i$1?i$1:a.litElementVersions=[]).push("3.0.0-rc.1");class h extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h.finalized=!0,h._$litElement$=!0,null===(o$1=(l=globalThis).litElementHydrateSupport)||void 0===o$1||o$1.call(l,{LitElement:h}),null===(n$1=(s$1=globalThis).litElementPlatformSupport)||void 0===n$1||n$1.call(s$1,{LitElement:h});const u={K:(t,e,r)=>{t.K(e,r);},L:t=>t.L};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=t=>(...i)=>({_$litDirective$:t,values:i});class s{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class n extends s{constructor(i){if(super(i),this.vt=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A)return this.Vt=void 0,this.vt=r;if(r===w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=i(n);

    class Router {
        constructor() {
            this.controllers = new Set();
            this.cache = new Map();
            this.initialized = false;
        }

        get controllerArr() {
            return Array.from(this.controllers);
        }

        async init() {
            const promises = this.controllerArr.map((c) => c.ready);
            Promise.all(promises).then(() => {
                console.log("initialize router");
                for (const controller of this.controllerArr) {
                    controller.enter();
                }
            });
        }

        doTransistion(href) {
            return this.controllerArr.map((ctrl) => ctrl.onNavigate(href));
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
                this.cache.set(href, {});
                let frame = document.createElement("iframe");
                frame.src = href;
                frame.style.width = "100vw";
                frame.style.height = "100vh";
                frame.style.position = "absolute";
                frame.style.left = "-150vw";
                frame.onload = (e) => {
                    console.log("loaded ", href);
                    let nextContainer = frame.contentWindow.document.body;
                    this.cache.set(href, {
                        title: frame.contentWindow.document.title,
                        html: nextContainer.innerHTML,
                        href: href,
                    });
                    resolve(this.cache.get(href));
                    frame.remove();
                };
                document.body.appendChild(frame);
            });
        }

        refreshCache() {
            if (window.parent != window) return false;
            for (const href of Object.keys(this.cache)) this.routeCache(href);
        }

        async goTo(href) {
            console.log("goTo", href);
            const pageCache = this.cache.get(href),
                exiting = this.doTransistion(href);

            document.body.insertAdjacentHTML("beforeend", pageCache.html);

            await Promise.all(exiting);
            this.doTransistion(href);


            history.pushState(
                {
                    prev: {
                        title: document.title,
                        url: document.location.toString(),
                    },
                },
                pageCache.title,
                href
            );
            document.title = pageCache.title;
        }
    }
    window.router = new Router();

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
                    console.log("controller ready");
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
            await animationFrame;

            this.enterAnimation.play();
            this.triggerCallback("onEnter");

            await this.enterAnimation.finished;
            this.state = "in";
            this.triggerCallback("afterEnter");
        }

        async leave() {
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

        onNavigate() {
            if (this.state == "") {
                if (this.enterAnimation) return this.enter();
            } else if (this.state == "in") {
                if (this.leaveAnimation) return this.leave();
            }
        }
    }

    class HeroSection extends h {
        static get styles() {
            return r$1`
            .wrapper {
                color: white;
                padding: 4rem 1.5rem;
                margin: 3rem auto;
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

    class ArticleList extends h {
        static get styles() {
            return r$1`
            .wrapper {
                background-color: #edeff7;
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
            this.route.setEnterAnimation(this.shadowRoot.querySelector('.wrapper').animate([{transform: 'translateY(100%)', opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in-out'}));
        }

        afterEnter() {
            this.beforeLeave();
        }

        beforeLeave() {
            this.route.setLeaveAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 1}, {transform: 'translateY(100%)', opacity: 0}], {duration: 300, easing: 'ease-in-out'}));
        }

        render() {
            return T`<div class="wrapper">
            <slot></slot>
        </div>`;
        }
    }

    class ArticleView extends h {
        static get styles() {
            return r$1`
            .wrapper {
                background-color: #fff;
                height: 100vh;
            }
            .wrapper.enter {
                animation-name: fadeInUp;
                animation-duration: 2s;
            }
            .wrapper.leave {
                animation-name: fadeOutDown;
                animation-duration: 2s;
            }
            /* Source: https://animate.style/ */
            @keyframes fadeInUp {
                0% {
                    opacity: 0;
                    transform: translate3d(0, 100%, 0);
                }

                100% {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }
            @keyframes fadeOutDown {
                from {
                    opacity: 1;
                }

                to {
                    opacity: 0;
                    transform: translate3d(0, 100%, 0);
                }
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

    class RouterLink extends h {
        static get styles() {
            return r$1`
        /* Just some styles to make this element look like <a>*/
            :host {
                color: #0d6efd;
                text-decoration: underline;
                cursor: pointer;
                display: inline-block;
            }
            :host:hover {
                color: #0a58ca;
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

    customElements.define("router-link", RouterLink);

    document.body.style.visibility = "visible";

})));
