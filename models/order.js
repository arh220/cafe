const { name } = require("ejs");
const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mo: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    stnm: {
      type: String,
      required: true
    },
    apnm: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pin: {
      type: Number,
      required: true
    },
    payment: {
      type: String,
      required: true
    },
    cartItem: [
      {
        id: String,
        itemname: String,
        price: Number,
        qty: Number,
        total: Number
      }
    ],
    subtotal: Number,
    deliveryCharge: Number,
    grandTotal: Number
  },

  { timestamps: true }
);
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
