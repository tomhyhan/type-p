// import { ImageComponent } from './item/imageComponent.js';
// import { TextComponent } from './item/textComponent.js';
// import { VideoComponent } from './item/videoComponent.js';

import { BaseComponent } from './item/BaseComponent.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    super("<ul class='page'>Page Component Works!</ul>");
  }
}
