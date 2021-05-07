const animationFrame = () =>
    new Promise((resolve) => requestAnimationFrame(resolve));
export class RouteController {
    constructor(host) {
        this.host = host;
        this.state = "out";
        this.enterAnimation = false;
        this.leaveAnimation = false;
        host.addController(this);
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

    async enter() {
        if (!this.enterAnimation || this.state == "in") return false;

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

        this.host.removeController(this);
        this.hostDisconnected();
    }

    hostConnected() {
        document.addEventListener("click", this.onClick.bind(this));
    }

    hostDisconnected() {
        console.log("dc");
        document.removeEventListener("click", this.onClick.bind(this));
    }

    onClick() {
        if (this.state == "out") {
            this.enter();
        } else {
            this.leave();
        }
    }
}
