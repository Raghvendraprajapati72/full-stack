const router = require("express").Router();

const db = require("../db");

/* =========================================
   GET NEWS
========================================= */

router.get("/", async (req, res) => {

  try {

    const [result] =
      await db.query(
        "SELECT * FROM news ORDER BY id DESC"
      );

    res.json(result);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      msg: "Internal Server Error ❌"
    });
  }
});

/* =========================================
   ADD NEWS
========================================= */

router.post("/add", async (req, res) => {

  try {

    const {
      title,
      description
    } = req.body;

    await db.query(

      `INSERT INTO news
      (title, description)
      VALUES (?, ?)`,
      
      [title, description]
    );

    res.json({
      success: true,
      msg: "News Added ✅"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      msg: "Insert Failed ❌"
    });
  }
});

/* =========================================
   DELETE NEWS
========================================= */

router.delete("/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM news WHERE id=?",
      [req.params.id]
    );

    res.json({
      success: true,
      msg: "Deleted ✅"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      msg: "Delete Failed ❌"
    });
  }
});

module.exports = router;