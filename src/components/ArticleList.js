import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class ArticleList extends LitElement {
    static get styles() {
        return css`
            :host {
                border-top: 1px solid var(--color-border-primary);
                background-color: var(--color-bg-canvas);
                display: flex;
                position: relative;
            }
            .wrapper {
                display: grid;
                max-width: 1280px;
                margin-right: auto;
                margin-left: auto;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 200px;
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

    firstUpdated() {
        this.route.setEnterAnimation({
            keyframes: [
                { transform: "translateY(100%)" },
                { },
            ],
            options: { duration: 300, easing: "ease-in-out" }
        });
        this.route.setLeaveAnimation({
            keyframes: [
                {  },
                { transform: "translateY(100%)" },
            ],
            options: { duration: 300, easing: "ease-in-out" }
        });
    }

    get wrapper () {
        return this//.shadowRoot.querySelector('.wrapper');
    }

    willRelocate(cache) {
        console.log(cache);
    }

    render() {
        return html`<div class="wrapper">
            <slot></slot>
        </div>`;
    }
}
