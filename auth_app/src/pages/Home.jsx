import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {

  const navigate =
    useNavigate();
    const user =
  JSON.parse(
    localStorage.getItem("user")
  );

const isAdmin =
  user?.role === "admin";

  /* ================= NEWS ================= */

  const [news,
    setNews] =
    useState([]);

  useEffect(() => {

    loadNews();

  }, []);

  const loadNews =
    async () => {

      try {

        const res =
          await axios.get(
            "https://backend-api-yduq.onrender.com/news"
          );

        setNews(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );

      } catch (err) {

        console.log(err);

      }
    };

  /* ================= PRODUCTS ================= */

  const products = [

    {
      title:
        "Fresh Vegetables",

      subtitle:
        "Farm fresh organic vegetables",

      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },

    {
      title:
        "Organic Fruits",

      subtitle:
        "Healthy & naturally grown fruits",

      image:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
    },

    {
      title:
        "Farm Fresh Milk",

      subtitle:
        "Pure dairy products from farms",

      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    },

    {
      title:
        "Organic Grains",

      subtitle:
        "Premium quality healthy grains",

      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    },
  ];

  return (

    <>

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section style={heroSection}>

        <div style={overlay}>

          <div style={heroContent}>

            <div style={badge}>
              🌱 Trusted By 15,000+ Farmers
            </div>

            <h1 style={heroTitle}>
              Fresh Farm Products
              <br />
              Delivered Faster
            </h1>

            <p style={heroText}>

              Buy directly from verified farmers
              with trusted quality, secure payment,
              and fast delivery service.

            </p>

            {/* BUTTONS */}

            <div style={heroButtons}>

              <Link
                to="/products"
                style={heroBtn}
              >
                Shop Now 🚀
              </Link>

              <Link
                to="/register"
                style={registerBtn}
              >
                Create Account
              </Link>

              <Link
                to="/login"
                style={loginBtn}
              >
                Login
              </Link>

            </div>

            {/* STATS */}

            <div style={heroStats}>

              <div style={statBox}>
                <h2>
                  15K+
                </h2>

                <p>
                  Happy Customers
                </p>

              </div>

              <div style={statBox}>
                <h2>
                  2K+
                </h2>

                <p>
                  Verified Farmers
                </p>

              </div>

              <div style={statBox}>
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

      </section>

      {/* CATEGORIES */}

      <section style={section}>

        <div style={sectionTop}>

          <div>

            <h2 style={sectionTitle}>
              Shop By Categories
            </h2>

            <p style={sectionSub}>
              Explore premium organic products
            </p>

          </div>

        </div>

        <div style={categoryGrid}>

          {products.map((item, index) => (

            <div
              key={index}
              style={categoryCard}
              onMouseEnter={(e) =>
                e.currentTarget.style.transform =
                  "translateY(-8px)"
              }
              onMouseLeave={(e) =>
                e.currentTarget.style.transform =
                  "translateY(0px)"
              }
            >

              <img
                src={item.image}
                alt={item.title}
                style={categoryImage}
              />

              <div style={categoryContent}>

                <h3>
                  {item.title}
                </h3>

                <p style={cardText}>
                  {item.subtitle}
                </p>

                <button
                  style={shopBtn}
                  onClick={() =>
                    navigate("/products")
                  }
                >
                  Explore →
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* DEALS */}

      <section style={dealsSection}>

        <div style={dealTop}>

          <h2 style={whiteTitle}>
            🔥 Today's Best Deals
          </h2>

          <p style={dealSub}>
            Limited-time fresh product offers
          </p>

        </div>

        <div style={dealsGrid}>

          <div style={dealCard}>
            <h3>
              🥦 Vegetables
            </h3>

            <p>
              Up to 40% OFF
            </p>
          </div>

          <div style={dealCard}>
            <h3>
              🍎 Fruits
            </h3>

            <p>
              Fresh Organic Deals
            </p>
          </div>

          <div style={dealCard}>
            <h3>
              🌾 Grains
            </h3>

            <p>
              Buy 1 Get 1 Free
            </p>
          </div>

          <div style={dealCard}>
            <h3>
              🥛 Dairy
            </h3>

            <p>
              Flat ₹100 OFF
            </p>
          </div>

        </div>

      </section>

      {/* NEWS SECTION */}

      <section style={newsSection}>

       <div style={newsTop}>

  <div>
    <h2 style={newsHeading}>
      📰 Latest Agro News
    </h2>

    <p style={newsSub}>
      Real-time agriculture updates
    </p>
  </div>

  {isAdmin && (
    <button
      onClick={() => navigate("/news")}
      style={{
        background: "#22c55e",
        color: "#fff",
        border: "none",
        padding: "12px 22px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "15px",
      }}
    >
      Manage News
    </button>
  )}

</div>

<div style={newsGrid}>
  {news.map((item, index) => (
    <div key={index} style={newsCard}>

      <img
        src={item.image}
        alt="news"
        style={newsImage}
      />

      <div style={newsContent}>

        <h3 style={newsTitle}>
          {item.title}
        </h3>

        <p style={newsDesc}>
          {item.description}
        </p>

      </div>

    </div>
  ))}
</div>
        
      </section>

      {/* FEATURES */}

      <section style={featuresSection}>

        <div style={feature}>

          <div style={featureIcon}>
            🚚
          </div>

          <h2>
            Fast Delivery
          </h2>

          <p>
            Get fresh products delivered
            within 24 hours.
          </p>

        </div>

        <div style={feature}>

          <div style={featureIcon}>
            ✔
          </div>

          <h2>
            Trusted Farmers
          </h2>

          <p>
            Verified & authentic
            agricultural sellers.
          </p>

        </div>

        <div style={feature}>

          <div style={featureIcon}>
            🔒
          </div>

          <h2>
            Secure Payments
          </h2>

          <p>
            Safe & encrypted
            transactions system.
          </p>

        </div>

      </section>

      {/* CTA */}

      <section style={ctaSection}>

        <h2 style={ctaTitle}>
          Join AgroConnect Today 🌱
        </h2>

        <p style={ctaText}>

          Create your account and start
          buying directly from trusted
          farmers across India.

        </p>

        <Link
          to="/register"
          style={ctaButton}
        >
          Create Account 🚀
        </Link>

      </section>

      {/* FOOTER */}

      <Footer />

    </>
  );
}

/* ==================================
   STYLES
================================== */

const heroSection = {

  height: "100vh",

  backgroundImage:
    "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')",

  backgroundSize: "cover",

  backgroundPosition: "center",

  marginTop: "90px",

  position: "relative",
};

const overlay = {

  width: "100%",

  height: "100%",

  background:
    "linear-gradient(to right, rgba(2,6,23,0.95), rgba(2,6,23,0.55))",

  display: "flex",

  alignItems: "center",
};

const heroContent = {

  paddingLeft: "80px",

  maxWidth: "760px",

  color: "white",
};

const badge = {

  display: "inline-block",

  padding: "10px 18px",

  borderRadius: "30px",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter: "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  marginBottom: "25px",

  color: "#d1fae5",
};

const heroTitle = {

  fontSize: "78px",

  lineHeight: "1.1",

  fontWeight: "800",
};

const heroText = {

  marginTop: "25px",

  fontSize: "20px",

  color: "#cbd5e1",

  maxWidth: "620px",

  lineHeight: "1.9",
};

const heroButtons = {

  display: "flex",

  gap: "18px",

  marginTop: "35px",

  flexWrap: "wrap",
};

const heroBtn = {

  padding: "16px 38px",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontSize: "16px",

  fontWeight: "700",

  textDecoration: "none",
};

const registerBtn = {

  padding: "16px 38px",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",

  textDecoration: "none",

  fontWeight: "700",
};

const loginBtn = {

  padding: "16px 38px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.2)",

  color: "white",

  textDecoration: "none",

  fontWeight: "700",
};

const heroStats = {

  display: "flex",

  gap: "20px",

  marginTop: "50px",

  flexWrap: "wrap",
};

const statBox = {

  background:
    "rgba(255,255,255,0.08)",

  padding: "22px",

  borderRadius: "20px",

  minWidth: "180px",
};

const section = {

  padding: "90px 70px",

  background: "#f8fafc",
};

const sectionTop = {

  marginBottom: "45px",
};

const sectionTitle = {

  fontSize: "48px",

  marginBottom: "10px",

  fontWeight: "800",
};

const sectionSub = {

  color: "#64748b",

  fontSize: "18px",
};

const categoryGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",

  gap: "35px",
};

const categoryCard = {

  background: "white",

  borderRadius: "26px",

  overflow: "hidden",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.08)",

  transition: "0.3s",

  cursor: "pointer",
};

