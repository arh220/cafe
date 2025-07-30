const express = require("express");
const { signupUser } = require("../../controllers/user/signup");
const signinUser = require("../../controllers/user/signin");
const uploads = require("../../middleware/multer");
const { getAllmenu, getMenuList, addItemInCart } = require("../../controllers/user/menu");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/menu", getMenuList);
router.get("/product", getAllmenu);

router.get("/services", (req, res) => {
  res.render("services");
});
router.get("/blog", (req, res) => {
  res.render("blog");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/contact", (req, res) => {
  res.render("contact");
});
router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});
router.post("/signup", uploads.single("image"), signupUser);
router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});
router.post("/signin", signinUser);
router.get("/signout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});
router.get("/cart/:id", addItemInCart);
module.exports = router;
