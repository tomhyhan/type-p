import { TextType } from '../../app.js';
import { BaseComponent } from './BaseComponent.js';

export class TextTodoComponent
  extends BaseComponent<HTMLTemplateElement>
  implements TextType
{
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
    const body = this.element.querySelector('#body')! as HTMLInputElement;
    return body.value;
  }

  get title() {
    const title = this.element.querySelector('#title')! as HTMLInputElement;
    return title.value;
  }
}
