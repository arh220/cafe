const Menu = require("../../models/admin/menu");
const Menucategory = require("../../models/admin/menucat");
const { uploadImage, deleteImageFromCloudinary } = require("../../utils/uploadimage");
const fs = require("fs");

async function getmenuPage(req, res) {
  const allmenucat = await Menucategory.find();
  res.render("admin/menu", { allmenucat });
}
async function createMenuItem(req, res) {
  const { catid, itemname, mrp, disc } = req.body;
  const itemimg = req.file;
  // console.log(req.body);
  const { secure_url, public_id } = await uploadImage(itemimg.path);
  fs.unlinkSync(itemimg.path);
  await Menu.create({
    catid,
    itemname,
    mrp,
    disc,
    image: secure_url,
    imageId: public_id
  });
  res.redirect("/admin/menupg",);
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
  const image = req.file;

  const menu = await Menu.findById(req.params.id);

  (menu.itemname = itemname), (menu.mrp = mrp), (menu.disc = disc);
  if (image) {
    await deleteImageFromCloudinary(menu.imageId);
    const { secure_url, public_id } = await uploadImage(image.path);
    fs.unlinkSync(image.path);
    menu.image = secure_url;
    menu.imageId = public_id;
  }
  await menu.save();
  return getAllMenuItems(req, res);
}
async function deleteMenuItem(req, res) {
  const delimage = await Menu.findById(req.params.id);
  await deleteImageFromCloudinary(delimage.imageId);
  await Menu.findByIdAndDelete(req.params.id);
  return getAllMenuItems(req, res);
}
module.exports = { getmenuPage, createMenuItem, getAllMenuItems, editMenupg, updateMenuItem, deleteMenuItem };
