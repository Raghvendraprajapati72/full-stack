const router =
  require("express").Router();

const db =
  require("../db");

/* =========================================
    GET ALL
========================================= */

router.get(
  "/",

  (req, res) => {

    db.query(

      `SELECT * FROM helpdesk
       ORDER BY id DESC`,

      (err, result) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
              msg: "Database error",
            });
        }

        res.json(result);
      }
    );
  }
);

/* =========================================
    CREATE
========================================= */

router.post(
  "/add",

  (req, res) => {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {

      return res
        .status(400)
        .json({
          success: false,
          msg:
            "All fields required",
        });
    }

    db.query(

      `INSERT INTO helpdesk
      (name,email,subject,message,status)
      VALUES (?,?,?,?,?)`,

      [
        name,
        email,
        subject,
        message,
        "open",
      ],

      (err) => {

        if (err) {

          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              msg: "Insert failed",
            });
        }

        res.json({

          success: true,

          msg:
            "Ticket created ✅",
        });
      }
    );
  }
);

/* =========================================
    DELETE
========================================= */

router.delete(
  "/:id",

  (req, res) => {

    db.query(

      `DELETE FROM helpdesk
       WHERE id=?`,

      [req.params.id],

      (err) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Delete failed",
            });
        }

        res.json({

          success: true,

          msg:
            "Deleted successfully",
        });
      }
    );
  }
);

module.exports =
  router;