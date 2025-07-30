const mongoose = require("mongoose");
const menuSchema = mongoose.Schema(
  {
    catid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    },
    itemname: {
      type: String,
      required: true
    },
    disc: {
      type: String,
      required: true
    },
    mrp: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Menu = mongoose.model("menu", menuSchema);
module.exports = Menu;
