import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { cart } from "./cart.js";

//create orders list
export let orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

//export method to add to order list and re-render
export function addToOrder() {
    // loop through cart, adding every item to orders
    const currOrder = [...cart];
    orders.push(currOrder);
    //reset cart
    cart.length = 0;

    //update local storage
    saveToStorage();
    localStorage.setItem('cart', JSON.stringify(cart));
    renderOrderSummary();
}
