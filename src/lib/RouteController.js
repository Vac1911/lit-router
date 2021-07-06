import {transformProps} from "@lit-labs/motion";
import {transform, pick} from "lodash";

const animationFrame = () =>
    new Promise((resolve) => requestAnimationFrame(resolve));
export class RouteController {
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

    setEnterAnimation({ keyframes, options = {} }) {
        this.enterAnimation = this.host.wrapper.animate(keyframes, options);
        this.enterAnimation.pause();
        if(document.router.isReflection) this.enterAnimation.finish();
    }

    setLeaveAnimation({ keyframes, options = {} }) {;
        this.leaveAnimation = this.host.wrapper.animate(keyframes, options);
        this.leaveAnimation.pause();
        if(document.router.isReflection) this.leaveAnimation.finish();
    }

    triggerCallback(callbackName, ...args) {
        if (this.host[callbackName]) {
            // console.log("calling", callbackName, this);
            return this.host[callbackName](...args);
        }
    }

    async enter() {
        if(this.state === "in") return false;
        await animationFrame;

        const start = performance.now();
        console.log('ENTERING', this.host.tagName);

        this.enterAnimation.play();
        this.triggerCallback("onEnter");

        await this.enterAnimation.finished;
        this.state = "in";
        this.triggerCallback("afterEnter");
        console.log('ENTERED', this.host.tagName, performance.now() - start);
    }

    async leave() {
        if(this.state !== "in") return false;
        await animationFrame;

        const start = performance.now();
        console.log('LEAVING', this.host.tagName);

        this.leaveAnimation.play();
        this.triggerCallback("onLeave");

        await this.leaveAnimation.finished;
        this.state = "out";
        this.triggerCallback("afterLeave");

        console.log('LEFT', this.host.tagName, performance.now() - start);

        this.host.remove();
    }

    async relocate(cache) {
        let nextRect = cache.rect;
        if(this.state !== "in") return false;

        const props = ['left', 'top', 'width', 'height'];
        let startRect = transform(pick(this.host.wrapper.getBoundingClientRect(), props), (result, val, key) => result[key] = val + 'px');
        let finalRect = transform(pick(nextRect, props), (result, val, key) => result[key] = val + 'px');
        startRect.position = finalRect.position = 'absolute';

        // If the start and final rects are not the same, do play the animation
        if(Object.keys(startRect).every(key => startRect[key] === finalRect[key])) return true;

        await animationFrame;
        this.triggerCallback("willRelocate", cache);
        const relocateAnimation = this.host.wrapper
            .animate(
                [
                    startRect,
                    finalRect,
                ],
                { duration: 900, easing: "ease-in-out" }
            );
        this.triggerCallback("relocating");
        await relocateAnimation.finished;
        this.triggerCallback("relocated");
        console.log(`relocated [${this.host.tagName}]`, startRect, finalRect);
    }

    shouldRelocate() {
        return true;
    }

    hostConnected() {
        document.router.addController(this);
    }

    hostDisconnected() {
        document.router.removeController(this);
    }
}
