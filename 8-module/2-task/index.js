import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#makeProductGrid();
  }

  #makeProductGrid() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`);

    this.#makeCard();
  }

  #makeCard() {
    this.products.map(product => {
      if (this.filters.noNuts && product.nuts) {
        return;
      }
      
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return;
      }
      
      if (this.filters.maxSpiciness < product.spiciness) {
        return;
      }
      
      if (this.filters.category && this.filters.category !== product.category) {
        return;
      }

      const card = new ProductCard(product);
      this.#productsGrid().append(card.elem);
    });
  }

  #productsGrid() {
    return this.elem.querySelector('.products-grid__inner');
  }

  updateFilter (filters) {
    this.#productsGrid().innerHTML = '';
    this.filters = { ...this.filters, ...filters };
    this.#makeCard();
  }
}

