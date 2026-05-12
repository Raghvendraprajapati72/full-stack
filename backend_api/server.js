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

/* =====================================================
   DATABASE
===================================================== */

require("./db");

/* =====================================================
   EXPRESS APP
===================================================== */

const app = express();

/* =====================================================
   CORS FIX
===================================================== */

app.use(
  cors({

    origin: [
      "https://auth-app-vi0m.onrender.com",
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    credentials: true,
  })
);

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =====================================================
   UPLOADS FOLDER
===================================================== */

const uploadsPath = path.join(
  __dirname,
  "uploads"
);

if (
  !fs.existsSync(
    uploadsPath
  )
) {

  fs.mkdirSync(
    uploadsPath
  );
}

/* =====================================================
   STATIC FILES
===================================================== */

app.use(
  "/uploads",
  express.static(
    uploadsPath
  )
);

/* =====================================================
   TEST ROUTE
===================================================== */

app.get("/",
  (req, res) => {

    res.json({

      success: true,

      msg:
        "🚀 AgroConnect API Running",

    });
  }
);

/* =====================================================
   SAFE ROUTE LOADER
===================================================== */

const loadRoute = (
  routePath,
  routeFile
) => {

  try {

    const route =
      require(routeFile);

    app.use(
      routePath,
      route
    );

    console.log(
      `✅ Route Loaded: ${routePath}`
    );

  } catch (err) {

    console.log(
      `❌ Route Error ${routePath}:`,
      err.message
    );
  }
};

/* =====================================================
   API ROUTES
===================================================== */

/* ---------- AUTH ---------- */

loadRoute(
  "/auth",
  "./routes/auth"
);

/* ---------- PRODUCTS ---------- */

loadRoute(
  "/products",
  "./routes/product"
);

/* ---------- CART ---------- */

loadRoute(
  "/cart",
  "./routes/cart"
);

/* ---------- ORDERS ---------- */

loadRoute(
  "/orders",
  "./routes/order"
);

/* ---------- DELIVERY ---------- */

loadRoute(
  "/delivery",
  "./routes/deliveryRoute"
);

/* ---------- PAYMENT ---------- */

loadRoute(
  "/payment",
  "./routes/payment"
);

/* ---------- VIDEOS ---------- */

loadRoute(
  "/videos",
  "./routes/videos"
);

/* ---------- BROADCAST ---------- */

loadRoute(
  "/broadcast",
  "./routes/broadcast"
);

/* ---------- FOLLOW ---------- */

loadRoute(
  "/follow",
  "./routes/follow"
);

/* ---------- HELPDESK ---------- */

loadRoute(
  "/helpdesk",
  "./routes/helpdesk"
);

/* ---------- NEWS ---------- */

loadRoute(
  "/news",
  "./routes/news"
);

/* ---------- ADMIN ---------- */

loadRoute(
  "/admin",
  "./routes/admin"
);

/* =====================================================
   DASHBOARD ROUTES
===================================================== */

/* ---------- FARMER DASHBOARD ---------- */

loadRoute(
  "/dashboard/farmer",
  "./routes/farmerDashboard"
);

/* ---------- CONSUMER DASHBOARD ---------- */

loadRoute(
  "/dashboard/consumer",
  "./routes/consumerDashboard"
);

/* =====================================================
   SOCKET SERVER
===================================================== */

const server =
  http.createServer(app);

const io =
  new Server(server, {

    cors: {

      origin:
        "https://auth-app-vi0m.onrender.com",

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

io.on(
  "connection",

  (socket) => {

    console.log(
      "🔌 User connected:",
      socket.id
    );

    /* =====================================================
       NEW ORDER EVENT
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
       DELIVERY TRACKING
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
  }
);

/* =====================================================
   404 ROUTE
===================================================== */

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      msg:
        "Route not found ❌",

    });
  }
);

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

    res.status(500).json({

      success: false,

      msg:
        "Internal Server Error ❌",

    });
  }
);

/* =====================================================
   START SERVER
===================================================== */

const PORT =
  process.env.PORT || 10000;

server.listen(
  PORT,

  () => {

    console.log(
      `🚀 Server running on PORT ${PORT}`
    );
  }
);