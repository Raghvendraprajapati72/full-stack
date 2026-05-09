const router =
  require("express").Router();

const db =
  require("../db");

/* =========================================
   GET NEWS
========================================= */

router.get(
  "/",

  (req, res) => {

    db.query(
      "SELECT * FROM news ORDER BY id DESC",

      (err, result) => {

        if (err) {

          return res
            .status(500)
            .json({
              msg:
                "Database Error",
            });
        }

        res.json(result);
      }
    );
  }
);

/* =========================================
   ADD NEWS
========================================= */

router.post(
  "/add",

  (req, res) => {

    const {
      title,
      description,
    } = req.body;

    db.query(

      `INSERT INTO news
      (title, description)
      VALUES (?,?)`,

      [
        title,
        description,
      ],

      (err) => {

        if (err) {

          return res
            .status(500)
            .json({
              msg:
                "Insert Failed",
            });
        }

        res.json({
          success: true,
        });
      }
    );
  }
);

/* =========================================
   DELETE NEWS
========================================= */

router.delete(
  "/:id",

  (req, res) => {

    db.query(

      "DELETE FROM news WHERE id=?",

      [req.params.id],

      (err) => {

        if (err) {

          return res
            .status(500)
            .json({
              msg:
                "Delete Failed",
            });
        }

        res.json({
          success: true,
        });
      }
    );
  }
);

module.exports =
  router;