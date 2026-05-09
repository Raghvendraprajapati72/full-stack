import { useState, useEffect } from "react";
import axios from "axios";

export default function Consumer() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [following, setFollowing] = useState([]);
  const [users, setUsers] = useState([]); // 🔥 NEW
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("products");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        if (Array.isArray(res.data)) setProducts(res.data);
        else if (Array.isArray(res.data.data)) setProducts(res.data.data);
        else setProducts([]);
      });

    axios.get(`http://localhost:5000/cart/${user.id}`)
      .then(res => setCart(Array.isArray(res.data) ? res.data : []));

    axios.get(`http://localhost:5000/follow/following/${user.id}`)
      .then(res => setFollowing(Array.isArray(res.data) ? res.data : []));
  }, []);

  /* ================= SEARCH USERS ================= */
  useEffect(() => {
    if (search.length > 2) {
      axios.get(`http://localhost:5000/auth/search/${search}`)
        .then(res => setUsers(res.data));
    } else {
      setUsers([]);
    }
  }, [search]);

  /* ================= ACTIONS ================= */

  const addToCart = async (product) => {
    await axios.post("http://localhost:5000/cart/add", {
      userId: user.id,
      productId: product.id
    });

    setCart([...cart, product]);
  };

  const checkout = async () => {
    await axios.post("http://localhost:5000/payment/pay", {
      userId: user.id,
      amount: totalSpent
    });

    alert("Payment Done ✅");
    setCart([]);
  };

  const followUser = async (targetId) => {
    await axios.post("http://localhost:5000/follow", {
      userId: user.id,
      targetId
    });

    alert("Followed ✅");
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  /* ================= FILTER ================= */

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalSpent = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  /* ================= UI ================= */

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>🛒 AgroConnect</h2>

        <p onClick={() => setPage("products")} style={link}>🌿 Products</p>
        <p onClick={() => setPage("cart")} style={link}>🛒 Cart</p>
        <p onClick={() => setPage("orders")} style={link}>📦 Orders</p>
        <p onClick={() => setPage("live")} style={link}>📺 Live Market</p>
        <p onClick={() => setPage("community")} style={link}>👥 Community</p>
        <p onClick={() => setPage("profile")} style={link}>👤 Profile</p>
        <p onClick={() => setPage("help")} style={link}>🆘 Helpdesk</p>

        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* MAIN */}
      <div style={main}>

        {/* HEADER */}
        <div style={header}>
          <h2>Consumer Dashboard</h2>

          <input
            placeholder="Search users / products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchBox}
          />
        </div>

        {/* ================= PRODUCTS ================= */}
        {page === "products" && (
          <>
            <h3>🌿 Products</h3>

            <div style={grid}>
              {filteredProducts.map((p) => (
                <div key={p.id} style={card}>
                  <h4>{p.name}</h4>
                  <p>₹{p.price}</p>

                  <button onClick={() => addToCart(p)} style={btn}>
                    Add 🛒
                  </button>
                </div>
              ))}
            </div>

            {/* 🔥 USER SEARCH RESULT */}
            {users.length > 0 && (
              <>
                <h3>👥 Users</h3>

                {users.map(u => (
                  <div key={u.id} style={card}>
                    <p>{u.name} ({u.role})</p>

                    <button onClick={() => followUser(u.id)} style={btn}>
                      Follow ❤️
                    </button>

                    <button
                      style={{ marginLeft: 10 }}
                      onClick={() => window.location.href = `/profile/${u.id}`}
                    >
                      View Profile 👤
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* ================= CART ================= */}
        {page === "cart" && (
          <>
            <h3>🧾 Cart</h3>

            {cart.map((c, i) => (
              <div key={i} style={cartItem}>
                {c.name} - ₹{c.price}
              </div>
            ))}

            <h4>Total: ₹{totalSpent}</h4>

            {cart.length > 0 && (
              <button onClick={checkout} style={checkoutBtn}>
                💳 Checkout
              </button>
            )}
          </>
        )}

        {/* ================= OTHER PAGES ================= */}
        {page === "orders" && <h3>📦 Orders (connect backend)</h3>}

        {page === "live" && (
          <>
            <h3>📺 Live Market</h3>
            <video width="400" controls>
              <source src="http://localhost:5000/uploads/sample.mp4" />
            </video>
          </>
        )}

        {page === "community" && <h3>👥 Community Chat (Socket.io)</h3>}

        {page === "profile" && (
          <>
            <h3>👤 Profile</h3>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>

            <button
              style={btn}
              onClick={() => window.location.href = `/profile/${user.id}`}
            >
              Open Public Profile 🌐
            </button>
          </>
        )}

        {page === "help" && <h3>🆘 Helpdesk (support system)</h3>}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "#0f172a",
  color: "#fff"
};

const sidebar = {
  width: "220px",
  background: "#1e293b",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const main = {
  flex: 1,
  padding: "20px"
};

const link = {
  cursor: "pointer",
  padding: "10px",
  background: "#334155",
  borderRadius: "6px"
};

const logoutBtn = {
  marginTop: "auto",
  padding: "10px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const searchBox = {
  padding: "8px",
  borderRadius: "6px",
  border: "none"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))",
  gap: "15px"
};

const card = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px"
};

const btn = {
  marginTop: "10px",
  padding: "6px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};

const cartItem = {
  background: "#1e293b",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "6px"
};

const checkoutBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};