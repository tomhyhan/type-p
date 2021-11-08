import { ImageComponent } from './components/item/imageComponent.js';
import { PageComponent } from './components/pageComponent.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('https://picsum.photos/500/200', 'Random Image');
        image.attachTo(this.appRoot, 'beforeend');
    }
}
new App(document.querySelector('.main'));
//# sourceMappingURL=app.js.map