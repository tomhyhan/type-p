// import { ImageComponent } from './item/imageComponent.js';
// import { TextComponent } from './item/textComponent.js';
// import { VideoComponent } from './item/videoComponent.js';

import { BaseComponent, Component } from './item/BaseComponent.js';

export interface Composable {
  addChild(child: Component): void;
}

export interface ItemConponent extends Component, Composable {
  setOnCloseListener(listner: OnCloseListner): void;
  setOnDragStateListner(listner: OnDragStateListner<ItemConponent>): void;
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
  constructor(private itemComponent: ItemComponentConstructor) {
    super(`<ul class='page'></ul>`);

    this.element.addEventListener('dragover', (e: DragEvent) => {
      this.onDragOver(e);
    });

    this.element.addEventListener('drop', (e: DragEvent) => {
      this.onDragEnd(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDragEnd(e: DragEvent) {
    e.preventDefault();
  }

  addChild(child: ItemConponent) {
    const item = new this.itemComponent();
    item.attachTo(this.element);
    item.addChild(child);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
    item.setOnDragStateListner((target: ItemConponent, state: DragState) => {
      console.log(target, state);
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

    this.element.addEventListener('dragend', (e: DragEvent) => {
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
  setOnDragStateListner(listener: OnDragStateListner<PageItemConponent>) {
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
}
