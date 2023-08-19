import sendRequest from "./send-request";
const BASE_URL = '/api/orders';

export async function getCart() {
    return sendRequest(BASE_URL + "/cart");
}

export async function setItemQtyInCart(itemId, newQty) {
    return sendRequest(BASE_URL + "/cart/items/qty", "PATCH", {itemId, newQty});
}

export async function checkout() {
    return sendRequest(BASE_URL + "/cart/checkout", "POST");
}

export async function addToCart(itemId) {
    return sendRequest(BASE_URL + "/cart/items/" + itemId, "POST");
}