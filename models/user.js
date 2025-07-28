const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      uniqe: true,
      require: true
    },
    pass: {
      type: String,
      require: true
    },
    mo: {
      type: Number,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    dob: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true,
      default: "./images/siginuserprofile/default.png"
    },
    gender: {
      type: String,
      require: true
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
