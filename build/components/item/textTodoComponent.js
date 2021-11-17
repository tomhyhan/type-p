import { BaseComponent } from './BaseComponent.js';
export class TextTodoComponent extends BaseComponent {
    constructor() {
        super(`
    <form class="textTodo-form">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" required>
        <label for="body">Body</label>
        <input type="body" name="body" id="body" required>
    </form>
    `);
    }
    get body() {
        const body = this.element.querySelector('#body');
        return body.value;
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
}
//# sourceMappingURL=textTodoComponent.js.map