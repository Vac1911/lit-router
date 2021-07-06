import { html, css, LitElement } from "lit";

export class RouterLink extends LitElement {
    static get styles() {
        return css`
        /* Just some styles to make this element look like <a>*/
            :host {
                color: #0d6efd;
                cursor: pointer;
                display: inline;
            }
        `;
    }

    static get properties() {
        return {
            href: { type: String },
            ready: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.href = "";
        this.ready = false;
    }

    connectedCallback() {
        super.connectedCallback();
        if (window.parent != window) return false;
        this.addEventListener("click", this._navigate);
        document.router.promiseCache(this.href).then(() => (this.ready = true));
    }

    _navigate() {
        if (this.ready) document.router.goTo(this.href);
    }

    render() {
        return html`<slot></slot>`;
    }
}