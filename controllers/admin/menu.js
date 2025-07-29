const Menucategory = require("../../models/admin/menucat");

async function getmenuPage(req, res) {
  const allmenucat = await Menucategory.find();
  res.render("admin/menu", { allmenucat });
}
module.exports = { getmenuPage };
