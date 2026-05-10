/* =====================================================
   🌾 SMART FARMER PROMOTIONS SYSTEM
   Govt Schemes + Backend Connected
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function Promotions() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [promotions,
    setPromotions] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [amount,
    setAmount] =
    useState("");

  const [scheme,
    setScheme] =
    useState("");

  const [submitting,
    setSubmitting] =
    useState(false);

  /* =====================================================
      LOAD PROMOTIONS
  ===================================================== */

  useEffect(() => {

    loadPromotions();

  }, []);

  const loadPromotions =
    async () => {

      try {

        const res =
          await axios.get(

            "https://full-stack-backend-qps4.onrender.com/promotions"
          );

        setPromotions(

          Array.isArray(
            res.data
          )

            ? res.data

            : []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      ADD PROMOTION
  ===================================================== */

  const createPromotion =
    async () => {

      if (

        !title.trim() ||

        !description.trim() ||

        !scheme.trim()

      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setSubmitting(true);

        await axios.post(

          "https://full-stack-backend-qps4.onrender.com/promotions/add",

          {

            farmer_id:
              user?.id,

            farmer_name:
              user?.name,

            title,

            description,

            amount,

            scheme,

            created_at:
              new Date()
                .toLocaleDateString(),
          }
        );

        alert(
          "Promotion Created ✅"
        );

        setTitle("");

        setDescription("");

        setAmount("");

        setScheme("");

        loadPromotions();

      } catch (err) {

        console.log(err);

        alert(
          "Failed ❌"
        );

      } finally {

        setSubmitting(false);
      }
    };

  /* =====================================================
      GOVT SCHEMES
  ===================================================== */

  const govtSchemes = [

    {
      title:
        "PM Kisan Yojana",

      benefit:
        "₹6000 yearly financial support",

      icon: "💰",
    },

    {
      title:
        "Crop Insurance",

      benefit:
        "Protection against crop loss",

      icon: "🌾",
    },

    {
      title:
        "Solar Pump Subsidy",

      benefit:
        "Up to 70% subsidy for solar pumps",

      icon: "☀️",
    },

    {
      title:
        "Organic Farming Mission",

      benefit:
        "Government support for organic farming",

      icon: "🌱",
    },
  ];

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
            🌾 FARMER GROWTH SYSTEM
          </div>

          <h1 style={heroTitle}>
            Smart Promotions
          </h1>

          <p style={heroText}>

            Promote products,
            access government schemes,
            grow your farming business,
            and increase profits.

          </p>

        </div>

        <div style={heroStats}>

          <h2>
            {promotions.length}
          </h2>

          <p>
            Active Promotions
          </p>

        </div>

      </div>

      {/* CREATE PROMOTION */}

      <div style={formBox}>

        <h2 style={sectionTitle}>
          🚀 Create New Promotion
        </h2>

        <div style={inputGrid}>

          <input
            type="text"
            placeholder="Promotion title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={input}
          />

          <input
            type="number"
            placeholder="Discount Amount ₹"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            style={input}
          />

        </div>

        <textarea
          placeholder="Promotion description..."
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          style={textarea}
        />

        <select
          value={scheme}
          onChange={(e) =>
            setScheme(
              e.target.value
            )
          }
          style={input}
        >

          <option value="">
            Select Govt Scheme
          </option>

          <option>
            PM Kisan Yojana
          </option>

          <option>
            Crop Insurance
          </option>

          <option>
            Solar Pump Subsidy
          </option>

          <option>
            Organic Farming Mission
          </option>

        </select>

        <button
          style={
            submitting
              ? loadingBtn
              : btn
          }
          onClick={
            createPromotion
          }
        >

          {
            submitting
              ? "Creating..."
              : "Create Promotion 🚀"
          }

        </button>

      </div>

      {/* GOVT SCHEMES */}

      <div style={schemeSection}>

        <h2 style={sectionTitle}>
          🏛 Government Farmer Schemes
        </h2>

        <div style={schemeGrid}>

          {

            govtSchemes.map(
              (s, index) => (

                <div
                  key={index}
                  style={schemeCard}
                >

                  <div style={schemeIcon}>
                    {s.icon}
                  </div>

                  <h3>
                    {s.title}
                  </h3>

                  <p style={schemeText}>
                    {s.benefit}
                  </p>

                  <button style={applyBtn}>
                    Apply Now
                  </button>

                </div>
              )
            )
          }

        </div>

      </div>

      {/* PROMOTIONS */}

      <div style={promoSection}>

        <h2 style={sectionTitle}>
          🔥 Active Promotions
        </h2>

        {

          loading ? (

            <div style={loadingBox}>
              Loading promotions...
            </div>

          ) : (

            <div style={promoGrid}>

              {

                promotions.length ===
                0 ? (

                  <div style={emptyBox}>
                    No Promotions Found
                  </div>

                ) : (

                  promotions.map(
                    (p) => (

                      <div
                        key={p.id}
                        style={promoCard}
                      >

                        <div style={promoTop}>

                          <div>

                            <h2>
                              {p.title}
                            </h2>

                            <p style={date}>
                              📅 {p.created_at}
                            </p>

                          </div>

                          <div style={discount}>
                            ₹{p.amount}
                          </div>

                        </div>

                        <p style={desc}>
                          {p.description}
                        </p>

                        <div style={schemeBadge}>
                          🏛 {p.scheme}
                        </div>

                        <div style={farmerBox}>
                          👨‍🌾 {p.farmer_name}
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

  color: "white",

  padding: "35px",

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

const heroStats = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "28px 40px",

  borderRadius: "24px",

  textAlign: "center",

  backdropFilter:
    "blur(16px)",
};

const formBox = {

  background:
    "rgba(15,23,42,0.82)",

  padding: "30px",

  borderRadius: "30px",

  marginBottom: "40px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(16px)",
};

const sectionTitle = {

  fontSize: "34px",

  marginBottom: "25px",
};

const inputGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "18px",

  marginBottom: "18px",
};

const input = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  outline: "none",

  fontSize: "15px",

  boxSizing: "border-box",
};

const textarea = {

  ...input,

  minHeight: "140px",

  resize: "none",

  marginBottom: "18px",
};

const btn = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "16px",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};

const schemeSection = {

  marginBottom: "50px",
};

const schemeGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(260px,1fr))",

  gap: "25px",
};

const schemeCard = {

  background:
    "rgba(15,23,42,0.82)",

  padding: "28px",

  borderRadius: "28px",

  textAlign: "center",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const schemeIcon = {

  fontSize: "42px",

  marginBottom: "16px",
};

const schemeText = {

  color: "#94a3b8",

  marginTop: "12px",

  lineHeight: "1.7",
};

const applyBtn = {

  marginTop: "18px",

  padding: "12px 20px",

  border: "none",

  borderRadius: "14px",

  background:
    "#22c55e",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const promoSection = {

  marginTop: "50px",
};

const promoGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(350px,1fr))",

  gap: "28px",
};

const promoCard = {

  background:
    "rgba(15,23,42,0.82)",

  padding: "28px",

  borderRadius: "28px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.35)",
};

const promoTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "18px",
};

const discount = {

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  padding: "12px 18px",

  borderRadius: "16px",

  fontWeight: "bold",
};

const desc = {

  color: "#cbd5e1",

  lineHeight: "1.8",

  marginBottom: "18px",
};

const schemeBadge = {

  display: "inline-block",

  padding: "10px 16px",

  borderRadius: "14px",

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  fontWeight: "bold",

  marginBottom: "16px",
};

const farmerBox = {

  color: "#94a3b8",
};

const date = {

  color: "#94a3b8",

  marginTop: "6px",
};

const loadingBox = {

  padding: "30px",

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