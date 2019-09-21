const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const {
  authenticated
} = require("../config/auth")

router.get("/", authenticated, (req, res) => {
  Record.find({
    userId: req.user._id
  }, (err, records) => {
    if (err) return console.error(err)
    let totalAmount = 0
    records.map(record => {
      totalAmount += record.amount
    })
    res.render("index", {
      records,
      totalAmount
    })
  })
});

module.exports = router