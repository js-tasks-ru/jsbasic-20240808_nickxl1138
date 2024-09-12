import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#makeStepSlider();
    this.elem.addEventListener('click', this.#sliderOnClick);
  }

  #makeStepSlider() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0%;"></div>
        <div class="slider__steps">
          ${this.#makeSpan()}
        </div>
      </div>`);

    const spanActive = this.#sliderSelect('steps').firstElementChild;
    spanActive.classList.add('slider__step-active');
  }

  #makeSpan() {
    let span = '';
    
    for (let i = this.#value; i <= this.#steps - 1; i++) {
      span += `<span></span>`;
    }

    return span;
  }

  #sliderSelect(sel) {
    return this.elem.querySelector(`.slider__${sel}`);
  }

  #sliderOnClick = (click) => {
    const left = click.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.#steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);
    const valuePercents = value / segments * 100;

    this.#sliderSelect('value').textContent = value;
    this.#sliderActive(value);
    this.#thumbShift(valuePercents);
    this.#setCustomEvent(value);
  }

  #sliderActive = (value) => {
    const activeAdd = this.#sliderSelect('steps').children[value];
    const allItems = this.elem.querySelectorAll('.slider__step-active');

    for (let item of allItems) {
      item.classList.remove('slider__step-active');
    }

    activeAdd.classList.add('slider__step-active');
  }

  #thumbShift = (valuePercents) => {
    this.#sliderSelect('thumb').style.left = `${valuePercents}%`;
    this.#sliderSelect('progress').style.width = `${valuePercents}%`;
  }

  #setCustomEvent(value) {
    const sliderEvent = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });
    
    this.elem.dispatchEvent(sliderEvent);
  }
}
