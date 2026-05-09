const router = require("express").Router();
const db = require("../db");

// 💳 CREATE PAYMENT (SIMULATION)
router.post("/pay", (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({
      success: false,
      msg: "userId and amount required"
    });
  }

  // ✅ Step 1: Save payment
  db.query(
    "INSERT INTO payments (user_id, amount, status) VALUES (?, ?, ?)",
    [userId, amount, "SUCCESS"],
    (err, result) => {
      if (err) {
        console.log("PAYMENT ERROR:", err);
        return res.status(500).json({ success: false });
      }

      // ✅ Step 2: Create order
      db.query(
        "INSERT INTO orders (user_id, total) VALUES (?, ?)",
        [userId, amount],
        (err2) => {
          if (err2) {
            console.log("ORDER ERROR:", err2);
            return res.status(500).json({ success: false });
          }

          // ✅ Step 3: Clear cart
          db.query(
            "DELETE FROM cart WHERE user_id=?",
            [userId],
            () => {
              res.json({
                success: true,
                msg: "Payment successful 💳 & Order placed 📦"
              });
            }
          );
        }
      );
    }
  );
});

// 📊 GET USER PAYMENTS
router.get("/:userId", (req, res) => {
  db.query(
    "SELECT * FROM payments WHERE user_id=?",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).json({ success: false });

      res.json(result);
    }
  );
});

module.exports = router;