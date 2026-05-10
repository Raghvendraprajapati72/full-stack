import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar() {

  const location =
    useLocation();

  const menus = [

    {
      name: "Home",
      path: "/",
      icon: "🏠",
    },

    {
      name: "Products",
      path: "/products",
      icon: "🌾",
    },

    {
      name: "Cart",
      path: "/cart",
      icon: "🛒",
    },

    {
      name: "Orders",
      path: "/orders",
      icon: "📦",
    },

    {
      name: "Community",
      path: "/community",
      icon: "👥",
    },

    {
      name: "Delivery",
      path: "/delivery",
      icon: "🚚",
    },

    {
      name: "News",
      path: "/news",
      icon: "📰",
    },

    {
      name: "HelpDesk",
      path: "/helpdesk",
      icon: "🎧",
    },
  ];

  return (

    <div style={sidebar}>

      <h2 style={logo}>
        🌾 AgroConnect
      </h2>

      {menus.map((m) => (

        <Link
          key={m.path}
          to={m.path}
          style={{
            ...menuItem,
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

          <span>
            {m.name}
          </span>

        </Link>
      ))}

    </div>
  );
}

/* ================= STYLES ================= */

const sidebar = {

  width: "250px",

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#0f172a,#111827)",

  padding: "25px",

  position: "fixed",

  left: 0,

  top: 0,
};

const logo = {

  color: "white",

  marginBottom: "35px",

  fontSize: "28px",
};

const menuItem = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  padding: "14px",

  borderRadius: "12px",

  color: "white",

  textDecoration: "none",

  marginBottom: "12px",

  transition: "0.3s",
};