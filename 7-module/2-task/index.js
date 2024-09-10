import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;
  
  constructor() {
    this.#makeModal();
    this.#addEventListeners();
  }

  #makeModal () {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
    `);
  }

  #addEventListeners() {
    this.#modalSelect('close').onclick = () => {
      this.close();
    };
    document.addEventListener('keydown', this.#keydown);
  }
  
  #modalSelect(sel) {
    return this.elem.querySelector(`.modal__${sel}`);
  }

  #keydown = (key) => {
    if (key.code == 'Escape') {
      this.close();
    }
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.#keydown);
  }

  setTitle(title) {
    this.#modalSelect('title').textContent = title;
  }

  setBody(body) {
    this.#modalSelect('body').innerHTML = '';
    this.#modalSelect('body').append(body);
  }
}

