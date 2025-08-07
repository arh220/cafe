const booktable = require("../../models/booktable");

async function bookTable(req, res) {
  const { name, member, date, time, mo, msg } = req.body;
  //   console.log(req.body);
  await booktable.create({ name, member, date, time, mo, msg });
  res.redirect("/");
}
module.exports = bookTable;
