import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let productInCard = this.cartItems.find(item => item.product.id == product.id);

    const cartItem = {
      product: product,
      count: 1
    };

    if (productInCard) {
      productInCard.count++;

    } else {
      productInCard = cartItem;
      this.cartItems.push(productInCard);
    }
    
    this.onProductUpdate(productInCard);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id == productId);
    const cartItemIndex = this.cartItems.indexOf(cartItem);

    cartItem.count += amount;

    if (cartItem.count == 0) {
      this.cartItems.splice(cartItemIndex, 1);
    }
    
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    return this.cartItems
    .reduce((sum, current) => sum + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems
    .reduce((sum, current) => sum + current.count * current.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modalDiv = document.createElement('div');

    this.cartItems.map(item => this.modalDiv.append(this.renderProduct(item.product, item.count)));
    this.modalDiv.append(this.renderOrderForm());

    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modal.setBody(this.modalDiv);
    this.modal.open();

    this.modalDiv.onclick = (click) => {
      if (click.target.closest('.cart-counter__button')) {
        const productId = click.target.closest("[data-product-id]").dataset.productId;
        let amount;

        if (click.target.closest('.cart-counter__button_plus')) {
          amount = 1;
        } else {
          amount = -1;
        }
        
        this.updateProductCount(productId, amount);
      }
    };
    
    this.modalDiv.querySelector('form').onsubmit = (event) => {
      this.onSubmit(event);
    };
  }

  onProductUpdate(cartItem) {
    if (document.querySelector('.is-modal-open')) {
      if (this.isEmpty()) {
        this.modal.close();

      } else {
        const productId = cartItem.product.id;
        const productCount = this.modalDiv.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        const productPrice = this.modalDiv.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        const infoPrice = this.modalDiv.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

        if (cartItem.count == 0) {
          this.modalDiv.querySelector(`[data-product-id="${productId}"]`).remove();
        }
      }
    }

    this.cartIcon.update(this);
  }


  onSubmit(event) {
    event.preventDefault();

    const form = document.forms[0];
    form.querySelector('[type="submit"]').classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modalDiv.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `;
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

