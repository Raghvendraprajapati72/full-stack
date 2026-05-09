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
        text:
          "🌱 Organic farming tips for summer crops",
      },

      {
        id: 2,
        user: "Anjali Consumer",
        text:
          "🥬 Fresh vegetables received today!",
      },
    ]);

  const addPost = () => {

    if (!post) {
      return alert(
        "Write something ❌"
      );
    }

    const newPost = {

      id: Date.now(),

      user: "You",

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

      <h1 style={title}>
        🌐 Agro Community
      </h1>

      <div style={postBox}>

        <textarea
          placeholder="Share farming tips or updates..."
          value={post}
          onChange={(e) =>
            setPost(
              e.target.value
            )
          }
          style={textarea}
        />

        <button
          onClick={addPost}
          style={btn}
        >
          Post Update
        </button>

      </div>

      <div style={feed}>

        {posts.map((p) => (

          <div
            key={p.id}
            style={card}
          >

            <h3>
              👤 {p.user}
            </h3>

            <p>
              {p.text}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#020617",
  padding: "30px",
  color: "white",
};

const title = {
  fontSize: "40px",
  marginBottom: "25px",
};

const postBox = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "20px",
};

const textarea = {
  width: "100%",
  height: "120px",
  border: "none",
  borderRadius: "14px",
  padding: "15px",
  outline: "none",
  fontSize: "16px",
};

const btn = {
  marginTop: "15px",
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "14px 25px",
  borderRadius: "12px",
  cursor: "pointer",
};

const feed = {
  marginTop: "30px",
  display: "grid",
  gap: "20px",
};

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "18px",
};