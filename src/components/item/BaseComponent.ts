export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
}

// Encapsulate the HTML element creation

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(innerHtml: string) {
    const template = document.createElement('template');
    template.innerHTML = innerHtml;
    this.element = template.content.firstElementChild! as T;
  }
  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
  removeFrom(parent: HTMLElement) {
    parent.removeChild(this.element);
  }
}
