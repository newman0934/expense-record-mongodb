// require express
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('public'))

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//require express-handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//require body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

//require method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//require express-session
const session = require("express-session");
app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true
  })
);

//require passport
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

//require passport config
require("./config/passport")(passport);
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// create equals help function
const handlebars = require("handlebars")
handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  console.log(arg1, arg2)
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
})


//require connect-flash
const flash = require("connect-flash")
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.success_msg = req.flash("success_msg")
  res.locals.warning_msg = req.flash("warning_msg")
  next();
})


//require mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/record", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//connect mongodb
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongodb connected");
});

const Record = require("./models/record");

app.use("/", require("./routes/home"));
app.use("/records", require("./routes/record"));
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auths"));
app.use("/search", require("./routes/search"))

app.listen(process.env.MONGODB_URI || port, () => {
  console.log("app listening");
});