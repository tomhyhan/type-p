import { BaseComponent } from './item/BaseComponent.js';
export class PageComponent extends BaseComponent {
    constructor(itemComponent) {
        super(`<ul class='page'></ul>`);
        this.itemComponent = itemComponent;
        this.children = new Set();
        this.element.addEventListener('dragover', (e) => {
            this.onDragOver(e);
        });
        this.element.addEventListener('drop', (e) => {
            this.onDrop(e);
        });
    }
    onDragOver(e) {
        e.preventDefault();
    }
    onDrop(e) {
        e.preventDefault();
        if (!this.dropTarget)
            return;
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = e.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
        }
    }
    addChild(child) {
        const item = new this.itemComponent();
        item.attachTo(this.element);
        item.addChild(child);
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target, state) => {
            switch (state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    this.element.classList.add('lifted');
                    break;
                case 'stop':
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    this.element.classList.remove('lifted');
                    break;
                case 'enter':
                    this.dropTarget = target;
                    break;
                case 'leave':
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error('UnSupported ');
            }
        });
    }
    updateSections(state) {
        this.children.forEach((item) => {
            item.muteChildren(state);
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
        this.element.addEventListener('dragleave', (e) => {
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
    setOnDragStateListener(listener) {
        this.dragStateListner = listener;
    }
    addChild(child) {
        const container = this.element.querySelector('.pageItem--body');
        child.attachTo(container);
    }
    setOnCloseListener(listner) {
        this.closeListener = listner;
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-Children');
        }
        else {
            this.element.classList.remove('mute-Children');
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
}
//# sourceMappingURL=pageComponent.js.map