const router =
  require("express").Router();

const db =
  require("../db");

/* =====================================================
   CONSUMER DASHBOARD
===================================================== */

router.get(
  "/:id",

  (req, res) => {

    const userId =
      req.params.id;

    /* ================= USER INFO ================= */

    db.query(

      `
      SELECT
      id,
      name,
      email,
      role

      FROM users

      WHERE id=?
      `,

      [userId],

      (err, userResult) => {

        if (err) {

          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              msg:
                "User fetch failed ❌",
            });
        }

        if (
          userResult.length === 0
        ) {

          return res
            .status(404)
            .json({
              success: false,
              msg:
                "User not found ❌",
            });
        }

        const user =
          userResult[0];

        /* ================= TOTAL ORDERS ================= */

        db.query(

          `
          SELECT COUNT(*) AS totalOrders
          FROM orders
          WHERE user_id=?
          `,

          [userId],

          (
            err,
            orderResult
          ) => {

            if (err) {

              return res
                .status(500)
                .json({
                  success: false,
                  msg:
                    "Order fetch failed ❌",
                });
            }

            /* ================= CART ITEMS ================= */

            db.query(

              `
              SELECT COUNT(*) AS cartItems
              FROM cart
              WHERE user_id=?
              `,

              [userId],

              (
                err,
                cartResult
              ) => {

                if (err) {

                  return res
                    .status(500)
                    .json({
                      success:
                        false,

                      msg:
                        "Cart fetch failed ❌",
                    });
                }

                /* ================= RECENT ORDERS ================= */

                db.query(

                  `
                  SELECT *
                  FROM orders

                  WHERE user_id=?

                  ORDER BY id DESC

                  LIMIT 5
                  `,

                  [userId],

                  (
                    err,
                    recentOrders
                  ) => {

                    if (err) {

                      return res
                        .status(500)
                        .json({
                          success:
                            false,

                          msg:
                            "Recent orders fetch failed ❌",
                        });
                    }

                    /* ================= FINAL RESPONSE ================= */

                    res.json({

                      success: true,

                      user,

                      stats: {

                        totalOrders:
                          orderResult[0]
                            .totalOrders,

                        cartItems:
                          cartResult[0]
                            .cartItems,
                      },

                      recentOrders,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

module.exports =
  router;