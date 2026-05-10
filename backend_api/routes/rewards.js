const express = require("express");

const router = express.Router();

const db = require("../db");

/* =====================================================
   GET REWARDS
===================================================== */

router.get(
  "/",

  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          "SELECT * FROM rewards ORDER BY points ASC"
        );

      res.json(rows);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        msg:
          "Failed to load rewards ❌",
      });
    }
  }
);

/* =====================================================
   ADD REWARD
===================================================== */

router.post(
  "/add",

  async (req, res) => {

    try {

      const {
        title,
        points,
        discount,
      } = req.body;

      await db.query(

        `
        INSERT INTO rewards
        (
          title,
          points,
          discount
        )
        VALUES (?, ?, ?)
        `,

        [
          title,
          points,
          discount,
        ]
      );

      res.json({

        success: true,

        msg:
          "Reward Added ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        msg:
          "Failed ❌",
      });
    }
  }
);

module.exports = router;