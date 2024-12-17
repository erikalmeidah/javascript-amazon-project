function Cart(){
    const cart = {
        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [];
        },
    
        saveToStorage() {
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
        },
    
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
        },
    
        removeFromCart(productId) {
            const newCart = [];
            this.cartItems.forEach((product) => {
                if(product.productId !== productId){
                    newCart.push(product);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
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
    };
    return cart;
}

const cart = Cart();
cart.loadFromStorage();
