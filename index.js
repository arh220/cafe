const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routers/user/userRouter");
const { error } = require("console");
const cookieParser = require("cookie-parser");
const { everypageinuser } = require("./middleware/globaldata");
const { checkForAuthCookie } = require("./middleware/checkforauth");

const app = express();
const PORT = 8000;
mongoose
  .connect("mongodb://localhost:27017/cafe")
  .then(() => console.log("mongoDB Connected..."))
  .catch(error => console.log(error));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(everypageinuser);

app.use("/", userRouter);
app.listen(PORT, () => {
  console.log("server started...");
});
