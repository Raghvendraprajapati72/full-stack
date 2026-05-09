/* =====================================================
   ✅ DELIVERY STATUS PAGE (DeliveryStatus.jsx)
   Modern Tracking Dashboard + Map + Backend Ready
===================================================== */

import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveryStatus() {

  const [deliveries,
    setDeliveries] = useState([]);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/delivery"
          );

        setDeliveries(
          res.data
        );

      } catch (err) {

        console.log(err);

      }
    };

  return (

    <div style={container}>

      {/* HEADER */}

      <div style={header}>

        <div>

          <h1 style={title}>
            🚚 Delivery Tracking
          </h1>

          <p style={subtitle}>
            Live delivery monitoring system
          </p>

        </div>

      </div>

      {/* STATS */}

      <div style={statsGrid}>

        <div style={statCard}>
          <h2>📦</h2>
          <h1>
            {deliveries.length}
          </h1>
          <p>Total Orders</p>
        </div>

        <div style={statCard}>
          <h2>🛵</h2>
          <h1>
            {
              deliveries.filter(
                d =>
                  d.status ===
                  "On The Way"
              ).length
            }
          </h1>
          <p>On Delivery</p>
        </div>

        <div style={statCard}>
          <h2>✅</h2>
          <h1>
            {
              deliveries.filter(
                d =>
                  d.status ===
                  "Delivered"
              ).length
            }
          </h1>
          <p>Delivered</p>
        </div>

      </div>

      {/* DELIVERY CARDS */}

      <div style={grid}>

        {deliveries.map((d) => (

          <div
            key={d.id}
            style={card}
          >

            <div style={top}>

              <div>

                <h2>
                  📦 {d.product_name}
                </h2>

                <p style={status(
                  d.status
                )}>
                  {d.status}
                </p>

              </div>

              <div style={driverBox}>
                🛵 {d.delivery_boy}
              </div>

            </div>

            {/* ADDRESSES */}

            <div style={addressBox}>

              <div style={addressCard}>
                <h4>
                  📍 Sender
                </h4>

                <p>
                  {d.sender_address}
                </p>
              </div>

              <div style={addressCard}>
                <h4>
                  🏠 Receiver
                </h4>

                <p>
                  {d.receiver_address}
                </p>
              </div>

            </div>

            {/* MAP */}

            <iframe
              title="map"
              width="100%"
              height="220"
              style={map}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                d.receiver_address
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />

            {/* TRACK BAR */}

            <div style={trackBox}>

              <div style={step}>
                📦 Packed
              </div>

              <div style={line} />

              <div style={step}>
                🚚 Shipped
              </div>

              <div style={line} />

              <div style={step}>
                🏠 Delivered
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const container = {
  padding: "25px",
  background:
    "#020617",
  minHeight: "100vh",
  color: "white",
};

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const title = {
  fontSize: "38px",
  marginBottom: "8px",
};

const subtitle = {
  color: "#94a3b8",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",
  gap: "18px",
  marginBottom: "30px",
};

const statCard = {
  background:
    "linear-gradient(145deg,#0f172a,#1e293b)",
  padding: "22px",
  borderRadius: "20px",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(420px,1fr))",
  gap: "25px",
};

const card = {
  background:
    "rgba(15,23,42,0.95)",
  padding: "22px",
  borderRadius: "24px",
  border:
    "1px solid rgba(255,255,255,0.05)",
};

const top = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "20px",
  gap: "15px",
};

const driverBox = {
  background:
    "#1e293b",
  padding: "10px 16px",
  borderRadius: "12px",
  fontSize: "14px",
};

const addressBox = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "15px",
  marginBottom: "20px",
};

const addressCard = {
  background:
    "#1e293b",
  padding: "15px",
  borderRadius: "14px",
};

const map = {
  border: "none",
  borderRadius: "18px",
  marginBottom: "20px",
};

const trackBox = {
  display: "flex",
  alignItems: "center",
  justifyContent:
    "space-between",
};

const step = {
  background:
    "#1e293b",
  padding: "10px 12px",
  borderRadius: "12px",
  fontSize: "13px",
};

const line = {
  flex: 1,
  height: "4px",
  background:
    "#22c55e",
  margin: "0 10px",
  borderRadius: "10px",
};

const status = (s) => ({
  display: "inline-block",
  marginTop: "8px",
  padding: "6px 14px",
  borderRadius: "30px",
  fontSize: "13px",
  background:
    s === "Delivered"
      ? "#22c55e"
      : s === "On The Way"
      ? "#f59e0b"
      : "#3b82f6",
});