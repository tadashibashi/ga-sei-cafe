const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");
const Item = require("./item");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    qty: {type: Number, default: 1},
    item: itemSchema,
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});


lineItemSchema.virtual("extPrice").get(function () {
    return this.qty * this.item.price;
});


const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    lineItems: [lineItemSchema],
    isPaid: {type: Boolean, default: false}
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});


orderSchema.statics.getCart = function (userId) {
    return this.findOneAndUpdate(
        // query
        {user: userId, isPaid: false},
        // update (or create if non-existent)
        {user: userId},
        // upsert creates document if non-existent
        {upsert: true, new: true},
    );
}

orderSchema.methods.setItemQty = async function (itemId, newQty) {
    const cart = this;
    const lineItem = cart.lineItems.find(item => item._id.equals(itemId));
    if (lineItem) {
        if (newQty <= 0) {
            await lineItem.deleteOne();
        } else {
            lineItem.qty = newQty;
        }
        return cart.save();
    }

    return null;
}

orderSchema.methods.addItemToCart = async function (itemId) {
    if (!itemId)
        throw ReferenceError("Missing expected paramter: id");

    const cart = this;

    const item = await Item.findById(itemId);
    const lineItem = cart.lineItems.find((item) => item.item._id.equals(itemId));
    if (lineItem)
        ++lineItem.qty;
    else
        cart.lineItems.push({item});

    return cart.save();
}

orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
});

module.exports = mongoose.model("Order", orderSchema);
