const Comment = require("../../models/comment");
async function getAllComments(req, res) {
  const allcoments = await Comment.find().populate("blogId");
  res.render("admin/allcomments", { allcoments });
}
async function deleteComment(req, res) {
  await Comment.findByIdAndDelete(req.params.id);
  return getAllComments(req, res);
}

module.exports = { getAllComments, deleteComment };
