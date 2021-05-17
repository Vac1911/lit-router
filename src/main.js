import Router from "./lib/Router";
import { HeroSection } from "./components/HeroSection";
import { ArticleList } from "./components/ArticleList";
import { ArticleView } from "./components/ArticleView";
import { RouterLink } from "./lib/RouterLink";

customElements.define("hero-section", HeroSection);
customElements.define("article-list", ArticleList);
customElements.define("article-view", ArticleView);
customElements.define("router-link", RouterLink);

document.body.style.visibility = "visible";