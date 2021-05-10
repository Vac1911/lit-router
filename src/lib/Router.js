export default class Router {
    controllers = new Set();
    cache = {};
    initialized = false;

    async init() {
        this.initialized = true;
        for(const controller in this.controllers) {
            controller.enter();
        }
    }

    addController(ctrl) {
        this.controllers.add(ctrl);
    }

    removeController(ctrl) {
        this.controllers.delete(ctrl);
    }

    promiseCache(href) {
        this.cache[href] = {};

        return new Promise((resolve, reject) => {
            if (window.parent != window) return reject("window not top level");
            let frame = document.createElement("iframe");
            frame.src = href;
            frame.style.width = "100vw";
            frame.style.height = "100vh";
            frame.style.position = "absolute";
            frame.style.left = "-150vw";
            frame.onload = (e) => {
                console.log("loaded ", href);
                let nextContainer = frame.contentWindow.document
                    .querySelector("dynamic-container")
                    .shadowRoot.querySelector(".inner");
                window.cache[href] = {
                    title: frame.contentWindow.document.title,
                    html: nextContainer
                        .querySelector("slot")
                        .assignedElements()
                        .map((el) => el.outerHTML)
                        .join(""),
                    height: nextContainer.getBoundingClientRect().height,
                    width: nextContainer.getBoundingClientRect().width,
                    href: href,
                };
                resolve(window.cache[href]);
                frame.remove();
            };
            document.body.appendChild(frame);
        });
    }

    refreshCache() {
        if (window.parent != window) return false;
        for (const href of Object.keys(window.cache)) window.routeCache(href);
    }

    goTo(href) {
        console.log("goTo", href, window.cache[href]);
        const container = document.querySelector("dynamic-container");
        container.transistion(window.cache[href]);
        history.pushState(
            {
                prev: {
                    title: document.title,
                    url: document.location.toString(),
                },
            },
            window.cache[href].title,
            href
        );
        document.title = window.cache[href].title;
    }
}

window.router = new Router();
