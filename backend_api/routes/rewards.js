const express = require("express");

const router = express.Router();

const db = require("../db");

/* =====================================================
   GET REWARDS
===================================================== */

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM rewards ORDER BY points ASC";

  db.query(sql, (err, results) => {

    if (err) {

      console.log(err);

      return res.status(500).json({

        success: false,

        msg: "Failed to load rewards ❌",

      });
    }

    res.json(results);
  });
});

/* =====================================================
   ADD REWARD
===================================================== */

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

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          msg: "Failed to add reward ❌",

        });
      }

      res.json({

        success: true,

        msg: "Reward Added ✅",

      });
    }
  );
});

module.exports = router;const express = require("express");

const router = express.Router();

const db = require("../db");

/* =========================================
   GET ALL REWARDS
========================================= */

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM rewards ORDER BY points ASC";

  db.query(sql, (err, results) => {

    if (err) {

      console.log(err);

      return res.status(500).json({

        success: false,

        msg: "Failed to load rewards ❌",

      });
    }

    res.json(results);
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