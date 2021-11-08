export class TextComponent {
  private node: HTMLElement;
  constructor(title: string, text: string) {
    this.node = document.createElement('li');
    this.node.innerHTML = `
    <section class="text-template">
        <h2 class="text-title">Hello</h2>
        <p class="text-body">asdfasdfasfd</p>
    </section>
      `;
    const node = this.node.firstElementChild!;

    const textTitle = node.querySelector('.text-title')! as HTMLHeadingElement;
    textTitle.innerHTML = `Title: ${title}`;

    const textBody = node.querySelector('.text-body')! as HTMLParagraphElement;
    textBody.textContent = text;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.node);
  }
}
