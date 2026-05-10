/* =====================================================
   src/pages/Settings.jsx
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function Settings() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const API =
    "https://backend-api-onp4.onrender.com";

  /* =====================================================
     STATES
  ===================================================== */

  const [loading,
    setLoading] =
    useState(true);

  const [saving,
    setSaving] =
    useState(false);

  const [settings,
    setSettings] =
    useState({

      darkMode: true,

      notifications: true,

      emailAlerts: true,

      orderUpdates: true,

      deliveryAlerts: true,

      autoPlayVideos: false,

      language: "English",

      currency: "INR",

      privacy: "Public",
    });

  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings =
    async () => {

      try {

        const res =
          await axios.get(
            `${API}/settings/${user?.id}`
          );

        if (res.data) {

          setSettings({

            ...settings,

            ...res.data,
          });
        }

      } catch (err) {

        console.log(
          "No saved settings"
        );

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleToggle =
    (field) => {

      setSettings({

        ...settings,

        [field]:
          !settings[field],
      });
    };

  const handleInput =
    (field, value) => {

      setSettings({

        ...settings,

        [field]: value,
      });
    };

  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  const saveSettings =
    async () => {

      try {

        setSaving(true);

        await axios.post(

          `${API}/settings/save`,

          {
            userId:
              user?.id,

            ...settings,
          }
        );

        localStorage.setItem(

          "app_settings",

          JSON.stringify(
            settings
          )
        );

        alert(
          "Settings Saved Successfully ✅"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Save Failed ❌"
        );

      } finally {

        setSaving(false);
      }
    };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div style={loadingContainer}>

        <div style={loader}></div>

        <h2>
          Loading Settings...
        </h2>

      </div>
    );
  }

  return (

    <div style={container}>

      {/* HEADER */}

      <div style={header}>

        <div>

          <h1 style={title}>
            ⚙️ Smart Settings
          </h1>

          <p style={subtitle}>

            Manage your AgroConnect
            account preferences,
            notifications, privacy,
            appearance and security.

          </p>

        </div>

        <button
          style={saveTopBtn}
          onClick={saveSettings}
        >

          {saving
            ? "Saving..."
            : "💾 Save"}

        </button>

      </div>

      {/* PROFILE CARD */}

      <div style={profileCard}>

        <div style={avatar}>
          👤
        </div>

        <div>

          <h2 style={profileName}>
            {user?.name ||
              "User"}
          </h2>

          <p style={profileRole}>
            {user?.role ||
              "Consumer"}
          </p>

        </div>

      </div>

      {/* SETTINGS GRID */}

      <div style={grid}>

        {/* APPEARANCE */}

        <div style={card}>

          <h2 style={sectionTitle}>
            🎨 Appearance
          </h2>

          <div style={settingItem}>

            <div>

              <h3 style={label}>
                Dark Mode
              </h3>

              <p style={smallText}>
                Enable dark theme
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.darkMode
              }
              onChange={() =>
                handleToggle(
                  "darkMode"
                )
              }
            />

          </div>

          <div style={settingItem}>

            <div>

              <h3 style={label}>
                Auto Play Videos
              </h3>

              <p style={smallText}>
                Play videos automatically
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.autoPlayVideos
              }
              onChange={() =>
                handleToggle(
                  "autoPlayVideos"
                )
              }
            />

          </div>

          <div style={selectBox}>

            <label style={label}>
              🌍 Language
            </label>

            <select
              value={
                settings.language
              }
              onChange={(e) =>
                handleInput(
                  "language",
                  e.target.value
                )
              }
              style={select}
            >

              <option>
                English
              </option>

              <option>
                Hindi
              </option>

            </select>

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <div style={card}>

          <h2 style={sectionTitle}>
            🔔 Notifications
          </h2>

          <div style={settingItem}>

            <div>

              <h3 style={label}>
                Notifications
              </h3>

              <p style={smallText}>
                Enable app notifications
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.notifications
              }
              onChange={() =>
                handleToggle(
                  "notifications"
                )
              }
            />

          </div>

          <div style={settingItem}>

            <div>

              <h3 style={label}>
                Email Alerts
              </h3>

              <p style={smallText}>
                Receive email updates
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.emailAlerts
              }
              onChange={() =>
                handleToggle(
                  "emailAlerts"
                )
              }
            />

          </div>

          <div style={settingItem}>

            <div>

              <h3 style={label}>
                Order Updates
              </h3>

              <p style={smallText}>
                Get order status updates
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.orderUpdates
              }
              onChange={() =>
                handleToggle(
                  "orderUpdates"
                )
              }
            />

          </div>

          <div style={settingItem}>

            <div>

              <h3 style={label}>
                Delivery Alerts
              </h3>

              <p style={smallText}>
                Delivery notifications
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.deliveryAlerts
              }
              onChange={() =>
                handleToggle(
                  "deliveryAlerts"
                )
              }
            />

          </div>

        </div>

        {/* PRIVACY */}

        <div style={card}>

          <h2 style={sectionTitle}>
            🔐 Privacy
          </h2>

          <div style={selectBox}>

            <label style={label}>
              Profile Visibility
            </label>

            <select
              value={
                settings.privacy
              }
              onChange={(e) =>
                handleInput(
                  "privacy",
                  e.target.value
                )
              }
              style={select}
            >

              <option>
                Public
              </option>

              <option>
                Private
              </option>

            </select>

          </div>

          <div style={selectBox}>

            <label style={label}>
              💰 Currency
            </label>

            <select
              value={
                settings.currency
              }
              onChange={(e) =>
                handleInput(
                  "currency",
                  e.target.value
                )
              }
              style={select}
            >

              <option>
                INR
              </option>

              <option>
                USD
              </option>

            </select>

          </div>

          <button
            style={dangerBtn}
          >
            Delete Account
          </button>

        </div>

      </div>

      {/* SAVE BUTTON */}

      <button
        style={saveBtn}
        onClick={saveSettings}
      >

        {saving
          ? "Saving Settings..."
          : "Save All Settings ✅"}

      </button>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const container = {

  minHeight: "100vh",

  padding: "40px",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  color: "white",
};

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "20px",

  marginBottom: "35px",
};

