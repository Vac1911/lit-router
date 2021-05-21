import Router from "./lib/Router";
import { HeroSection } from "./components/HeroSection";
import { ArticleList } from "./components/ArticleList";
import { ArticleView } from "./components/ArticleView";
import { NavSection } from "./components/NavSection";
import { CubeFlip } from "./components/CubeFlip";
import { RouterLink } from "./lib/RouterLink";

customElements.define("hero-section", HeroSection);
customElements.define("article-list", ArticleList);
customElements.define("article-view", ArticleView);
customElements.define("nav-section", NavSection);
customElements.define("router-link", RouterLink);
customElements.define("cube-flip", CubeFlip);

document.body.style.visibility = "visible";