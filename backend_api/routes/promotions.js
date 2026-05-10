const express = require("express");

const router = express.Router();

const db = require("../db");

/* =====================================================
   GET PROMOTIONS
===================================================== */

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM promotions ORDER BY id DESC";

  db.query(sql, (err, results) => {

    if (err) {

      console.log(err);

      return res.status(500).json({

        success: false,

        msg: "Failed to load promotions ❌",

      });
    }

    res.json(results);
  });
});

/* =====================================================
   ADD PROMOTION
===================================================== */

router.post("/add", (req, res) => {

  const {
    title,
    description,
  } = req.body;

  const sql = `
    INSERT INTO promotions
    (title, description)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          msg: "Failed to add promotion ❌",

        });
      }

      res.json({

        success: true,

        msg: "Promotion Added ✅",

      });
    }
  );
});

module.exports = router;