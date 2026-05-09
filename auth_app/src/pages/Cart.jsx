import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/cart/${user.id}`)
      .then((res) => {
        console.log("CART:", res.data);

        setItems(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  /* =========================
        REMOVE ITEM
  ========================= */

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cart/remove/${id}`
      );

      setItems(items.filter((i) => i.id !== id));
    } catch (err) {
      console.log(err);
      alert("Remove failed ❌");
    }
  };

  /* =========================
        TOTAL PRICE
  ========================= */

  const total = items.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  return (
    <>
      <Navbar />

      <div style={container}>
        <h1 style={title}>
          🛒 My Shopping Cart
        </h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : items.length === 0 ? (
          <div style={emptyCart}>
            <h2>Your cart is empty 🛒</h2>

            <p>
              Add fresh farm products now
            </p>
          </div>
        ) : (
          <>
            {/* PRODUCTS */}
            <div style={grid}>
              {items.map((item) => (
                <div key={item.id} style={card}>

                  {/* IMAGE */}
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:5000${item.image}`
                    }
                    alt={item.name}
                    style={img}
                  />

                  {/* INFO */}
                  <div style={info}>
                    <h3>{item.name}</h3>

                    <p style={price}>
                      ₹{item.price}
                    </p>

                    <button
                      style={removeBtn}
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div style={summary}>
              <h2>Order Summary</h2>

              <div style={summaryRow}>
                <span>Total Items</span>
                <strong>{items.length}</strong>
              </div>

              <div style={summaryRow}>
                <span>Total Price</span>
                <strong>₹{total}</strong>
              </div>

              <button style={checkoutBtn}>
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

/* =========================
        STYLES
========================= */

const container = {
  padding: "150px 40px 60px",
  background:
    "linear-gradient(135deg,#020617,#0f172a)",
  minHeight: "100vh",
  color: "white",
};

const title = {
  fontSize: "42px",
  marginBottom: "40px",
};

const emptyCart = {
  textAlign: "center",
  marginTop: "80px",
  color: "#cbd5e1",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fill,minmax(280px,1fr))",
  gap: "25px",
};

const card = {
  background: "#1e293b",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.3)",
};

const img = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

const info = {
  padding: "20px",
};

const price = {
  fontSize: "22px",
  fontWeight: "bold",
  marginTop: "10px",
  color: "#22c55e",
};

const removeBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "18px",
  border: "none",
  borderRadius: "10px",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const summary = {
  marginTop: "50px",
  background: "#1e293b",
  padding: "30px",
  borderRadius: "20px",
  maxWidth: "400px",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
  fontSize: "18px",
};

const checkoutBtn = {
  width: "100%",
  padding: "14px",
  marginTop: "30px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};