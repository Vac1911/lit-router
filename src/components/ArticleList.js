import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";

export class ArticleList extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                background-color: #edeff7;
            }
            .wrapper.enter {
                animation-name: fadeInUp;
                animation-duration: 2s;
            }
            .wrapper.leave {
                animation-name: fadeOutDown;
                animation-duration: 2s;
            }
            /* Source: https://animate.style/ */
            @keyframes fadeInUp {
                0% {
                    opacity: 0;
                    transform: translate3d(0, 100%, 0);
                }

                100% {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }
            @keyframes fadeOutDown {
                from {
                    opacity: 1;
                }

                to {
                    opacity: 0;
                    transform: translate3d(0, 100%, 0);
                }
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
        this.route.setEnterAnimation(this.shadowRoot.querySelector('.wrapper').animate([{transform: 'translateY(100%)', opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in-out'}));
    }

    afterEnter() {
        this.beforeLeave();
    }

    beforeLeave() {
        this.route.setLeaveAnimation(this.shadowRoot.querySelector('.wrapper').animate([{opacity: 1}, {transform: 'translateY(100%)', opacity: 0}], {duration: 300, easing: 'ease-in-out'}));
    }

    afterLeave() {
        console.log(this);
    }

    render() {
        return html`<div class="wrapper ${this.route.state}">
            <slot></slot>
        </div>`;
    }
}
customElements.define("article-list", ArticleList);
