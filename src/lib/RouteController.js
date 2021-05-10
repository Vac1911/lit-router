const animationFrame = () =>
    new Promise((resolve) => requestAnimationFrame(resolve));
export class RouteController {
    constructor(host) {
        this.host = host;
        this.state = "";
        this.enterAnimation = false;
        this.leaveAnimation = false;

        host.addController(this);
        this.createReady();
    }

    createReady() {
        this.resolveReady?.();
        this.ready = new Promise((r) => {
            
            this._resolveReady = () => {console.log('controller resolving'); r(this)};
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
        console.log('controller ready');
        this.resolveReady();
    }

    setLeaveAnimation(animation) {
        if (!animation instanceof Animation) return false;
        animation.pause();
        this.leaveAnimation = animation;
    }

    async enter() {
        if (!this.enterAnimation || this.state !== "") return false;

        await animationFrame;

        this.enterAnimation.play();
        if (this.host.onEnter) this.host.onEnter();

        await this.enterAnimation.finished;
        this.state = "in";
        if (this.host.afterEnter) this.host.afterEnter();
    }

    async leave() {
        if (!this.leaveAnimation || this.state == "out") return false;

        await animationFrame;

        this.leaveAnimation.play();
        if (this.host.onLeave) this.host.onLeave();

        await this.leaveAnimation.finished;
        this.state = "out";
        if (this.host.afterLeave) this.host.afterLeave();

        this.host.remove();
    }

    hostConnected() {
        window.router.addController(this);
        document.addEventListener("click", this.onClick.bind(this));
    }

    hostDisconnected() {
        window.router.removeController(this);
        document.removeEventListener("click", this.onClick.bind(this));
    }

    onClick() {
        if (this.state == "in") {
            this.leave();
        } else {
            this.enter();
        }
    }
}
