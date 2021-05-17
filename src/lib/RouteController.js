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
