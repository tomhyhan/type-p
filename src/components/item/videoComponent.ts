export class VideoComponent {
  private node: HTMLElement;
  constructor(url: string, title: string) {
    console.log(url);
    this.node = document.createElement('li');
    this.node.innerHTML = `
    <section class="video-template">
        <iframe class="video-body" width="620" height="250">
        </iframe>
        <p class="video-title"></p>
    </section>
      `;
    const node = this.node.firstElementChild!;
    const video = node.querySelector('.video-body')! as HTMLIFrameElement;
    video.src = url;

    const videoTitle = node.querySelector(
      '.video-title'
    )! as HTMLParagraphElement;
    videoTitle.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.node);
  }
}

//
