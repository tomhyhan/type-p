import { BaseComponent } from './BaseComponent.js';

export class VideoComponent extends BaseComponent<HTMLTemplateElement> {
  constructor(url: string, title: string) {
    super(`
    <section class="video-template">
        <iframe allow="fullscreen;" class="video-body" >
        </iframe>
        <p class="video-title"></p>
    </section>
      `);
    const video = this.element.querySelector(
      '.video-body'
    )! as HTMLIFrameElement;
    video.src = this.createVideoLink(url);

    const videoTitle = this.element.querySelector(
      '.video-title'
    )! as HTMLParagraphElement;
    videoTitle.textContent = title;
  }

  private createVideoLink(url: string): string {
    const IdRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/m;
    const matches = url.match(IdRegex);
    const videoId = matches ? matches[1] || matches[2] : null;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

// ^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))
