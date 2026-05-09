import {
  Navigate,
  useLocation,
} from "react-router-dom";

export default function ProtectedRoute({

  children,

  allowedRoles = [],

}) {

  const location =
    useLocation();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* =========================
     USER NOT FOUND
  ========================= */

  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />

    );
  }

  /* =========================
     ROLE SECURITY
  ========================= */

  if (

    allowedRoles.length > 0 &&

    !allowedRoles.includes(
      user.role
    )

  ) {

    return (

      <div style={forbiddenContainer}>

        <div style={forbiddenCard}>

          <h1 style={forbiddenTitle}>
            🚫 Access Denied
          </h1>

          <p style={forbiddenText}>

            You don't have
            permission
            to access this page.

          </p>

          <button
            style={homeBtn}
            onClick={() =>
              window.location.href =
                "/"
            }
          >
            Go Home
          </button>

        </div>

      </div>
    );
  }

  /* =========================
     SUCCESS
  ========================= */

  return children;
}

/* =========================
   STYLES
========================= */

const forbiddenContainer = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "20px",
};

const forbiddenCard = {

  background:
    "rgba(255,255,255,0.05)",

  padding: "50px",

  borderRadius: "24px",

  textAlign: "center",

  backdropFilter: "blur(10px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  color: "white",

  maxWidth: "450px",

  width: "100%",
};

const forbiddenTitle = {

  fontSize: "40px",

  marginBottom: "20px",
};

const forbiddenText = {

  color: "#cbd5e1",

  fontSize: "18px",

  marginBottom: "30px",
};

const homeBtn = {

  padding: "14px 28px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "16px",
};