const Menu = require("../../models/admin/menu");
const Menucategory = require("../../models/admin/menucat");
const Order = require("../../models/order");

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

function showCart(req, res) {
  res.render("cart", { cartItems: [], subtotal: 0, delivery: 0, total: 0 });
}

async function checkoutPage(req, res) {
  res.render("checkout", { cart: [], subtotal: 0, delivery: 0, total: 0 });
}
async function placeorder(req, res) {
  const { name, mo, email, stnm, apnm, city, pin, payment, cartData } = req.body;
  // console.log(req.body);

  let cartItems = [];
  if (cartData) {
    cartItems = JSON.parse(cartData);
  }
  const subtotal = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const deliveryCharge = 50;
  const grandTotal = subtotal + deliveryCharge;

  const newOrder = new Order({
    name,
    mo,
    email,
    stnm,
    apnm,
    city,
    pin,
    payment,
    cartItem: cartItems,
    subtotal,
    deliveryCharge,
    grandTotal
  });

  const orders = await newOrder.save();

  res.render("ordersucsess", { order: orders });
}

module.exports = { getAllmenu, getMenuList, showCart, checkoutPage, placeorder };
