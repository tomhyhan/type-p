export class VideoComponent {
    constructor(url, title) {
        console.log(url);
        this.node = document.createElement('li');
        this.node.innerHTML = `
    <section class="video-template">
        <iframe class="video-body" width="620" height="250">
        </iframe>
        <p class="video-title"></p>
    </section>
      `;
        const node = this.node.firstElementChild;
        const video = node.querySelector('.video-body');
        video.src = url;
        const videoTitle = node.querySelector('.video-title');
        videoTitle.textContent = title;
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.node);
    }
}
//# sourceMappingURL=videoComponent.js.map