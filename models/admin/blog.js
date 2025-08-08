const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    imageId: {
      type: String,
      required: true
    },
    disc: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
