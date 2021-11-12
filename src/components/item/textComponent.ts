import { BaseComponent } from './BaseComponent.js';

export class TextComponent extends BaseComponent<HTMLTemplateElement> {
  constructor(title: string, text: string) {
    super(`
    <section class="text-template">
      <h2 class="text-title"></h2>
      <p class="text-body"></p>
    </section>
      `);

    const textTitle = this.element.querySelector(
      '.text-title'
    )! as HTMLHeadingElement;
    textTitle.innerHTML = `Title: ${title}`;

    const textBody = this.element.querySelector(
      '.text-body'
    )! as HTMLParagraphElement;
    textBody.textContent = text;
  }
}
