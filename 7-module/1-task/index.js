import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  #categories = [];

  constructor(categories) {
    this.#categories = categories;
    this.#menuAssembly();
    this.#addEventListeners();
  }

  #menuAssembly() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">  
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const menuItem = this.#categories.map(category => createElement(`
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
    `));

    this.#ribbonSelect('inner').append(...menuItem);

    const ribbonActive = this.#ribbonSelect('inner').firstElementChild;
    ribbonActive.classList.add('ribbon__item_active');
  }

  
  #ribbonSelect(sel) {
    return this.elem.querySelector(`.ribbon__${sel}`);
  }

  #addEventListeners() {
    this.elem.onclick = (click) => {
      if (click.target.closest('.ribbon__item')) {
        this.#categorySelect(click);
      }

      if (click.target.closest('.ribbon__arrow_right')) {
        this.#right(); 
      }

      if (click.target.closest('.ribbon__arrow_left')) {
        this.#left();
      }
    };
    this.#ribbonSelect('inner').onscroll = this.#actionOnButton;
  }

  #categorySelect(click) {
    click.preventDefault();

    const ribbonItem = click.target.closest('[data-id]');
    const allItems = this.elem.querySelectorAll('.ribbon__item_active');

    for (let item of allItems) {
      item.classList.remove('ribbon__item_active');
    }

    ribbonItem.classList.add('ribbon__item_active');

    const ribbonEvent = new CustomEvent('ribbon-select', {
      detail: ribbonItem.dataset.id,
      bubbles: true
    });
    
    this.elem.dispatchEvent(ribbonEvent);
  }

  #right() {
    this.#ribbonSelect('inner').scrollBy(350, 0);
    this.#actionOnButton();
  }

  #left() {
    this.#ribbonSelect('inner').scrollBy(-350, 0);
    this.#actionOnButton();
  }

  #actionOnButton = () => {
    const scrollLeft = this.#ribbonSelect('inner').scrollLeft;
    const scrollWidth = this.#ribbonSelect('inner').scrollWidth;
    const clientWidth = this.#ribbonSelect('inner').clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft > 0) {
      this.#ribbonSelect('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.#ribbonSelect('arrow_left').classList.remove('ribbon__arrow_visible');
    }

    if (scrollRight > 0) {
      this.#ribbonSelect('arrow_right').classList.add('ribbon__arrow_visible');
    } else {
      this.#ribbonSelect('arrow_right').classList.remove('ribbon__arrow_visible');
    }
  }
}
