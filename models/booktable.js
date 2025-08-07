const mongoose = require("mongoose");
const tableSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    member: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    mo: {
      type: Number,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const bookTable = mongoose.model("booktable", tableSchema);
module.exports = bookTable;
