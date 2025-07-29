const express = require("express");
const { createMenuCategory, getAllMenuCategories, deleteMenuCategory } = require("../../controllers/admin/menucatcreate");
const { getmenuPage } = require("../../controllers/admin/menu");
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
module.exports = router;
