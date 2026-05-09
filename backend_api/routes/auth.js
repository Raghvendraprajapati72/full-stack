require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");

/* ==================================
   JWT SECRET
================================== */

const JWT_SECRET = process.env.JWT_SECRET;

/* ==================================
   OTP STORE
================================== */

const otpStore = {};

/* ==================================
   MULTER
================================== */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

/* ==================================
   MAIL
================================== */

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

/* ==================================
   REGISTER
================================== */

router.post(

  "/register",

  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  async (req, res) => {

    try {

      let {
        name,
        email,
        password,
        role,
        bio,
        location,
      } = req.body;

      email =
        email?.trim().toLowerCase();

      if (
        !name ||
        !email ||
        !password ||
        !role
      ) {
        return res.status(400).json({
          success: false,
          msg: "All fields required ❌",
        });
      }

      db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async (err, result) => {

          if (err) {
            return res.status(500).json({
              success: false,
            });
          }

          if (result.length > 0) {

            return res.status(400).json({
              success: false,
              msg: "User already exists ❌",
            });
          }

          const hashedPassword =
            await bcrypt.hash(password, 10);

          const image =
            req.files?.image
              ? `/uploads/${req.files.image[0].filename}`
              : "";

          const coverImage =
            req.files?.coverImage
              ? `/uploads/${req.files.coverImage[0].filename}`
              : "";

          db.query(

            `
            INSERT INTO users
            (
              name,
              email,
              password,
              role,
              image,
              bio,
              location,
              coverImage
            )

            VALUES (?,?,?,?,?,?,?,?)
            `,

            [
              name,
              email,
              hashedPassword,
              role,
              image,
              bio || "",
              location || "",
              coverImage,
            ],

            (err, result) => {

              if (err) {

                console.log(err);

                return res.status(500).json({
                  success: false,
                  msg: "Registration failed ❌",
                });
              }

              const token = jwt.sign(

                {
                  id: result.insertId,
                  role,
                },

                JWT_SECRET,

                {
                  expiresIn: "7d",
                }
              );

              res.json({

                success: true,

                msg:
                  "Registered Successfully ✅",

                token,

                user: {
                  id: result.insertId,
                  name,
                  email,
                  role,
                  image,
                  bio,
                  location,
                  coverImage,
                },
              });
            }
          );
        }
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* ==================================
   SEND OTP
================================== */

router.post(
  "/send-otp",

  async (req, res) => {

    try {

      let { email, password } =
        req.body;

      email =
        email?.trim().toLowerCase();

      db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async (err, result) => {

          if (result.length === 0) {

            return res.status(400).json({
              success: false,
              msg: "User not found ❌",
            });
          }

          const user = result[0];

          const isMatch =
            await bcrypt.compare(
              password,
              user.password
            );

          if (!isMatch) {

            return res.status(400).json({
              success: false,
              msg: "Wrong password ❌",
            });
          }

          const otp =
            Math.floor(
              100000 +
              Math.random() * 900000
            );

          otpStore[email] = {
            otp,
            user,
          };

          await transporter.sendMail({

            from:
              process.env.EMAIL_USER,

            to: email,

            subject:
              "AgroConnect Login OTP",

            html: `
              <h1>AgroConnect</h1>

              <h2>Your OTP:</h2>

              <h1>${otp}</h1>

              <p>
                Do not share OTP
              </p>
            `,
          });

          res.json({
            success: true,
            msg: "OTP Sent ✅",
          });
        }
      );

    } catch (err) {

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* ==================================
   VERIFY OTP
================================== */

router.post(
  "/verify-otp",

  async (req, res) => {

    try {

      let { email, otp } =
        req.body;

      email =
        email?.trim().toLowerCase();

      if (!otpStore[email]) {

        return res.status(400).json({
          success: false,
          msg: "OTP expired ❌",
        });
      }

      if (
        otpStore[email].otp != otp
      ) {

        return res.status(400).json({
          success: false,
          msg: "Wrong OTP ❌",
        });
      }

      const user =
        otpStore[email].user;

      delete otpStore[email];

      const token = jwt.sign(

        {
          id: user.id,
          role: user.role,
        },

        JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );

      res.json({

        success: true,

        token,

        user,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* ==================================
   GET ALL USERS
================================== */

router.get("/users", (req, res) => {

  db.query(

    `
    SELECT
      id,
      name,
      email,
      role,
      image,
      bio,
      location,
      coverImage

    FROM users
    `,

    (err, result) => {

      if (err) {

        return res.status(500).json([]);
      }

      res.json(result);
    }
  );
});

/* ==================================
   PUBLIC PROFILE
================================== */

router.get(

  "/profile/:id",

  (req, res) => {

    const userId =
      req.params.id;

    db.query(

      "SELECT * FROM users WHERE id=?",

      [userId],

      (err, result) => {

        if (err) {

          return res.status(500).json({});
        }

        if (result.length === 0) {

          return res.status(404).json({
            msg: "User not found",
          });
        }

        const user = result[0];

        db.query(

          `
          SELECT COUNT(*) AS followers
          FROM follows
          WHERE following_id=?
          `,

          [userId],

          (err2, followerRes) => {

            db.query(

              `
              SELECT COUNT(*) AS following
              FROM follows
              WHERE follower_id=?
              `,

              [userId],

              (err3, followingRes) => {

                res.json({

                  ...user,

                  followers:
                    followerRes[0].followers,

                  following:
                    followingRes[0].following,
                });
              }
            );
          }
        );
      }
    );
  }
);

/* ==================================
   SEARCH USERS
================================== */

router.get(
  "/search/:text",

  (req, res) => {

    const text =
      `%${req.params.text}%`;

    db.query(

      `
      SELECT
        id,
        name,
        role,
        image,
        bio,
        location

      FROM users

      WHERE
        name LIKE ?
        OR role LIKE ?
        OR location LIKE ?
      `,

      [text, text, text],

      (err, result) => {

        if (err) {

          return res.status(500).json([]);
        }

        res.json(result);
      }
    );
  }
);

/* ==================================
   UPDATE PROFILE
================================== */

router.put(

  "/update/:id",

  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  (req, res) => {

    const {
      name,
      role,
      bio,
      location,
    } = req.body;

    const image =
      req.files?.image
        ? `/uploads/${req.files.image[0].filename}`
        : null;

    const coverImage =
      req.files?.coverImage
        ? `/uploads/${req.files.coverImage[0].filename}`
        : null;

    let sql =
      `
      UPDATE users
      SET
        name=?,
        role=?,
        bio=?,
        location=?
      `;

    let values = [
      name,
      role,
      bio,
      location,
    ];

    if (image) {

      sql += ", image=?";

      values.push(image);
    }

    if (coverImage) {

      sql += ", coverImage=?";

      values.push(coverImage);
    }

    sql += " WHERE id=?";

    values.push(req.params.id);

    db.query(

      sql,
      values,

      (err) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            success: false,
          });
        }

        res.json({
          success: true,
          msg: "Profile updated ✅",
        });
      }
    );
  }
);

/* ==================================
   CHANGE PASSWORD
================================== */

router.put(

  "/change-password/:id",

  async (req, res) => {

    try {

      const {
        oldPassword,
        newPassword,
      } = req.body;

      db.query(

        "SELECT * FROM users WHERE id=?",

        [req.params.id],

        async (err, result) => {

          const user = result[0];

          const isMatch =
            await bcrypt.compare(
              oldPassword,
              user.password
            );

          if (!isMatch) {

            return res.status(400).json({
              success: false,
              msg:
                "Old password incorrect ❌",
            });
          }

          const hashedPassword =
            await bcrypt.hash(
              newPassword,
              10
            );

          db.query(

            `
            UPDATE users
            SET password=?
            WHERE id=?
            `,

            [
              hashedPassword,
              req.params.id,
            ],

            (err) => {

              if (err) {

                return res.status(500).json({
                  success: false,
                });
              }

              res.json({
                success: true,
                msg:
                  "Password changed ✅",
              });
            }
          );
        }
      );

    } catch (err) {

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* ==================================
   DELETE USER
================================== */

router.delete(
  "/users/:id",

  (req, res) => {

    db.query(

      "DELETE FROM users WHERE id=?",

      [req.params.id],

      (err) => {

        if (err) {

          return res.status(500).json({
            success: false,
          });
        }

        res.json({
          success: true,
          msg: "User deleted 🗑️",
        });
      }
    );
  }
);

module.exports = router;