/* =====================================================
   LiveStream.jsx
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
            "http://localhost:5000/broadcast"
          );

        setStreams(
          res.data
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
        !title ||
        !url
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        await axios.post(
          "http://localhost:5000/broadcast/add",
          {
            title,
            url,
          }
        );

        alert(
          "Live Stream Added ✅"
        );

        setTitle("");
        setUrl("");

        loadStreams();

      } catch (err) {

        alert(
          "Failed ❌"
        );
      }
    };

  return (

    <div style={container}>

      {/* HEADER */}

      <div style={header}>

        <h1 style={titleStyle}>
          🔴 Live Streaming
        </h1>

        <p style={subTitle}>
          Farmers can broadcast
          live farming updates
        </p>

      </div>

      {/* ADD STREAM */}

      <div style={formBox}>

        <input
          type="text"
          placeholder="Stream title"
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
          placeholder="Youtube / stream URL"
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
          style={input}
        />

        <button
          onClick={addStream}
          style={btn}
        >
          Go Live
        </button>

      </div>

      {/* STREAMS */}

      <div style={grid}>

        {streams.map((s) => (

          <div
            key={s.id}
            style={card}
          >

            <ReactPlayer
              url={s.url}
              controls={true}
              width="100%"
              height="250px"
            />

            <h2 style={streamTitle}>
              {s.title}
            </h2>

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

  minHeight: "100vh",

  background:
    "#020617",

  color: "white",

  padding: "30px",
};

const header = {

  marginBottom: "30px",
};

const titleStyle = {

  fontSize: "42px",

  marginBottom: "10px",
};

const subTitle = {

  color: "#94a3b8",

  fontSize: "18px",
};

const formBox = {

  background:
    "#1e293b",

  padding: "25px",

  borderRadius: "20px",

  display: "grid",

  gap: "15px",

  marginBottom: "35px",
};

const input = {

  padding: "15px",

  borderRadius: "12px",

  border: "none",

  outline: "none",

  fontSize: "16px",
};

const btn = {

  background:
    "#22c55e",

  color: "white",

  border: "none",

  padding: "15px",

  borderRadius: "14px",

  cursor: "pointer",

  fontSize: "16px",

  fontWeight: "bold",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(350px,1fr))",

  gap: "25px",
};

const card = {

  background:
    "#1e293b",

  padding: "18px",

  borderRadius: "20px",
};

const streamTitle = {

  marginTop: "15px",

  fontSize: "22px",
};