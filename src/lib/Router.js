import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export default class Router {
    constructor() {
        this.controllers = new Set();
        this.cache = new Map();
        this.initialized = false;
    }

    get controllerArr() {
        return Array.from(this.controllers);
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
        console.log(history.state);
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
            // fetch(href)
            //     .then((res) => res.text())
            //     .then((data) => {
            //         console.log(data);
            //         this.cache.set(href, {
            //             title: frame.contentWindow.document.title,
            //             html: data,
            //             href: href,
            //         });
            //         resolve(this.cache.get(href));
            //         resolve();
            //     });
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

    async goTo(href, pushed = true) {
        const pageCache = this.cache.get(href),
            exiting = this.doTransistion(href);
        console.log("goTo", href, this.cache, pageCache);

        document.body.insertAdjacentHTML("beforeend", pageCache.html);

        await Promise.all(exiting);
        this.doTransistion(href);

        if (pushed)
            history.pushState(
                {
                    title: pageCache.title,
                    path: href,
                },
                pageCache.title,
                href
            );
        document.title = pageCache.title;
    }

    popState(event) {
        console.log(event);
        this.goTo(event.state.path, false);
    }
}
window.router = new Router();

var callback = function () {
    window.router.init();
};
if (window.top === window)
    if (document.readyState === "complete") callback();
    else document.addEventListener("DOMContentLoaded", callback);
