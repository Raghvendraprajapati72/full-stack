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

  const [search, setSearch] =
    useState("");

  const [filtered,
    setFiltered] =
    useState([]);

  /* ================= PRODUCTS ================= */

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

  /* ================= SEARCH ================= */

  useEffect(() => {

    if (search.trim() === "") {

      setFiltered([]);

    } else {

      const result =
        products.filter((item) =>
          item
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      setFiltered(result);
    }

  }, [search]);

  /* ================= LOGOUT ================= */

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  /* ================= DASHBOARD ================= */

  const goDashboard = () => {

    if (!user) {

      navigate("/login");

      return;
    }

    if (user.role === "admin") {

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

      {/* ================= HEADER ================= */}

      <div style={topNavbar}>

        {/* LOGO */}

        <div style={logoSection}>

          <Link
            to="/"
            style={logoLink}
          >
            🌾 Agro
            <span
              style={{
                color:
                  "#22c55e",
              }}
            >
              Connect
            </span>
          </Link>

        </div>

        {/* SEARCH */}

        <div style={searchWrapper}>

          <select
            style={categorySelect}
          >
            <option>
              All
            </option>

            <option>
              Vegetables
            </option>

            <option>
              Fruits
            </option>

            <option>
              Dairy
            </option>

            <option>
              Grains
            </option>
          </select>

          <input
            type="text"
            placeholder="Search agriculture products..."
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

        {/* RIGHT */}

        <div style={rightSection}>

          {/* ACCOUNT */}

          <div
            style={navItem}
            onClick={
              goDashboard
            }
          >

            <small>
              {user
                ? `Hello, ${user.name}`
                : "Hello, Sign in"}
            </small>

            <strong>
              My Account
            </strong>

          </div>

          {/* ORDERS */}

          <div
            style={navItem}
            onClick={() =>
              navigate(
                "/orders"
              )
            }
          >

            <small>
              Returns
            </small>

            <strong>
              & Orders
            </strong>

          </div>

          {/* DELIVERY */}

          <button
            style={
              deliveryBtn
            }
            onClick={() =>
              navigate(
                "/delivery"
              )
            }
          >
            📍 Delivery
          </button>

          {/* SETTINGS */}

          <button
            style={
              settingsBtn
            }
          >
            ⚙️
          </button>

          {/* CART */}

          <div
            style={cart}
            onClick={() =>
              navigate(
                "/cart"
              )
            }
          >
            🛒 Cart
          </div>

          {/* LOGIN / LOGOUT */}

          {!user ? (

            <button
              style={
                loginButton
              }
              onClick={() =>
                navigate(
                  "/login"
                )
              }
            >
              Login
            </button>

          ) : (

            <button
              style={
                logoutButton
              }
              onClick={
                logout
              }
            >
              Logout
            </button>
          )}

        </div>

      </div>

      {/* ================= MENU ================= */}

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
          Grains
        </Link>

        <Link
          to="/products"
          style={menuItem}
        >
          Organic
        </Link>

        <Link
          to="/helpdesk"
          style={menuItem}
        >
          HelpDesk
        </Link>

        <Link
          to="/delivery"
          style={menuItem}
        >
          Delivery Status
        </Link>

      </div>

    </>
  );
}

/* ================= STYLES ================= */

const topNavbar = {
  width: "100%",
  minHeight: "80px",
  background: "#0f172a",
  display: "flex",
  alignItems: "center",
  justifyContent:
    "space-between",
  padding: "15px 25px",
  position: "fixed",
  top: 0,
  zIndex: 1000,
  flexWrap: "wrap",
  gap: "20px",
};

const logoSection = {
  fontSize: "32px",
  fontWeight: "bold",
};

const logoLink = {
  color: "white",
  textDecoration: "none",
};

const searchWrapper = {
  flex: 1,
  maxWidth: "700px",
  display: "flex",
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
};

const categorySelect = {
  padding: "14px",
  border: "none",
  background: "#e2e8f0",
};

const searchInput = {
  flex: 1,
  padding: "14px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};

const searchBtn = {
  width: "60px",
  border: "none",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
};

const searchDropdown = {
  position: "absolute",
  top: "58px",
  width: "100%",
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  zIndex: 999,
};

const searchItem = {
  padding: "12px 15px",
  borderBottom:
    "1px solid #eee",
  cursor: "pointer",
};

const rightSection = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  color: "white",
  flexWrap: "wrap",
};

const navItem = {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
};

const deliveryBtn = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const settingsBtn = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "none",
  background: "#334155",
  color: "white",
  cursor: "pointer",
};

const cart = {
  fontWeight: "bold",
  cursor: "pointer",
};

const loginButton = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#22c55e",
  color: "white",
};

const logoutButton = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#ef4444",
  color: "white",
};

const menuBar = {
  width: "100%",
  background: "#1e293b",
  display: "flex",
  gap: "30px",
  padding: "14px 30px",
  marginTop: "95px",
  flexWrap: "wrap",
};

const menuItem = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};