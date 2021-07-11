import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class ArticleView extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                height: 100vh;
                1px solid var(--color-border-primary);
                background-color: var(--color-bg-secondary);
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
                { transform: "translateX(100%)", opacity: 0 },
                { opacity: 1 },
            ],
            options: { duration: 300, easing: "ease-in-out" }
        });
        this.route.setLeaveAnimation({
            keyframes: [
                { opacity: 1 },
                { transform: "translateX(100%)", opacity: 0 },
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