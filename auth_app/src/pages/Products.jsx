import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // ✅ NEW

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        console.log("PRODUCTS:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];

        setProducts(data);
        setLoading(false); // ✅ stop loading
      })
      .catch(() => {
        console.log("Product load error");
        setLoading(false);
      });
  }, []);

  // 🛒 ADD TO CART (SAFE)
  const addToCart = async (productId) => {
    if (!user) return alert("Login first ❌");

    try {
      await axios.post("http://localhost:5000/cart/add", {
        userId: user.id,
        productId
      });

      alert("Added to cart 🛒");
    } catch (err) {
      console.log(err);
      alert("Failed to add ❌");
    }
  };

  // 🔍 SEARCH FILTER
  const filteredProducts = Array.isArray(products)
    ? products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div style={container}>
      <h1>🌿 Products</h1>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchBox}
      />

      {/* ⏳ LOADING */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={grid}>
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map(p => (
              <div key={p.id} style={card}>

                {/* 🖼 IMAGE FIX */}
                <img
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `http://localhost:5000${p.image}`
                  }
                  alt={p.name}
                  style={img}
                />

                {/* INFO */}
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>

                {/* 🛒 ADD TO CART */}
                <button
                  style={btn}
                  onClick={() => addToCart(p.id)}
                >
                  Add to Cart 🛒
                </button>

                {/* 👨‍🌾 VIEW FARMER */}
                <button
                  style={profileBtn}
                  onClick={() =>
                    (window.location.href = `/profile/${p.farmer_id}`)
                  }
                >
                  View Farmer 👨‍🌾
                </button>

              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "20px",
  background: "#0f172a",
  minHeight: "100vh",
  color: "#fff"
};

const searchBox = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  marginBottom: "20px",
  width: "300px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
  gap: "20px"
};

const card = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px"
};

const img = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "6px"
};

const btn = {
  marginTop: "10px",
  padding: "8px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  width: "100%"
};

const profileBtn = {
  marginTop: "5px",
  padding: "8px",
  background: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  width: "100%"
};