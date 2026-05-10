/* =====================================================
   routes/promotions.js
===================================================== */

const express = require("express");

const router = express.Router();

const db = require("../db");

/* =====================================================
   GET ALL PROMOTIONS
===================================================== */

router.get("/", (req, res) => {

  const sql = `
    SELECT *
    FROM promotions
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch promotions ❌",
      });
    }

    res.json(result);
  });
});

/* =====================================================
   GET SINGLE PROMOTION
===================================================== */

router.get("/:id", (req, res) => {

  const sql = `
    SELECT *
    FROM promotions
    WHERE id = ?
  `;

  db.query(

    sql,

    [req.params.id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
            "Error loading promotion ❌",
        });
      }

      res.json(result[0]);
    }
  );
});

/* =====================================================
   ADD PROMOTION
===================================================== */

router.post("/add", (req, res) => {

  const {

    title,

    description,

    discount,

    image,

    valid_till,

  } = req.body;

  if (
    !title ||
    !description
  ) {

    return res.status(400).json({

      success: false,

      message:
        "Title & Description required ❌",
    });
  }

  const sql = `
    INSERT INTO promotions
    (
      title,
      description,
      discount,
      image,
      valid_till
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(

    sql,

    [

      title,

      description,

      discount,

      image,

      valid_till,
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
            "Failed to add promotion ❌",
        });
      }

      res.json({

        success: true,

        message:
          "Promotion Added Successfully ✅",

        id:
          result.insertId,
      });
    }
  );
});

/* =====================================================
   UPDATE PROMOTION
===================================================== */

router.put("/:id", (req, res) => {

  const {

    title,

    description,

    discount,

    image,

    valid_till,

  } = req.body;

  const sql = `
    UPDATE promotions
    SET

    title = ?,

    description = ?,

    discount = ?,

    image = ?,

    valid_till = ?

    WHERE id = ?
  `;

  db.query(

    sql,

    [

      title,

      description,

      discount,

      image,

      valid_till,

      req.params.id,
    ],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
            "Update Failed ❌",
        });
      }

      res.json({

        success: true,

        message:
          "Promotion Updated Successfully ✅",
      });
    }
  );
});

/* =====================================================
   DELETE PROMOTION
===================================================== */

router.delete("/:id", (req, res) => {

  const sql = `
    DELETE FROM promotions
    WHERE id = ?
  `;

  db.query(

    sql,

    [req.params.id],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
            "Delete Failed ❌",
        });
      }

      res.json({

        success: true,

        message:
          "Promotion Deleted Successfully ✅",
      });
    }
  );
});

module.exports = router;