const categoryImage = {

  width: "100%",

  height: "250px",

  objectFit: "cover",
};

const categoryContent = {

  padding: "24px",
};

const cardText = {

  color: "#64748b",

  marginTop: "8px",

  lineHeight: "1.7",
};

const shopBtn = {

  marginTop: "20px",

  padding: "13px 26px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "700",
};

const dealsSection = {

  padding: "90px 70px",

  background:
    "linear-gradient(135deg,#020617,#0f172a)",

  color: "white",
};

const dealTop = {

  marginBottom: "45px",
};

const whiteTitle = {

  fontSize: "48px",

  marginBottom: "12px",

  fontWeight: "800",
};

const dealSub = {

  color: "#94a3b8",

  fontSize: "18px",
};

const dealsGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(240px,1fr))",

  gap: "28px",
};

const dealCard = {

  background:
    "rgba(255,255,255,0.06)",

  padding: "40px",

  borderRadius: "24px",
};

const featuresSection = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(280px,1fr))",

  gap: "35px",

  padding: "90px 70px",

  background: "#f1f5f9",
};

const feature = {

  background: "white",

  padding: "40px",

  borderRadius: "24px",

  textAlign: "center",
};

const featureIcon = {

  width: "80px",

  height: "80px",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "34px",

  margin: "0 auto 20px",

  color: "white",
};

