import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export default class Router {
    constructor() {
        this.controllers = new Set();
        this.cache = new Map();
        this.initialized = false;
    }

    async init() {
        console.log(Array.from(this.controllers).map(c => c.ready));
    }

    startTransistion(href) {
        Array.from(this.controllers).forEach((ctrl) => {
            ctrl.onNavigate();
        });
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

    goTo(href) {
        const pageCache = this.cache.get(href);
        console.log("goTo", href);
        this.startTransistion(href);
        document.body.insertAdjacentHTML("beforeend", pageCache.html);
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
    if (document.readyState === "complete")
        callback();
    else
        document.addEventListener("DOMContentLoaded", callback);
