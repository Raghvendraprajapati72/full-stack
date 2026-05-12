import { useState, useEffect } from "react";
import axios from "axios";

export default function Farmer() {

  const [page, setPage] =
    useState("dashboard");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (

    <div style={container}>

      {/* SIDEBAR */}

      <div style={sidebar}>

        <div>

          <h1 style={logo}>
            🌱 Agro
            <span style={{
              color: "#22c55e"
            }}>
              Connect
            </span>
          </h1>

          <div style={menu}>

            <div
              style={menuItem}
              onClick={() =>
                setPage("dashboard")
              }
            >
              🏠 Dashboard
            </div>

            <div
              style={menuItem}
              onClick={() =>
                setPage("crops")
              }
            >
              🌾 My Crops
            </div>

            <div
              style={menuItem}
              onClick={() =>
                setPage("orders")
              }
            >
              📦 Orders
            </div>

            <div
              style={menuItem}
              onClick={() =>
                setPage("community")
              }
            >
              👥 Community
            </div>

            <div
              style={menuItem}
              onClick={() =>
                setPage("broadcast")
              }
            >
              📺 Broadcast
            </div>

            <div
              style={menuItem}
              onClick={() =>
                setPage("profile")
              }
            >
              👤 Profile
            </div>

          </div>

        </div>

        <button
          style={logoutBtn}
          onClick={() => {

            localStorage.removeItem(
              "user"
            );

            window.location.href =
              "/";
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN */}

      <div style={main}>

        {page === "dashboard" &&
          <Dashboard
            user={user}
          />}

        {page === "crops" &&
          <Crops
            user={user}
          />}

        {page === "orders" &&
          <Orders />}

        {page === "community" &&
          <Community />}

        {page === "broadcast" &&
          <Broadcast />}

        {page === "profile" &&
          <Profile
            user={user}
          />}

      </div>

    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ user }) {

  const [stats,
    setStats] =
    useState({
      products: 0,
      orders: 0
    });

  useEffect(() => {

    axios.get(
      "https://backend-api-yduq.onrender.com/products"
    )

      .then(res => {

        const products =
          Array.isArray(
            res.data
          )
            ? res.data
            : [];

        const myProducts =
          products.filter(
            p =>
              p.farmer_id ==
              user.id
          );

        setStats(prev => ({
          ...prev,
          products:
            myProducts.length
        }));
      });

    axios.get(
      "https://backend-api-yduq.onrender.com/orders"
    )

      .then(res => {

        setStats(prev => ({
          ...prev,
          orders:
            res.data.length
        }));
      });

  }, []);

  return (

    <div>

      <h1 style={pageTitle}>
        👨‍🌾 Welcome,
        {" "}
        {user?.name}
      </h1>

      <div style={statsGrid}>

        <div style={statsCard}>
          <h2>
            {stats.products}
          </h2>

          <p>
            Total Crops
          </p>
        </div>

        <div style={statsCard}>
          <h2>
            {stats.orders}
          </h2>

          <p>
            Total Orders
          </p>
        </div>

      </div>

    </div>
  );
}

/* ================= CROPS ================= */

function Crops({ user }) {

  const [products,
    setProducts] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [search,
    setSearch] =
    useState("");

  const [file,
    setFile] =
    useState(null);

  const loadProducts =
    () => {

      axios.get(
        "https://backend-api-yduq.onrender.com/products"
      )

        .then(res => {

          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : [];

          const myProducts =
            data.filter(
              p =>
                p.farmer_id ==
                user.id
            );

          setProducts(
            myProducts
          );
        });
    };

  useEffect(() => {

    loadProducts();

  }, []);

  const addProduct =
    async () => {

      if (
        !name ||
        !price ||
        !file
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "price",
          price
        );

        formData.append(
          "farmer_id",
          user.id
        );

        formData.append(
          "file",
          file
        );

        await axios.post(
          "https://backend-api-yduq.onrender.com/products/add",
          formData
        );

        alert(
          "Crop Added ✅"
        );

        setName("");
        setPrice("");
        setFile(null);

        loadProducts();

      } catch (err) {

        console.log(err);

        alert(
          "Failed ❌"
        );
      }
    };

  const deleteProduct =
    async (id) => {

      try {

        await axios.delete(
          `https://full-stack-backend-qps4.onrender.com/products/${id}`
        );

        setProducts(
          products.filter(
            p =>
              p.id !== id
          )
        );

        alert(
          "Deleted ✅"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Delete failed ❌"
        );
      }
    };

  const filteredProducts =
    products.filter(
      p =>
        p.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div>

      <h1 style={pageTitle}>
        🌾 My Crops
      </h1>

      <input
        placeholder="Search your crops..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={searchBox}
      />

      {/* ADD BOX */}

      <div style={addBox}>

        <input
          placeholder="Crop Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          style={input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          style={input}
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          style={fileInput}
        />

        <button
          onClick={addProduct}
          style={addBtn}
        >
          Add Crop
        </button>

      </div>

      {/* PRODUCTS */}

      <div style={productsGrid}>

        {filteredProducts.map((p) => (

          <div
            key={p.id}
            style={productCard}
            onMouseEnter={(e) =>
              e.currentTarget.style.transform =
                "translateY(-6px)"
            }
            onMouseLeave={(e) =>
              e.currentTarget.style.transform =
                "translateY(0px)"
            }
          >

            <div style={imageWrapper}>

              <img
                src={`https://full-stack-backend-qps4.onrender.com${p.image}`}
                alt={p.name}
                style={productImage}
              />

            </div>

            <div style={productContent}>

              <h3 style={productTitle}>
                {p.name}
              </h3>

              <p style={priceText}>
                ₹{p.price}
              </p>

              <button
                style={deleteBtn}
                onClick={() =>
                  deleteProduct(
                    p.id
                  )
                }
              >
                Delete ❌
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* ================= ORDERS ================= */

function Orders() {

  return (

    <div>

      <h1 style={pageTitle}>
        📦 Orders
      </h1>

    </div>
  );
}

/* ================= COMMUNITY ================= */

function Community() {

  return (

    <div>

      <h1 style={pageTitle}>
        👥 Community
      </h1>

    </div>
  );
}

/* ================= BROADCAST ================= */

function Broadcast() {

  return (

    <div>

      <h1 style={pageTitle}>
        📺 Broadcast
      </h1>

    </div>
  );
}

/* ================= PROFILE ================= */

function Profile({ user }) {

  return (

    <div>

      <h1 style={pageTitle}>
        👤 Profile
      </h1>

      <div style={profileCard}>

        <h2>
          {user?.name}
        </h2>

        <p>
          {user?.email}
        </p>

        <p>
          {user?.role}
        </p>

        <button
          style={profileBtn}
          onClick={() =>
            window.location.href =
              `/profile/${user.id}`
          }
        >
          Open Public Profile
        </button>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",
  minHeight: "100vh",
  color: "white",
  overflowX: "hidden",
};

const sidebar = {
  width: "280px",
  background:
    "rgba(15,23,42,0.92)",
  backdropFilter:
    "blur(18px)",
  padding: "28px 22px",
  display: "flex",
  flexDirection: "column",
  justifyContent:
    "space-between",
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  overflowY: "auto",
  zIndex: 1000,
  boxSizing: "border-box",
  borderRight:
    "1px solid rgba(255,255,255,0.08)",
};

const logo = {
  fontSize: "34px",
  marginBottom: "40px",
  fontWeight: "800",
  letterSpacing: "1px",
};

const menu = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const menuItem = {
  padding: "18px 22px",
  borderRadius: "18px",
  background:
    "rgba(255,255,255,0.05)",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "17px",
  transition: "0.3s",
  border:
    "1px solid rgba(255,255,255,0.05)",
};

const logoutBtn = {
  padding: "16px",
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "25px",
};

const main = {
  flex: 1,
  marginLeft: "280px",
  padding: "40px",
  width: "calc(100% - 280px)",
  boxSizing: "border-box",
  overflowX: "hidden",
};

const pageTitle = {
  fontSize: "58px",
  marginBottom: "35px",
  fontWeight: "800",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",
  gap: "25px",
};

const statsCard = {
  background:
    "rgba(255,255,255,0.05)",
  backdropFilter:
    "blur(16px)",
  padding: "34px",
  borderRadius: "28px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 15px 40px rgba(0,0,0,0.25)",
};

const searchBox = {
  width: "100%",
  maxWidth: "520px",
  padding: "18px",
  borderRadius: "18px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  marginBottom: "35px",
  fontSize: "16px",
  boxSizing: "border-box",
  background:
    "rgba(255,255,255,0.05)",
  color: "white",
};

const addBox = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "20px",
  marginBottom: "45px",
  background:
    "rgba(255,255,255,0.05)",
  backdropFilter:
    "blur(16px)",
  padding: "30px",
  borderRadius: "28px",
  width: "100%",
  boxSizing: "border-box",
  border:
    "1px solid rgba(255,255,255,0.08)",
};

const input = {
  flex: "1",
  minWidth: "220px",
  padding: "16px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  fontSize: "15px",
  background:
    "rgba(255,255,255,0.06)",
  color: "white",
};

const fileInput = {
  color: "white",
  minWidth: "240px",
};

const addBtn = {
  padding: "16px 32px",
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

const productsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: "30px",
  width: "100%",
};

const productCard = {
  background:
    "rgba(255,255,255,0.05)",
  backdropFilter:
    "blur(16px)",
  borderRadius: "30px",
  overflow: "hidden",
  boxShadow:
    "0 15px 40px rgba(0,0,0,0.3)",
  width: "100%",
  border:
    "1px solid rgba(255,255,255,0.08)",
  transition: "0.3s",
};

const imageWrapper = {
  width: "100%",
  height: "260px",
  overflow: "hidden",
  background: "#0f172a",
};

const productImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const productContent = {
  padding: "22px",
};

const productTitle = {
  fontSize: "30px",
  marginBottom: "10px",
  fontWeight: "bold",
};

const priceText = {
  color: "#22c55e",
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const deleteBtn = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

const profileCard = {
  background:
    "rgba(255,255,255,0.05)",
  backdropFilter:
    "blur(16px)",
  padding: "38px",
  borderRadius: "28px",
  maxWidth: "520px",
  border:
    "1px solid rgba(255,255,255,0.08)",
};

const profileBtn = {
  marginTop: "20px",
  padding: "15px 24px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(90deg,#3b82f6,#2563eb)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};