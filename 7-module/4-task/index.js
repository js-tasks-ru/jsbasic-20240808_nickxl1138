import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#makeStepSlider();
    this.#addEventListeners();
    this.#sliderActive(this.#value);
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
    
    for (let i = 0; i <= this.#steps - 1; i++) {
      span += `<span></span>`;
    }

    return span;
  }

  #sliderSelect(sel) {
    return this.elem.querySelector(`.slider__${sel}`);
  }

  #addEventListeners() {
    this.elem.addEventListener('click', this.#sliderOnClick);
    this.#sliderSelect('thumb').addEventListener('pointerdown', this.#onPointerDown);
    this.#sliderSelect('thumb').ondragstart = () => false;
  }

  #sliderOnClick = (event) => {
    const result = this.#calculate(event);

    this.#sliderActive(result.value, result.valuePercents);
    this.#setCustomEvent(result.value);
  }
  
  #calculate = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    const segments = this.#steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);
    const valuePercents = value / segments * 100;
    const leftPercents = leftRelative * 100;

    const result = {
      value: value,
      valuePercents: valuePercents,
      leftPercents: leftPercents
    };

    return result;
  }

  #sliderActive = (value, valuePercents) => {
    if (!valuePercents) {
      valuePercents = value / (this.#steps - 1) * 100;
    }

    const activeAdd = this.#sliderSelect('steps').children[value];
    const allItems = this.elem.querySelectorAll('.slider__step-active');

    for (let item of allItems) {
      item.classList.remove('slider__step-active');
    }

    activeAdd.classList.add('slider__step-active');

    this.#sliderSelect('value').textContent = value;
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

  #onPointerDown = (event) => {
    event.preventDefault();

    document.addEventListener('pointermove', this.#thumbMove);
    document.addEventListener('pointerup', this.#thumbStop);
  }

  #thumbMove = (event) => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    const result = this.#calculate(event);

    this.#sliderSelect('thumb').style.left = `${result.leftPercents}%`;
    this.#sliderSelect('progress').style.width = `${result.leftPercents}%`;
    this.#setCustomEvent(result.value);
  }

  #thumbStop = (event) => {
    document.removeEventListener('pointermove', this.#thumbMove);
    document.removeEventListener('pointerup', this.#thumbStop);

    this.elem.classList.remove('slider_dragging');

    const result = this.#calculate(event);

    this.#setCustomEvent(result.value);
  }
}

