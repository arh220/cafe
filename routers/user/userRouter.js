const express = require("express");
const { signupUser } = require("../../controllers/user/signup");
const signinUser = require("../../controllers/user/signin");
const upload = require("../../utils/multer");
const { getAllmenu, getMenuList, showCart, checkoutPage, placeorder } = require("../../controllers/user/menu");
const { requiredAuth } = require("../../middleware/checkforauth");
const bookTable = require("../../controllers/user/booktbl");
const getImageIngallery = require("../../controllers/user/gallery");
const { getAllBlogs, getBlogMoreDetails, leaveComment } = require("../../controllers/user/blog");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/menu", getMenuList);
router.get("/product", getAllmenu);

router.get("/services", (req, res) => {
  res.render("services");
});
router.get("/blog", getAllBlogs);
router.get("/blogdetails/:id", getBlogMoreDetails);
router.post("/comment/:id", leaveComment);
router.get("/gallery", getImageIngallery);
router.get("/contact", (req, res) => {
  res.render("contact");
});
router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});
router.post("/signup", upload.single("image"), signupUser);
router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});
router.post("/signin", signinUser);
router.get("/signout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});
router.get("/cart", requiredAuth, showCart);
router.get("/checkout", checkoutPage);
router.post("/placeorder", placeorder);
router.post("/booktable", requiredAuth, bookTable);

module.exports = router;
