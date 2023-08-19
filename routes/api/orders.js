const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// GET /api/orders/cart
router.get("/cart", ordersCtrl.cart);
router.post("/cart/items/:id", ordersCtrl.addToCart);
router.patch("/cart/items/qty", ordersCtrl.setItemQtyInCart);
router.post("/cart/checkout", ordersCtrl.checkout);

module.exports = router;
