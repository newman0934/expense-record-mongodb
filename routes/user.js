const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  let errors = [];
  let errorMessage = req.flash("error")[0];
  if (!errorMessage) {
    res.render("login");
  } else {
    errors.push({
      message: errorMessage
    });
    res.render("login", {
      errors
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      message: "所有欄位都是必填"
    });
  }

  if (password !== password2) {
    errors.push({
      message: "密碼輸入錯誤"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        console.log("user already exists");
        res.render("register", {
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出");
  res.redirect("/users/login");
});

module.exports = router;