/* =====================================================
   src/pages/Community.jsx
===================================================== */

import { useState } from "react";

export default function Community() {

  const [post,
    setPost] = useState("");

  const [posts,
    setPosts] = useState([
      {
        id: 1,
        user: "Rohit Farmer",
        role: "Farmer",
        time: "2h ago",
        text:
          "🌱 Organic farming tips for summer crops",
      },

      {
        id: 2,
        user: "Anjali Consumer",
        role: "Consumer",
        time: "5h ago",
        text:
          "🥬 Fresh vegetables received today!",
      },
    ]);

  const addPost = () => {

    if (!post.trim()) {

      return alert(
        "Write something ❌"
      );
    }

    const newPost = {

      id: Date.now(),

      user: "You",

      role: "Member",

      time: "Just now",

      text: post,
    };

    setPosts([
      newPost,
      ...posts,
    ]);

    setPost("");
  };

  return (

    <div style={container}>

      {/* HERO */}

      <div style={hero}>

        <div>

          <h1 style={title}>
            🌐 Agro Community
          </h1>

          <p style={subtitle}>
            Connect with farmers,
            consumers & agriculture experts.
          </p>

        </div>

        <div style={membersBox}>

          👥 12,450 Active Members

        </div>

      </div>

      {/* CREATE POST */}

      <div style={postBox}>

        <div style={topPost}>

          <div style={avatar}>
            👤
          </div>

          <textarea
            placeholder="Share farming tips, ask questions, or post updates..."
            value={post}
            onChange={(e) =>
              setPost(
                e.target.value
              )
            }
            style={textarea}
          />

        </div>

        <div style={postFooter}>

          <div style={actions}>

            <span>
              📷 Photo
            </span>

            <span>
              🎥 Video
            </span>

            <span>
              📍 Location
            </span>

          </div>

          <button
            onClick={addPost}
            style={btn}
          >
            Post Update 🚀
          </button>

        </div>

      </div>

      {/* FEED */}

      <div style={feed}>

        {posts.map((p) => (

          <div
            key={p.id}
            style={card}
          >

            {/* HEADER */}

            <div style={cardHeader}>

              <div style={profile}>

                <div style={profileImg}>
                  👨‍🌾
                </div>

                <div>

                  <h3 style={userName}>
                    {p.user}
                  </h3>

                  <p style={meta}>
                    {p.role} • {p.time}
                  </p>

                </div>

              </div>

              <div style={dots}>
                ⋮
              </div>

            </div>

            {/* POST */}

            <p style={postText}>
              {p.text}
            </p>

            {/* ACTIONS */}

            <div style={cardActions}>

              <button style={actionBtn}>
                ❤️ Like
              </button>

              <button style={actionBtn}>
                💬 Comment
              </button>

              <button style={actionBtn}>
                🔄 Share
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* =========================
   STYLES
========================= */

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  padding: "40px",

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

const membersBox = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "16px 24px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter: "blur(10px)",
};

const postBox = {

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter: "blur(14px)",

  padding: "25px",

  borderRadius: "24px",

  marginBottom: "35px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.3)",
};

const topPost = {

  display: "flex",

  gap: "18px",
};

const avatar = {

  width: "60px",

  height: "60px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "26px",
};

const textarea = {

  flex: 1,

  minHeight: "120px",

  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "18px",

  padding: "18px",

  color: "white",

  outline: "none",

  resize: "none",

  fontSize: "16px",
};

const postFooter = {

  marginTop: "20px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "20px",
};

const actions = {

  display: "flex",

  gap: "20px",

  color: "#94a3b8",
};

const btn = {

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  border: "none",

  padding: "14px 28px",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "15px",

  boxShadow:
    "0 10px 25px rgba(34,197,94,0.3)",
};

const feed = {

  display: "grid",

  gap: "24px",
};

const card = {

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter: "blur(14px)",

  padding: "25px",

  borderRadius: "24px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.2)",
};

const cardHeader = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

const profile = {

  display: "flex",

  alignItems: "center",

  gap: "15px",
};

const profileImg = {

  width: "55px",

  height: "55px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "24px",
};

const userName = {

  marginBottom: "5px",
};

const meta = {

  color: "#94a3b8",

  fontSize: "14px",
};

const dots = {

  fontSize: "24px",

  cursor: "pointer",

  color: "#94a3b8",
};

const postText = {

  marginTop: "20px",

  color: "#e2e8f0",

  lineHeight: "1.8",

  fontSize: "16px",
};

const cardActions = {

  marginTop: "22px",

  display: "flex",

  gap: "15px",

  flexWrap: "wrap",
};

const actionBtn = {

  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  color: "white",

  padding: "10px 18px",

  borderRadius: "12px",

  cursor: "pointer",
};