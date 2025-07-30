const Menu = require("../../models/admin/menu");
const Menucategory = require("../../models/admin/menucat");

async function getAllmenu(req, res) {
  const allmenu = await Menu.find().populate("catid");
  const allcat = await Menucategory.find();
  res.render("product", { allmenu, allcat });
}
async function getMenuList(req, res) {
  const allmenu = await Menu.find().populate("catid");
  const allcat = await Menucategory.find();
  res.render("menu", { allmenu, allcat });
}
async function addItemInCart(req, res) {
  const prodId = req.params.id;
  const selecteditem = await Menu.findById(prodId);
  res.render("cart", { selecteditem });
}
module.exports = { getAllmenu, getMenuList, addItemInCart };
