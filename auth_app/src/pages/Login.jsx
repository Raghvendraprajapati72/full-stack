import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  // ================= STATES =================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= LOGIN =================

  const loginUser = async () => {

    try {

      setLoading(true);

      const formattedEmail =
        email.trim().toLowerCase();

      const res = await axios.post(

        "https://backend-api-onp4.onrender.com/auth/login",

        {
          email: formattedEmail,
          password,
        }
      );

      if (!res.data.success) {

        setLoading(false);

        return alert(
          res.data.msg ||
            "Login Failed ❌"
        );
      }

      const user = res.data.user;

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert(
        "Login successful ✅"
      );

      setLoading(false);

      // REDIRECT
      if (user.role === "admin") {

        navigate("/admin");

      } else if (
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
        err.response?.data?.msg ||
          "Login failed ❌"
      );
    }
  };

  // ================= UI =================

  return (
    <div style={container}>

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

        <input
          type="password"
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
          onClick={loginUser}
          style={btn}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
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
  );
}

/* ======================================
                STYLES
====================================== */

const container = {
  width: "100%",
  height: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  padding: "20px",
  boxSizing: "border-box",
};

const card = {
  width: "100%",
  maxWidth: "420px",

  background:
    "rgba(30,41,59,0.95)",

  backdropFilter: "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "24px",

  padding: "45px",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.4)",

  color: "white",
};

const logo = {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "38px",
};

const logoGreen = {
  color: "#22c55e",
};

const title = {
  textAlign: "center",
  fontSize: "34px",
  marginBottom: "10px",
};

const subtitle = {
  textAlign: "center",
  color: "#cbd5e1",
  marginBottom: "30px",
  fontSize: "15px",
};

const input = {
  width: "100%",

  padding: "16px",

  marginBottom: "18px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  outline: "none",

  background: "#f8fafc",

  fontSize: "15px",

  boxSizing: "border-box",
};

const btn = {
  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  fontSize: "16px",

  cursor: "pointer",

  marginTop: "5px",
};

const text = {
  marginTop: "25px",
  textAlign: "center",
  color: "#cbd5e1",
};

const link = {
  color: "#22c55e",
  fontWeight: "bold",
  textDecoration: "none",
};