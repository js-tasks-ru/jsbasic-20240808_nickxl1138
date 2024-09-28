import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel;
    let ribbonMenu;
    let stepSlider;
    let cartIcon;
    let cart;
    let productsGrid;

    function getElem(elem) {
      return document.querySelector(`[data-${elem}-holder]`);
    }

    stepSlider = new StepSlider({ 
      steps: 5, 
      value: 3, 
    });

    function renderBase() {
      carousel = new Carousel(slides);
      ribbonMenu = new RibbonMenu(categories);

      cartIcon = new CartIcon();
      cart = new Cart(cartIcon);

      getElem('carousel').append(carousel.elem);
      getElem('ribbon').append(ribbonMenu.elem);
      getElem('slider').append(stepSlider.elem);
      getElem('cart-icon').append(cartIcon.elem);
    }

    const products = await fetch(`products.json`)
    .then(resp => resp.json());

    function renderProductsGrid() {
      productsGrid = new ProductsGrid(products);
      getElem('products-grid').innerHTML = '';
      getElem('products-grid').append(productsGrid.elem);
    }

    renderBase();
    renderProductsGrid();

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: categories[0].id
    });

    document.body.addEventListener('product-add', function(event) {
      const product = products.find(product => product.id == event.detail);
      cart.addProduct(product);
    });

    stepSlider.elem.addEventListener('slider-change', function(event) {
      productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    ribbonMenu.elem.addEventListener('ribbon-select', function(event) {
      productsGrid.updateFilter({ category: event.detail });
    });

    document.body.addEventListener('change', function (event) {
      if (event.target.closest('[id="nuts-checkbox"]')) {
        productsGrid.updateFilter({
          noNuts: event.target.closest('[id="nuts-checkbox"]').checked
        });
      }

      if (event.target.closest('[id="vegeterian-checkbox"]')) {
        productsGrid.updateFilter({
          vegeterianOnly: event.target.closest('[id="vegeterian-checkbox"]').checked
        });
      }
    });
  }
}
