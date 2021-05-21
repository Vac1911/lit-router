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
        this.cache.set(document.location.pathname, {
            title: document.title,
            html: document.body.innerHTML,
            href: document.location.pathname,
        });
        console.log(history.state);
    }

    doTransistion(href) {
        return this.controllerArr.map((ctrl) => ctrl.doTransistion(href));
    }

    addController(ctrl) {
        this.controllers.add(ctrl);
    }

    removeController(ctrl) {
        this.controllers.delete(ctrl);
    }

    promiseCache(href) {
        return new Promise((resolve, reject) => {
            if(href == document.location.pathname) return resolve();
            if (window.top !== window) return reject("window not top level");
            if (this.cache.has(href)) return resolve(this.cache.get(href));
            this.cache.set(href, {});

            // fetch(href)
            //     .then((response) => response.text())
            //     .then((html) => {
            //         const nextDoc = new DOMParser().parseFromString(
            //             html,
            //             "text/html"
            //         );
            //         console.log(html, nextDoc);
            //         this.cache.set(href, {
            //             title: nextDoc.title,
            //             sections: nextDoc.body,
            //             href: href,
            //         });
            //         resolve(this.cache.get(href));
            //     });

            // Consider using a shadowDom instead of hidden iframe
            let frame = document.createElement("iframe");
            frame.src = href;
            frame.style.width = "100vw";
            frame.style.height = "100vh";
            frame.style.position = "absolute";
            frame.style.left = "-150vw";
            frame.onload = (e) => {
                let nextContainer = frame.contentWindow.document.body;
                console.log("loaded ", href, frame.contentWindow.router.controllerArr);
                this.cache.set(href, {
                    title: frame.contentWindow.document.title,
                    sections: Array.from(nextContainer.children).map(node => ({
                        html: node.outerHTML.trim(),
                        tagName: node.tagName,
                        rect: node.getBoundingClientRect(),
                    })),
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
        for (const href of Object.keys(this.cache)) this.promiseCache(href);
    }

    async goTo(href, pushed = true) {
        const next = this.cache.get(href);
            // const nextDoc = new DOMParser().parseFromString(
            //     pageCache.html,
            //     "text/html"
            // );
        const matches = [];
        for(const i in this.controllerArr) {
            const ctrl = this.controllerArr[i];
            const matchIndex = next.sections.map(s => s.tagName).indexOf(ctrl.host.tagName);
            if(matchIndex !== -1)
                matches.push({currentIndex: i, nextIndex: matchIndex, tag: ctrl.host.tagName});
        }
        console.log(matches);

        return;
        const exiting = this.doTransistion(href);
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
