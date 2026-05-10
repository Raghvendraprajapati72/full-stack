/* =====================================================
   🔴 LiveStream.jsx
   Modern Live Streaming Dashboard
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import ReactPlayer
  from "react-player";

export default function LiveStream() {

  const [streams,
    setStreams] =
    useState([]);

  const [title,
    setTitle] =
    useState("");

  const [url,
    setUrl] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [success,
    setSuccess] =
    useState("");

  /* =====================================================
     LOAD STREAMS
  ===================================================== */

  useEffect(() => {

    loadStreams();

  }, []);

  const loadStreams =
    async () => {

      try {

        const res =
          await axios.get(
            "https://full-stack-backend-qps4.onrender.com/broadcast"
          );

        setStreams(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (err) {

        console.log(err);
      }
    };

  /* =====================================================
     ADD STREAM
  ===================================================== */

  const addStream =
    async () => {

      if (
        !title.trim() ||
        !url.trim()
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        await axios.post(
          "https://full-stack-backend-qps4.onrender.com/broadcast/add",
          {
            title,
            url,
          }
        );

        setSuccess(
          "Live Stream Added Successfully ✅"
        );

        setTitle("");
        setUrl("");

        loadStreams();

        setTimeout(() => {

          setSuccess("");

        }, 3000);

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

      {/* BACKGROUND GLOW */}

      <div style={bgGlow1}></div>

      <div style={bgGlow2}></div>

      {/* HERO */}

      <div style={hero}>

        <div>

          <div style={liveBadge}>
            🔴 LIVE STREAMING
          </div>

          <h1 style={titleStyle}>
            Farmer Live Broadcast
          </h1>

          <p style={subTitle}>

            Farmers can stream
            live farming activities,
            crop updates, and tutorials.

          </p>

        </div>

        <div style={statsBox}>

          <h2>
            {streams.length}
          </h2>

          <p>
            Active Streams
          </p>

        </div>

      </div>

      {/* FORM */}

      <div style={formBox}>

        <div style={formTop}>

          <h2>
            🎥 Start New Stream
          </h2>

          {success && (

            <div style={successBox}>
              {success}
            </div>

          )}

        </div>

        <div style={inputGrid}>

          <input
            type="text"
            placeholder="Enter stream title"
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
            placeholder="Paste Youtube / Stream URL"
            value={url}
            onChange={(e) =>
              setUrl(
                e.target.value
              )
            }
            style={input}
          />

        </div>

        <button
          onClick={addStream}
          style={
            loading
              ? loadingBtn
              : btn
          }
        >

          {
            loading
              ? "Starting..."
              : "Go Live 🚀"
          }

        </button>

      </div>

      {/* STREAMS */}

      <div style={grid}>

        {streams.length === 0 ? (

          <div style={emptyBox}>
            No Live Streams Available
          </div>

        ) : (

          streams.map((s) => (

            <div
              key={s.id}
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

              {/* PLAYER */}

              <div style={videoWrapper}>

                <ReactPlayer
                  url={s.url}
                  controls={true}
                  width="100%"
                  height="260px"
                />

              </div>

              {/* CONTENT */}

              <div style={cardContent}>

                <div style={streamTop}>

                  <div style={liveDot}>
                    🔴 LIVE
                  </div>

                  <div style={viewerBadge}>
                    👁 1.2K Watching
                  </div>

                </div>

                <h2 style={streamTitle}>
                  {s.title}
                </h2>

                <p style={streamDesc}>

                  Live farming updates,
                  crop monitoring &
                  agriculture insights.

                </p>

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

  color: "white",

  padding: "40px",

  position: "relative",

  overflow: "hidden",
};

const bgGlow1 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(239,68,68,0.18)",

  filter: "blur(120px)",

  top: "-120px",

  left: "-120px",
};

const bgGlow2 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

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

const liveBadge = {

  display: "inline-block",

  padding: "10px 18px",

  borderRadius: "30px",

  background:
    "rgba(239,68,68,0.15)",

  color: "#ef4444",

  border:
    "1px solid rgba(239,68,68,0.25)",

  marginBottom: "18px",

  fontWeight: "bold",
};

const titleStyle = {

  fontSize: "58px",

  marginBottom: "12px",

  fontWeight: "800",
};

const subTitle = {

  color: "#94a3b8",

  fontSize: "18px",

  maxWidth: "650px",

  lineHeight: "1.8",
};

const statsBox = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "25px 35px",

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

  display: "grid",

  gap: "20px",

  marginBottom: "40px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  position: "relative",

  zIndex: 2,
};

const formTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "15px",
};

const successBox = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  padding: "10px 18px",

  borderRadius: "14px",

  border:
    "1px solid rgba(34,197,94,0.3)",
};

const inputGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(280px,1fr))",

  gap: "18px",
};

const input = {

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  outline: "none",

  fontSize: "16px",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",
};

const btn = {

  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",

  color: "white",

  border: "none",

  padding: "16px",

  borderRadius: "18px",

  cursor: "pointer",

  fontSize: "17px",

  fontWeight: "700",

  boxShadow:
    "0 10px 30px rgba(239,68,68,0.35)",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(380px,1fr))",

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

const videoWrapper = {

  overflow: "hidden",
};

const cardContent = {

  padding: "22px",
};

const streamTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "18px",
};

const liveDot = {

  background:
    "rgba(239,68,68,0.15)",

  color: "#ef4444",

  padding: "8px 14px",

  borderRadius: "14px",

  fontSize: "13px",

  fontWeight: "bold",
};

const viewerBadge = {

  background:
    "rgba(255,255,255,0.08)",

  padding: "8px 14px",

  borderRadius: "14px",

  fontSize: "13px",
};

const streamTitle = {

  fontSize: "28px",

  marginBottom: "12px",

  fontWeight: "700",
};

const streamDesc = {

  color: "#94a3b8",

  lineHeight: "1.8",
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