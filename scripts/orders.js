import {cart, addToCart} from "../data/cart.js";
import { orders } from "../data/orderList.js";

//function to update cart quantity based on cart list
function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-order-cart-quantity').innerHTML = cartQuantity;
}
updateCartQuantity();

//function to render orders html
function renderOrderPage() {
  console.log(orders);
    let orderHTML = '';
    orders.forEach((order) => {
        orderHTML += `
        <div class="order-container"> 
          <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>August 12</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$35.06</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
              </div>
            </div>

            <div class="order-details-grid">
              <div class="product-image-container">
                <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
              </div>

              <div class="product-details">
                <div class="product-name">
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 15
                </div>
                <div class="product-quantity">
                  Quantity: 1
                </div>
                <button class="buy-again-button button-primary js-buy-again-button"
                data-product-id=${order.productId}>
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>

            </div>
          </div>
        </div>
        `;
    });
    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
} 
renderOrderPage();

//buy again button functionality
document.querySelectorAll('.js-buy-again-button').forEach((button) => {
  button.addEventListener("click", () => {
    //add item to cart
    addToCart(button.dataset.productId, 1);
    updateCartQuantity();

    //change text to &#x2713 added
    button.innerHTML = "&#x2713 Added!";
    setTimeout(() => {button.innerHTML = 
      `<img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>`}, 2500);
  });
});