"use strict";
`
const modal = new ModalComponent();
const imgVid = new ImgVidComponent();

modal.addChild(imgVid);
modal.attachTo(this.appRoot);
modal.setOnCloseListner(() => {
  modal.removeFrom(this.appRoot);
});
modal.setOnSubmitListner(() => {
  const image = new ImageComponent(imgVid.url, imgVid.title);
  this.page.addChild(image);
  modal.removeFrom(this.appRoot);
});
`;
//# sourceMappingURL=createItem.js.map