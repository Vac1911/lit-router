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

    async relocate(nextRect) {
        const props = ['left', 'top', 'width', 'height'];
        let startRect = transform(pick(this.host.wrapper.getBoundingClientRect(), props), (result, val, key) => result[key] = val + 'px');
        let finalRect = transform(pick(nextRect, props), (result, val, key) => result[key] = val + 'px');
        startRect.position = finalRect.position = 'absolute';

        // If the start and final rects are not the same, do play the animation
        if(!Object.keys(startRect).every(key => startRect[key] === finalRect[key])) {
            const relocateAnimation = this.host.wrapper
            .animate(
                [
                    startRect,
                    finalRect,
                ],
                { duration: 300, easing: "ease-in-out" }
            );
            console.log(`animating [${this.host.tagName}]`, startRect, finalRect);
        }
    }

    shouldRelocate() {
        return true;
    }

    hostConnected() {
        window.router.addController(this);
    }

    hostDisconnected() {
        window.router.removeController(this);
    }
}
