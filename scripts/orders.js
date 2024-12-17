import {cart, addToCart} from "../data/cart.js";
import { orders } from "../data/orderList.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { products } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { formatCurrency } from "./utils/money.js"

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
  let fullHTML = "";
  //create header
  const today = dayjs();
  const dateString = today.format('MMMM D');
  let orderHeaderHTML = "";
  
  //create order html
  orders.forEach((order) => { 
    let total = 0;
    order.forEach((orderItem) => {
      const matchingItem = products.find(product => product.id === orderItem.productId);
      total += (matchingItem.priceCents * orderItem.quantity) + getDeliveryOption(orderItem.deliveryOptionId).priceCents;
    });

    orderHeaderHTML = `
    <div class="order-container"> 
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dateString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(total)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
        </div>
      </div>

      <div class="order-details-grid">
    `;
    let orderHTML = "";
    order.forEach((orderItem) => {
      //get product based on id
      const matchingItem = products.find(product => product.id === orderItem.productId);
      const deliveryTime = getDeliveryOption(orderItem.deliveryOptionId).deliveryDays;
      const deliveryDate = today.add(deliveryTime, "days").format('MMMM D');
      //generate html
      orderHTML += `
        <div class="product-image-container">
          <img src="${matchingItem.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
          </div>
          <div class="product-quantity">
            Quantity: ${orderItem.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id=${matchingItem.id}>
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
      `;
    });
    const endingHTML = `
      </div>
    </div>`;
    fullHTML = orderHeaderHTML + orderHTML + endingHTML + fullHTML;
  });
  document.querySelector('.js-orders-grid').innerHTML = fullHTML;
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
