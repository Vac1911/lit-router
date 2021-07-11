import { html, css, LitElement } from "lit";
import { RouteController } from "../lib/RouteController";
import { DateTime } from "luxon";

export class ArticleCard extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
                position: relative;
                overflow: hidden;
                border: 1px solid var(--color-border-primary);
                background-color: var(--color-bg-primary);
                border-radius: 6px;
            }

            .thumbnail-wrapper {
                display: block;
            }

            .thumbnail-wrapper > * {
                height: 100%;
            }

            .thumbnail-placeholder {
                font-size: 1.125rem;
                text-anchor: middle;
                user-select: none;
            }

            .card-body {
                display: flex;
                flex: 1;
                flex-direction: column;
                gap: 0.75rem;
                padding: 1.5rem 2rem;
            }

            .card-heading {
                font-weight: 600;
                font-size: 18px;
                margin: 0;
            }
            .card-header {
                display:flex;
                justify-content: space-between;
            }
            .card-text {
                flex: 1
            }
        `;
    }

    static get properties() {
        return {
            id: {type: String},
            title: {type: String},
            createdAt: {type: Number}
        };
    }

    constructor() {
        super();
        this.id = null;
        this.title = null;
        this.createdAt = null;
    }

    get createdAtRelative() {
        return this.createdAt ? html`${DateTime.fromSeconds(this.createdAt).toRelative()}` : '-'
    }

    render() {
        return html`
            <div class="card-body">
                <div class="">
                    <span class="badge bg-primary">World</span>
                </div>
                <div class="card-header">
                    <h2 class="card-heading">
                        ${this.title ?? '-'}
                    </h2>
                    <small>
                        ${this.createdAtRelative}
                    </small>
                </div>
                <div class="card-text">Article summary go here.</div>
                <div class="mt-auto">
                    ${this.id ? html`<router-link href="/articles/${this.id}">Continue Reading</router-link>` : ''}
                </div>
            </div>
            <div class="thumbnail-wrapper">
                <svg class="thumbnail-placeholder" width="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="var(--color-bg-backdrop)"></rect>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                </svg>
            </div>
        `;
    }
}