const ctaSection = {

  padding: "110px 40px",

  textAlign: "center",

  background:
    "linear-gradient(135deg,#052e16,#14532d)",

  color: "white",
};

const ctaTitle = {

  fontSize: "58px",

  marginBottom: "20px",

  fontWeight: "800",
};

const ctaText = {

  fontSize: "20px",

  color: "#d1fae5",

  marginBottom: "40px",

  maxWidth: "700px",

  marginInline: "auto",

  lineHeight: "1.8",
};

const ctaButton = {

  padding: "18px 42px",

  background: "white",

  color: "#14532d",

  borderRadius: "16px",

  textDecoration: "none",

  fontWeight: "800",

  fontSize: "16px",
};

const newsSection = {

  padding: "90px 70px",

  background: "#f8fafc",
};

const newsTop = {

  marginBottom: "40px",
};

const newsHeading = {

  fontSize: "48px",

  fontWeight: "800",

  marginBottom: "10px",
};

const newsSub = {

  color: "#64748b",

  fontSize: "18px",
};

const newsGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",

  gap: "28px",
};

const newsCard = {

  background: "white",

  borderRadius: "24px",

  overflow: "hidden",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

const newsImage = {

  width: "100%",

  height: "220px",

  objectFit: "cover",
};

const newsContent = {

  padding: "22px",
};

const newsDesc = {

  color: "#64748b",

  marginTop: "10px",

  lineHeight: "1.7",
};
const newsTitle = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#fff",
  marginBottom: "12px",
};

const newsDesc = {
  color: "#cbd5e1",
  lineHeight: "1.7",
  fontSize: "15px",
};

const newsImage = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

const newsContent = {
  padding: "20px",
};