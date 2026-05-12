/* =====================================================
   src/pages/News.jsx
   Modern News System + Backend Connected
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function News() {

  const [news,
    setNews] =
    useState([]);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [image,
    setImage] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  /* =====================================================
      LOAD NEWS
  ===================================================== */

  useEffect(() => {

    loadNews();

  }, []);

  const loadNews =
    async () => {

      try {

        const res =
          await axios.get(
            "https://backend-api-yduq.onrender.com/news"
          );

        setNews(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (err) {

        console.log(err);
      }
    };

  /* =====================================================
      ADD NEWS
  ===================================================== */

  const addNews =
    async () => {

      if (
        !title.trim() ||
        !description.trim() ||
        !image.trim()
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        await axios.post(
          "https://backend-api-yduq.onrender.com/news/add",
          {
            title,
            description,
            image,
            created_at:
              new Date()
                .toLocaleDateString(),
          }
        );

        alert(
          "News Added ✅"
        );

        setTitle("");
        setDescription("");
        setImage("");

        loadNews();

      } catch (err) {

        console.log(err);

        alert(
          "Failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div style={container}>

      {/* GLOW */}

      <div style={glow1}></div>

      <div style={glow2}></div>

      {/* HERO */}

      <div style={hero}>

        <div>

          <div style={badge}>
            📰 LIVE NEWS
          </div>

          <h1 style={heroTitle}>
            Agro News & Updates
          </h1>

          <p style={heroText}>

            Latest agriculture updates,
            platform announcements,
            farmer news & rewards.

          </p>

        </div>

        <div style={heroStats}>

          <h2>
            {news.length}
          </h2>

          <p>
            Total News Posts
          </p>

        </div>

      </div>

      {/* ADD NEWS */}

      <div style={formBox}>

        <h2 style={formTitle}>
          ➕ Add News
        </h2>

        <div style={inputGrid}>

          <input
            type="text"
            placeholder="News title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={input}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            style={input}
          />

        </div>

        <textarea
          placeholder="News description..."
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          style={textarea}
        />

        <button
          onClick={addNews}
          style={
            loading
              ? loadingBtn
              : btn
          }
        >

          {
            loading
              ? "Publishing..."
              : "Publish News 🚀"
          }

        </button>

      </div>

      {/* NEWS GRID */}

      <div style={grid}>

        {news.length === 0 ? (

          <div style={emptyBox}>
            No News Available
          </div>

        ) : (

          news.map((n) => (

            <div
              key={n.id}
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

              <img
                src={n.image}
                alt={n.title}
                style={cardImage}
              />

              <div style={cardContent}>

                <div style={newsBadge}>
                  🌱 Agriculture
                </div>

                <h2 style={newsTitle}>
                  {n.title}
                </h2>

                <p style={desc}>
                  {n.description}
                </p>

                <div style={bottom}>

                  <span style={date}>
                    📅 {n.created_at}
                  </span>

                  <button style={readBtn}>
                    Read More →
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

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
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  padding: "40px",

  position: "relative",

  overflow: "hidden",

  color: "white",
};

const glow1 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.18)",

  filter: "blur(120px)",

  top: "-100px",

  left: "-100px",
};

const glow2 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.18)",

  filter: "blur(120px)",

  bottom: "-100px",

  right: "-100px",
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

  border:
    "1px solid rgba(34,197,94,0.25)",
};

const heroTitle = {

  fontSize: "58px",

  marginBottom: "12px",

  fontWeight: "800",
};

const heroText = {

  color: "#94a3b8",

  fontSize: "18px",

  maxWidth: "650px",

  lineHeight: "1.8",
};

const heroStats = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "28px 40px",

  borderRadius: "24px",

  textAlign: "center",

  backdropFilter: "blur(16px)",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const formBox = {

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter:
    "blur(16px)",

  padding: "30px",

  borderRadius: "28px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  marginBottom: "40px",

  position: "relative",

  zIndex: 2,
};

const formTitle = {

  marginBottom: "22px",

  fontSize: "30px",
};

const inputGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "18px",

  marginBottom: "18px",
};

const input = {

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  outline: "none",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",

  fontSize: "15px",
};

const textarea = {

  width: "100%",

  minHeight: "180px",

  borderRadius: "20px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",

  padding: "18px",

  fontSize: "16px",

  resize: "none",

  outline: "none",

  marginBottom: "20px",

  boxSizing: "border-box",
};

const btn = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontSize: "17px",

  fontWeight: "700",

  cursor: "pointer",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(360px,1fr))",

  gap: "30px",

  position: "relative",

  zIndex: 2,
};

const card = {

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter:
    "blur(16px)",

  borderRadius: "28px",

  overflow: "hidden",

  border:
    "1px solid rgba(255,255,255,0.08)",

  transition: "0.3s",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.25)",
};

const cardImage = {

  width: "100%",

  height: "240px",

  objectFit: "cover",
};

const cardContent = {

  padding: "24px",
};

const newsBadge = {

  display: "inline-block",

  padding: "8px 14px",

  borderRadius: "14px",

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  fontSize: "13px",

  fontWeight: "bold",

  marginBottom: "15px",
};

const newsTitle = {

  fontSize: "28px",

  marginBottom: "14px",

  fontWeight: "700",
};

const desc = {

  color: "#cbd5e1",

  lineHeight: "1.8",

  marginBottom: "20px",
};

const bottom = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "12px",

  flexWrap: "wrap",
};

const date = {

  color: "#94a3b8",

  fontSize: "14px",
};

const readBtn = {

  padding: "10px 18px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const emptyBox = {

  background:
    "rgba(255,255,255,0.05)",

  padding: "40px",

  borderRadius: "24px",

  textAlign: "center",

  color: "#94a3b8",

  fontSize: "18px",
};