import { getCookie } from "./cookie";
import { car } from "ionicons/icons";


export const MAXIMUM_QUANTITY_PER_PRODUCT = 10;
export const getCart = () => {
    let cartItem = localStorage.getItem("cart");
    let cart = JSON.parse(String(cartItem));
    return cart ? cart : {};
};

export const addToCart = (productId: any, quantity: any) => {
    let cartItem = localStorage.getItem("cart");
    let cart = JSON.parse(String(cartItem));
    if (!cart) cart = {};
    quantity += productId in cart ? cart[productId] : 0;

    if (quantity <= MAXIMUM_QUANTITY_PER_PRODUCT) {
        cart[productId] = quantity;
        updateCart(cart);
        return true;
    } else {
        return false;
    }
};

export const removeFromCart = (productId: any) => {
    let cartItems = localStorage.getItem("cart");
    var cart;
    if(cartItems) {
        cart = JSON.parse(cartItems);
    }
    if (cart && productId in cart) {
        delete cart[productId];
        updateCart(cart);
    }
};

export const updateCart = (cart: any) => {
    updateCartQuantity(cart);
    updateCartDatabase(cart);
};

export const updateCartQuantity = (cart: any) => {
    if(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        const cartQuantity = document.getElementById("cart_count");
        if(cartQuantity) {
            var quantity = Object.values(cart).reduce((a: any, b: any) => a + b, 0);
            cartQuantity.innerText = String(quantity);
        }
    }
};


export const updateCartDatabase = async (cart: any) => {
    const token = getCookie("access_token");
    if (!token) return;

    await fetch("/api/users/me/carts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(cart),
    });
};