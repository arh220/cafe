const booktable = require("../../models/booktable");

async function allBookingTable(req, res) {
  const allTable = await booktable.find();
  res.render("admin/allbookingtable", { allTable });
}
async function tableDetailsDelete(req, res) {
  await booktable.findByIdAndDelete(req.params.id);
  return allBookingTable(req, res);
}
module.exports = { allBookingTable, tableDetailsDelete };
