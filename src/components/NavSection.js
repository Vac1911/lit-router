import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class NavSection extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                display: flex;
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

    get wrapper () {
        return this.shadowRoot.querySelector('.wrapper');
    }

    beforeLeave() {
        this.route.setLeaveAnimation({
            keyframes: [
                { opacity: 1 },
                { opacity: 0 },
            ],
            options: { duration: 300, easing: "ease-in-out" }
        });
    }

    firstUpdated() {
        this.route.setEnterAnimation({
            keyframes: [
                { opacity: 0 },
                { opacity: 1 },
            ],
            options: { duration: 300, easing: "ease-in-out" }
        });
        this.route.setLeaveAnimation({
            keyframes: [
                { opacity: 1 },
                { opacity: 0 },
            ],
            options: { duration: 300, easing: "ease-in-out" }
        });
    }

    render() {
        return html`<div class="wrapper">
            <slot></slot>
        </div>`;
    }
}
