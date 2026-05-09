const router =
  require("express").Router();

const db =
  require("../db");

/* =========================================
   DASHBOARD STATS
========================================= */

router.get(
  "/stats",

  (req, res) => {

    const data = {};

    db.query(
      "SELECT COUNT(*) AS totalUsers FROM users",

      (err, users) => {

        data.users =
          users[0].totalUsers;

        db.query(
          "SELECT COUNT(*) AS totalProducts FROM products",

          (err2, products) => {

            data.products =
              products[0]
                .totalProducts;

            db.query(
              "SELECT COUNT(*) AS totalOrders FROM orders",

              (
                err3,
                orders
              ) => {

                data.orders =
                  orders[0]
                    .totalOrders;

                res.json(data);
              }
            );
          }
        );
      }
    );
  }
);

/* =========================================
   LIVE STREAMS
========================================= */

router.get(
  "/live",

  (req, res) => {

    db.query(
      "SELECT * FROM livestreams ORDER BY id DESC",

      (err, result) => {

        if (err) {

          return res
            .status(500)
            .json({
              msg:
                "DB Error",
            });
        }

        res.json(result);
      }
    );
  }
);

/* =========================================
   ADD LIVE STREAM
========================================= */

router.post(
  "/live/add",

  (req, res) => {

    const {
      title,
      video_url,
      farmer_name,
    } = req.body;

    db.query(

      `INSERT INTO livestreams
      (title, video_url, farmer_name)
      VALUES (?,?,?)`,

      [
        title,
        video_url,
        farmer_name,
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

module.exports =
  router;