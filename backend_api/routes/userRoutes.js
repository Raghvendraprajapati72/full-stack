const router =
require("express").Router();

const db =
require("../db");

/* =====================================
   GET USERS
===================================== */

router.get(
  "/",

  async (req, res) => {

    try {

      const [rows] =
      await db.query(
        "SELECT * FROM users"
      );

      res.json(rows);

    } catch (err) {

      res.status(500).json({

        success: false,

        msg: err.message
      });
    }
  }
);

module.exports =
router;