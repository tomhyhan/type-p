import { BaseComponent } from './item/BaseComponent.js';
export class PageComponent extends BaseComponent {
    constructor(itemComponent) {
        super(`<ul class='page'></ul>`);
        this.itemComponent = itemComponent;
    }
    addChild(child) {
        const item = new this.itemComponent();
        item.attachTo(this.element);
        item.addChild(child);
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}
export class PageItemConponent extends BaseComponent {
    constructor() {
        super(`
    <li class='pageItem'>
      <section class='pageItem--body'></section>
      <button class='remove-btn'>&#10006</button>
    </li>`);
        const closeBtn = this.element.querySelector('.remove-btn');
        closeBtn.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });
    }
    addChild(child) {
        const container = this.element.querySelector('.pageItem--body');
        child.attachTo(container);
    }
    setOnCloseListener(listner) {
        this.closeListener = listner;
    }
}
//# sourceMappingURL=pageComponent.js.map