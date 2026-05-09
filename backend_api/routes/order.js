const router =
  require("express").Router();

const db =
  require("../db");

/* =====================================================
   CREATE ORDER
===================================================== */

router.post(
  "/create",

  (req, res) => {

    const {
      userId,
      total,
      address,
      payment_method,
    } = req.body;

    if (
      !userId ||
      !total
    ) {

      return res
        .status(400)
        .json({
          success: false,
          msg:
            "userId and total required ❌",
        });
    }

    const sql = `
      INSERT INTO orders
      (
        user_id,
        total,
        address,
        payment_method,
        status,
        created_at
      )

      VALUES (?,?,?,?,?,NOW())
    `;

    db.query(

      sql,

      [
        userId,
        total,
        address ||
          "Not Provided",

        payment_method ||
          "COD",

        "Pending",
      ],

      (
        err,
        result
      ) => {

        if (err) {

          console.log(
            "CREATE ORDER ERROR:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Order failed ❌",
            });
        }

        res.json({

          success: true,

          msg:
            "Order placed successfully ✅",

          orderId:
            result.insertId,
        });
      }
    );
  }
);

/* =====================================================
   GET ALL ORDERS
===================================================== */

router.get(
  "/",

  (req, res) => {

    const search =
      req.query.search || "";

    const sql = `
      SELECT *

      FROM orders

      WHERE
      status LIKE ?
      OR payment_method LIKE ?

      ORDER BY id DESC
    `;

    db.query(

      sql,

      [
        `%${search}%`,
        `%${search}%`,
      ],

      (
        err,
        result
      ) => {

        if (err) {

          console.log(
            "GET ORDERS ERROR:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
            });
        }

        res.json(result);
      }
    );
  }
);

/* =====================================================
   GET USER ORDERS
===================================================== */

router.get(
  "/user/:userId",

  (req, res) => {

    const userId =
      req.params.userId;

    db.query(

      `
      SELECT *

      FROM orders

      WHERE user_id=?

      ORDER BY id DESC
      `,

      [userId],

      (
        err,
        result
      ) => {

        if (err) {

          console.log(
            "GET USER ORDERS ERROR:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
            });
        }

        res.json(result);
      }
    );
  }
);

/* =====================================================
   GET SINGLE ORDER
===================================================== */

router.get(
  "/details/:id",

  (req, res) => {

    const orderId =
      req.params.id;

    db.query(

      `
      SELECT *
      FROM orders
      WHERE id=?
      `,

      [orderId],

      (
        err,
        result
      ) => {

        if (err) {

          return res
            .status(500)
            .json({
              success: false,
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
                "Order not found ❌",
            });
        }

        res.json(
          result[0]
        );
      }
    );
  }
);

/* =====================================================
   UPDATE ORDER STATUS
===================================================== */

router.put(
  "/status/:id",

  (req, res) => {

    const {
      status,
    } = req.body;

    db.query(

      `
      UPDATE orders

      SET status=?

      WHERE id=?
      `,

      [
        status,
        req.params.id,
      ],

      (err) => {

        if (err) {

          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "Update failed ❌",
            });
        }

        res.json({
          success: true,
          msg:
            "Order status updated ✅",
        });
      }
    );
  }
);

/* =====================================================
   DELETE ORDER
===================================================== */

router.delete(
  "/:id",

  (req, res) => {

    const orderId =
      req.params.id;

    db.query(

      `
      DELETE FROM orders
      WHERE id=?
      `,

      [orderId],

      (err) => {

        if (err) {

          console.log(
            "DELETE ERROR:",
            err
          );

          return res
            .status(500)
            .json({
              success: false,
            });
        }

        res.json({

          success: true,

          msg:
            "Order deleted 🗑️",
        });
      }
    );
  }
);

module.exports =
  router;