import { useState } from "react";
import axios from "axios";

export default function HelpDesk() {

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      subject: "",

      message: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  /* =====================================================
      HANDLE INPUT
  ===================================================== */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  /* =====================================================
      SUBMIT TICKET
  ===================================================== */

  const sendTicket =
    async () => {

      const {
        name,
        email,
        subject,
        message,
      } = formData;

      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        await axios.post(

          "http://localhost:5000/helpdesk/add",

          formData
        );

        alert(
          "Ticket submitted successfully ✅"
        );

        setFormData({

          name: "",

          email: "",

          subject: "",

          message: "",
        });

      } catch (err) {

        console.log(err);

        alert(
          "Failed to submit ticket ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      UI
  ===================================================== */

  return (

    <div style={container}>

      {/* BACKGROUND BLUR */}
      <div style={bgGlow1}></div>

      <div style={bgGlow2}></div>

      {/* CARD */}
      <div style={card}>

        {/* TOP */}
        <div style={top}>

          <div style={iconBox}>
            🎧
          </div>

          <div>

            <h1 style={heading}>
              Help Desk
            </h1>

            <p style={sub}>
              Contact AgroConnect
              support team
            </p>

          </div>

        </div>

        {/* FORM */}
        <div style={formGrid}>

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            style={input}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            style={input}
          />

        </div>

        {/* SUBJECT */}
        <input
          type="text"
          name="subject"
          placeholder="Issue Subject"
          value={
            formData.subject
          }
          onChange={
            handleChange
          }
          style={inputFull}
        />

        {/* MESSAGE */}
        <textarea
          name="message"
          placeholder="Describe your issue..."
          value={
            formData.message
          }
          onChange={
            handleChange
          }
          style={textarea}
        />

        {/* BUTTON */}
        <button
          onClick={
            sendTicket
          }
          style={
            loading
              ? loadingBtn
              : btn
          }
        >

          {
            loading
              ? "Submitting..."
              : "Submit Ticket"
          }

        </button>

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
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "30px",

  position: "relative",

  overflow: "hidden",
};

const bgGlow1 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  filter: "blur(120px)",

  top: "-80px",

  left: "-100px",
};

const bgGlow2 = {

  position: "absolute",

  width: "300px",

  height: "300px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.15)",

  filter: "blur(120px)",

  bottom: "-80px",

  right: "-100px",
};

const card = {

  width: "100%",

  maxWidth: "820px",

  background:
    "rgba(15,23,42,0.78)",

  backdropFilter:
    "blur(20px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "30px",

  padding: "40px",

  color: "white",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45)",

  position: "relative",

  zIndex: 2,
};

const top = {

  display: "flex",

  alignItems: "center",

  gap: "20px",

  marginBottom: "35px",
};

const iconBox = {

  width: "70px",

  height: "70px",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "32px",

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.35)",
};

const heading = {

  fontSize: "42px",

  margin: 0,

  fontWeight: "800",
};

const sub = {

  marginTop: "6px",

  color: "#94a3b8",

  fontSize: "16px",
};

const formGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "18px",

  marginBottom: "18px",
};

const input = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",

  outline: "none",

  fontSize: "15px",
};

const inputFull = {

  ...input,

  marginBottom: "18px",
};

const textarea = {

  width: "100%",

  minHeight: "220px",

  borderRadius: "20px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",

  padding: "18px",

  fontSize: "16px",

  resize: "none",

  outline: "none",
};

const btn = {

  marginTop: "25px",

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontSize: "18px",

  fontWeight: "700",

  cursor: "pointer",

  transition: "0.3s",

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.35)",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};