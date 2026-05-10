/* =====================================================
   🚚 DELIVERY STATUS PAGE
   Modern Glassmorphism UI + Live Tracking
===================================================== */

import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveryStatus() {

  const [deliveries,
    setDeliveries] =
    useState([]);

  useEffect(() => {

    loadDeliveries();

  }, []);

  const loadDeliveries =
    async () => {

      try {

        const res =
          await axios.get(
            "https://full-stack-backend-qps4.onrender.com/delivery"
          );

        setDeliveries(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (err) {

        console.log(err);
      }
    };

  return (

    <div style={container}>

      {/* HERO */}

      <div style={hero}>

        <div>

          <h1 style={title}>
            🚚 Delivery Tracking
          </h1>

          <p style={subtitle}>
            Real-time shipment tracking &
            delivery management system
          </p>

        </div>

        <div style={liveBadge}>
          🟢 Live Tracking Enabled
        </div>

      </div>

      {/* STATS */}

      <div style={statsGrid}>

        <div style={statCard}>

          <h2 style={statIcon}>
            📦
          </h2>

          <h1>
            {deliveries.length}
          </h1>

          <p>
            Total Orders
          </p>

        </div>

        <div style={statCard}>

          <h2 style={statIcon}>
            🛵
          </h2>

          <h1>
            {
              deliveries.filter(
                d =>
                  d.status ===
                  "On The Way"
              ).length
            }
          </h1>

          <p>
            On Delivery
          </p>

        </div>

        <div style={statCard}>

          <h2 style={statIcon}>
            ✅
          </h2>

          <h1>
            {
              deliveries.filter(
                d =>
                  d.status ===
                  "Delivered"
              ).length
            }
          </h1>

          <p>
            Delivered
          </p>

        </div>

      </div>

      {/* DELIVERY LIST */}

      <div style={grid}>

        {deliveries.map((d) => (

          <div
            key={d.id}
            style={card}
            onMouseEnter={(e) =>
              e.currentTarget.style.transform =
                "translateY(-6px)"
            }
            onMouseLeave={(e) =>
              e.currentTarget.style.transform =
                "translateY(0px)"
            }
          >

            {/* TOP */}

            <div style={top}>

              <div>

                <h2 style={productTitle}>
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

            {/* ADDRESS */}

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
              height="240"
              style={map}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                d.receiver_address
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />

            {/* TRACKING */}

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

  padding: "35px",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  minHeight: "100vh",

  color: "white",
};

const hero = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "20px",

  marginBottom: "35px",
};

const title = {

  fontSize: "52px",

  fontWeight: "800",

  marginBottom: "10px",
};

const subtitle = {

  color: "#94a3b8",

  fontSize: "18px",
};

const liveBadge = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  padding: "14px 22px",

  borderRadius: "18px",

  border:
    "1px solid rgba(34,197,94,0.3)",

  fontWeight: "bold",

  backdropFilter: "blur(10px)",
};

const statsGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "22px",

  marginBottom: "35px",
};

const statCard = {

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter:
    "blur(16px)",

  padding: "28px",

  borderRadius: "26px",

  textAlign: "center",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.25)",
};

const statIcon = {

  fontSize: "38px",

  marginBottom: "10px",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(430px,1fr))",

  gap: "28px",
};

const card = {

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter:
    "blur(16px)",

  padding: "26px",

  borderRadius: "30px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.25)",

  transition: "0.3s",
};

const top = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "24px",

  gap: "15px",
};

const productTitle = {

  fontSize: "28px",

  fontWeight: "700",
};

const driverBox = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "12px 18px",

  borderRadius: "14px",

  fontSize: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const addressBox = {

  display: "grid",

  gridTemplateColumns:
    "1fr 1fr",

  gap: "16px",

  marginBottom: "22px",
};

const addressCard = {

  background:
    "rgba(255,255,255,0.04)",

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.06)",
};

const map = {

  border: "none",

  borderRadius: "22px",

  marginBottom: "24px",
};

const trackBox = {

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",
};

const step = {

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  padding: "12px 16px",

  borderRadius: "14px",

  fontSize: "13px",

  fontWeight: "bold",

  boxShadow:
    "0 5px 15px rgba(34,197,94,0.3)",
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

  marginTop: "10px",

  padding: "8px 16px",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "bold",

  background:
    s === "Delivered"
      ? "#22c55e"
      : s === "On The Way"
      ? "#f59e0b"
      : "#3b82f6",
});