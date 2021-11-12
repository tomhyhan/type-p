import { ImageComponent } from './components/item/imageComponent.js';
import { ModalComponent } from './components/item/modelComponent.js';
import { TextComponent } from './components/item/textComponent.js';
import { TodoComponent } from './components/item/todoComponent.js';
import { VideoComponent } from './components/item/videoComponent.js';
import { PageComponent, PageItemConponent, } from './components/pageComponent.js';
class App {
    constructor(appRoot) {
        var _a, _b, _c, _d;
        this.appRoot = appRoot;
        this.page = new PageComponent(PageItemConponent);
        this.page.attachTo(this.appRoot);
        const image = new ImageComponent('https://picsum.photos/500/200', 'Random Image');
        this.page.addChild(image);
        const video = new VideoComponent('https://www.youtube.com/watch?v=Pik2nUjG7OI', 'Programming');
        this.page.addChild(video);
        const todo = new TodoComponent('Here is your Todo', 'todo');
        this.page.addChild(todo);
        const note = new TextComponent('Here is your title', 'Here is your text');
        this.page.addChild(note);
        (_a = document.getElementById('image-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            const modal = new ModalComponent();
            modal.attachTo(this.appRoot);
            modal.setOnCloseListner(() => {
                modal.removeFrom(this.appRoot);
            });
            modal.setOnSubmitListner(() => {
                console.log('submited');
                modal.removeFrom(this.appRoot);
            });
        });
        (_b = document.getElementById('vedio-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            const modal = new ModalComponent();
            modal.attachTo(this.appRoot);
            modal.setOnCloseListner(() => {
                modal.removeFrom(this.appRoot);
            });
            modal.setOnSubmitListner(() => {
                modal.removeFrom(this.appRoot);
            });
        });
        (_c = document.getElementById('note-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            const modal = new ModalComponent();
            modal.attachTo(this.appRoot);
            modal.setOnCloseListner(() => {
                modal.removeFrom(this.appRoot);
            });
            modal.setOnSubmitListner(() => {
                modal.removeFrom(this.appRoot);
            });
        });
        (_d = document.getElementById('task-from')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
            const modal = new ModalComponent();
            modal.attachTo(this.appRoot);
            modal.setOnCloseListner(() => {
                modal.removeFrom(this.appRoot);
            });
            modal.setOnSubmitListner(() => {
                modal.removeFrom(this.appRoot);
            });
        });
    }
}
new App(document.querySelector('.main'));
//# sourceMappingURL=app.js.map