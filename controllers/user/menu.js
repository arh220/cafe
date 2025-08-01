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
  const product = await Menu.findById(prodId);

  if (!req.session.cart) {
    req.session.cart = [];
  }
  const existingItem = req.session.cart.find(item => item._id == prodId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    req.session.cart.push({
      _id: product._id,
      itemname: product.itemname,
      mrp: Number(product.mrp),
      disc: product.disc,
      image: product.image,
      qty: 1
    });
  }
  res.redirect("/cart");
}
function showCart(req, res) {
  const cartItems = req.session.cart || [];

  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.mrp * item.qty;
  });

  const delivery = 5;
  const total = subtotal + delivery;

  res.render("cart", { cartItems, subtotal, delivery, total });
}
function removeFromCart(req, res) {
  const prodId = req.params.id;
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item._id != prodId);
  }
  res.redirect("/cart");
}
async function checkoutPage(req, res) {
  const cart = req.session.cart || [];

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += Number(item.mrp) * Number(item.qty);
  });

  const delivery = 5;
  const total = subtotal + delivery;

  res.render("checkout", { cart, subtotal, delivery, total });
}

module.exports = { getAllmenu, getMenuList, addItemInCart, showCart, removeFromCart, checkoutPage };
