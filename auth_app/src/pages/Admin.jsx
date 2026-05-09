import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout
from "../components/AdminLayout";

export default function Admin() {

  const [users, setUsers] =
    useState([]);

  const [videos, setVideos] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  useEffect(() => {

    loadUsers();
    loadVideos();

  }, []);

  const loadUsers = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/auth/users"
        );

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const loadVideos = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/videos"
        );

      setVideos(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/auth/users/${id}`
      );

      loadUsers();

    } catch {

      alert("Delete failed ❌");

    }
  };

  const filteredUsers =
    users
      .filter((u) =>
        u.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )
      .filter((u) =>
        roleFilter === "all"
          ? true
          : u.role === roleFilter
      );

  return (

    <AdminLayout>

      {/* TOP */}

      <div style={topBar}>

        <div>

          <h1 style={title}>
            👑 Admin Dashboard
          </h1>

          <p style={sub}>
            Manage platform analytics
          </p>

        </div>

      </div>

      {/* STATS */}

      <div style={statsGrid}>

        <div style={card}>
          <h2>👥</h2>
          <h1>{users.length}</h1>
          <p>Total Users</p>
        </div>

        <div style={card}>
          <h2>🎥</h2>
          <h1>{videos.length}</h1>
          <p>Videos</p>
        </div>

        <div style={card}>
          <h2>🌾</h2>
          <h1>
            {
              users.filter(
                (u) =>
                  u.role === "farmer"
              ).length
            }
          </h1>
          <p>Farmers</p>
        </div>

        <div style={card}>
          <h2>🛒</h2>
          <h1>
            {
              users.filter(
                (u) =>
                  u.role === "consumer"
              ).length
            }
          </h1>
          <p>Consumers</p>
        </div>

      </div>

      {/* USERS */}

      <div style={section}>

        <div style={header}>

          <h2>
            👥 Manage Users
          </h2>

          <div style={filters}>

            <input
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={input}
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
              style={select}
            >

              <option value="all">
                All
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="farmer">
                Farmer
              </option>

              <option value="consumer">
                Consumer
              </option>

            </select>

          </div>

        </div>

        <table style={table}>

          <thead>

            <tr>

              <th style={th}>
                Name
              </th>

              <th style={th}>
                Email
              </th>

              <th style={th}>
                Role
              </th>

              <th style={th}>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map(
              (u) => (

                <tr key={u.id}>

                  <td style={td}>
                    {u.name}
                  </td>

                  <td style={td}>
                    {u.email}
                  </td>

                  <td style={td}>
                    {u.role}
                  </td>

                  <td style={td}>

                    <button
                      style={deleteBtn}
                      onClick={() =>
                        deleteUser(
                          u.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

/* ================= STYLES ================= */

const topBar = {
  marginBottom: "30px",
};

const title = {
  fontSize: "42px",
  color: "white",
};

const sub = {
  color: "#94a3b8",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const card = {
  background:
    "linear-gradient(145deg,#1e293b,#0f172a)",
  padding: "30px",
  borderRadius: "22px",
  color: "white",
  textAlign: "center",
};

const section = {
  marginTop: "35px",
  background:
    "#0f172a",
  padding: "25px",
  borderRadius: "22px",
};

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const filters = {
  display: "flex",
  gap: "10px",
};

const input = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
};

const select = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  color: "white",
};

const th = {
  padding: "15px",
  textAlign: "left",
};

const td = {
  padding: "15px",
  borderTop:
    "1px solid rgba(255,255,255,0.05)",
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};