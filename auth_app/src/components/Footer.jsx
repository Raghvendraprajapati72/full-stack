import React from "react";

export default function Footer() {
  return (
    <footer style={footer}>
      {/* TOP */}
      <div style={topSection}>
        <div style={column}>
          <h2 style={logo}>
            🌾 AgroConnect
          </h2>

          <p style={text}>
            Fresh farm products directly from
            trusted farmers with secure delivery.
          </p>
        </div>

        <div style={column}>
          <h3 style={heading}>
            Get To Know Us
          </h3>

          <a href="/" style={link}>
            About
          </a>

          <a href="/" style={link}>
            Careers
          </a>

          <a href="/" style={link}>
            Press Releases
          </a>

          <a href="/" style={link}>
            Blog
          </a>
        </div>

        <div style={column}>
          <h3 style={heading}>
            Connect With Us
          </h3>

          <a href="/" style={link}>
            Facebook
          </a>

          <a href="/" style={link}>
            Instagram
          </a>

          <a href="/" style={link}>
            Twitter
          </a>

          <a href="/" style={link}>
            LinkedIn
          </a>
        </div>

        <div style={column}>
          <h3 style={heading}>Help</h3>

          <a href="/" style={link}>
            Payments
          </a>

          <a href="/" style={link}>
            Shipping
          </a>

          <a href="/" style={link}>
            Cancellation
          </a>

          <a href="/" style={link}>
            Support
          </a>
        </div>
      </div>

      {/* MIDDLE */}
      <div style={middle}>
        🌍 India | English
      </div>

      {/* BOTTOM */}
      <div style={bottom}>
        © 2025 AgroConnect.com, Inc.
        All rights reserved.
      </div>
    </footer>
  );
}

/* =========================
   🎨 STYLES
========================= */

const footer = {
  background: "#0f172a",
  color: "white",
  paddingTop: "60px",
};

const topSection = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "40px",
  padding: "0 60px 50px",
};

const column = {
  display: "flex",
  flexDirection: "column",
};

const logo = {
  fontSize: "32px",
  marginBottom: "15px",
};

const text = {
  color: "#cbd5e1",
  lineHeight: "1.8",
};

const heading = {
  marginBottom: "20px",
};

const link = {
  color: "#cbd5e1",
  textDecoration: "none",
  marginBottom: "12px",
  fontSize: "15px",
};

const middle = {
  borderTop:
    "1px solid rgba(255,255,255,0.1)",
  borderBottom:
    "1px solid rgba(255,255,255,0.1)",
  textAlign: "center",
  padding: "25px",
  color: "#94a3b8",
};

const bottom = {
  textAlign: "center",
  padding: "25px",
  color: "#94a3b8",
  fontSize: "14px",
};