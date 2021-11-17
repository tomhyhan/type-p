import { ImageComponent } from './components/item/imageComponent.js';
import { ImgVidComponent } from './components/item/imgVidComponent.js';
import { ModalComponent } from './components/item/modelComponent.js';
import { TextComponent } from './components/item/textComponent.js';
import { TextTodoComponent } from './components/item/textTodoComponent.js';
import { TodoComponent } from './components/item/todoComponent.js';
import { VideoComponent } from './components/item/videoComponent.js';
import { PageComponent, PageItemConponent, } from './components/pageComponent.js';
class App {
    constructor(appRoot, documentBody) {
        this.appRoot = appRoot;
        this.documentBody = documentBody;
        this.page = new PageComponent(PageItemConponent);
        this.page.attachTo(this.appRoot);
        this.page.addChild(new ImageComponent('https://picsum.photos/500/200', 'image title'));
        this.page.addChild(new ImageComponent('https://picsum.photos/500/200', 'image title'));
        this.page.addChild(new ImageComponent('https://picsum.photos/500/200', 'image title'));
        this.bindModalToComponent('image-form', ImgVidComponent, (input) => new ImageComponent(input.url, input.title));
        this.bindModalToComponent('vedio-form', ImgVidComponent, (input) => new VideoComponent(input.url, input.title));
        this.bindModalToComponent('note-form', TextTodoComponent, (input) => new TextComponent(input.title, input.body));
        this.bindModalToComponent('task-form', TextTodoComponent, (input) => new TodoComponent(input.title, input.body));
    }
    bindModalToComponent(selector, formComponent, makeSection) {
        const element = document.getElementById(selector);
        element.addEventListener('click', () => {
            const modal = new ModalComponent();
            const form = new formComponent();
            modal.addChild(form);
            modal.attachTo(this.documentBody);
            modal.setOnCloseListner(() => {
                modal.removeFrom(this.documentBody);
            });
            modal.setOnSubmitListner(() => {
                const section = makeSection(form);
                this.page.addChild(section);
                modal.removeFrom(this.documentBody);
            });
        });
    }
}
new App(document.querySelector('.main'), document.body);
//# sourceMappingURL=app.js.map