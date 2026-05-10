const express = require("express");

const router = express.Router();

const db = require("../db");

/* =========================================
   GET REWARDS
========================================= */

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM rewards ORDER BY points ASC";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({

        success: false,

        msg: "Failed to load rewards ❌",

      });
    }

    res.json(result);
  });
});

/* =========================================
   ADD REWARD
========================================= */

router.post("/add", (req, res) => {

  const {
    title,
    points,
    description,
  } = req.body;

  const sql = `
    INSERT INTO rewards
    (title, points, description)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      points,
      description,
    ],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          msg: "Reward add failed ❌",

        });
      }

      res.json({

        success: true,

        msg: "Reward added ✅",

      });
    }
  );
});

module.exports = router;