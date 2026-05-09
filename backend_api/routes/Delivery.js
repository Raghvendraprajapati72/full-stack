/* =====================================================
   BACKEND ROUTE
   routes/delivery.js
===================================================== */

const express =
  require("express");

const router =
  express.Router();

const db =
  require("../db");

/* =====================================================
   GET ALL DELIVERIES
===================================================== */

router.get(
  "/",
  (req, res) => {

    const search =
      req.query.search || "";

    const sql = `
      SELECT *
      FROM deliveries

      WHERE
      product_name LIKE ?
      OR delivery_boy LIKE ?
      OR status LIKE ?

      ORDER BY id DESC
    `;

    db.query(
      sql,

      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Database error ❌",
            });
        }

        res.json(result);
      }
    );
  }
);

/* =====================================================
   ADD DELIVERY
===================================================== */

router.post(
  "/add",
  (req, res) => {

    const {
      product_name,
      sender_address,
      receiver_address,
      delivery_boy,
      status,
      current_location,
    } = req.body;

    if (
      !product_name ||
      !sender_address ||
      !receiver_address ||
      !delivery_boy
    ) {

      return res
        .status(400)
        .json({
          success: false,
          msg:
            "All fields required ❌",
        });
    }

    const sql = `
      INSERT INTO deliveries
      (
        product_name,
        sender_address,
        receiver_address,
        delivery_boy,
        status,
        current_location
      )

      VALUES (?,?,?,?,?,?)
    `;

    db.query(
      sql,

      [
        product_name,
        sender_address,
        receiver_address,
        delivery_boy,
        status ||
          "Preparing",
        current_location ||
          "Warehouse",
      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Insert failed ❌",
            });
        }

        res.json({
          success: true,
          msg:
            "Delivery added ✅",
          id:
            result.insertId,
        });
      }
    );
  }
);

/* =====================================================
   UPDATE DELIVERY STATUS
===================================================== */

router.put(
  "/status/:id",

  (req, res) => {

    const { status } =
      req.body;

    db.query(

      `
      UPDATE deliveries
      SET status=?
      WHERE id=?
      `,

      [
        status,
        req.params.id,
      ],

      (err) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Status update failed ❌",
            });
        }

        res.json({
          success: true,
          msg:
            "Status updated ✅",
        });
      }
    );
  }
);

/* =====================================================
   UPDATE LIVE LOCATION
===================================================== */

router.put(
  "/location/:id",

  (req, res) => {

    const {
      current_location,
    } = req.body;

    db.query(

      `
      UPDATE deliveries
      SET current_location=?
      WHERE id=?
      `,

      [
        current_location,
        req.params.id,
      ],

      (err) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Location update failed ❌",
            });
        }

        res.json({
          success: true,
          msg:
            "Location updated ✅",
        });
      }
    );
  }
);

/* =====================================================
   DELETE DELIVERY
===================================================== */

router.delete(
  "/:id",

  (req, res) => {

    db.query(

      `
      DELETE FROM deliveries
      WHERE id=?
      `,

      [req.params.id],

      (err) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Delete failed ❌",
            });
        }

        res.json({
          success: true,
          msg:
            "Delivery deleted ✅",
        });
      }
    );
  }
);

/* =====================================================
   GET SINGLE DELIVERY
===================================================== */

router.get(
  "/:id",

  (req, res) => {

    db.query(

      `
      SELECT *
      FROM deliveries
      WHERE id=?
      `,

      [req.params.id],

      (err, result) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Fetch failed ❌",
            });
        }

        if (
          result.length === 0
        ) {

          return res
            .status(404)
            .json({
              success: false,
              msg:
                "Delivery not found ❌",
            });
        }

        res.json(
          result[0]
        );
      }
    );
  }
);

module.exports =
  router;