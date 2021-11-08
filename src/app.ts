import { ImageComponent } from './components/item/imageComponent.js';
import { PageComponent } from './components/pageComponent.js';
//
class App {
  private readonly page: PageComponent;

  constructor(private appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      'https://picsum.photos/500/200',
      'Random Image'
    );
    image.attachTo(this.appRoot, 'beforeend');
  }
}

new App(document.querySelector('.main') as HTMLElement);
