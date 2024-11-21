import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
        productId,
        quantity: 1
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((product) => {
        if(product.productId !== productId){
            newCart.push(product);
        }
    });
    cart = newCart;
    saveToStorage();
}
