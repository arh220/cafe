const Blog = require("../../models/admin/blog");
const { uploadImage, deleteImageFromCloudinary } = require("../../utils/uploadimage");
const fs = require("fs");

async function blogPage(req, res) {
  res.render("admin/blog");
}
async function createBlog(req, res) {
  const { title, disc } = req.body;
  const blogimg = req.file;
  const { secure_url, public_id } = await uploadImage(blogimg.path);
  fs.unlinkSync(blogimg.path);
  await Blog.create({
    title,
    disc,
    image: secure_url,
    imageId: public_id
  });
  res.redirect("/admin/blogpage");
}
async function allBlog(req, res) {
  const allBlogs = await Blog.find();
  res.render("admin/allblog", { allBlogs });
}
async function editBlogPage(req, res) {
  const selectblog = await Blog.findById(req.params.id);
  res.render("admin/editblogpg", { selectblog });
}
async function updateBlog(req, res) {
  const { title, disc } = req.body;
  const blgimage = req.file;

  const selectedBlog = await Blog.findById(req.params.id);
  (selectedBlog.title = title), (selectedBlog.disc = disc);
  if (blgimage) {
    await deleteImageFromCloudinary(selectedBlog.imageId);
    const { secure_url, public_id } = await uploadImage(blgimage.path);
    fs.unlinkSync(blgimage.path);
    (selectedBlog.image = secure_url), (selectedBlog.imageId = public_id);
  }
  await selectedBlog.save();
  return allBlog(req, res);
}
async function deleteBlog(req, res) {
  const selblog = await Blog.findById(req.params.id);
  await deleteImageFromCloudinary(selblog.imageId);
  await Blog.findByIdAndDelete(req.params.id);
  return allBlog(req, res);
}
module.exports = { blogPage, createBlog, allBlog, editBlogPage, updateBlog, deleteBlog };
