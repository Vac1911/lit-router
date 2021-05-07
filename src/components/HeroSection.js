import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class HeroSection extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                color: white;
                padding: 4rem 1.5rem;
                margin: 3rem auto;
                text-align: center;
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
        this.beforeEnter();
    }

    beforeEnter() {
        this.route.setEnterAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in-out'}));
    }

    afterEnter() {
        this.beforeLeave();
    }

    beforeLeave() {
        this.route.setLeaveAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 1}, {opacity: 0}], {duration: 300, easing: 'ease-in-out'}));
    }

    render() {
        return html`<div class="wrapper">
                <slot></slot>
        </div>`;
    }
}
customElements.define("hero-section", HeroSection);