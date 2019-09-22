const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const {
  authenticated
} = require("../config/auth")

router.get("/", authenticated, (req, res) => {
  return res.redirect("/");
});

// 新增一筆 record 頁面
router.get("/new", authenticated, (req, res) => {
  res.render("new");
});

// 新增一筆  record
router.post("/", authenticated, (req, res) => {
  const {
    name,
    date,
    category,
    amount,
    merchant
  } = req.body;
  const record = new Record({
    name,
    date,
    category,
    amount,
    merchant,
    userId: req.user._id,
  });
  record.save(err => {
    if (err) return console.error(err);
    res.redirect("/");
  });
});

// 修改 record 頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Record.findOne({
    _id: req.params.id,
    userId: req.user._id
  }, (err, record) => {
    if (err) return console.error(err)
    res.render("edit", {
      record,
    })
  })
});
// 修改 record
router.put("/:id", authenticated, (req, res) => {
  Record.findOne({
    _id: req.params.id,
    userId: req.user._id
  }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name,
      record.category = req.body.category,
      record.date = req.body.date,
      record.amount = req.body.amount,
      record.merchant = req.body.merchant

    record.save(err => {
      if (err) return console.error(err)
      res.redirect("/")
    })
  })
});
// 刪除 record
router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findOne({
    _id: req.params.id,
    userId: req.user._id
  }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      res.redirect("/")
    })
  })
});

module.exports = router;