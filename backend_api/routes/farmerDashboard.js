/* =====================================================
   routes/farmerDashboard.js
===================================================== */

const router =
  require("express").Router();

const db =
  require("../db");

/* =====================================================
   FARMER DASHBOARD
===================================================== */

router.get("/:id", (req, res) => {

  const farmerId =
    req.params.id;

  /* ================= TOTAL CROPS ================= */

  db.query(

    "SELECT COUNT(*) AS crops FROM products WHERE farmer_id=?",

    [farmerId],

    (err, cropResult) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          msg: "Database error ❌",
        });
      }

      /* ================= TOTAL ORDERS ================= */

      db.query(

        "SELECT COUNT(*) AS orders FROM orders WHERE farmer_id=?",

        [farmerId],

        (err2, orderResult) => {

          if (err2) {

            console.log(err2);

            return res.status(500).json({
              success: false,
              msg: "Orders error ❌",
            });
          }

          /* ================= TOTAL EARNINGS ================= */

          db.query(

            `SELECT 
              IFNULL(SUM(total_amount),0)
              AS earnings

             FROM orders

             WHERE farmer_id=?`,

            [farmerId],

            (err3, earningResult) => {

              if (err3) {

                console.log(err3);

                return res.status(500).json({
                  success: false,
                  msg: "Earnings error ❌",
                });
              }

              /* ================= RECENT PRODUCTS ================= */

              db.query(

                `SELECT * FROM products
                 WHERE farmer_id=?
                 ORDER BY id DESC
                 LIMIT 5`,

                [farmerId],

                (err4, productResult) => {

                  if (err4) {

                    console.log(err4);

                    return res.status(500).json({
                      success: false,
                      msg: "Products error ❌",
                    });
                  }

                  /* ================= SEND RESPONSE ================= */

                  res.json({

                    success: true,

                    stats: {

                      totalCrops:
                        cropResult[0].crops,

                      totalOrders:
                        orderResult[0].orders,

                      totalEarnings:
                        earningResult[0].earnings,
                    },

                    recentProducts:
                      productResult,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports =
  router;