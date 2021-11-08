import { BaseComponent } from './BaseComponent.js';

export class ImageComponent extends BaseComponent<HTMLTemplateElement> {
  constructor(url: string, title: string) {
    super(`
    <section class="image-template">
        <img class='image-thumbnail'>
        <p class="image-title"></p>
        <button class='remove-btn'>&#10006</button>
    </section>
    `);

    const image = this.element.querySelector(
      '.image-thumbnail'
    )! as HTMLImageElement;
    image.src = url;
    image.alt = title;

    const imageTitle = this.element.querySelector(
      '.image-title'
    )! as HTMLParagraphElement;
    imageTitle.textContent = title;
  }
}
