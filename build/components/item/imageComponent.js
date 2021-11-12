import { BaseComponent } from './BaseComponent.js';
export class ImageComponent extends BaseComponent {
    constructor(url, title) {
        super(`
    <section class="image-template">
        <img class='image-thumbnail'>
        <p class="image-title"></p>
    </section>
    `);
        const image = this.element.querySelector('.image-thumbnail');
        image.src = url;
        image.alt = title;
        const imageTitle = this.element.querySelector('.image-title');
        imageTitle.textContent = title;
    }
}
//# sourceMappingURL=imageComponent.js.map