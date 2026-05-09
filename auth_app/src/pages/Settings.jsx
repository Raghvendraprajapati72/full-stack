/* =====================================================
   src/pages/Settings.jsx
===================================================== */

import { useState } from "react";

export default function Settings() {

  const [darkMode,
    setDarkMode] =
    useState(true);

  const [notifications,
    setNotifications] =
    useState(true);

  const saveSettings = () => {

    alert(
      "Settings Saved ✅"
    );
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          ⚙️ Settings
        </h1>

        <div style={settingItem}>

          <span>
            🌙 Dark Mode
          </span>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(
                !darkMode
              )
            }
          />

        </div>

        <div style={settingItem}>

          <span>
            🔔 Notifications
          </span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(
                !notifications
              )
            }
          />

        </div>

        <button
          onClick={saveSettings}
          style={btn}
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "450px",
  background: "#1e293b",
  padding: "35px",
  borderRadius: "22px",
  color: "white",
};

const title = {
  fontSize: "36px",
  marginBottom: "25px",
};

const settingItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "25px",
  fontSize: "18px",
};

const btn = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "14px",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};