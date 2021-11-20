// import { ImageComponent } from './item/imageComponent.js';
// import { TextComponent } from './item/textComponent.js';
// import { VideoComponent } from './item/videoComponent.js';

import { BaseComponent, Component } from './item/BaseComponent.js';

export interface Composable {
  addChild(child: Component): void;
}

export interface ItemConponent extends Component, Composable {
  setOnCloseListener(listner: OnCloseListner): void;
  setOnDragStateListener(listner: OnDragStateListner<ItemConponent>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
}

export type ItemComponentConstructor = {
  new (): ItemConponent;
};

export type OnCloseListner = () => void;

type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListner<T extends Component> = (
  target: T,
  state: DragState
) => void;

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private children = new Set<ItemConponent>();
  private dragTarget?: ItemConponent;
  private dropTarget?: ItemConponent;
  constructor(private itemComponent: ItemComponentConstructor) {
    super(`<ul class='page'></ul>`);

    this.element.addEventListener('dragover', (e: DragEvent) => {
      this.onDragOver(e);
    });

    this.element.addEventListener('drop', (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    if (!this.dropTarget) return;
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcElement.y ? 'beforebegin' : 'afterend'
      );
    }
  }

  addChild(child: ItemConponent) {
    const item = new this.itemComponent();
    item.attachTo(this.element);
    item.addChild(child);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener((target: ItemConponent, state: DragState) => {
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

  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((item: ItemConponent) => {
      item.muteChildren(state);
    });
  }
}

export class PageItemConponent
  extends BaseComponent<HTMLElement>
  implements ItemConponent
{
  private closeListener?: OnCloseListner;
  private dragStateListner?: OnDragStateListner<PageItemConponent>;
  constructor() {
    super(`
    <li class='pageItem' draggable="true">
      <section class='pageItem--body'></section>
      <button class='remove-btn'>&#10006</button>
    </li>`);

    const closeBtn = this.element.querySelector(
      '.remove-btn'
    )! as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });

    this.element.addEventListener('dragstart', (e: DragEvent) => {
      this.onDragStart(e);
    });

    this.element.addEventListener('dragend', (e: DragEvent) => {
      this.onDragEnd(e);
    });

    this.element.addEventListener('dragenter', (e: DragEvent) => {
      this.onDragEnter(e);
    });

    this.element.addEventListener('dragleave', (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start');
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListner && this.dragStateListner(this, state);
  }

  setOnDragStateListener(listener: OnDragStateListner<PageItemConponent>) {
    this.dragStateListner = listener;
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      '.pageItem--body'
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listner: OnCloseListner) {
    this.closeListener = listner;
  }
  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-Children');
    } else {
      this.element.classList.remove('mute-Children');
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
