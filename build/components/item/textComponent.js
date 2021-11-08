export class TextComponent {
    constructor(title, text) {
        this.node = document.createElement('li');
        this.node.innerHTML = `
    <section class="text-template">
        <h2 class="text-title">Hello</h2>
        <p class="text-body">asdfasdfasfd</p>
    </section>
      `;
        const node = this.node.firstElementChild;
        const textTitle = node.querySelector('.text-title');
        textTitle.innerHTML = `Title: ${title}`;
        const textBody = node.querySelector('.text-body');
        textBody.textContent = text;
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.node);
    }
}
//# sourceMappingURL=textComponent.js.map