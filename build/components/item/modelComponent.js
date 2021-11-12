import { BaseComponent } from './BaseComponent.js';
export class ModalComponent extends BaseComponent {
    constructor() {
        super(`
        <div id="myModal" class="modal">
            Modal content
            <div class="modal-content">
                <span class="remove-btn">&times;</span>
                <section class="modal-body"></section>
            </div>
            <button class="submit-btn">Add</button>
        </div>
        `);
        const closeBtn = this.element.querySelector('.remove-btn');
        closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });
        const submitBtn = this.element.querySelector('.submit-btn');
        submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', () => {
            this.submitListener && this.submitListener();
        });
    }
    setOnCloseListner(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListner(listener) {
        this.submitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('.modal-body');
        child.attachTo(body);
    }
}
//# sourceMappingURL=modelComponent.js.map