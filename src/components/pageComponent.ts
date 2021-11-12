// import { ImageComponent } from './item/imageComponent.js';
// import { TextComponent } from './item/textComponent.js';
// import { VideoComponent } from './item/videoComponent.js';

import { BaseComponent, Component } from './item/BaseComponent.js';

export interface Composable {
  addChild(child: Component): void;
}

export interface ItemConponent extends Component, Composable {
  setOnCloseListener(listner: OnCloseListner): void;
}

export type ItemComponentConstructor = {
  new (): ItemConponent;
};

export type OnCloseListner = () => void;

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private itemComponent: ItemComponentConstructor) {
    super(`<ul class='page'></ul>`);
  }

  addChild(child: Component) {
    const item = new this.itemComponent();
    item.attachTo(this.element);
    item.addChild(child);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}

export class PageItemConponent
  extends BaseComponent<HTMLElement>
  implements ItemConponent
{
  private closeListener?: OnCloseListner;
  constructor() {
    super(`
    <li class='pageItem'>
      <section class='pageItem--body'></section>
      <button class='remove-btn'>&#10006</button>
    </li>`);

    const closeBtn = this.element.querySelector(
      '.remove-btn'
    )! as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });
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
