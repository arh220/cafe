const Blog = require("../../models/admin/blog");
const { Comment } = require("../../models/comment");

async function getAllBlogs(req, res) {
  const allblogs = await Blog.find().sort({ createdAt: -1 });
  res.render("blog", { allblogs });
}
async function getBlogMoreDetails(req, res) {
  const selectedblog = await Blog.findById(req.params.id);
  const allcoments = await Comment.find().sort({ createdAt: -1 });
  res.render("blogmoredetails", { selectedblog, allcoments });
}
async function leaveComment(req, res) {
  const { email, comment } = req.body;
  await Comment.create({ email, comment, blogId: req.params.id });

  return res.redirect(`/blogdetails/${req.params.id}`);
}
module.exports = { getAllBlogs, getBlogMoreDetails, leaveComment };
