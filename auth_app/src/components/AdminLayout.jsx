import { useState } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function AdminLayout({
  children,
}) {

  const [open,
    setOpen] =
    useState(true);

  const location =
    useLocation();

  const menus = [

    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },

    {
      name: "Products",
      path: "/products",
      icon: "🌾",
    },

    {
      name: "Delivery",
      path: "/delivery",
      icon: "🚚",
    },

    {
      name: "Reports",
      path: "/reports",
      icon: "📈",
    },

    {
      name: "Promotions",
      path: "/promotions",
      icon: "🔥",
    },

    {
      name: "Live Stream",
      path: "/livestream",
      icon: "📡",
    },

    {
      name: "News",
      path: "/news",
      icon: "📰",
    },

    {
      name: "Rewards",
      path: "/rewards",
      icon: "🎁",
    },

    {
      name: "Community",
      path: "/community",
      icon: "👥",
    },

    {
      name: "Settings",
      path: "/settings",
      icon: "⚙️",
    },

    {
      name: "HelpDesk",
      path: "/helpdesk",
      icon: "🎧",
    },
  ];

  return (

    <div style={container}>

      {/* SIDEBAR */}

      <div style={{
        ...sidebar,
        width:
          open
            ? "260px"
            : "90px",
      }}>

        <div style={logoBox}>

          <h1 style={logo}>
            {open
              ? "👑 AgroAdmin"
              : "👑"}
          </h1>

          <button
            style={toggleBtn}
            onClick={() =>
              setOpen(!open)
            }
          >
            ☰
          </button>

        </div>

        {menus.map((m) => (

          <Link
            key={m.path}
            to={m.path}
            style={{
              ...menu,
              background:
                location.pathname ===
                m.path
                  ? "#22c55e"
                  : "transparent",
            }}
          >

            <span>
              {m.icon}
            </span>

            {open &&
              <span>
                {m.name}
              </span>}

          </Link>
        ))}

        <button
          style={logoutBtn}
          onClick={() => {

            localStorage.removeItem(
              "user"
            );

            window.location.href =
              "/login";
          }}
        >
          🚪 {open &&
            "Logout"}
        </button>

      </div>

      {/* CONTENT */}

      <div style={{
        ...main,
        marginLeft:
          open
            ? "260px"
            : "90px",
      }}>

        {children}

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  background: "#020617",
  minHeight: "100vh",
};

const sidebar = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  padding: "20px",
  background:
    "linear-gradient(180deg,#0f172a,#111827)",
  transition: "0.3s",
  overflowY: "auto",
};

const logoBox = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const logo = {
  color: "white",
};

const toggleBtn = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "22px",
  cursor: "pointer",
};

const menu = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  borderRadius: "14px",
  textDecoration: "none",
  color: "white",
  marginBottom: "12px",
};

const logoutBtn = {
  marginTop: "30px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
};

const main = {
  flex: 1,
  padding: "30px",
  transition: "0.3s",
};