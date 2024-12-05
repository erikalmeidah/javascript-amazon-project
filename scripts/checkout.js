import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/PaymentSummary.js";
import { addToOrder } from "../data/orderList.js";
import { cart } from "../data/cart.js";

//render order summary to screen
renderOrderSummary();
renderPaymentSummary();
itemCounter();

//Place order button functionality
const placeOrderButton = document.querySelector('.js-place-order-button');
placeOrderButton.addEventListener("click", () => {
    addToOrder();
    location.href = "../orders.html";
});

//update checkout item count
export function itemCounter() {
    let count = 0;
    cart.forEach((cartItem) => {
        count += cartItem.quantity;
    });
    document.querySelector('.js-item-count').innerHTML = `${count} items`;
}

//delete button event listener to update itemCounter
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        renderOrderSummary();
        renderPaymentSummary();
        itemCounter();
    });
});

//update button event listener to update itemCounter
document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
        renderOrderSummary();
        renderPaymentSummary();
        itemCounter();
    });
});
