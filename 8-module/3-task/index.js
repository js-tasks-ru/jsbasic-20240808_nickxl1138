export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems
    .map(item => item.count)
    .reduce((sum, current) => sum + current, 0);
  }

  getTotalPrice() {
    return this.cartItems
    .map(item => item.count * item.product.price)
    .reduce((sum, current) => sum + current, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

