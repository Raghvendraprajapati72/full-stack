import { useState, useEffect } from "react";
import axios from "axios";

export default function Farmer() {
  const [page, setPage] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={container}>
      {/* SIDEBAR */}
      <div style={sidebar}>
        <div>
          <h1 style={logo}>
            🌱 Agro<span style={{ color: "#22c55e" }}>Connect</span>
          </h1>

          <div style={menu}>
            <div style={menuItem} onClick={() => setPage("dashboard")}>
              🏠 Dashboard
            </div>

            <div style={menuItem} onClick={() => setPage("crops")}>
              📦 My Crops
            </div>

            <div style={menuItem} onClick={() => setPage("orders")}>
              🧾 Orders
            </div>

            <div style={menuItem} onClick={() => setPage("community")}>
              👥 Community
            </div>

            <div style={menuItem} onClick={() => setPage("broadcast")}>
              📺 Broadcast
            </div>

            <div style={menuItem} onClick={() => setPage("profile")}>
              👤 Profile
            </div>
          </div>
        </div>

        <button
          style={logoutBtn}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={main}>
        {page === "dashboard" && <Dashboard user={user} />}
        {page === "crops" && <Crops user={user} />}
        {page === "orders" && <Orders />}
        {page === "community" && <Community />}
        {page === "broadcast" && <Broadcast />}
        {page === "profile" && <Profile user={user} />}
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0
  });

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        const products = Array.isArray(res.data)
          ? res.data
          : [];

        const myProducts =
          products.filter(p => p.farmer_id == user.id);

        setStats(prev => ({
          ...prev,
          products: myProducts.length
        }));
      });

    axios.get("http://localhost:5000/orders")
      .then(res => {
        setStats(prev => ({
          ...prev,
          orders: res.data.length
        }));
      });
  }, []);

  return (
    <div>
      <h1 style={pageTitle}>
        👨‍🌾 Welcome, {user?.name}
      </h1>

      <div style={statsGrid}>
        <div style={statsCard}>
          <h2>{stats.products}</h2>
          <p>Total Crops</p>
        </div>

        <div style={statsCard}>
          <h2>{stats.orders}</h2>
          <p>Total Orders</p>
        </div>
      </div>
    </div>
  );
}

/* ================= CROPS ================= */

function Crops({ user }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);

  const loadProducts = () => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data
          : [];

        const myProducts =
          data.filter(p => p.farmer_id == user.id);

        setProducts(myProducts);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price || !file) {
      return alert("Fill all fields");
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("farmer_id", user.id);
      formData.append("file", file);

      await axios.post(
        "http://localhost:5000/products/add",
        formData
      );

      alert("Crop Added ✅");

      setName("");
      setPrice("");
      setFile(null);

      loadProducts();

    } catch (err) {
      console.log(err);
      alert("Failed ❌");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      setProducts(products.filter(p => p.id !== id));

      alert("Deleted ✅");

    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 style={pageTitle}>
        🌾 My Crops
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Search your crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchBox}
      />

      {/* ADD FORM */}
      <div style={addBox}>
        <input
          placeholder="Crop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
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
          <div key={p.id} style={productCard}>

            <div style={imageWrapper}>
              <img
                src={`http://localhost:5000${p.image}`}
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
                  deleteProduct(p.id)
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
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>{user?.role}</p>

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

/* ================= STYLES ================= */

const container = {
  display: "flex",
  background: "#020617",
  minHeight: "100vh",
  color: "white",
  overflowX: "hidden",
};

/* SIDEBAR */

const sidebar = {
  width: "260px",
  background: "#1e293b",
  padding: "25px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  overflowY: "auto",
  zIndex: 1000,
  boxSizing: "border-box",
};

const logo = {
  fontSize: "32px",
  marginBottom: "35px",
  fontWeight: "bold",
};

const menu = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const menuItem = {
  padding: "18px 20px",
  borderRadius: "14px",
  background: "#334155",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "18px",
  transition: "0.3s",
};

const logoutBtn = {
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "25px",
};

/* MAIN */

const main = {
  flex: 1,
  marginLeft: "260px",
  padding: "35px",
  width: "calc(100% - 260px)",
  boxSizing: "border-box",
  overflowX: "hidden",
};

/* TITLES */

const pageTitle = {
  fontSize: "56px",
  marginBottom: "30px",
  fontWeight: "bold",
};

/* DASHBOARD */

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "25px",
};

const statsCard = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "20px",
};

/* SEARCH */

const searchBox = {
  width: "100%",
  maxWidth: "500px",
  padding: "18px",
  borderRadius: "14px",
  border: "none",
  outline: "none",
  marginBottom: "30px",
  fontSize: "16px",
  boxSizing: "border-box",
};

/* ADD BOX */

const addBox = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "20px",
  marginBottom: "40px",
  background: "#1e293b",
  padding: "25px",
  borderRadius: "22px",
  width: "100%",
  boxSizing: "border-box",
};

const input = {
  flex: "1",
  minWidth: "220px",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};

const fileInput = {
  color: "white",
  minWidth: "240px",
};

const addBtn = {
  padding: "16px 30px",
  border: "none",
  borderRadius: "14px",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

/* PRODUCTS GRID */

const productsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: "30px",
  width: "100%",
  alignItems: "start",
};

/* PRODUCT CARD */

const productCard = {
  background: "#1e293b",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  width: "100%",
};

/* IMAGE */

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

/* CONTENT */

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
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

/* PROFILE */

const profileCard = {
  background: "#1e293b",
  padding: "35px",
  borderRadius: "24px",
  maxWidth: "500px",
};

const profileBtn = {
  marginTop: "20px",
  padding: "15px 24px",
  border: "none",
  borderRadius: "14px",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};