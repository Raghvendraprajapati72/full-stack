import { useState } from "react";

import axios from "axios";

import API from "../config";

import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loginAdmin = async () => {

    if (!email || !password) {

      return alert(
        "Fill all fields ❌"
      );
    }

    try {

      setLoading(true);

      const res = await axios.post(

        `${API}/auth/login`,

        {
          email:
            email.trim().toLowerCase(),

          password,

          portal: "admin",
        }
      );

      if (!res.data.success) {

        setLoading(false);

        return alert(
          res.data.msg
        );
      }

      const user =
        res.data.user;

      if (
        user.role !== "admin"
      ) {

        setLoading(false);

        return alert(
          "Only admin can login here ❌"
        );
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert(
        "Admin Login Successful ✅"
      );

      navigate("/admin");

    } catch (err) {

      console.log(err);

      alert(

        err.response?.data?.msg ||

        "Login failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          👑 Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
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
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={input}
        />

        <button
          onClick={loginAdmin}
          style={button}
        >

          {
            loading
              ? "Logging..."
              : "Admin Login"
          }

        </button>

      </div>

    </div>
  );
}

const container = {

  minHeight: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",
};

const card = {

  width: "400px",

  padding: "40px",

  borderRadius: "20px",

  background:
    "rgba(15,23,42,0.95)",

  display: "flex",

  flexDirection: "column",

  gap: "20px",
};

const title = {

  color: "white",

  textAlign: "center",
};

const input = {

  padding: "16px",

  borderRadius: "12px",

  border: "none",

  outline: "none",
};

const button = {

  padding: "16px",

  border: "none",

  borderRadius: "12px",

  background:
    "#22c55e",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};