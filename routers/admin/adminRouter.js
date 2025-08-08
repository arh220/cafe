const express = require("express");
const { createMenuCategory, getAllMenuCategories, deleteMenuCategory } = require("../../controllers/admin/menucatcreate");
const {
  getmenuPage,
  createMenuItem,
  getAllMenuItems,
  editMenupg,
  updateMenuItem,
  deleteMenuItem
} = require("../../controllers/admin/menu");
const upload = require("../../utils/multer");
const allorders = require("../../controllers/admin/allorders");
const { signUpAdminUser, signinAdminUser, signupUserList, signUpAdminUserList } = require("../../controllers/admin/signup");
const setAdminUser = require("../../middleware/adminlogin");
const { allBookingTable, tableDetailsDelete } = require("../../controllers/admin/allbooktable");
const { addGalleryImage, allGalleryImage, deleteGalleryImage } = require("../../controllers/admin/addgalleryimg");
const { blogPage, createBlog, allBlog, editBlogPage, updateBlog, deleteBlog } = require("../../controllers/admin/blog");
const { getAllComments, deleteComment } = require("../../controllers/admin/comments");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/signin", { error: null });
});

// router.get("/signin", (req, res) => {
//   res.render("admin/signin", { error: null, adminuser: null });
// });
router.post("/signin", signinAdminUser);
router.get("/signup", (req, res) => {
  res.render("admin/signup", { error: null, adminuser: null });
});
router.post("/signup", upload.single("image"), signUpAdminUser);

router.use(setAdminUser);
router.get("/signout", (req, res) => {
  res.clearCookie("token").redirect("/admin/signin");
});
router.get("/home", (req, res) => {
  res.render("admin/home", { error: null });
});
router.get("/signupuser", signupUserList);
router.get("/signupadminuser", signUpAdminUserList);
router.get("/menucatpg", (req, res) => {
  res.render("admin/menucatpg");
});
router.post("/menucat", createMenuCategory);
router.get("/getmenucat", getAllMenuCategories);
router.get("/delcat/:id", deleteMenuCategory);

router.get("/menupg", getmenuPage);
router.post("/createitem", upload.single("image"), createMenuItem);
router.get("/menuitems", getAllMenuItems);
router.get("/edititem/:id", editMenupg);
router.post("/updateitem/:id", upload.single("image"), updateMenuItem);
router.get("/delitem/:id", deleteMenuItem);
router.get("/allorders", allorders);
router.get("/booktable", allBookingTable);
router.get("/deltbl/:id", tableDetailsDelete);
router.get("/addgalleryimg", (req, res) => {
  res.render("admin/addgalleryimg");
});
router.post("/addgalleryimg", upload.single("image"), addGalleryImage);
router.get("/allgalleryimg", allGalleryImage);
router.get("/deleteimg/:id", deleteGalleryImage);
router.get("/blogpage", blogPage);
router.post("/createblog", upload.single("image"), createBlog);
router.get("/allblog", allBlog);
router.get("/editblog/:id", editBlogPage);
router.post("/updateblog/:id", upload.single("image"), updateBlog);
router.get("/deleteblog/:id", deleteBlog);
router.get("/comments", getAllComments);
router.get("/deletecomt/:id", deleteComment);

module.exports = router;
