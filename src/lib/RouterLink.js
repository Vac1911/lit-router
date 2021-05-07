import { html, css, LitElement } from "lit";

export class RouterLink extends LitElement {
    static get styles() {
        return css`
        /* Just some styles to make this element look like <a>*/
            :host {
                color: #0d6efd;
                text-decoration: underline;
                cursor: pointer;
                display: inline-block;
            }
            :host:hover {
                color: #0a58ca;
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
        // if (window.parent != window) return false;
        // this.addEventListener("click", this._navigate);
        // window.promiseCache(this.href).then(() => (this.ready = true));
    }

    _navigate() {
        if (this.ready) window.goTo(this.href);
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define("router-link", RouterLink);
