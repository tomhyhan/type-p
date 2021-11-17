import { BaseComponent } from './BaseComponent.js';
export class ImgVidComponent extends BaseComponent {
    constructor() {
        super(`
    <div>
        <label for="url">URL</label>
        <input type="text" name="url" id="url" required>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" required>        
    </div>
    `);
    }
    get url() {
        const url = this.element.querySelector('#url');
        return url.value;
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
}
//# sourceMappingURL=imgVidComponent.js.map