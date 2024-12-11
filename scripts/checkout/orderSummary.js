import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./PaymentSummary.js";

// generate html based on cart
export function renderOrderSummary() {
    let cartSummaryHTML = '';
    if(cart.length === 0){
        cartSummaryHTML = `
        <div style="display:grid;">
            <span>
                Your cart is empty.
            </span>
            <a href="amazon.html">
                <button
                style="
                background-color: rgb(255, 216, 20); 
                height: 30px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;"
                >
                    View products
                </button>
            </a>
        </div>
        `;
    }else{
        cart.forEach((cartItem) => {
            const productId = cartItem.productId;
            const matchingProduct = getProduct(productId);
    
            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOption(deliveryOptionId);
    
            const today = dayjs();
            const dateString = (today.add(deliveryOption.deliveryDays, 'days')).format('dddd, MMMM D');
            
            cartSummaryHTML += `
                <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                        Delivery date: ${dateString}
                    </div>
    
                    <div class="cart-item-details-grid">
                        <img class="product-image"
                        src="${matchingProduct.image}">
    
                        <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                            <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link"
                            data-product-quantity="${cartItem.quantity}"
                            data-product-id="${matchingProduct.id}">
                            Update
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
                            data-product-id="${matchingProduct.id}">
                            Delete
                            </span>
                        </div>
                        </div>
    
                        <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                            ${deliveryOptionHTML(matchingProduct, cartItem)}
                        </div>
                    </div>
                </div>
            `;
        });
    }

    function deliveryOptionHTML(matchingProduct, cartItem) {
        let html = '';
        const today = dayjs();
        
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = (today.add(deliveryOption.deliveryDays, 'days')).format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked': ""}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }

    //update cart summary list
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    //EVENT LISTENERS

    //event listener for delivery date radio buttons
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    //delete button event listener
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;     
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderPaymentSummary();
        });
    });

    //update button event listener
    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;    
            let quantity = link.dataset.productQuantity;
            if(link.textContent.trim() === "Update"){
                //create number input
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `<input style="width:35px;" class="input-number" type="number" value="${quantity}">`;
                //change update to save
                link.innerHTML = 'Save';
            }else{
                //change quantity in cart to number input
                quantity = document.querySelector(`.js-quantity-label-${productId} .input-number`).value;
                //update cart
                let matchingProduct;
                cart.forEach((cartItem) => {
                    if(cartItem.productId === productId) {
                        matchingProduct = cartItem;
                    }
                });
                matchingProduct.quantity = Number(quantity);
                //change save to update
                link.innerHTML = 'Update';
                //re-render
                renderOrderSummary();
                renderPaymentSummary();
            }
        });
    });
}
