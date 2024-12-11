class Cart {
    cartItems;
    #localStorageKey;

    constructor(key) {
        this.#localStorageKey = key;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity=1) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
    
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
            productId,
            quantity: quantity,
            deliveryOptionId: "1"
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((product) => {
            if(product.productId !== productId){
                newCart.push(product);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

const cart = new Cart("a");
const businessCart = new Cart("b");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
