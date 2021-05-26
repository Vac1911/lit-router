import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export default class Router {
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
