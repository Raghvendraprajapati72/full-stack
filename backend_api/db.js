const mysql = require("mysql2");

require("dotenv").config();

/* =====================================================
   MYSQL CONNECTION
===================================================== */

const db = mysql.createPool({

  host:
    process.env.DB_HOST,

  user:
    process.env.DB_USER,

  password:
    process.env.DB_PASSWORD,

  database:
    process.env.DB_NAME,

  port:
    process.env.DB_PORT,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

  connectTimeout: 10000,
});

/* =====================================================
   TEST CONNECTION
===================================================== */

db.getConnection(
  (err, connection) => {

    if (err) {

      console.log(
        "❌ MYSQL CONNECTION ERROR"
      );

      console.log(err);

    } else {

      console.log(
        "✅ MySQL Connected Successfully"
      );

      connection.release();
    }
  }
);

/* =====================================================
   EXPORT
===================================================== */

module.exports = db.promise();