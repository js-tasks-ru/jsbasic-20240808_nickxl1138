import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  #slides = [];

  constructor(slides) {
    this.#slides = slides;
    this.elem = this.#makeCarousel();
    this.slideWidthSum = 0;
  }

  #makeCarousel() {
    this.elem = createElement(this.#carouselAssembly());
    this.elem.addEventListener('click', this.#initCarousel);

    const leftButtonToHide = this.elem.querySelector('.carousel__arrow_left');
    leftButtonToHide.style.display = 'none';

    return this.elem;
  }

  #initCarousel = (click) => {
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const slides = this.elem.querySelector('.carousel__inner');
    const slidesAmount = this.elem.querySelectorAll('.carousel__slide').length;


    if (click.target.closest('.carousel__button')) {
      const buttonEvent = new CustomEvent("product-add", {
        detail: click.target.closest('.carousel__slide').dataset.id,
        bubbles: true
      });
  
      this.elem.dispatchEvent(buttonEvent);
    }
  
    if (click.target.closest('.carousel__arrow_right')) {
      arrowLeft.style.display = '';
      this.slideWidthSum += slides.offsetWidth;
      slides.style.transform = `translateX(${-this.slideWidthSum}px)`;
      
      if (this.slideWidthSum >= slides.offsetWidth * (slidesAmount - 1)) {
        arrowRight.style.display = 'none';
      }
    }
  
    if (click.target.closest('.carousel__arrow_left')) {
      arrowRight.style.display = '';
      this.slideWidthSum -= slides.offsetWidth;
      slides.style.transform = `translateX(${-this.slideWidthSum}px)`;
      
      if (this.slideWidthSum <= 0) {
        arrowLeft.style.display = 'none';
      }
    }
  }

  #carouselAssembly() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.#slides
            .map(slide => `
              <div class="carousel__slide" data-id="${slide.id}">
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>
              `)
            .join('')}
        </div>
      </div>
    `;
  }
}



