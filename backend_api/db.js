const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "https://full-stack-backend-qps4.onrender.com",
  user: "root",
  password: "admin123", // ✅ यही missing था
  database: "agroconnect"
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

module.exports = db;