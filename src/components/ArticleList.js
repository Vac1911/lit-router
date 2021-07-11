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
                width: 1280px;
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
        return {
            count: {type: Number},
            articles: {type: Array, state: true}
        };
    }

    constructor() {
        super();
        this.route = new RouteController(this);
        this.count = 2;
        this.articles = [];
        this.fetchRecords();
    }

    fetchRecords() {
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                this.articles = data;
                this.requestUpdate();
            });
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
        if(cache.props.count) {
            this.count = cache.props.count;
            console.log(cache);
        }
    }

    render() {
        const itemTemplates = [];
        for (let i = 0; i < this.count; i++) {
            if(this.articles[i]) itemTemplates.push(html`<article-card .id="${this.articles[i].id}" .title="${this.articles[i].title}" .createdAt="${this.articles[i].created_at}"></article-card>`);
            else itemTemplates.push(html`<article-card></article-card>`);
        }
        return html`<div class="wrapper">
            ${itemTemplates}
        </div>`;
    }
}
