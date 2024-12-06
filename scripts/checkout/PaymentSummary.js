import {cart} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let itemCount = 0;

    cart.forEach((cartItem) => {
        //get product
        const productId = cartItem.productId;
        const product = getProduct(productId);
        itemCount += cartItem.quantity;

        //get price
        productPriceCents += product.priceCents * cartItem.quantity;

        //get shipping costs
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    
    //calculate remaining costs
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const TaxCents = totalBeforeTaxCents * 0.1;
    const totalCents = TaxCents + totalBeforeTaxCents;

    //generate html
    const PaymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${itemCount}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <div class="js-payment-options">
            Use PayPal <input type="checkbox" class="js-paypal" style="transform:scale(1.5); margin:10px;">
            <button class="place-order-button button-primary js-place-order-button">
                Place your order
            </button>
        </div>  
    `;

    //render
    document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;

    //paypal functionality
    const paypalCheckbox = document.querySelector('.js-paypal');
    const paymentOptionsContainer = document.querySelector('.js-payment-options');
    paypalCheckbox.addEventListener('change', () => {
        if (paypalCheckbox.checked) {
            paymentOptionsContainer.innerHTML = `
            Use PayPal <input type="checkbox" class="js-paypal" style="transform:scale(1.5); margin:10px;" checked>
                <div class="js-payment-options" style="display:grid; justify-items:center;">
                    <button class="place-order-button button-primary js-place-order-button">
                        PayPal
                    </button>
                    <button style="background-color: black; color: white; border: none; width: 310px; height: 45px; border-radius: 10px;">Debit or Credit Card</button>
                    <span style="margin-top:10px;">Powered by PayPal</span>
                </div>
            `;
        } else {
            paymentOptionsContainer.innerHTML = `
                <div class="js-payment-options">
                    Use PayPal <input type="checkbox" class="js-paypal" style="transform:scale(1.5); margin:10px;">
                    <button class="place-order-button button-primary js-place-order-button">
                        Place your order
                    </button>
                </div>
            `;
        }
    });
}
