const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    email: { type: String },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blog" }
  },
  { timestamps: true }
);
const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
