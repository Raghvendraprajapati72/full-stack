/* =====================================================
   🚚 SMART DELIVERY + PAYMENT TRACKING SYSTEM
   Farmer + Consumer Dashboard Connected
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function DeliveryStatus() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [deliveries,
    setDeliveries] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [selected,
    setSelected] =
    useState(null);

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
            "https://backend-api-yduq.onrender.com/delivery"
          );

        let data =
          Array.isArray(
            res.data
          )
            ? res.data
            : [];

        /* FARMER FILTER */

        if (
          user?.role ===
          "farmer"
        ) {

          data =
            data.filter(
              d =>
                d.farmer_id ==
                user.id
            );
        }

        /* CONSUMER FILTER */

        if (
          user?.role ===
          "consumer"
        ) {

          data =
            data.filter(
              d =>
                d.user_id ==
                user.id
            );
        }

        setDeliveries(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      UPDATE STATUS
  ===================================================== */

  const updateStatus =
    async (
      id,
      newStatus
    ) => {

      try {

        await axios.put(

          `https://full-stack-backend-qps4.onrender.com/delivery/${id}`,

          {
            status:
              newStatus,
          }
        );

        loadDeliveries();

      } catch (err) {

        console.log(err);

        alert(
          "Status update failed ❌"
        );
      }
    };

  /* =====================================================
      PAYMENT
  ===================================================== */

  const makePayment =
    async (delivery) => {

      try {

        await axios.post(

          "https://backend-api-yduq.onrender.com/payment/pay",

          {
            order_id:
              delivery.id,

            amount:
              delivery.amount,

            user_id:
              delivery.user_id,
          }
        );

        alert(
          "Payment Successful ✅"
        );

        loadDeliveries();

      } catch (err) {

        console.log(err);

        alert(
          "Payment failed ❌"
        );
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

      {/* GLOW */}

      <div style={bg1}></div>

      <div style={bg2}></div>

      {/* HEADER */}

      <div style={header}>

        <div>

          <div style={liveBadge}>
            🟢 LIVE DELIVERY SYSTEM
          </div>

          <h1 style={title}>
            Smart Delivery Dashboard
          </h1>

          <p style={subtitle}>

            Real-time order tracking,
            delivery management &
            secure payment system.

          </p>

        </div>

        <div style={profileCard}>

          <h3>
            👤 {user?.name}
          </h3>

          <p>
            {user?.role}
          </p>

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

      {/* DELIVERY GRID */}

      <div style={grid}>

        {

          deliveries.map((d) => (

            <div
              key={d.id}
              style={card}
              onMouseEnter={(e) =>
                e.currentTarget.style.transform =
                  "translateY(-8px)"
              }
              onMouseLeave={(e) =>
                e.currentTarget.style.transform =
                  "translateY(0px)"
              }
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

                <div style={priceBox}>
                  ₹{d.amount}
                </div>

              </div>

              {/* USER */}

              <div style={customerCard}>

                <div>

                  <small style={small}>
                    Customer
                  </small>

                  <h4>
                    {d.customer_name}
                  </h4>

                </div>

                <div>

                  <small style={small}>
                    Delivery Boy
                  </small>

                  <h4>
                    🛵 {d.delivery_boy}
                  </h4>

                </div>

              </div>

              {/* ADDRESS */}

              <div style={addressGrid}>

                <div style={addressCard}>

                  <h4>
                    📍 Sender
                  </h4>

                  <p>
                    {
                      d.sender_address
                    }
                  </p>

                </div>

                <div style={addressCard}>

                  <h4>
                    🏠 Receiver
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
                  height="230"
                  style={map}
                  loading="lazy"
                  allowFullScreen

                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    d.receiver_address
                  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                />

              </div>

              {/* TRACK */}

              <div style={trackContainer}>

                <div style={
                  stepActive
                }>
                  📦 Packed
                </div>

                <div style={
                  trackLine
                }></div>

                <div style={
                  d.status ===
                  "Packed"
                    ? step
                    : stepActive
                }>
                  🚚 Shipped
                </div>

                <div style={
                  trackLine
                }></div>

                <div style={
                  d.status ===
                  "Delivered"
                    ? stepActive
                    : step
                }>
                  ✅ Delivered
                </div>

              </div>

              {/* ACTIONS */}

              <div style={actions}>

                {/* FARMER */}

                {
                  user?.role ===
                    "farmer" && (

                    <>

                      <button
                        style={actionBtn}
                        onClick={() =>
                          updateStatus(
                            d.id,
                            "Packed"
                          )
                        }
                      >
                        Mark Packed
                      </button>

                      <button
                        style={actionBtn}
                        onClick={() =>
                          updateStatus(
                            d.id,
                            "On The Way"
                          )
                        }
                      >
                        Ship Order
                      </button>

                      <button
                        style={deliverBtn}
                        onClick={() =>
                          updateStatus(
                            d.id,
                            "Delivered"
                          )
                        }
                      >
                        Delivered
                      </button>

                    </>
                  )
                }

                {/* CONSUMER */}

                {
                  user?.role ===
                    "consumer" && (

                    <>

                      <button
                        style={trackBtn}
                        onClick={() =>
                          setSelected(d)
                        }
                      >
                        Track Order
                      </button>

                      {
                        !d.paid && (

                          <button
                            style={payBtn}
                            onClick={() =>
                              makePayment(
                                d
                              )
                            }
                          >
                            Pay ₹{d.amount}
                          </button>
                        )
                      }

                    </>
                  )
                }

              </div>

            </div>
          ))
        }

      </div>

      {/* TRACK MODAL */}

      {
        selected && (

          <div style={modalOverlay}>

            <div style={modal}>

              <h2>
                📍 Live Tracking
              </h2>

              <p>
                {
                  selected.product_name
                }
              </p>

              <iframe
                title="liveMap"
                width="100%"
                height="320"
                style={modalMap}
                loading="lazy"
                allowFullScreen

                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selected.receiver_address
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />

              <button
                style={closeBtn}
                onClick={() =>
                  setSelected(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

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

  padding: "30px",

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

  flexWrap: "wrap",

  gap: "20px",

  marginBottom: "35px",

  position: "relative",

  zIndex: 2,
};

const liveBadge = {

  display: "inline-block",

  padding: "10px 18px",

  borderRadius: "30px",

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  marginBottom: "18px",

  fontWeight: "bold",
};

const title = {

  fontSize: "56px",

  fontWeight: "800",

  marginBottom: "12px",
};

const subtitle = {

  color: "#94a3b8",

  fontSize: "18px",

  lineHeight: "1.7",
};

const profileCard = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "24px",

  borderRadius: "22px",

  backdropFilter:
    "blur(16px)",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const statsGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "22px",

  marginBottom: "35px",

  position: "relative",

  zIndex: 2,
};

const statCard = {

  background:
    "rgba(15,23,42,0.75)",

  backdropFilter:
    "blur(16px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "28px",

  padding: "28px",

  textAlign: "center",
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
    "repeat(auto-fit,minmax(420px,1fr))",

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

  padding: "24px",

  transition: "0.3s",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.35)",
};

const cardTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "22px",
};

const product = {

  marginBottom: "10px",

  fontSize: "28px",
};

const priceBox = {

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  padding: "12px 18px",

  borderRadius: "16px",

  fontWeight: "bold",
};

const customerCard = {

  display: "flex",

  justifyContent:
    "space-between",

  background:
    "rgba(255,255,255,0.04)",

  padding: "18px",

  borderRadius: "18px",

  marginBottom: "20px",
};

const small = {

  color: "#94a3b8",
};

const addressGrid = {

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
};

const mapWrapper = {

  overflow: "hidden",

  borderRadius: "24px",

  marginBottom: "24px",
};

const map = {

  border: "none",
};

const trackContainer = {

  display: "flex",

  alignItems: "center",

  gap: "10px",

  marginBottom: "24px",
};

const step = {

  flex: 1,

  textAlign: "center",

  background:
    "rgba(255,255,255,0.06)",

  padding: "12px",

  borderRadius: "14px",

  fontSize: "13px",
};

const stepActive = {

  ...step,

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  fontWeight: "bold",
};

const trackLine = {

  width: "35px",

  height: "4px",

  borderRadius: "20px",

  background:
    "linear-gradient(90deg,#22c55e,#3b82f6)",
};

const actions = {

  display: "flex",

  flexWrap: "wrap",

  gap: "12px",
};

const actionBtn = {

  flex: 1,

  padding: "14px",

  border: "none",

  borderRadius: "14px",

  background:
    "#3b82f6",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const deliverBtn = {

  ...actionBtn,

  background:
    "#22c55e",
};

const payBtn = {

  flex: 1,

  padding: "14px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#f59e0b,#ea580c)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const trackBtn = {

  ...actionBtn,

  background:
    "#8b5cf6",
};

const modalOverlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(0,0,0,0.7)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  zIndex: 9999,
};

const modal = {

  width: "90%",

  maxWidth: "700px",

  background:
    "#0f172a",

  padding: "30px",

  borderRadius: "30px",
};

const modalMap = {

  border: "none",

  borderRadius: "20px",

  marginTop: "20px",
};

const closeBtn = {

  marginTop: "20px",

  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "16px",

  background:
    "#ef4444",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const status = (s) => ({

  display: "inline-block",

  padding: "8px 16px",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "bold",

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