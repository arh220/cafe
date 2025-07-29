const Menucategory = require("../../models/admin/menucat");

async function createMenuCategory(req, res) {
  const { catname } = req.body;
  const trimedname = catname.trim();
  const existcat = await Menucategory.findOne({ catname: trimedname });
  if (existcat) {
    return res.render("admin/home", { error: "Category Alredy Exist..." });
  }
  await Menucategory.create({ catname: trimedname });
  return res.redirect("/admin/getmenucat");
}
async function getAllMenuCategories(req, res) {
  const allMenuCat = await Menucategory.find();
  res.render("admin/allmenucat", { allMenuCat });
}
async function deleteMenuCategory(req, res) {
  await Menucategory.findByIdAndDelete(req.params.id);
  return getAllMenuCategories(req, res);
}
module.exports = { createMenuCategory, getAllMenuCategories, deleteMenuCategory };
