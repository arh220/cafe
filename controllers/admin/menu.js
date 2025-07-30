const Menu = require("../../models/admin/menu");
const Menucategory = require("../../models/admin/menucat");

async function getmenuPage(req, res) {
  const allmenucat = await Menucategory.find();
  res.render("admin/menu", { allmenucat });
}
async function createMenuItem(req, res) {
  const { catid, itemname, mrp, disc } = req.body;
  // const itemimg = req.file;
  // console.log(req.body);
  await Menu.create({
    catid,
    itemname,
    mrp,
    disc,
    image: `/images/allimages/${req.file?.filename || "default.png"}`
  });
  res.redirect("/admin/menupg");
}
async function getAllMenuItems(req, res) {
  const allMenuItems = await Menu.find().populate("catid");
  // console.log(allMenuItems);
  res.render("admin/menuitems", { allMenuItems });
}
async function editMenupg(req, res) {
  const menuId = req.params.id;
  const selectedmenu = await Menu.findById(menuId);
  res.render("admin/edititemform", { selectedmenu });
}
async function updateMenuItem(req, res) {
  const { itemname, mrp, disc } = req.body;
  // const image = req.file;
  const menu = await Menu.findById(req.params.id);

  (menu.itemname = itemname), (menu.mrp = mrp), (menu.disc = disc);
  if (req.file) {
    menu.image = `/images/allimages/${req.file.filename}`;
  }
  await menu.save();
  return getAllMenuItems(req, res);
}
async function deleteMenuItem(req, res) {
  await Menu.findByIdAndDelete(req.params.id);
  return getAllMenuItems(req, res);
}
module.exports = { getmenuPage, createMenuItem, getAllMenuItems, editMenupg, updateMenuItem, deleteMenuItem };
