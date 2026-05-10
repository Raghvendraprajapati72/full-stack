import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {

  const [loading,
    setLoading] =
    useState(true);

  const [stats,
    setStats] =
    useState({

      totalUsers: 0,

      totalFarmers: 0,

      totalConsumers: 0,

      totalProducts: 0,

      totalOrders: 0,

      totalRevenue: 0,
    });

  const [orders,
    setOrders] =
    useState([]);

  const [topProducts,
    setTopProducts] =
    useState([]);

  const API =
    "https://backend-api-onp4.onrender.com";

  /* =========================================
     LOAD REPORTS
  ========================================= */

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports =
    async () => {

      try {

        setLoading(true);

        const [

          usersRes,

          productsRes,

          ordersRes,

        ] = await Promise.all([

          axios.get(
            `${API}/auth/users`
          ),

          axios.get(
            `${API}/products`
          ),

          axios.get(
            `${API}/orders`
          ),

        ]);

        const users =
          Array.isArray(
            usersRes.data
          )

            ? usersRes.data

            : usersRes.data.data ||
              [];

        const products =
          Array.isArray(
            productsRes.data
          )

            ? productsRes.data

            : productsRes.data.data ||
              [];

        const orderData =
          Array.isArray(
            ordersRes.data
          )

            ? ordersRes.data

            : ordersRes.data.data ||
              [];

        /* =========================
           TOTAL REVENUE
        ========================= */

        const revenue =
          orderData.reduce(

            (acc, item) =>

              acc +
              Number(
                item.total ||
                  item.price ||
                  0
              ),

            0
          );

        /* =========================
           TOP PRODUCTS
        ========================= */

        const sortedProducts =
          [...products]

            .sort(

              (a, b) =>

                Number(
                  b.sales || 0
                ) -

                Number(
                  a.sales || 0
                )
            )

            .slice(0, 5);

        setTopProducts(
          sortedProducts
        );

        setOrders(orderData);

        setStats({

          totalUsers:
            users.length,

          totalFarmers:
            users.filter(
              (u) =>
                u.role ===
                "farmer"
            ).length,

          totalConsumers:
            users.filter(
              (u) =>
                u.role ===
                "consumer"
            ).length,

          totalProducts:
            products.length,

          totalOrders:
            orderData.length,

          totalRevenue:
            revenue,
        });

      } catch (err) {

        console.log(err);

        alert(
          "Failed to load reports ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div style={loadingContainer}>

        <div style={loader}></div>

        <h2>
          Loading Reports...
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
            📈 Analytics Reports
          </h1>

          <p style={subtitle}>
            Real-time platform analytics
            and business insights
          </p>

        </div>

        <button
          style={refreshBtn}
          onClick={loadReports}
        >
          🔄 Refresh Data
        </button>

      </div>

      {/* STATS */}

      <div style={statsGrid}>

        <div style={statCard}>

          <div style={icon}>
            👥
          </div>

          <h2>
            {stats.totalUsers}
          </h2>

          <p>
            Total Users
          </p>

        </div>

        <div style={statCard}>

          <div style={icon}>
            🌾
          </div>

          <h2>
            {stats.totalFarmers}
          </h2>

          <p>
            Farmers
          </p>

        </div>

        <div style={statCard}>

          <div style={icon}>
            🛒
          </div>

          <h2>
            {stats.totalConsumers}
          </h2>

          <p>
            Consumers
          </p>

        </div>

        <div style={statCard}>

          <div style={icon}>
            📦
          </div>

          <h2>
            {stats.totalProducts}
          </h2>

          <p>
            Products
          </p>

        </div>

        <div style={statCard}>

          <div style={icon}>
            🚚
          </div>

          <h2>
            {stats.totalOrders}
          </h2>

          <p>
            Orders
          </p>

        </div>

        <div style={revenueCard}>

          <div style={icon}>
            💰
          </div>

          <h2>
            ₹{stats.totalRevenue}
          </h2>

          <p>
            Total Revenue
          </p>

        </div>

      </div>

      {/* CHART SECTION */}

      <div style={chartSection}>

        <div style={chartCard}>

          <h2 style={chartTitle}>
            📊 Platform Growth
          </h2>

          <div style={barContainer}>

            <div style={barBox}>

              <div
                style={{
                  ...bar,
                  height:
                    `${stats.totalFarmers * 8}px`,
                  background:
                    "linear-gradient(180deg,#22c55e,#15803d)",
                }}
              ></div>

              <span>
                Farmers
              </span>

            </div>

            <div style={barBox}>

              <div
                style={{
                  ...bar,
                  height:
                    `${stats.totalConsumers * 4}px`,
                  background:
                    "linear-gradient(180deg,#3b82f6,#1d4ed8)",
                }}
              ></div>

              <span>
                Consumers
              </span>

            </div>

            <div style={barBox}>

              <div
                style={{
                  ...bar,
                  height:
                    `${stats.totalProducts * 5}px`,
                  background:
                    "linear-gradient(180deg,#f59e0b,#d97706)",
                }}
              ></div>

              <span>
                Products
              </span>

            </div>

            <div style={barBox}>

              <div
                style={{
                  ...bar,
                  height:
                    `${stats.totalOrders * 5}px`,
                  background:
                    "linear-gradient(180deg,#ef4444,#b91c1c)",
                }}
              ></div>

              <span>
                Orders
              </span>

            </div>

          </div>

        </div>

        {/* TOP PRODUCTS */}

        <div style={topCard}>

          <h2 style={chartTitle}>
            🔥 Top Products
          </h2>

          {topProducts.length === 0 ? (

            <p style={empty}>
              No product data available
            </p>

          ) : (

            topProducts.map((p) => (

              <div
                key={p.id}
                style={productRow}
              >

                <div>

                  <h3 style={productName}>
                    {p.name}
                  </h3>

                  <p style={productText}>
                    ₹{p.price}
                  </p>

                </div>

                <div style={salesBadge}>
                  {p.sales || 0}
                  {" "}Sales
                </div>

              </div>
            ))
          )}

        </div>

      </div>

      {/* ORDERS TABLE */}

      <div style={tableCard}>

        <h2 style={tableTitle}>
          📋 Recent Orders
        </h2>

        <div style={tableWrapper}>

          <table style={table}>

            <thead>

              <tr>

                <th style={th}>
                  Customer
                </th>

                <th style={th}>
                  Product
                </th>

                <th style={th}>
                  Amount
                </th>

                <th style={th}>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    style={emptyCell}
                  >
                    No orders available
                  </td>

                </tr>

              ) : (

                orders.slice(0, 10)
                  .map((o, i) => (

                    <tr
                      key={i}
                    >

                      <td style={td}>
                        {o.customer_name ||
                          "Customer"}
                      </td>

                      <td style={td}>
                        {o.product_name ||
                          "Product"}
                      </td>

                      <td style={td}>
                        ₹
                        {o.total ||
                          o.price ||
                          0}
                      </td>

                      <td style={td}>

                        <span
                          style={{
                            ...status,

                            background:
                              o.status ===
                              "Delivered"

                                ? "#22c55e"

                                : "#f59e0b",
                          }}
                        >
                          {o.status ||
                            "Pending"}
                        </span>

                      </td>

                    </tr>
                  ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* =========================================
   STYLES
========================================= */

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  color: "white",

  padding: "40px",
};

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  marginBottom: "40px",
};

const title = {

  fontSize: "48px",

  marginBottom: "10px",

  fontWeight: "800",
};

const subtitle = {

  color: "#94a3b8",

  fontSize: "18px",
};

const refreshBtn = {

  padding: "14px 24px",

  borderRadius: "14px",

  border: "none",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const statsGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "25px",

  marginBottom: "40px",
};

const statCard = {

  background:
    "rgba(30,41,59,0.95)",

  padding: "28px",

  borderRadius: "24px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.3)",
};

const revenueCard = {

  background:
    "linear-gradient(135deg,#16a34a,#166534)",

  padding: "28px",

  borderRadius: "24px",

  boxShadow:
    "0 10px 40px rgba(34,197,94,0.35)",
};

const icon = {

  fontSize: "40px",

  marginBottom: "15px",
};

const chartSection = {

  display: "grid",

  gridTemplateColumns:
    "1.5fr 1fr",

  gap: "25px",

  marginBottom: "40px",
};

const chartCard = {

  background:
    "rgba(30,41,59,0.95)",

  borderRadius: "24px",

  padding: "30px",
};

const chartTitle = {

  marginBottom: "30px",

  fontSize: "28px",
};

const barContainer = {

  height: "320px",

  display: "flex",

  alignItems: "flex-end",

  justifyContent:
    "space-around",
};

const barBox = {

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  gap: "12px",
};

const bar = {

  width: "70px",

  borderRadius: "16px 16px 0 0",
};

const topCard = {

  background:
    "rgba(30,41,59,0.95)",

  borderRadius: "24px",

  padding: "30px",
};

const productRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "15px 0",

  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
};

const productName = {

  marginBottom: "6px",
};

const productText = {

  color: "#94a3b8",
};

const salesBadge = {

  padding: "10px 16px",

  borderRadius: "12px",

  background:
    "#22c55e",

  fontWeight: "bold",
};

const tableCard = {

  background:
    "rgba(30,41,59,0.95)",

  borderRadius: "24px",

  padding: "30px",
};

const tableTitle = {

  fontSize: "30px",

  marginBottom: "25px",
};

const tableWrapper = {

  overflowX: "auto",
};

const table = {

  width: "100%",

  borderCollapse: "collapse",
};

const th = {

  padding: "16px",

  textAlign: "left",

  color: "#94a3b8",

  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
};

const td = {

  padding: "18px 16px",

  borderBottom:
    "1px solid rgba(255,255,255,0.06)",
};

const status = {

  padding: "8px 14px",

  borderRadius: "10px",

  color: "white",

  fontWeight: "bold",
};

const empty = {

  color: "#94a3b8",
};

const emptyCell = {

  textAlign: "center",

  padding: "30px",

  color: "#94a3b8",
};

const loadingContainer = {

  minHeight: "100vh",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  alignItems: "center",

  background: "#020617",

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