import './lib/Router';

import './components/HeroSection';
import './components/ArticleList';
import './lib/RouterLink';

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('init')
    window.router.init();
});

document.body.style.visibility = 'visible';