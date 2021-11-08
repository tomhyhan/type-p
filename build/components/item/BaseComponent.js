export class BaseComponent {
    constructor(innerHtml) {
        const template = document.createElement('template');
        template.innerHTML = innerHtml;
        this.element = template.content.firstElementChild;
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
}
//# sourceMappingURL=BaseComponent.js.map