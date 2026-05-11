/* =====================================================
   server.js
===================================================== */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

/* =====================================================
   DATABASE
===================================================== */

require("./db");

/* =====================================================
   EXPRESS APP
===================================================== */

const app = express();

/* =====================================================
   SECURITY MIDDLEWARE
===================================================== */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: false,
  })
);

app.options("*", cors());

app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

/* =====================================================
   UPLOADS FOLDER
===================================================== */

const uploadsPath = path.join(
  __dirname,
  "uploads"
);

if (!fs.existsSync(uploadsPath)) {

  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}

/* =====================================================
   STATIC FILES
===================================================== */

app.use(
  "/uploads",
  express.static(uploadsPath)
);

/* =====================================================
   TEST ROUTE
===================================================== */

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    app: "AgroConnect Backend API",

    msg:
      "🚀 AgroConnect API Running Successfully",

    version: "2.0.0",

    environment:
      process.env.NODE_ENV || "development",

    timestamp:
      new Date(),

  });
});

/* =====================================================
   API ROUTES
===================================================== */

app.use(
  "/auth",
  require("./routes/auth")
);

app.use(
  "/users",
  require("./routes/userRoutes")
);

app.use(
  "/products",
  require("./routes/product")
);

app.use(
  "/cart",
  require("./routes/cart")
);

app.use(
  "/orders",
  require("./routes/order")
);

app.use(
  "/delivery",
  require("./routes/deliveryRoute")
);

app.use(
  "/payment",
  require("./routes/payment")
);

app.use(
  "/videos",
  require("./routes/videos")
);

app.use(
  "/broadcast",
  require("./routes/broadcast")
);

app.use(
  "/follow",
  require("./routes/follow")
);

app.use(
  "/helpdesk",
  require("./routes/helpdesk")
);

app.use(
  "/news",
  require("./routes/news")
);

app.use(
  "/admin",
  require("./routes/admin")
);

/* =====================================================
   SOCKET SERVER
===================================================== */

const server =
  http.createServer(app);

const io =
  new Server(server, {

    cors: {

      origin: "*",

      methods: [
        "GET",
        "POST",
      ],
    },
  });

app.set("io", io);

/* =====================================================
   SOCKET EVENTS
===================================================== */

io.on("connection", (socket) => {

  console.log(
    "🔌 User connected:",
    socket.id
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "❌ User disconnected:",
        socket.id
      );
    }
  );
});

/* =====================================================
   404 ROUTE
===================================================== */

app.use((req, res) => {

  res.status(404).json({

    success: false,

    msg:
      "Route not found ❌",

    route:
      req.originalUrl,

  });
});

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.log(
      "SERVER ERROR:",
      err
    );

    res.status(
      err.status || 500
    ).json({

      success: false,

      msg:
        err.message ||
        "Internal Server Error ❌",

    });
  }
);

/* =====================================================
   START SERVER
===================================================== */

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(`
========================================
🚀 AgroConnect Server Running
🌍 PORT: ${PORT}
========================================
`);
});