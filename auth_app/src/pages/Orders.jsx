/* =====================================================
   🚚 MODERN DELIVERY TRACKING DASHBOARD
===================================================== */

import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveryStatus() {

  const [deliveries,
    setDeliveries] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  /* =====================================================
      LOAD DATA
  ===================================================== */

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

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      COUNTS
  ===================================================== */

  const delivered =
    deliveries.filter(
      d =>
        d.status ===
        "Delivered"
    ).length;

  const onWay =
    deliveries.filter(
      d =>
        d.status ===
        "On The Way"
    ).length;

  const packed =
    deliveries.filter(
      d =>
        d.status ===
        "Packed"
    ).length;

  /* =====================================================
      UI
  ===================================================== */

  return (

    <div style={container}>

      {/* BACKGROUND GLOW */}

      <div style={bg1}></div>

      <div style={bg2}></div>

      {/* TOP HEADER */}

      <div style={header}>

        <div>

          <h1 style={title}>
            🚚 Delivery Dashboard
          </h1>

          <p style={subtitle}>
            Real-time delivery tracking system
          </p>

        </div>

        <div style={liveBox}>
          🟢 Live Tracking
        </div>

      </div>

      {/* STATS */}

      <div style={statsGrid}>

        <div style={statCard}>
          <div style={icon}>
            📦
          </div>

          <h2>
            {deliveries.length}
          </h2>

          <p>
            Total Orders
          </p>
        </div>

        <div style={statCard}>
          <div style={icon}>
            🚚
          </div>

          <h2>
            {onWay}
          </h2>

          <p>
            On Delivery
          </p>
        </div>

        <div style={statCard}>
          <div style={icon}>
            🕒
          </div>

          <h2>
            {packed}
          </h2>

          <p>
            Packed
          </p>
        </div>

        <div style={statCard}>
          <div style={icon}>
            ✅
          </div>

          <h2>
            {delivered}
          </h2>

          <p>
            Delivered
          </p>
        </div>

      </div>

      {/* LOADING */}

      {
        loading && (

          <div style={loadingBox}>
            Loading deliveries...
          </div>
        )
      }

      {/* DELIVERY CARDS */}

      <div style={grid}>

        {

          deliveries.map((d) => (

            <div
              key={d.id}
              style={card}
            >

              {/* TOP */}

              <div style={cardTop}>

                <div>

                  <h2 style={product}>
                    📦 {d.product_name}
                  </h2>

                  <div
                    style={
                      status(
                        d.status
                      )
                    }
                  >
                    {d.status}
                  </div>

                </div>

                <div style={driver}>

                  <div style={driverIcon}>
                    🛵
                  </div>

                  <div>

                    <small
                      style={{
                        color:
                          "#94a3b8",
                      }}
                    >
                      Delivery Boy
                    </small>

                    <h4>
                      {
                        d.delivery_boy
                      }
                    </h4>

                  </div>

                </div>

              </div>

              {/* ADDRESS */}

              <div style={addressGrid}>

                <div style={addressCard}>

                  <h4>
                    📍 Sender Address
                  </h4>

                  <p>
                    {
                      d.sender_address
                    }
                  </p>

                </div>

                <div style={addressCard}>

                  <h4>
                    🏠 Receiver Address
                  </h4>

                  <p>
                    {
                      d.receiver_address
                    }
                  </p>

                </div>

              </div>

              {/* MAP */}

              <div style={mapWrapper}>

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

              </div>

              {/* TRACKING */}

              <div style={trackContainer}>

                <div style={trackStep}>
                  📦 Packed
                </div>

                <div style={trackLine}></div>

                <div style={trackStep}>
                  🚚 Shipped
                </div>

                <div style={trackLine}></div>

                <div style={trackStep}>
                  ✅ Delivered
                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

/* =====================================================
   🎨 STYLES
===================================================== */

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  padding: "25px",

  color: "white",

  position: "relative",

  overflow: "hidden",
};

const bg1 = {

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

const bg2 = {

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

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "30px",

  position: "relative",

  zIndex: 2,
};

const title = {

  fontSize: "42px",

  marginBottom: "8px",

  fontWeight: "800",
};

const subtitle = {

  color: "#94a3b8",

  fontSize: "15px",
};

const liveBox = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  padding: "12px 18px",

  borderRadius: "14px",

  border:
    "1px solid rgba(34,197,94,0.25)",

  fontWeight: "600",
};

const statsGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "20px",

  marginBottom: "35px",

  position: "relative",

  zIndex: 2,
};

const statCard = {

  background:
    "rgba(15,23,42,0.75)",

  backdropFilter:
    "blur(14px)",

  border:
    "1px solid rgba(255,255,255,0.06)",

  borderRadius: "24px",

  padding: "25px",

  textAlign: "center",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.35)",
};

const icon = {

  fontSize: "34px",

  marginBottom: "10px",
};

const loadingBox = {

  padding: "30px",

  textAlign: "center",

  color: "#cbd5e1",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(380px,1fr))",

  gap: "25px",

  position: "relative",

  zIndex: 2,
};

const card = {

  background:
    "rgba(15,23,42,0.82)",

  backdropFilter:
    "blur(18px)",

  border:
    "1px solid rgba(255,255,255,0.06)",

  borderRadius: "28px",

  padding: "22px",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.35)",
};

const cardTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "15px",

  marginBottom: "22px",
};

const product = {

  marginBottom: "10px",
};

const driver = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  background:
    "rgba(255,255,255,0.04)",

  padding: "12px 15px",

  borderRadius: "18px",
};

const driverIcon = {

  width: "45px",

  height: "45px",

  borderRadius: "50%",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  background:
    "#1e293b",

  fontSize: "20px",
};

const addressGrid = {

  display: "grid",

  gridTemplateColumns:
    "1fr 1fr",

  gap: "15px",

  marginBottom: "20px",
};

const addressCard = {

  background:
    "rgba(255,255,255,0.04)",

  padding: "16px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.05)",
};

const mapWrapper = {

  overflow: "hidden",

  borderRadius: "22px",

  marginBottom: "22px",
};

const map = {

  border: "none",
};

const trackContainer = {

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  gap: "10px",
};

const trackStep = {

  flex: 1,

  textAlign: "center",

  background:
    "rgba(255,255,255,0.05)",

  padding: "12px",

  borderRadius: "14px",

  fontSize: "13px",

  fontWeight: "600",
};

const trackLine = {

  width: "35px",

  height: "4px",

  borderRadius: "20px",

  background:
    "linear-gradient(90deg,#22c55e,#3b82f6)",
};

const status = (s) => ({

  display: "inline-block",

  padding: "7px 14px",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "600",

  background:
    s === "Delivered"

      ? "rgba(34,197,94,0.2)"

      : s === "On The Way"

      ? "rgba(245,158,11,0.2)"

      : "rgba(59,130,246,0.2)",

  color:
    s === "Delivered"

      ? "#22c55e"

      : s === "On The Way"

      ? "#f59e0b"

      : "#3b82f6",
});