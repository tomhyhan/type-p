import { BaseComponent } from './item/BaseComponent.js';
export class PageComponent extends BaseComponent {
    constructor(itemComponent) {
        super(`<ul class='page'></ul>`);
        this.itemComponent = itemComponent;
        this.element.addEventListener('dragover', (e) => {
            this.onDragOver(e);
        });
        this.element.addEventListener('drop', (e) => {
            this.onDragEnd(e);
        });
    }
    onDragOver(e) {
        e.preventDefault();
    }
    onDragEnd(e) {
        e.preventDefault();
    }
    addChild(child) {
        const item = new this.itemComponent();
        item.attachTo(this.element);
        item.addChild(child);
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
        item.setOnDragStateListner((target, state) => {
            console.log(target, state);
        });
    }
}
export class PageItemConponent extends BaseComponent {
    constructor() {
        super(`
    <li class='pageItem' draggable="true">
      <section class='pageItem--body'></section>
      <button class='remove-btn'>&#10006</button>
    </li>`);
        const closeBtn = this.element.querySelector('.remove-btn');
        closeBtn.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });
        this.element.addEventListener('dragstart', (e) => {
            this.onDragStart(e);
        });
        this.element.addEventListener('dragend', (e) => {
            this.onDragEnd(e);
        });
        this.element.addEventListener('dragenter', (e) => {
            this.onDragEnter(e);
        });
        this.element.addEventListener('dragend', (e) => {
            this.onDragLeave(e);
        });
    }
    onDragStart(_) {
        this.notifyDragObservers('start');
    }
    onDragEnd(_) {
        this.notifyDragObservers('stop');
    }
    onDragEnter(_) {
        this.notifyDragObservers('enter');
    }
    onDragLeave(_) {
        this.notifyDragObservers('leave');
    }
    notifyDragObservers(state) {
        this.dragStateListner && this.dragStateListner(this, state);
    }
    setOnDragStateListner(listener) {
        this.dragStateListner = listener;
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