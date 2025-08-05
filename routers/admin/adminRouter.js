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
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/home", { error: null });
});
router.get("/menucatpg", (req, res) => {
  res.render("admin/menucatpg");
});
router.post("/menucat", createMenuCategory);
router.get("/getmenucat", getAllMenuCategories);
router.get("/delcat/:id", deleteMenuCategory);

router.get("/menupg", getmenuPage);
router.post("/createitem", upload.single("image"), createMenuItem);
router.get("/manuitems", getAllMenuItems);
router.get("/edititem/:id", editMenupg);
router.post("/updateitem/:id", upload.single("image"), updateMenuItem);
router.get("/delitem/:id", deleteMenuItem);

module.exports = router;
