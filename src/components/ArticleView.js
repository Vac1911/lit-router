import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class ArticleView extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                height: 100vh;
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

    beforeEnter() {
        this.route.setEnterAnimation(this.wrapper.animate([{transform: 'translateX(100%)', opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in-out'}));
    }

    afterEnter() {
        this.beforeLeave();
    }

    beforeLeave() {
        this.route.setLeaveAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 1}, {transform: 'translateX(100%)', opacity: 0}], {duration: 300, easing: 'ease-in-out'}));
    }

    render() {
        return html`<div class="wrapper">
            <slot></slot>
        </div>`;
    }
}