import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class HeroSection extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
            }
            .wrapper {
                width: 1012px;
                margin-right: auto;
                margin-left: auto;
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

    get wrapper () {
        return this.shadowRoot.querySelector('.wrapper');
    }

    render() {
        return html`<div class="wrapper">
                <slot></slot>
        </div>`;
    }
}