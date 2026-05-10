import {
  useState,
  useEffect
} from "react";

import axios from "axios";

export default function HelpDesk() {

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      subject: "",

      priority: "Medium",

      category: "Technical",

      message: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [tickets,
    setTickets] =
    useState([]);

  const [success,
    setSuccess] =
    useState("");

  /* =====================================================
      LOAD TICKETS
  ===================================================== */

  useEffect(() => {

    loadTickets();

  }, []);

  const loadTickets =
    async () => {

      try {

        const res =
          await axios.get(
            "https://full-stack-backend-qps4.onrender.com/helpdesk"
          );

        setTickets(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (err) {

        console.log(err);
      }
    };

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
        !name.trim() ||
        !email.trim() ||
        !subject.trim() ||
        !message.trim()
      ) {

        return alert(
          "Fill all fields ❌"
        );
      }

      try {

        setLoading(true);

        await axios.post(

          "https://full-stack-backend-qps4.onrender.com/helpdesk/add",

          {
            ...formData,

            status:
              "Open",

            created_at:
              new Date()
                .toLocaleString(),
          }
        );

        setSuccess(
          "Ticket submitted successfully ✅"
        );

        setFormData({

          name: "",

          email: "",

          subject: "",

          priority:
            "Medium",

          category:
            "Technical",

          message: "",
        });

        loadTickets();

        setTimeout(() => {

          setSuccess("");

        }, 3000);

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

      {/* BACKGROUND */}

      <div style={bgGlow1}></div>

      <div style={bgGlow2}></div>

      {/* MAIN GRID */}

      <div style={layout}>

        {/* LEFT */}

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
                AgroConnect
                Support Center
              </p>

            </div>

          </div>

          {/* SUCCESS */}

          {success && (

            <div style={successBox}>
              {success}
            </div>

          )}

          {/* FORM */}

          <div style={formGrid}>

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

          <div style={formGrid}>

            <select
              name="priority"
              value={
                formData.priority
              }
              onChange={
                handleChange
              }
              style={input}
            >

              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>

            </select>

            <select
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              style={input}
            >

              <option>
                Technical
              </option>

              <option>
                Payment
              </option>

              <option>
                Delivery
              </option>

              <option>
                Account
              </option>

            </select>

          </div>

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
                : "Submit Ticket 🚀"
            }

          </button>

        </div>

        {/* RIGHT PANEL */}

        <div style={ticketPanel}>

          <div style={ticketTop}>

            <h2>
              📨 Recent Tickets
            </h2>

            <div style={liveBadge}>
              🟢 Live
            </div>

          </div>

          <div style={ticketList}>

            {tickets.length === 0 ? (

              <div style={empty}>
                No tickets found
              </div>

            ) : (

              tickets.map((t, i) => (

                <div
                  key={i}
                  style={ticketCard}
                >

                  <div style={ticketHeader}>

                    <h3>
                      {t.subject}
                    </h3>

                    <span style={
                      ticketStatus(
                        t.status
                      )
                    }>
                      {t.status}
                    </span>

                  </div>

                  <p style={ticketText}>
                    {t.message}
                  </p>

                  <div style={ticketMeta}>

                    <span>
                      📂 {t.category}
                    </span>

                    <span>
                      ⚡ {t.priority}
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

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

  padding: "40px",

  position: "relative",

  overflow: "hidden",
};

const bgGlow1 = {

  position: "absolute",

  width: "400px",

  height: "400px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  filter: "blur(140px)",

  top: "-120px",

  left: "-120px",
};

const bgGlow2 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.15)",

  filter: "blur(140px)",

  bottom: "-120px",

  right: "-120px",
};

const layout = {

  display: "grid",

  gridTemplateColumns:
    "1.2fr 0.8fr",

  gap: "28px",

  position: "relative",

  zIndex: 2,
};

const card = {

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

  fontSize: "46px",

  margin: 0,

  color: "white",

  fontWeight: "800",
};

const sub = {

  marginTop: "6px",

  color: "#94a3b8",

  fontSize: "16px",
};

const successBox = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  padding: "16px",

  borderRadius: "16px",

  marginBottom: "20px",

  border:
    "1px solid rgba(34,197,94,0.3)",
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

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.35)",
};

const loadingBtn = {

  ...btn,

  opacity: 0.7,

  cursor: "not-allowed",
};

const ticketPanel = {

  background:
    "rgba(15,23,42,0.78)",

  backdropFilter:
    "blur(20px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "30px",

  padding: "30px",

  color: "white",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45)",

  height: "fit-content",
};

const ticketTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "25px",
};

const liveBadge = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#22c55e",

  padding: "10px 16px",

  borderRadius: "14px",

  fontSize: "13px",

  fontWeight: "bold",
};

const ticketList = {

  display: "grid",

  gap: "18px",
};

const ticketCard = {

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "22px",

  padding: "20px",
};

const ticketHeader = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "10px",

  marginBottom: "10px",
};

const ticketText = {

  color: "#cbd5e1",

  lineHeight: "1.7",

  marginBottom: "15px",
};

const ticketMeta = {

  display: "flex",

  gap: "18px",

  color: "#94a3b8",

  fontSize: "14px",
};

const empty = {

  padding: "30px",

  textAlign: "center",

  color: "#94a3b8",
};

const ticketStatus = (s) => ({

  padding: "6px 14px",

  borderRadius: "20px",

  fontSize: "12px",

  fontWeight: "bold",

  background:
    s === "Closed"
      ? "#22c55e"
      : s === "Pending"
      ? "#f59e0b"
      : "#3b82f6",
});