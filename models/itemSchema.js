const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./category"); // ensure this dependency's module is loaded

const itemSchema = new Schema({
    name: { type: String, required: true },
    emoji: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});

module.exports = itemSchema;
