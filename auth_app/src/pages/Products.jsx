import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function Products() {

  /* =====================================================
      STATES
  ===================================================== */

  const [products,
    setProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [category,
    setCategory] =
    useState("All");

  const [loading,
    setLoading] =
    useState(true);

  const [cartLoading,
    setCartLoading] =
    useState(null);

  const [message,
    setMessage] =
    useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* =====================================================
      LOAD PRODUCTS
  ===================================================== */

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts =
    async () => {

      try {

        const res =
          await axios.get(
            "https://full-stack-backend-qps4.onrender.com/products"
          );

        const data =
          Array.isArray(
            res.data
          )

            ? res.data

            : Array.isArray(
                res.data.data
              )

            ? res.data.data

            : [];

        setProducts(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      ADD TO CART
  ===================================================== */

  const addToCart =
    async (
      product
    ) => {

      if (!user) {

        return alert(
          "Login first ❌"
        );
      }

      try {

        setCartLoading(
          product.id
        );

        await axios.post(

          "https://full-stack-backend-qps4.onrender.com/cart/add",

          {

            userId:
              user.id,

            productId:
              product.id,

            quantity: 1,
          }
        );

        await axios.post(

          "https://full-stack-backend-qps4.onrender.com/delivery/add",

          {

            user_id:
              user.id,

            product_name:
              product.name,

            receiver_address:
              user.address ||
              "Customer Address",

            sender_address:
              "Farmer Warehouse",

            delivery_boy:
              "Assigned Soon",

            current_location:
              "Delhi",

            status:
              "Order Confirmed",
          }
        );

        setMessage(
          `${product.name} added successfully 🛒`
        );

        setTimeout(() => {

          setMessage("");

        }, 3000);

      } catch (err) {

        console.log(err);

        alert(
          "Failed to add ❌"
        );

      } finally {

        setCartLoading(
          null
        );
      }
    };

  /* =====================================================
      FILTER PRODUCTS
  ===================================================== */

  const filteredProducts =

    Array.isArray(products)

      ? products.filter(
          (p) => {

            const matchSearch =

              p.name
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchCategory =

              category ===
              "All"

                ? true

                : p.category ===
                  category;

            return (
              matchSearch &&
              matchCategory
            );
          }
        )

      : [];

  /* =====================================================
      UI
  ===================================================== */

  return (

    <div style={container}>

      {/* GLOW */}

      <div style={glow1}></div>

      <div style={glow2}></div>

      {/* HERO */}

      <div style={hero}>

        <div>

          <div style={badge}>
            🌿 ORGANIC MARKETPLACE
          </div>

          <h1 style={heroTitle}>
            Fresh Farm Products
          </h1>

          <p style={heroText}>

            Buy directly from trusted farmers
            with secure delivery and live tracking.

          </p>

        </div>

        <div style={heroCard}>

          <h2>
            {products.length}
          </h2>

          <p>
            Products Available
          </p>

        </div>

      </div>

      {/* SUCCESS MESSAGE */}

      {

        message && (

          <div style={messageBox}>
            {message}
          </div>
        )
      }

      {/* SEARCH + FILTER */}

      <div style={filterBox}>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={searchBox}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          style={select}
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

      </div>

      {/* LOADING */}

      {

        loading ? (

          <div style={loadingBox}>
            Loading products...
          </div>

        ) : (

          <div style={grid}>

            {

              filteredProducts
                .length === 0 ? (

                <div style={emptyBox}>
                  No products found
                </div>

              ) : (

                filteredProducts.map(
                  (p) => (

                    <div
                      key={p.id}
                      style={card}
                      onMouseEnter={(e) =>
                        e.currentTarget.style.transform =
                          "translateY(-10px)"
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.style.transform =
                          "translateY(0px)"
                      }
                    >

                      {/* IMAGE */}

                      <div style={imageWrapper}>

                        <img
                          src={
                            p.image?.startsWith(
                              "http"
                            )

                              ? p.image

                              : `https://full-stack-backend-qps4.onrender.com${p.image}`
                          }

                          alt={p.name}

                          style={img}
                        />

                        <div style={organicTag}>
                          🌱 Organic
                        </div>

                      </div>

                      {/* CONTENT */}

                      <div style={content}>

                        <h2 style={productName}>
                          {p.name}
                        </h2>

                        <p style={desc}>
                          Farm fresh premium quality
                          organic products directly
                          from trusted farmers.
                        </p>

                        <div style={priceRow}>

                          <h3 style={price}>
                            ₹{p.price}
                          </h3>

                          <span style={stock}>
                            In Stock
                          </span>

                        </div>

                        {/* BUTTONS */}

                        <div style={btnGroup}>

                          <button
                            style={
                              cartLoading ===
                              p.id

                                ? loadingBtn

                                : btn
                            }

                            onClick={() =>
                              addToCart(p)
                            }
                          >

                            {

                              cartLoading ===
                              p.id

                                ? "Adding..."

                                : "Add To Cart 🛒"
                            }

                          </button>

                          <button
                            style={deliveryBtn}

                            onClick={() =>
                              (
                                window.location.href =
                                "/delivery"
                              )
                            }
                          >

                            Track Delivery 🚚

                          </button>

                          <button
                            style={profileBtn}

                            onClick={() =>
                              (
                                window.location.href =
                                `/profile/${p.farmer_id}`
                              )
                            }
                          >

                            View Farmer 👨‍🌾

                          </button>

                        </div>

                      </div>

                    </div>
                  )
                )
              )
            }

          </div>
        )
      }

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  padding: "35px",

  color: "white",

  position: "relative",

  overflow: "hidden",
};

const glow1 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  filter: "blur(120px)",

  top: "-120px",

  left: "-120px",
};

const glow2 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.15)",

  filter: "blur(120px)",

  bottom: "-120px",

  right: "-120px",
};

const hero = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "20px",

  marginBottom: "35px",

  position: "relative",

  zIndex: 2,
};

const badge = {

  display: "inline-block",

  padding: "10px 18px",

  borderRadius: "30px",

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  marginBottom: "18px",

  fontWeight: "bold",
};

const heroTitle = {

  fontSize: "58px",

  fontWeight: "800",

  marginBottom: "12px",
};

const heroText = {

  color: "#94a3b8",

  fontSize: "18px",

  lineHeight: "1.8",

  maxWidth: "650px",
};

const heroCard = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "28px 40px",

  borderRadius: "24px",

  textAlign: "center",

  backdropFilter:
    "blur(16px)",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const messageBox = {

  background:
    "rgba(34,197,94,0.2)",

  border:
    "1px solid rgba(34,197,94,0.4)",

  padding: "18px",

  borderRadius: "18px",

  marginBottom: "25px",

  color: "#bbf7d0",

  fontWeight: "bold",
};

const filterBox = {

  display: "flex",

  gap: "18px",

  flexWrap: "wrap",

  marginBottom: "35px",

  position: "relative",

  zIndex: 2,
};

const searchBox = {

  flex: 1,

  minWidth: "280px",

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  outline: "none",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  fontSize: "15px",
};

const select = {

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  minWidth: "180px",

  outline: "none",
};

const loadingBox = {

  padding: "40px",

  textAlign: "center",

  color: "#cbd5e1",
};

const emptyBox = {

  padding: "40px",

  textAlign: "center",

  background:
    "rgba(255,255,255,0.05)",

  borderRadius: "24px",

  color: "#cbd5e1",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",

  gap: "30px",

  position: "relative",

  zIndex: 2,
};

const card = {

  background:
    "rgba(15,23,42,0.82)",

  backdropFilter:
    "blur(18px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "30px",

  overflow: "hidden",

  transition: "0.3s",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.35)",
};

const imageWrapper = {

  position: "relative",
};

const img = {

  width: "100%",

  height: "250px",

  objectFit: "cover",
};

const organicTag = {

  position: "absolute",

  top: "18px",

  left: "18px",

  background:
    "rgba(34,197,94,0.9)",

  padding: "8px 14px",

  borderRadius: "14px",

  fontSize: "13px",

  fontWeight: "bold",
};

const content = {

  padding: "24px",
};

const productName = {

  fontSize: "28px",

  marginBottom: "12px",

  fontWeight: "700",
};

const desc = {

  color: "#94a3b8",

  lineHeight: "1.7",

  marginBottom: "18px",
};

const priceRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "22px",
};

const price = {

  fontSize: "30px",

  color: "#22c55e",
};

const stock = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  padding: "8px 14px",

  borderRadius: "14px",

  fontSize: "13px",

  fontWeight: "bold",
};

const btnGroup = {

  display: "grid",

  gap: "12px",
};

const btn = {

  width: "100%",

  padding: "15px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "15px",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};

const deliveryBtn = {

  width: "100%",

  padding: "15px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#f59e0b,#d97706)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "15px",
};

const profileBtn = {

  width: "100%",

  padding: "15px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#3b82f6,#2563eb)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "15px",
};