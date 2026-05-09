const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // ✅ FIXED
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

/* ================= GET ALL PRODUCTS ================= */
router.get("/", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log("PRODUCT ERROR:", err);
      return res.status(500).json([]);
    }
    res.json(result);
  });
});

/* ================= ADD PRODUCT ================= */
router.post("/add", upload.single("file"), (req, res) => {
  const { name, price, farmer_id } = req.body;

  const image = req.file
    ? `/uploads/${req.file.filename}`
    : "https://via.placeholder.com/300";

  db.query(
    "INSERT INTO products (name,price,image,farmer_id) VALUES (?,?,?,?)",
    [name, price, image, farmer_id],
    (err) => {
      if (err) {
        console.log("ADD PRODUCT ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true });
    }
  );
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  db.query(
    "DELETE FROM products WHERE id=?",
    [productId],
    (err) => {
      if (err) {
        console.log("DELETE ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true, msg: "Product deleted 🗑️" });
    }
  );
});

module.exports = router;