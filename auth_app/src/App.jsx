/* =====================================================
   App.jsx
===================================================== */

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* =====================================================
   🌍 PUBLIC PAGES
===================================================== */

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import News from "./pages/News";

/* =====================================================
   👤 DASHBOARD PAGES
===================================================== */

import Consumer from "./pages/Consumer";
import Farmer from "./pages/Farmer";
import Admin from "./pages/Admin";

/* =====================================================
   📦 FEATURE PAGES
===================================================== */

import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import DeliveryStatus from "./pages/DeliveryStatus";
import HelpDesk from "./pages/HelpDesk";
import LiveStream from "./pages/LiveStream";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Rewards from "./pages/Rewards";
import Promotions from "./pages/Promotions";
import Reports from "./pages/Reports";

/* =====================================================
   🔒 PROTECTED ROUTE
===================================================== */

import ProtectedRoute from "./components/ProtectedRoute";

/* =====================================================
   🚀 APP
===================================================== */

export default function App() {

  return (

    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >

      <Routes>

        {/* =====================================================
            🌍 PUBLIC ROUTES
        ===================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/profile/:id"
          element={<Profile />}
        />

        <Route
          path="/news"
          element={<News />}
        />

        {/* =====================================================
            👤 CONSUMER ROUTES
        ===================================================== */}

        <Route
          path="/consumer"
          element={
            <ProtectedRoute
              allowedRoles={["consumer"]}
            >
              <Consumer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute
              allowedRoles={["consumer"]}
            >
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              allowedRoles={["consumer"]}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rewards"
          element={
            <ProtectedRoute
              allowedRoles={[
                "consumer",
              ]}
            >
              <Rewards />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            👨‍🌾 FARMER ROUTES
        ===================================================== */}

        <Route
          path="/farmer"
          element={
            <ProtectedRoute
              allowedRoles={["farmer"]}
            >
              <Farmer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/livestream"
          element={
            <ProtectedRoute
              allowedRoles={[
                "farmer",
                "consumer",
                "admin",
              ]}
            >
              <LiveStream />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            🚚 DELIVERY
        ===================================================== */}

        <Route
          path="/delivery"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "consumer",
                "farmer",
              ]}
            >
              <DeliveryStatus />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            👑 ADMIN ROUTES
        ===================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/promotions"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Promotions />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            ⚙️ SETTINGS
        ===================================================== */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "consumer",
                "farmer",
              ]}
            >
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            🎧 HELPDESK
        ===================================================== */}

        <Route
          path="/helpdesk"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "consumer",
                "farmer",
              ]}
            >
              <HelpDesk />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            🌐 COMMUNITY
        ===================================================== */}

        <Route
          path="/community"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "consumer",
                "farmer",
              ]}
            >
              <Community />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            ❌ 404 PAGE
        ===================================================== */}

        <Route
          path="*"
          element={

            <div style={notFoundContainer}>

              <div style={notFoundCard}>

                <div style={emoji}>
                  🚫
                </div>

                <h1 style={notFoundTitle}>
                  404
                </h1>

                <p style={notFoundText}>

                  Oops! The page
                  you are looking for
                  does not exist.

                </p>

                <a
                  href="/"
                  style={homeButton}
                >
                  ⬅ Back To Home
                </a>

              </div>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

/* =====================================================
   🎨 STYLES
===================================================== */

const notFoundContainer = {

  minHeight: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  padding: "20px",
};

const notFoundCard = {

  width: "100%",

  maxWidth: "500px",

  textAlign: "center",

  padding: "60px 40px",

  borderRadius: "32px",

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter: "blur(20px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 20px 80px rgba(0,0,0,0.5)",

  color: "white",
};

const emoji = {

  fontSize: "60px",

  marginBottom: "10px",
};

const notFoundTitle = {

  fontSize: "110px",

  margin: 0,

  fontWeight: "900",

  background:
    "linear-gradient(90deg,#22c55e,#3b82f6)",

  WebkitBackgroundClip: "text",

  WebkitTextFillColor:
    "transparent",
};

const notFoundText = {

  marginTop: "15px",

  marginBottom: "35px",

  fontSize: "22px",

  lineHeight: "34px",

  color: "#cbd5e1",
};

const homeButton = {

  display: "inline-block",

  padding: "16px 36px",

  borderRadius: "14px",

  textDecoration: "none",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  fontSize: "16px",

  boxShadow:
    "0 10px 25px rgba(34,197,94,0.4)",

  transition: "0.3s",
};