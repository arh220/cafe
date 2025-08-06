const Order = require("../../models/order");
async function allorders(req, res) {
  const allOrders = await Order.find().sort({ createdAt: -1 });
  res.render("admin/allorders", { allOrders });
}
module.exports = allorders;
