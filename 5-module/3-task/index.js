function initCarousel() {
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let slides = document.querySelector('.carousel__inner');
  let slideWidthSum = 0;

  arrowLeft.style.display = 'none';

  arrowRight.onclick = function () {
    arrowLeft.style.display = '';
    slideWidthSum += slides.offsetWidth;
    slides.style.transform = `translateX(${-slideWidthSum}px)`;
    
    if (slideWidthSum >= slides.offsetWidth * 3) {
      arrowRight.style.display = 'none';
    }
  };

  arrowLeft.onclick = function () {
    arrowRight.style.display = '';
    slideWidthSum -= slides.offsetWidth;
    slides.style.transform = `translateX(${-slideWidthSum}px)`;
    
    if (slideWidthSum <= 0) {
      arrowLeft.style.display = 'none';
    }
  };
}
