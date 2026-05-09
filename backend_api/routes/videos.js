const router = require("express").Router();
const multer = require("multer");
const db = require("../db");
const path = require("path");

// 📂 Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  }
});

const upload = multer({ storage });

// 🎥 ADMIN UPLOAD VIDEO
router.post("/upload", upload.single("video"), (req, res) => {
  const { title } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, msg: "Video required" });
  }

  const videoUrl = `/uploads/${req.file.filename}`;

  db.query(
    "INSERT INTO videos (title, video_url) VALUES (?, ?)",
    [title || "Broadcast Video", videoUrl],
    (err) => {
      if (err) {
        console.log("VIDEO UPLOAD ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true, msg: "Video uploaded 🎥" });
    }
  );
});

// 📺 GET ALL VIDEOS (Farmer view)
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM videos ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.log("FETCH VIDEO ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json(result);
    }
  );
});

// ❌ DELETE VIDEO (Admin)
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM videos WHERE id=?",
    [req.params.id],
    () => res.json({ success: true })
  );
});

module.exports = router;