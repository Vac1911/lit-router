import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";
import { flip } from "@lit-labs/motion";

export class CubeFlip extends LitElement {
    static properties = { shifted: {} };
    static styles = css`
        :host {
            display: block;
            position: relative;
            height: 150px;
        }

        .box {
            position: absolute;
            width: 100px;
            height: 100px;
            background: steelblue;
            top: calc(50% - 50px);
            border-radius: 50%;
        }

        .shifted {
            right: 0;
        }
    `;

    render() {
        const animateIn = [{transform: 'translateY(-100%)', opacity: 0}, {opacity: 1}];
        const animateOut = [{opacity: 1}, {transform: 'translateY(-100%)', opacity: 0}];
        return html`
            <button @click=${this._toggle}>Move</button>
            <div class="box ${this.shifted ? "shifted" : ""}" ${flip({skipInitial: false, in: animateIn, out: animateOut})}></div>
        `;
    }

    _toggle() {
        this.shifted = !this.shifted;
    }
}
