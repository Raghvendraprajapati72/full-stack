import React, { useState } from "react";
import axios from "axios";
import API from "../config";
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

  const [loading, setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  /* =========================================
     REGISTER USER
  ========================================= */

  const register = async (e) => {

    e.preventDefault();

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {

      return alert(
        "Please fill all fields ❌"
      );
    }

    if (
      data.password.length < 6
    ) {

      return alert(
        "Password must be at least 6 characters ❌"
      );
    }

    if (
      data.password !==
      data.confirmPassword
    ) {

      return alert(
        "Passwords do not match ❌"
      );
    }

    try {

      setLoading(true);

      const response =
        await axios.post(

          `${API}/auth/register`,

          {
            name: data.name,
            email:
              data.email
                .trim()
                .toLowerCase(),
            password:
              data.password,
            role: data.role,
          }
        );

      console.log(
        response.data
      );

      alert(
        "Account Created Successfully ✅"
      );

      window.location.href =
        "/";

    } catch (err) {

      console.log(err);

      alert(

        err?.response?.data?.msg ||

        "Registration Failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={container}>

        {/* LEFT SIDE */}

        <div style={leftSection}>

          <div style={overlay}></div>

          <div style={leftContent}>

            <div style={badge}>
              🌾 Trusted By Farmers
            </div>

            <h1 style={heroTitle}>
              Smart Agriculture <br />
              Marketplace Platform
            </h1>

            <p style={heroText}>
              AgroConnect connects
              farmers and consumers
              with secure payments,
              smart delivery tracking,
              live farming updates
              and verified organic products.
            </p>

            <div style={features}>

              <div style={featureCard}>
                <h3>
                  🌱 Organic Products
                </h3>

                <p>
                  Fresh products directly
                  from farmers.
                </p>
              </div>

              <div style={featureCard}>
                <h3>
                  🚚 Fast Delivery
                </h3>

                <p>
                  Live order tracking
                  with smart logistics.
                </p>
              </div>

              <div style={featureCard}>
                <h3>
                  🔒 Secure Payments
                </h3>

                <p>
                  Safe and trusted
                  online transactions.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div style={rightSection}>

          <div style={card}>

            <div style={topIcon}>
              🌾
            </div>

            <h2 style={cardTitle}>
              Create Account
            </h2>

            <p style={cardSubtitle}>
              Join AgroConnect Platform
            </p>

            {/* NAME */}

            <div style={inputBox}>

              <span style={icon}>
                👤
              </span>

              <input
                type="text"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name:
                      e.target.value,
                  })
                }
                style={input}
              />

            </div>

            {/* EMAIL */}

            <div style={inputBox}>

              <span style={icon}>
                📧
              </span>

              <input
                type="email"
                placeholder="Email Address"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email:
                      e.target.value,
                  })
                }
                style={input}
              />

            </div>

            {/* PASSWORD */}

            <div style={inputBox}>

              <span style={icon}>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password:
                      e.target.value,
                  })
                }
                style={input}
              />

              <button
                style={eyeBtn}
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁"}
              </button>

            </div>

            {/* CONFIRM PASSWORD */}

            <div style={inputBox}>

              <span style={icon}>
                🔐
              </span>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={
                  data.confirmPassword
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    confirmPassword:
                      e.target.value,
                  })
                }
                style={input}
              />

              <button
                style={eyeBtn}
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "🙈"
                  : "👁"}
              </button>

            </div>

            {/* ROLE */}

            <select
              value={data.role}
              onChange={(e) =>
                setData({
                  ...data,
                  role:
                    e.target.value,
                })
              }
              style={select}
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

              Already have an account?

              <a
                href="/"
                style={loginLink}
              >
                Login
              </a>

            </p>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

/* =========================================
   STYLES
========================================= */

const container = {

  minHeight: "100vh",

  display: "flex",

  flexWrap: "wrap",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  overflow: "hidden",
};

const leftSection = {

  flex: 1,

  minWidth: "50%",

  position: "relative",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "80px",

  background:
    "linear-gradient(135deg,#052e16,#064e3b,#0f172a)",
};

const overlay = {

  position: "absolute",

  inset: 0,

  background:
    "radial-gradient(circle at top right,rgba(34,197,94,0.2),transparent 40%)",
};

const leftContent = {

  position: "relative",

  zIndex: 2,

  color: "white",

  maxWidth: "700px",
};

const badge = {

  display: "inline-block",

  padding: "10px 18px",

  borderRadius: "40px",

  background:
    "rgba(255,255,255,0.1)",

  border:
    "1px solid rgba(255,255,255,0.1)",

  marginBottom: "30px",

  fontWeight: "600",
};

const heroTitle = {

  fontSize: "64px",

  lineHeight: "1.1",

  marginBottom: "25px",

  fontWeight: "800",
};

const heroText = {

  color: "#cbd5e1",

  lineHeight: "1.9",

  fontSize: "18px",

  maxWidth: "620px",
};

const features = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(200px,1fr))",

  gap: "20px",

  marginTop: "50px",
};

const featureCard = {

  background:
    "rgba(255,255,255,0.08)",

  padding: "24px",

  borderRadius: "22px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter: "blur(12px)",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.2)",
};

const rightSection = {

  width: "520px",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "40px",
};

const card = {

  width: "100%",

  background:
    "rgba(15,23,42,0.96)",

  borderRadius: "30px",

  padding: "45px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.5)",

  backdropFilter: "blur(14px)",

  color: "white",
};

const topIcon = {

  width: "75px",

  height: "75px",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "34px",

  marginBottom: "25px",
};

const cardTitle = {

  fontSize: "38px",

  marginBottom: "8px",

  fontWeight: "800",
};

const cardSubtitle = {

  color: "#94a3b8",

  marginBottom: "30px",
};

const inputBox = {

  position: "relative",

  display: "flex",

  alignItems: "center",

  marginBottom: "18px",
};

const icon = {

  position: "absolute",

  left: "16px",

  zIndex: 5,
};

const input = {

  width: "100%",

  padding: "16px 16px 16px 48px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(30,41,59,0.8)",

  color: "white",

  outline: "none",

  fontSize: "15px",

  boxSizing: "border-box",
};

const eyeBtn = {

  position: "absolute",

  right: "15px",

  border: "none",

  background: "transparent",

  cursor: "pointer",

  fontSize: "18px",
};

const select = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(30,41,59,0.8)",

  color: "white",

  outline: "none",

  fontSize: "15px",

  marginBottom: "22px",
};

const button = {

  width: "100%",

  padding: "17px",

  borderRadius: "16px",

  border: "none",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "700",

  fontSize: "17px",

  cursor: "pointer",

  transition: "0.3s",

  boxShadow:
    "0 10px 25px rgba(34,197,94,0.3)",
};

const loginText = {

  textAlign: "center",

  marginTop: "28px",

  color: "#cbd5e1",
};

const loginLink = {

  color: "#38bdf8",

  textDecoration: "none",

  fontWeight: "bold",

  marginLeft: "8px",
};