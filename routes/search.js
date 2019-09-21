const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  const sortKey = req.query.sortKey;
  const sortValue = "1";
  const sortObj = {};
  sortObj[sortKey] = sortValue;

  Record.find({
      userId: req.user._id
    })
    .sort(sortObj)
    .exec((err, records) => {
      if (err) return console.error(err);
      const record = records.filter(record => {
        const regex = new RegExp(sortKey);
        return record.category.match(regex);
      });
      let totalAmount = 0;
      record.map(record => {
        totalAmount += record.amount;
      });

      res.render("index", {
        records: record,
        sortKey,
        totalAmount
      });
    });
});

module.exports = router;