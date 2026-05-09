import React, { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "consumer",
  });

  const [loading, setLoading] = useState(false);

  const register = async () => {
    // VALIDATION

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      return alert("Please fill all fields ❌");
    }

    if (data.password.length < 6) {
      return alert(
        "Password must be at least 6 characters ❌"
      );
    }

    if (
      data.password !== data.confirmPassword
    ) {
      return alert(
        "Passwords do not match ❌"
      );
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );

      alert(
        "Registered Successfully ✅"
      );

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN SECTION */}
      <div style={container}>
        {/* LEFT SIDE */}
        <div style={leftSection}>
          <div>
            <h1 style={heroTitle}>
              Fresh From Farm <br />
              Direct To Your Home
            </h1>

            <p style={heroText}>
              Buy organic vegetables, fruits and
              grains directly from verified farmers
              with transparency and trust.
            </p>

            {/* FEATURES */}
            <div style={features}>
              <div style={featureCard}>
                ✔ Verified Farmers
              </div>

              <div style={featureCard}>
                🔒 Secure Payments
              </div>

              <div style={featureCard}>
                🚚 Fast Delivery
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={rightSection}>
          <div style={card}>
            <h2 style={cardTitle}>
              Create Account
            </h2>

            <p style={cardSubtitle}>
              Join AgroConnect today
            </p>

            {/* NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
              style={input}
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              style={input}
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              style={input}
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({
                  ...data,
                  confirmPassword:
                    e.target.value,
                })
              }
              style={input}
            />

            {/* ROLE */}
            <select
              value={data.role}
              onChange={(e) =>
                setData({
                  ...data,
                  role: e.target.value,
                })
              }
              style={input}
            >
              <option value="consumer">
                🛒 Consumer
              </option>

              <option value="farmer">
                🌾 Farmer
              </option>

              <option value="admin">
                👑 Admin
              </option>
            </select>

            {/* BUTTON */}
            <button
              style={button}
              onClick={register}
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* LOGIN */}
            <p style={loginText}>
              Already have an account?{" "}
              <a href="/" style={loginLink}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

/* =========================
   🎨 PAGE STYLES
========================= */

const container = {
  minHeight: "100vh",
  display: "flex",
  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",
  paddingTop: "80px",
};

const leftSection = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px",
  color: "white",
};

const heroTitle = {
  fontSize: "58px",
  lineHeight: "1.2",
};

const heroText = {
  marginTop: "20px",
  color: "#cbd5e1",
  fontSize: "18px",
  lineHeight: "1.8",
  maxWidth: "550px",
};

const features = {
  display: "flex",
  gap: "20px",
  marginTop: "40px",
  flexWrap: "wrap",
};

const featureCard = {
  background: "rgba(255,255,255,0.08)",
  padding: "15px 25px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.1)",
};

const rightSection = {
  width: "520px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
};

const card = {
  width: "100%",
  background: "rgba(15,23,42,0.95)",
  padding: "40px",
  borderRadius: "24px",
  color: "white",
  boxShadow:
    "0 10px 40px rgba(0,0,0,0.45)",
  border:
    "1px solid rgba(255,255,255,0.08)",
};

const cardTitle = {
  fontSize: "34px",
  marginBottom: "10px",
};

const cardSubtitle = {
  color: "#94a3b8",
  marginBottom: "30px",
};

const input = {
  width: "100%",
  padding: "15px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

const loginText = {
  textAlign: "center",
  marginTop: "20px",
  color: "#cbd5e1",
};

const loginLink = {
  color: "#38bdf8",
  textDecoration: "none",
  fontWeight: "bold",
};