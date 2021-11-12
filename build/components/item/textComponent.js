import { BaseComponent } from './BaseComponent.js';
export class TextComponent extends BaseComponent {
    constructor(title, text) {
        super(`
    <section class="text-template">
      <h2 class="text-title"></h2>
      <p class="text-body"></p>
    </section>
      `);
        const textTitle = this.element.querySelector('.text-title');
        textTitle.innerHTML = `Title: ${title}`;
        const textBody = this.element.querySelector('.text-body');
        textBody.textContent = text;
    }
}
//# sourceMappingURL=textComponent.js.map