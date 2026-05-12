const router = require("express").Router();

const db = require("../db");

/* =========================================
   GET NEWS
========================================= */

router.get("/", async (req, res) => {

  try {

    const [rows] =
      await db.query(
        "SELECT * FROM news ORDER BY id DESC"
      );

    res.json(rows);

  } catch (err) {

    console.log("NEWS ERROR:", err);

    res.status(500).json({
      success: false,
      msg: "Internal Server Error ❌"
    });
  }
});

module.exports = router;