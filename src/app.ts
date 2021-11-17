import { Component } from './components/item/BaseComponent.js';
import { ImageComponent } from './components/item/imageComponent.js';
import { ImgVidComponent } from './components/item/imgVidComponent.js';
import { ModalComponent } from './components/item/modelComponent.js';
import { TextComponent } from './components/item/textComponent.js';
import { TextTodoComponent } from './components/item/textTodoComponent.js';
import { TodoComponent } from './components/item/todoComponent.js';
import { VideoComponent } from './components/item/videoComponent.js';
import {
  Composable,
  PageComponent,
  PageItemConponent,
} from './components/pageComponent.js';

export interface MediaType {
  readonly url: string;
  readonly title: string;
}

export interface TextType {
  readonly title: string;
  readonly body: string;
}

type FromContructor<T = (MediaType | TextType) & Component> = {
  new (): T;
};
class App {
  private readonly page: Component & Composable;
  constructor(private appRoot: HTMLElement, private documentBody: HTMLElement) {
    this.page = new PageComponent(PageItemConponent);
    this.page.attachTo(this.appRoot);

    //   'https://picsum.photos/500/200',
    //   'https://www.youtube.com/watch?v=Pik2nUjG7OI',
    this.page.addChild(
      new ImageComponent('https://picsum.photos/500/200', 'image title')
    );
    this.page.addChild(
      new ImageComponent('https://picsum.photos/500/200', 'image title')
    );
    this.page.addChild(
      new ImageComponent('https://picsum.photos/500/200', 'image title')
    );
    this.bindModalToComponent<ImgVidComponent>(
      'image-form',
      ImgVidComponent,
      (input: ImgVidComponent) => new ImageComponent(input.url, input.title)
    );

    this.bindModalToComponent<ImgVidComponent>(
      'vedio-form',
      ImgVidComponent,
      (input: ImgVidComponent) => new VideoComponent(input.url, input.title)
    );
    this.bindModalToComponent<TextTodoComponent>(
      'note-form',
      TextTodoComponent,
      (input: TextTodoComponent) => new TextComponent(input.title, input.body)
    );
    this.bindModalToComponent<TextTodoComponent>(
      'task-form',
      TextTodoComponent,
      (input: TextTodoComponent) => new TodoComponent(input.title, input.body)
    );
  }

  bindModalToComponent<T extends (MediaType | TextType) & Component>(
    selector: string,
    formComponent: FromContructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.getElementById(selector)! as HTMLElement;
    element.addEventListener('click', () => {
      const modal = new ModalComponent();
      const form = new formComponent();

      modal.addChild(form);
      modal.attachTo(this.documentBody);
      modal.setOnCloseListner(() => {
        modal.removeFrom(this.documentBody);
      });
      modal.setOnSubmitListner(() => {
        const section = makeSection(form); // returns component
        this.page.addChild(section);
        modal.removeFrom(this.documentBody);
      });
    });
  }
}

new App(document.querySelector('.main') as HTMLElement, document.body);
