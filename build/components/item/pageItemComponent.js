import { BaseComponent } from './BaseComponent.js';
export class PageItemConponent extends BaseComponent {
    constructor() {
        super('<ul></ul>');
    }
    addChild(component) {
        component.attachTo(this.element);
    }
}
//# sourceMappingURL=pageItemComponent.js.map