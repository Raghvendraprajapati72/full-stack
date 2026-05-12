import { useState } from "react";

import API from "../config";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

export default function Login() {

  const navigate =
    useNavigate();

  /* =====================================================
      STATES
  ===================================================== */

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  /* =====================================================
      LOGIN
  ===================================================== */

  const loginUser =
    async () => {

      if (
        !email.trim() ||
        !password.trim()
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        const formattedEmail =
          email.trim().toLowerCase();

        const res =
          await axios.post(

          `${API}/auth/login`,

            {
              email:
                formattedEmail,

              password,
            }
          );

        if (
          !res.data.success
        ) {

          setLoading(false);

          return alert(

            res.data.msg ||
            "Login Failed ❌"
          );
        }

        const user =
          res.data.user;

        /* SAVE TOKEN */

        localStorage.setItem(
          "token",
          res.data.token
        );

        /* SAVE USER */

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        alert(
          "Login successful ✅"
        );

        setLoading(false);

        /* BLOCK ADMIN FROM NORMAL LOGIN */

if (
  user.role === "admin"
) {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  setLoading(false);

  return alert(
    "Admin login allowed only from Admin Portal ❌"
  );
}

/* REDIRECT */

if (
  user.role === "farmer"
) {

  navigate("/farmer");

} else {

  navigate("/consumer");
}
      } catch (err) {

        setLoading(false);

        console.log(err);

        alert(

          err.response
            ?.data?.msg ||

          "Login failed ❌"
        );
      }
    };

  /* =====================================================
      UI
  ===================================================== */

  return (

    <div style={container}>

      {/* GLOW EFFECTS */}

      <div style={glow1}></div>

      <div style={glow2}></div>

      {/* LEFT SIDE */}

      <div style={leftSection}>

        <div style={heroContent}>

          <div style={badge}>
            🌱 India's Smart Farming Platform
          </div>

          <h1 style={heroTitle}>

            Welcome Back To
            AgroConnect

          </h1>

          <p style={heroText}>

            Connect directly with
            trusted farmers, buy fresh
            products, manage orders,
            and grow your agriculture
            business smarter.

          </p>

          {/* STATS */}

          <div style={statsGrid}>

            <div style={statCard}>

              <h2>
                15K+
              </h2>

              <p>
                Farmers
              </p>

            </div>

            <div style={statCard}>

              <h2>
                25K+
              </h2>

              <p>
                Customers
              </p>

            </div>

            <div style={statCard}>

              <h2>
                24/7
              </h2>

              <p>
                Support
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div style={rightSection}>

        <div style={card}>

          {/* LOGO */}

          <h1 style={logo}>

            🌾 Agro
            <span style={logoGreen}>
              Connect
            </span>

          </h1>

          {/* TITLE */}

          <h2 style={title}>
            🔐 Login
          </h2>

          <p style={subtitle}>
            Login with Email & Password
          </p>

          {/* EMAIL */}

          <div style={inputBox}>

            <span style={icon}>
              📧
            </span>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
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
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={input}
            />

            <button
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={eyeBtn}
            >

              {
                showPassword
                  ? "🙈"
                  : "👁"
              }

            </button>

          </div>

          {/* FORGOT */}

          <div style={forgotBox}>

            <Link
              to="/forgot"
              style={forgotLink}
            >
              Forgot Password?
            </Link>

          </div>

          {/* BUTTON */}

          <button
            onClick={loginUser}
            style={
              loading
                ? loadingBtn
                : btn
            }
            disabled={loading}
          >

            {
              loading
                ? "Logging in..."
                : "Login 🚀"
            }

          </button>

          {/* REGISTER */}

          <p style={text}>

            Don't have account?{" "}

            <Link
              to="/register"
              style={link}
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const container = {

  width: "100%",

  minHeight: "100vh",

  display: "grid",

  gridTemplateColumns:
    "1fr 1fr",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  position: "relative",

  overflow: "hidden",
};

const glow1 = {

  position: "absolute",

  width: "400px",

  height: "400px",

  background:
    "rgba(34,197,94,0.18)",

  borderRadius: "50%",

  filter: "blur(120px)",

  top: "-100px",

  left: "-100px",
};

const glow2 = {

  position: "absolute",

  width: "400px",

  height: "400px",

  background:
    "rgba(59,130,246,0.18)",

  borderRadius: "50%",

  filter: "blur(120px)",

  bottom: "-100px",

  right: "-100px",
};

const leftSection = {

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  padding: "60px",

  position: "relative",

  zIndex: 2,
};

const heroContent = {

  maxWidth: "600px",

  color: "white",
};

const badge = {

  display: "inline-block",

  padding: "12px 20px",

  borderRadius: "30px",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter: "blur(12px)",

  marginBottom: "25px",

  color: "#d1fae5",

  fontWeight: "600",
};

const heroTitle = {

  fontSize: "72px",

  lineHeight: "1.1",

  marginBottom: "25px",

  fontWeight: "800",
};

const heroText = {

  color: "#cbd5e1",

  fontSize: "18px",

  lineHeight: "1.9",

  marginBottom: "45px",
};

const statsGrid = {

  display: "flex",

  gap: "20px",

  flexWrap: "wrap",
};

const statCard = {

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(14px)",

  padding: "24px",

  borderRadius: "22px",

  minWidth: "150px",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const rightSection = {

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "40px",

  position: "relative",

  zIndex: 2,
};

const card = {

  width: "100%",

  maxWidth: "460px",

  background:
    "rgba(15,23,42,0.82)",

  backdropFilter:
    "blur(18px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "32px",

  padding: "45px",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45)",

  color: "white",
};

const logo = {

  textAlign: "center",

  marginBottom: "12px",

  fontSize: "42px",

  fontWeight: "800",
};

const logoGreen = {

  color: "#22c55e",
};

const title = {

  textAlign: "center",

  fontSize: "36px",

  marginBottom: "10px",

  fontWeight: "700",
};

const subtitle = {

  textAlign: "center",

  color: "#cbd5e1",

  marginBottom: "32px",

  fontSize: "15px",
};

const inputBox = {

  display: "flex",

  alignItems: "center",

  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "18px",

  padding: "0 16px",

  marginBottom: "20px",
};

const icon = {

  fontSize: "18px",

  marginRight: "10px",
};

const input = {

  flex: 1,

  padding: "18px 0",

  border: "none",

  outline: "none",

  background: "transparent",

  color: "white",

  fontSize: "15px",
};

const eyeBtn = {

  background: "none",

  border: "none",

  color: "white",

  cursor: "pointer",

  fontSize: "18px",
};

const forgotBox = {

  display: "flex",

  justifyContent: "flex-end",

  marginBottom: "22px",
};

const forgotLink = {

  color: "#22c55e",

  textDecoration: "none",

  fontWeight: "600",

  fontSize: "14px",
};

const btn = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "700",

  fontSize: "17px",

  cursor: "pointer",

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.35)",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};

const text = {

  marginTop: "28px",

  textAlign: "center",

  color: "#cbd5e1",
};

const link = {

  color: "#22c55e",

  fontWeight: "700",

  textDecoration: "none",
};