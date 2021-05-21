import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class NavSection extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                background-color: var(--dark-2);
                color: var(--light-0);
            }
        `;
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
        this.route = new RouteController(this);
    }

    beforeEnter() {
        this.route.setEnterAnimation(
            this.shadowRoot
                .querySelector(".wrapper")
                .animate([{ opacity: 0 }, { opacity: 1 }], {
                    duration: 300,
                    easing: "ease-in-out",
                })
        );
    }

    afterEnter() {
        this.beforeLeave();
    }

    beforeLeave() {
        this.route.setLeaveAnimation(
            this.shadowRoot
                .querySelector(".wrapper")
                .animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: 300,
                    easing: "ease-in-out",
                })
        );
    }

    render() {
        return html`<div class="wrapper">
            <slot></slot>
        </div>`;
    }
}