const title = {

  fontSize: "52px",

  fontWeight: "800",

  marginBottom: "10px",
};

const subtitle = {

  color: "#94a3b8",

  maxWidth: "700px",

  lineHeight: "1.7",
};

const saveTopBtn = {

  padding: "16px 26px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "16px",
};

const profileCard = {

  background:
    "rgba(30,41,59,0.95)",

  padding: "30px",

  borderRadius: "28px",

  display: "flex",

  alignItems: "center",

  gap: "20px",

  marginBottom: "35px",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const avatar = {

  width: "90px",

  height: "90px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "40px",
};

const profileName = {

  fontSize: "30px",

  marginBottom: "8px",
};

const profileRole = {

  color: "#94a3b8",

  textTransform:
    "capitalize",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(350px,1fr))",

  gap: "30px",
};

const card = {

  background:
    "rgba(30,41,59,0.95)",

  padding: "30px",

  borderRadius: "28px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 20px 40px rgba(0,0,0,0.2)",
};

const sectionTitle = {

  fontSize: "28px",

  marginBottom: "25px",
};

const settingItem = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "25px",
};

const label = {

  fontSize: "18px",

  fontWeight: "600",
};

const smallText = {

  color: "#94a3b8",

  marginTop: "6px",

  fontSize: "14px",
};

const selectBox = {

  marginBottom: "25px",
};

const select = {

  width: "100%",

  marginTop: "12px",

  padding: "14px",

  borderRadius: "14px",

  border: "none",

  background: "#0f172a",

  color: "white",

  fontSize: "15px",
};

const saveBtn = {

  marginTop: "40px",

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontSize: "18px",

  fontWeight: "bold",

  cursor: "pointer",

  boxShadow:
    "0 15px 35px rgba(34,197,94,0.25)",
};

const dangerBtn = {

  marginTop: "20px",

  width: "100%",

  padding: "15px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const loadingContainer = {

  minHeight: "100vh",

  background: "#020617",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  alignItems: "center",

  color: "white",
};

const loader = {

  width: "60px",

  height: "60px",

  border:
    "6px solid rgba(255,255,255,0.1)",

  borderTop:
    "6px solid #22c55e",

  borderRadius: "50%",

  animation:
    "spin 1s linear infinite",

  marginBottom: "20px",
};