import { BaseComponent } from './BaseComponent.js';

export class TodoComponent extends BaseComponent<HTMLTemplateElement> {
  constructor(title: string, text: string) {
    super(`
    <section class="todo-template">
      <h2 class="todo-title"></h2>
      <p class="todo-body"></p>
    </section>
      `);

    const todoTitle = this.element.querySelector(
      '.todo-title'
    )! as HTMLHeadingElement;
    todoTitle.innerHTML = `Title: ${title}`;

    const todoBody = this.element.querySelector(
      '.todo-body'
    )! as HTMLParagraphElement;
    todoBody.textContent = text;
  }
}
