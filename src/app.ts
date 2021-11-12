import { Component } from './components/item/BaseComponent.js';
import { ImageComponent } from './components/item/imageComponent.js';
import { ModalComponent } from './components/item/modelComponent.js';
import { TextComponent } from './components/item/textComponent.js';
import { TodoComponent } from './components/item/todoComponent.js';
import { VideoComponent } from './components/item/videoComponent.js';
import {
  Composable,
  PageComponent,
  PageItemConponent,
} from './components/pageComponent.js';

//
class App {
  private readonly page: Component & Composable;
  constructor(private appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemConponent);
    this.page.attachTo(this.appRoot);

    const image = new ImageComponent(
      'https://picsum.photos/500/200',
      'Random Image'
    );

    this.page.addChild(image);

    const video = new VideoComponent(
      'https://www.youtube.com/watch?v=Pik2nUjG7OI',
      'Programming'
    );
    this.page.addChild(video);

    const todo = new TodoComponent('Here is your Todo', 'todo');
    this.page.addChild(todo);

    const note = new TextComponent('Here is your title', 'Here is your text');
    this.page.addChild(note);

    document.getElementById('image-form')?.addEventListener('click', () => {
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

    document.getElementById('vedio-form')?.addEventListener('click', () => {
      const modal = new ModalComponent();
      modal.attachTo(this.appRoot);
      modal.setOnCloseListner(() => {
        modal.removeFrom(this.appRoot);
      });
      modal.setOnSubmitListner(() => {
        modal.removeFrom(this.appRoot);
      });
    });

    document.getElementById('note-form')?.addEventListener('click', () => {
      const modal = new ModalComponent();
      modal.attachTo(this.appRoot);
      modal.setOnCloseListner(() => {
        modal.removeFrom(this.appRoot);
      });
      modal.setOnSubmitListner(() => {
        modal.removeFrom(this.appRoot);
      });
    });

    document.getElementById('task-from')?.addEventListener('click', () => {
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

new App(document.querySelector('.main') as HTMLElement);
