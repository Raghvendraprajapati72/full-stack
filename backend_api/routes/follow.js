const router = require("express").Router();
const db = require("../db");

// ================= FOLLOW USER =================
router.post("/", (req, res) => {
  const { userId, targetId } = req.body;

  if (!userId || !targetId) {
    return res.status(400).json({ success: false, msg: "Missing data" });
  }

  // prevent duplicate follow
  db.query(
    "SELECT * FROM follows WHERE follower_id=? AND following_id=?",
    [userId, targetId],
    (err, result) => {
      if (err) return res.status(500).json({ success: false });

      if (result.length > 0) {
        return res.json({ success: false, msg: "Already following" });
      }

      db.query(
        "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)",
        [userId, targetId],
        (err) => {
          if (err) return res.status(500).json({ success: false });

          res.json({ success: true, msg: "Followed ✅" });
        }
      );
    }
  );
});


// ================= UNFOLLOW =================
router.post("/unfollow", (req, res) => {
  const { userId, targetId } = req.body;

  db.query(
    "DELETE FROM follows WHERE follower_id=? AND following_id=?",
    [userId, targetId],
    (err) => {
      if (err) return res.status(500).json({ success: false });

      res.json({ success: true, msg: "Unfollowed ❌" });
    }
  );
});


// ================= GET FOLLOWING =================
router.get("/following/:userId", (req, res) => {
  db.query(
    "SELECT following_id FROM follows WHERE follower_id=?",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).json([]);

      res.json(result);
    }
  );
});


// ================= GET FOLLOWERS =================
router.get("/followers/:userId", (req, res) => {
  db.query(
    "SELECT follower_id FROM follows WHERE following_id=?",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).json([]);

      res.json(result);
    }
  );
});


// ================= COUNT =================
router.get("/count/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT COUNT(*) AS followers FROM follows WHERE following_id=?",
    [userId],
    (err, followersRes) => {
      if (err) return res.status(500).json({});

      db.query(
        "SELECT COUNT(*) AS following FROM follows WHERE follower_id=?",
        [userId],
        (err, followingRes) => {
          if (err) return res.status(500).json({});

          res.json({
            followers: followersRes[0].followers,
            following: followingRes[0].following
          });
        }
      );
    }
  );
});

module.exports = router;