import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class ArticleList extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                border-top: 1px solid var(--dark-3);
                border-bottom: 1px solid var(--dark-3);
            }
            ::slotted(.container) {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;
                padding: 3rem;
                gap: 3rem;
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
                .animate(
                    [
                        { transform: "translateY(100%)", opacity: 0 },
                        { opacity: 1 },
                    ],
                    { duration: 300, easing: "ease-in-out" }
                )
        );
    }

    afterEnter() {
        this.beforeLeave();
    }

    beforeLeave() {
        this.route.setLeaveAnimation(
            this.shadowRoot
                .querySelector(".wrapper")
                .animate(
                    [
                        { opacity: 1 },
                        { transform: "translateY(100%)", opacity: 0 },
                    ],
                    { duration: 300, easing: "ease-in-out" }
                )
        );
    }

    render() {
        return html`<div class="wrapper">
            <slot></slot>
        </div>`;
    }
}
