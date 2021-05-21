import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class HeroSection extends LitElement {
    static get styles() {
        return css`
            .wrapper {

                color: var(--light-0);
                padding: 6rem 1.5rem;
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