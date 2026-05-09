const router = require("express").Router();
const multer = require("multer");
const db = require("../db");

const upload = multer({ dest: "uploads/" });

// 🎥 UPLOAD VIDEO
router.post("/upload", upload.single("video"), (req, res) => {
  const { farmerId, title } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, msg: "Video required" });
  }

  const video = `/uploads/${req.file.filename}`;

  db.query(
    "INSERT INTO broadcasts (video_url, farmer_id, title) VALUES (?, ?, ?)",
    [video, farmerId, title || "Live Stream"],
    (err) => {
      if (err) {
        console.log("UPLOAD ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true, msg: "Video uploaded 🎥" });
    }
  );
});

// 📺 GET ALL VIDEOS
router.get("/", (req, res) => {
  db.query(
    `SELECT b.*, u.name AS farmer_name
     FROM broadcasts b
     LEFT JOIN users u ON b.farmer_id = u.id
     ORDER BY b.id DESC`,
    (err, result) => {
      if (err) {
        console.log("FETCH ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json(result);
    }
  );
});

// ❌ DELETE VIDEO
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM broadcasts WHERE id=?",
    [req.params.id],
    () => res.json({ success: true })
  );
});

module.exports = router;