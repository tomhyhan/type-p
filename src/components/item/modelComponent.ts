import { Composable, OnCloseListner } from '../pageComponent.js';
import { BaseComponent, Component } from './BaseComponent.js';

type OnSubmitListner = () => void;
export interface Modal extends Composable, Component {
  setOnCloseListner(listener: OnCloseListner): void;
  setOnSubmitListner(listener: OnSubmitListner): void;
}
export class ModalComponent
  extends BaseComponent<HTMLElement>
  implements Modal
{
  private closeListener?: OnCloseListner;
  private submitListener?: OnSubmitListner;
  constructor() {
    super(`
        <div id="myModal" class="modal">
            Modal content
            <div class="modal-content">
                <span class="remove-btn">&times;</span>
                <section class="modal-body"></section>
            </div>
            <button class="submit-btn">Add</button>
        </div>
        `);

    const closeBtn = this.element.querySelector('.remove-btn');
    closeBtn?.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });

    const submitBtn = this.element.querySelector('.submit-btn');
    submitBtn?.addEventListener('click', () => {
      this.submitListener && this.submitListener();
    });
  }

  setOnCloseListner(listener: OnCloseListner) {
    this.closeListener = listener;
  }

  setOnSubmitListner(listener: OnSubmitListner) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const body = this.element.querySelector('.modal-body')! as HTMLElement;
    child.attachTo(body);
  }
}
