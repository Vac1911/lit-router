export default class Router {
    constructor(_rootSelector) {
        this.controllers = new Set();
        this.cache = new Map();
        this.initialized = false;
        this.rootSelector = _rootSelector; // Do not make body the rootSelector!
        this.isReflection = (window.top !== window);
    }

    get root() {
        return document.querySelector(this.rootSelector);
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
        if (this.isReflection) return this.skipAnimation();

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

    skipAnimation() {
        const promises = this.controllerArr.map((c) => c.ready);
        Promise.all(promises).then(() => {
            console.log("skipped animations: ", document.location.href);
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
            if (this.isReflection) return reject("window not top level");
            if (this.cache.has(href)) return resolve(this.cache.get(href));
            if (href == document.location.pathname) return resolve();

            this.cache.set(href, {});

            // Cannot use DOMParser to get a DOMRect. Consider using a hidden shadowDom instead of hidden iframe.
            let frame = document.createElement("iframe");
            frame.src = href;
            frame.style.width = "100vw";
            frame.style.height = "100vh";
            frame.style.position = "absolute";
            frame.style.left = "-150vw";
            frame.style.top = "0";
            frame.onload =  async (e) => {
                const promises = frame.contentDocument.router.controllerArr.map((c) => c.ready);
                await Promise.all(promises);

                // TODO: Create function to make a cache from a document. Merge with this::selfCache
                const frameCache = {
                    title: frame.contentDocument.title,
                    sections: frame.contentDocument.router.controllerArr.map(ctrl => ctrl.getCache()),
                    href: document.location.pathname,
                };

                console.log("cached: " + frame.contentDocument.location.pathname, frameCache);
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
            sections: this.controllerArr.map(ctrl => ctrl.getCache()),
            href: document.location.pathname,
        });
    }



    refreshCache(...routes) {
        if (this.isReflection) return false;

        if (!routes.length) routes = Object.keys(this.cache);

        for (const href in routes) {
            if (this.cache.has(href)) this.cache.delete(href);
            this.promiseCache(href);
        }
    }

    async goTo(href, pushed = true) {
        if(href === document.location.pathname)
            return false;
        const next = this.cache.get(href);
        const relocating = [];
        console.log(next, href);

        // Compare current sections with next sections to find sections that should relocate instead of transition
        for (const i in this.controllerArr) {
            const ctrl = this.controllerArr[i];
            const matchIndex = next.sections
                .map((s) => s.tagName)
                .indexOf(ctrl.host.tagName);
            if (matchIndex !== -1) {
                ctrl.relocate(next.sections[matchIndex]);
                relocating.push({
                    currentIndex: parseInt(i),
                    nextIndex: matchIndex,
                    tag: ctrl.host.tagName,
                });
            }
        }

        // Get entering and exiting sections, removing sections that dont need to enter/leave.
        let entering = next.sections.filter(
                (n, i) => !relocating.map((m) => m.nextIndex).includes(i)
            ),
            exiting = this.controllerArr.filter(
                (n, i) => !relocating.map((m) => m.currentIndex).includes(i)
            );

        const exitPromise = Promise.all(
            exiting.map((el) => el.leave())
        );

        await exitPromise;

        for (const i in entering) {
            let section = entering[i];
            let root = document.querySelector(this.rootSelector);
            let el;

            if(section.index < 1 || root.children.length === 0)
                el = root.insertAdjacentHTML("afterbegin", section.html);
            else if(section.index > root.children.length - 1)
                el = root.insertAdjacentHTML("beforeend", section.html);
            else {
                console.log(section, section.index);
                el = root.children[section.index - 1].insertAdjacentHTML("afterend", section.html);
            }

                // .insertAdjacentHTML("beforeend", section.html);
        }

        const nextState = { title: next.title, path: href };
        if (pushed) history.pushState(nextState, next.title, href);
        document.title = next.title;

        await this.controllerArr.map((c) => c.ready);

        await Promise.all(this.controllerArr.map((el) => el.enter()));
    }

    popState(event) {
        if (this.cache.has(event.state.path)) this.goTo(event.state.path, false);
        else document.location.reload();
    }
}

document.router = new Router("#app");

var callback = function () {
    document.router.init();
};
if (document.readyState === "complete") callback();
else document.addEventListener("DOMContentLoaded", callback);
