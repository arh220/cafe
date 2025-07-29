const mongoose = require("mongoose");
const menucatSchema = mongoose.Schema(
  {
    catname: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Menucategory = mongoose.model("category", menucatSchema);
module.exports = Menucategory;
