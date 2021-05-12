const animationFrame = () =>
    new Promise((resolve) => requestAnimationFrame(resolve));
export class RouteController {
    constructor(host) {
        this.host = host;
        this.state = "";
        this.createReady();
        host.addController(this);
        this.host.updateComplete.then(() => {
            this.triggerCallback('beforeEnter');
            this.enter();
            this.resolveReady();
        });
    }

    createReady() {
        this.resolveReady?.();
        this.ready = new Promise((r) => {
            this._resolveReady = () => {console.log('controller ready'); r(this)};
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
        if (this.host[callbackName]) return this.host[callbackName]();
    }

    async enter() {
        if (!this.enterAnimation || this.state !== "") return false;

        await animationFrame;

        this.enterAnimation.play();
        this.triggerCallback("onEnter");

        await this.enterAnimation.finished;
        this.state = "in";
        this.triggerCallback("afterEnter");
    }

    async leave() {
        if (!this.leaveAnimation || this.state !== "in") return false;

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
        if (this.state == "in") {
            this.leave();
        } else {
            this.enter();
        }
    }
}
