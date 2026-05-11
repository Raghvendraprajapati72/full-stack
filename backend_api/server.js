const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ROUTES */

const authRoutes =
  require("./routes/auth");

app.use("/auth", authRoutes);

/* TEST ROUTE */

app.get("/", (req, res) => {
  res.send("API Running ✅");
});

/* SERVER */

const PORT =
  process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on PORT ${PORT}`
  );
});