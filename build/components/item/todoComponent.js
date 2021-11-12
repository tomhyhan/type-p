import { BaseComponent } from './BaseComponent.js';
export class TodoComponent extends BaseComponent {
    constructor(title, text) {
        super(`
    <section class="todo-template">
      <h2 class="todo-title"></h2>
      <p class="todo-body"></p>
    </section>
      `);
        const todoTitle = this.element.querySelector('.todo-title');
        todoTitle.innerHTML = `Title: ${title}`;
        const todoBody = this.element.querySelector('.todo-body');
        todoBody.textContent = text;
    }
}
//# sourceMappingURL=todoComponent.js.map