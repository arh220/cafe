require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routers/user/userRouter");
const adminRouter = require("./routers/admin/adminRouter");
const { error } = require("console");
const cookieParser = require("cookie-parser");
const { everypageinuser, everypageinAdminuser } = require("./middleware/globaldata");
const { checkForAuthCookie } = require("./middleware/checkforauth");
const session = require("express-session");
const { cloudinaryConfig } = require("./utils/cloudinary");

const app = express();
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB Connected..."))
  .catch(error => console.log(error));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "arh12345",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);
app.use(checkForAuthCookie("token"));
app.use(everypageinuser);
app.use(everypageinAdminuser);

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.listen(PORT, () => {
  console.log("server started...");
  cloudinaryConfig();
});
