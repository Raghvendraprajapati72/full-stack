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
   MIDDLEWARE
===================================================== */

app.use(cors());

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
   API ROUTES
===================================================== */

/* ---------- AUTH ---------- */

app.use(
  "/auth",
  require("./routes/auth")
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
  require("./routes/delivery")
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

/* =====================================================
   DASHBOARD ROUTES
===================================================== */

/* ---------- FARMER DASHBOARD ---------- */

app.use(
  "/dashboard/farmer",
  require(
    "./routes/farmerDashboard"
  )
);

/* ---------- CONSUMER DASHBOARD ---------- */

app.use(
  "/dashboard/consumer",
  require(
    "./routes/consumerDashboard"
  )
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
  process.env.PORT || 5000;

server.listen(
  PORT,

  () => {

    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );
  }
);