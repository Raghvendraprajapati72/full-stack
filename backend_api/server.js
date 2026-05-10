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

app.use(helmet());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

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

/* ---------- AUTH ---------- */

app.use(
  "/auth",
  require("./routes/auth")
);

/* ---------- USERS ---------- */

app.use(
  "/users",
  require("./routes/userRoutes")
);

/* ---------- PRODUCTS ---------- */

app.use(
  "/products",
  require("./routes/product")
);

/* ---------- CART ---------- */

app.use(
  "/cart",
  require("./routes/cart")
);

/* ---------- ORDERS ---------- */

app.use(
  "/orders",
  require("./routes/order")
);

/* ---------- DELIVERY ---------- */

app.use(
  "/delivery",
  require("./routes/deliveryRoute")
);

/* ---------- PAYMENT ---------- */

app.use(
  "/payment",
  require("./routes/payment")
);

/* ---------- VIDEOS ---------- */

app.use(
  "/videos",
  require("./routes/videos")
);

/* ---------- BROADCAST ---------- */

app.use(
  "/broadcast",
  require("./routes/broadcast")
);

/* ---------- FOLLOW ---------- */

app.use(
  "/follow",
  require("./routes/follow")
);

/* ---------- HELPDESK ---------- */

app.use(
  "/helpdesk",
  require("./routes/helpdesk")
);

/* ---------- NEWS ---------- */

app.use(
  "/news",
  require("./routes/news")
);

/* ---------- ADMIN ---------- */

app.use(
  "/admin",
  require("./routes/admin")
);

/* ---------- REWARDS ---------- */

app.use(
  "/rewards",
  require("./routes/rewards")
);

/* ---------- PROMOTIONS ---------- */

app.use(
  "/promotions",
  require("./routes/promotions")
);

/* =====================================================
   DASHBOARD ROUTES
===================================================== */

/* ---------- FARMER DASHBOARD ---------- */

app.use(
  "/dashboard/farmer",
  require("./routes/farmerDashboard")
);

/* ---------- CONSUMER DASHBOARD ---------- */

app.use(
  "/dashboard/consumer",
  require("./routes/consumerDashboard")
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

  /* =====================================================
     ORDER EVENT
  ===================================================== */

  socket.on(
    "new-order",
    (data) => {

      io.emit(
        "order-update",
        data
      );

      console.log(
        "📦 New Order:",
        data
      );
    }
  );

  /* =====================================================
     DELIVERY EVENT
  ===================================================== */

  socket.on(
    "delivery-update",
    (data) => {

      io.emit(
        "delivery-tracking",
        data
      );

      console.log(
        "🚚 Delivery Update:",
        data
      );
    }
  );

  /* =====================================================
     LIVE STREAM EVENT
  ===================================================== */

  socket.on(
    "live-stream",
    (data) => {

      io.emit(
        "stream-update",
        data
      );

      console.log(
        "📡 Live Stream:",
        data
      );
    }
  );

  /* =====================================================
     NEWS EVENT
  ===================================================== */

  socket.on(
    "news-update",
    (data) => {

      io.emit(
        "latest-news",
        data
      );

      console.log(
        "📰 News Update:",
        data
      );
    }
  );

  /* =====================================================
     FOLLOW EVENT
  ===================================================== */

  socket.on(
    "follow-user",
    (data) => {

      io.emit(
        "follow-update",
        data
      );

      console.log(
        "👥 Follow Update:",
        data
      );
    }
  );

  /* =====================================================
     PAYMENT EVENT
  ===================================================== */

  socket.on(
    "payment-success",
    (data) => {

      io.emit(
        "payment-update",
        data
      );

      console.log(
        "💳 Payment Success:",
        data
      );
    }
  );

  /* =====================================================
     CHAT EVENT
  ===================================================== */

  socket.on(
    "send-message",
    (data) => {

      io.emit(
        "receive-message",
        data
      );

      console.log(
        "💬 Chat Message:",
        data
      );
    }
  );

  /* =====================================================
     ONLINE USERS
  ===================================================== */

  socket.on(
    "user-online",
    (data) => {

      io.emit(
        "online-users",
        data
      );

      console.log(
        "🟢 User Online:",
        data
      );
    }
  );

  /* =====================================================
     DISCONNECT
  ===================================================== */

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