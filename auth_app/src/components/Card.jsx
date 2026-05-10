import React from "react";

export default function Card({

  image,
  name,
  price,
  location,
  onClick,

}) {

  return (

    <div
      style={card}
      onClick={onClick}
    >

      {/* IMAGE */}

      <img
        src={image}
        alt={name}
        style={img}
      />

      {/* CONTENT */}

      <div style={content}>

        <h3 style={title}>
          {name}
        </h3>

        <p style={price}>
          ₹{price}
        </p>

        <p style={locationText}>
          📍 {location}
        </p>

        <button style={btn}>
          View Product
        </button>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const card = {

  background: "#1e293b",

  borderRadius: "18px",

  overflow: "hidden",

  cursor: "pointer",

  transition: "0.3s",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.3)",
};

const img = {

  width: "100%",

  height: "220px",

  objectFit: "cover",
};

const content = {

  padding: "18px",

  color: "white",
};

const title = {

  fontSize: "22px",

  marginBottom: "10px",
};

const price = {

  color: "#22c55e",

  fontWeight: "bold",

  fontSize: "20px",

  marginBottom: "8px",
};

const locationText = {

  color: "#cbd5e1",

  marginBottom: "18px",
};

const btn = {

  width: "100%",

  padding: "12px",

  border: "none",

  borderRadius: "10px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};