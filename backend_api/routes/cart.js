const router = require("express").Router();
const db = require("../db");

// ➕ ADD TO CART
router.post("/add", (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      msg: "userId and productId required"
    });
  }

  db.query(
    "INSERT INTO cart (user_id, product_id) VALUES (?, ?)",
    [userId, productId],
    (err) => {
      if (err) {
        console.log("ADD CART ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true, msg: "Added to cart ✅" });
    }
  );
});

// 📦 GET CART ITEMS (with product details)
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    `SELECT cart.id, products.name, products.price
     FROM cart
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_id=?`,
    [userId],
    (err, result) => {
      if (err) {
        console.log("GET CART ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json(result);
    }
  );
});

// ❌ REMOVE ITEM FROM CART
router.delete("/:id", (req, res) => {
  const cartId = req.params.id;

  db.query(
    "DELETE FROM cart WHERE id=?",
    [cartId],
    (err) => {
      if (err) {
        console.log("DELETE CART ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true, msg: "Item removed 🗑️" });
    }
  );
});

// 🧹 CLEAR FULL CART
router.delete("/clear/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "DELETE FROM cart WHERE user_id=?",
    [userId],
    (err) => {
      if (err) {
        console.log("CLEAR CART ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true, msg: "Cart cleared 🧹" });
    }
  );
});

module.exports = router;