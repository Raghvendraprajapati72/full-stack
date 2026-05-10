import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {

  const navigate =
    useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [search,
    setSearch] =
    useState("");

  const [filtered,
    setFiltered] =
    useState([]);

  const [showMenu,
    setShowMenu] =
    useState(false);

  /* =====================================================
     PRODUCTS SEARCH
  ===================================================== */

  const products = [

    "Tomato",
    "Potato",
    "Onion",
    "Carrot",
    "Spinach",
    "Milk",
    "Rice",
    "Wheat",
    "Apple",
    "Banana",
    "Mango",
    "Organic Vegetables",
  ];

  useEffect(() => {

    if (
      search.trim() === ""
    ) {

      setFiltered([]);

    } else {

      const result =
        products.filter(
          (item) =>
            item
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

      setFiltered(result);
    }

  }, [search]);

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  /* =====================================================
     DASHBOARD
  ===================================================== */

  const goDashboard = () => {

    if (!user) {

      navigate("/login");

      return;
    }

    if (
      user.role === "admin"
    ) {

      navigate("/admin");

    } else if (
      user.role === "farmer"
    ) {

      navigate("/farmer");

    } else {

      navigate("/consumer");
    }
  };

  return (

    <>

      {/* =====================================================
         TOP NAVBAR
      ===================================================== */}

      <div style={topNavbar}>

        {/* LOGO */}

        <Link
          to="/"
          style={logo}
        >

          🌾 Agro
          <span style={green}>
            Connect
          </span>

        </Link>

        {/* SEARCH */}

        <div style={searchWrapper}>

          <input
            type="text"
            placeholder="Search fresh products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={searchInput}
          />

          <button
            style={searchBtn}
          >
            🔍
          </button>

          {/* SEARCH DROPDOWN */}

          {filtered.length >
            0 && (

            <div
              style={
                searchDropdown
              }
            >

              {filtered.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    style={
                      searchItem
                    }
                    onClick={() => {

                      setSearch(
                        item
                      );

                      navigate(
                        "/products"
                      );
                    }}
                  >

                    🌿 {item}

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* RIGHT SECTION */}

        <div style={rightSection}>

          {/* ORDERS */}

          <button
            style={navBtn}
            onClick={() =>
              navigate(
                "/orders"
              )
            }
          >
            📦 Orders
          </button>

          {/* DELIVERY */}

          <button
            style={deliveryBtn}
            onClick={() =>
              navigate(
                "/delivery"
              )
            }
          >
            🚚 Delivery
          </button>

          {/* SETTINGS */}

          <button
            style={settingsBtn}
            onClick={() =>
              navigate(
                "/settings"
              )
            }
          >
            ⚙️
          </button>

          {/* NOTIFICATION */}

          <button
            style={notifyBtn}
          >
            🔔
          </button>

          {/* CART */}

          <button
            style={cartBtn}
            onClick={() =>
              navigate("/cart")
            }
          >
            🛒 Cart
          </button>

          {/* USER MENU */}

          {user ? (

            <div
              style={
                profileWrapper
              }
            >

              <button
                style={
                  profileBtn
                }
                onClick={() =>
                  setShowMenu(
                    !showMenu
                  )
                }
              >

                👤 {user.name}

              </button>

              {showMenu && (

                <div
                  style={
                    dropdown
                  }
                >

                  <div
                    style={
                      dropdownItem
                    }
                    onClick={
                      goDashboard
                    }
                  >
                    📊 Dashboard
                  </div>

                  <div
                    style={
                      dropdownItem
                    }
                    onClick={() =>
                      navigate(
                        "/profile"
                      )
                    }
                  >
                    👤 Profile
                  </div>

                  <div
                    style={
                      dropdownItem
                    }
                    onClick={() =>
                      navigate(
                        "/settings"
                      )
                    }
                  >
                    ⚙️ Settings
                  </div>

                  <div
                    style={
                      logoutItem
                    }
                    onClick={
                      logout
                    }
                  >
                    🚪 Logout
                  </div>

                </div>
              )}

            </div>

          ) : (

            <button
              style={
                loginBtn
              }
              onClick={() =>
                navigate(
                  "/login"
                )
              }
            >
              Login
            </button>

          )}

        </div>

      </div>

      {/* =====================================================
         MENU BAR
      ===================================================== */}

      <div style={menuBar}>

        <Link
          to="/products"
          style={menuItem}
        >
          Vegetables
        </Link>

        <Link
          to="/products"
          style={menuItem}
        >
          Fruits
        </Link>

        <Link
          to="/products"
          style={menuItem}
        >
          Dairy
        </Link>

        <Link
          to="/products"
          style={menuItem}
        >
          Organic
        </Link>

        <Link
          to="/community"
          style={menuItem}
        >
          Community
        </Link>

        <Link
          to="/news"
          style={menuItem}
        >
          News
        </Link>

        <Link
          to="/rewards"
          style={menuItem}
        >
          Rewards
        </Link>

        <Link
          to="/helpdesk"
          style={menuItem}
        >
          HelpDesk
        </Link>

      </div>

    </>
  );
}

/* =====================================================
   STYLES
===================================================== */

const topNavbar = {

  width: "100%",

  minHeight: "85px",

  background:
    "rgba(15,23,42,0.95)",

  backdropFilter:
    "blur(14px)",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "16px 30px",

  position: "fixed",

  top: 0,

  zIndex: 1000,

  flexWrap: "wrap",

  gap: "20px",

  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
};

const logo = {

  color: "white",

  fontSize: "34px",

  fontWeight: "800",

  textDecoration: "none",
};

const green = {

  color: "#22c55e",
};

const searchWrapper = {

  flex: 1,

  maxWidth: "650px",

  position: "relative",

  display: "flex",

  borderRadius: "16px",

  overflow: "hidden",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.25)",
};

const searchInput = {

  flex: 1,

  padding: "15px",

  border: "none",

  outline: "none",

  fontSize: "15px",

  background: "#f8fafc",
};

const searchBtn = {

  width: "65px",

  border: "none",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontSize: "18px",
};

const searchDropdown = {

  position: "absolute",

  top: "60px",

  width: "100%",

  background: "white",

  borderRadius: "16px",

  overflow: "hidden",

  zIndex: 999,

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.15)",
};

const searchItem = {

  padding: "14px 18px",

  cursor: "pointer",

  borderBottom:
    "1px solid #eee",
};

const rightSection = {

  display: "flex",

  alignItems: "center",

  gap: "14px",

  flexWrap: "wrap",
};

const navBtn = {

  padding: "12px 18px",

  border: "none",

  borderRadius: "12px",

  background: "#1e293b",

  color: "white",

  cursor: "pointer",
};

const deliveryBtn = {

  padding: "12px 18px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(90deg,#2563eb,#1d4ed8)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const settingsBtn = {

  width: "46px",

  height: "46px",

  borderRadius: "50%",

  border: "none",

  background: "#334155",

  color: "white",

  cursor: "pointer",

  fontSize: "18px",
};

const notifyBtn = {

  width: "46px",

  height: "46px",

  borderRadius: "50%",

  border: "none",

  background: "#1e293b",

  color: "white",

  cursor: "pointer",

  fontSize: "18px",
};

const cartBtn = {

  padding: "12px 18px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(90deg,#f59e0b,#ea580c)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const loginBtn = {

  padding: "12px 20px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const profileWrapper = {

  position: "relative",
};

const profileBtn = {

  padding: "12px 18px",

  border: "none",

  borderRadius: "14px",

  background: "#1e293b",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const dropdown = {

  position: "absolute",

  top: "60px",

  right: 0,

  width: "220px",

  background: "#1e293b",

  borderRadius: "18px",

  overflow: "hidden",

  boxShadow:
    "0 20px 40px rgba(0,0,0,0.3)",
};

const dropdownItem = {

  padding: "16px",

  color: "white",

  cursor: "pointer",

  borderBottom:
    "1px solid rgba(255,255,255,0.05)",
};

const logoutItem = {

  padding: "16px",

  color: "#ef4444",

  cursor: "pointer",
};

const menuBar = {

  width: "100%",

  background: "#111827",

  padding: "14px 30px",

  display: "flex",

  gap: "30px",

  flexWrap: "wrap",

  marginTop: "90px",

  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
};

const menuItem = {

  color: "white",

  textDecoration: "none",

  fontWeight: "500",
};