//import cart and products
import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function generateProductGrid(products) {
  // Generate products html
let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select id="${product.id}-quantity">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
  });
  // Put generated html into page
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
};
generateProductGrid(products);

// Add to cart event listener
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

const AddToCartElements = document.querySelectorAll('.js-add-to-cart');
AddToCartElements.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = Number(document.getElementById(`${productId}-quantity`).value);
      addToCart(productId, quantity);
      updateCartQuantity();
      document.querySelector(`.js-added-to-cart${productId}`).style.opacity = 1;
      setTimeout(() => {document.querySelector(`.js-added-to-cart${productId}`).style.opacity = 0}, 2500);
    });
});

//filter using search bar
const searchButton = document.querySelector('.js-search-button');
searchButton.addEventListener('click', () => {
  const text = document.querySelector('.js-search-bar').value.toLowerCase();
  let filteredProducts = [];
  products.forEach((product) => {
    if(product.name.includes(text)) {
      filteredProducts.push(product);
    }
  });

  if(text !== "") {
    generateProductGrid(filteredProducts);
  }else{
    generateProductGrid(products);
  }
});