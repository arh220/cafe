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
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/signin", { error: null });
});

router.get("/signin", (req, res) => {
  res.render("admin/signin", { error: null, adminuser: null });
});
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

module.exports = router;
