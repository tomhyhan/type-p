export class BaseComponent {
    constructor(innerHtml) {
        const template = document.createElement('template');
        template.innerHTML = innerHtml;
        this.element = template.content.firstElementChild;
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
    removeFrom(parent) {
        parent.removeChild(this.element);
    }
    attach(component, position = 'beforebegin') {
        component.attachTo(this.element, position);
    }
}
//# sourceMappingURL=BaseComponent.js.map