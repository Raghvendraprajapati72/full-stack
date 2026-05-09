import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const products = [
    {
      title: "Fresh Vegetables",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },

    {
      title: "Organic Fruits",
      image:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
    },

    {
      title: "Farm Fresh Milk",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    },

    {
      title: "Organic Grains",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div style={heroSection}>
        <div style={overlay}>
          <div style={heroContent}>
            <h1 style={heroTitle}>
              Fresh Farm Products <br />
              Delivered To Your Door
            </h1>

            <p style={heroText}>
              Buy directly from verified farmers
              with trust, quality and fast delivery.
            </p>

            {/* BUTTONS */}
            <div style={heroButtons}>
              <Link
                to="/products"
                style={heroBtn}
              >
                Shop Now
              </Link>

              <Link
                to="/register"
                style={registerBtn}
              >
                Register
              </Link>

              <Link
                to="/login"
                style={loginBtn}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div style={section}>
        <h2 style={sectionTitle}>
          Shop By Categories
        </h2>

        <div style={categoryGrid}>
          {products.map((item, index) => (
            <div
              key={index}
              style={categoryCard}
            >
              <img
                src={item.image}
                alt={item.title}
                style={categoryImage}
              />

              <div style={categoryContent}>
                <h3>{item.title}</h3>

                <button
                  style={shopBtn}
                  onClick={() =>
                    navigate("/products")
                  }
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DEALS SECTION */}
      <div style={dealsSection}>
        <h2 style={sectionTitle}>
          Today's Best Deals
        </h2>

        <div style={dealsGrid}>
          <div style={dealCard}>
            <h3>🥦 Vegetables</h3>
            <p>Up to 40% OFF</p>
          </div>

          <div style={dealCard}>
            <h3>🍎 Fruits</h3>
            <p>Fresh Organic Deals</p>
          </div>

          <div style={dealCard}>
            <h3>🌾 Grains</h3>
            <p>Buy 1 Get 1 Free</p>
          </div>

          <div style={dealCard}>
            <h3>🥛 Dairy</h3>
            <p>Flat ₹100 OFF</p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={featuresSection}>
        <div style={feature}>
          <h2>🚚 Fast Delivery</h2>

          <p>
            Get products delivered within 24 hours
          </p>
        </div>

        <div style={feature}>
          <h2>✔ Trusted Farmers</h2>

          <p>
            Verified and authentic farm products
          </p>
        </div>

        <div style={feature}>
          <h2>🔒 Secure Payments</h2>

          <p>
            Safe and encrypted transactions
          </p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={ctaSection}>
        <h2 style={ctaTitle}>
          Join AgroConnect Today 🌱
        </h2>

        <p style={ctaText}>
          Create your account and start buying
          directly from trusted farmers.
        </p>

        <Link
          to="/register"
          style={ctaButton}
        >
          Create Account
        </Link>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

/* ==================================
   🎨 STYLES
================================== */

const heroSection = {
  height: "90vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  marginTop: "120px",
};

const overlay = {
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to right, rgba(2,6,23,0.9), rgba(2,6,23,0.4))",
  display: "flex",
  alignItems: "center",
};

const heroContent = {
  paddingLeft: "80px",
  color: "white",
};

const heroTitle = {
  fontSize: "64px",
  lineHeight: "1.2",
};

const heroText = {
  marginTop: "20px",
  fontSize: "20px",
  color: "#cbd5e1",
  maxWidth: "600px",
  lineHeight: "1.8",
};

const heroButtons = {
  display: "flex",
  gap: "20px",
  marginTop: "30px",
  flexWrap: "wrap",
};

const heroBtn = {
  padding: "15px 35px",
  borderRadius: "12px",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
};

const registerBtn = {
  padding: "15px 35px",
  borderRadius: "12px",
  background: "#ffffff",
  color: "#0f172a",
  textDecoration: "none",
  fontWeight: "bold",
};

const loginBtn = {
  padding: "15px 35px",
  borderRadius: "12px",
  border: "1px solid white",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const section = {
  padding: "70px 60px",
  background: "#f8fafc",
};

const sectionTitle = {
  fontSize: "38px",
  marginBottom: "40px",
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(260px,1fr))",
  gap: "30px",
};

const categoryCard = {
  background: "white",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.08)",
};

const categoryImage = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

const categoryContent = {
  padding: "20px",
};

const shopBtn = {
  marginTop: "15px",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
};

const dealsSection = {
  padding: "70px 60px",
  background:
    "linear-gradient(135deg,#020617,#0f172a)",
  color: "white",
};

const dealsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "25px",
};

const dealCard = {
  background: "rgba(255,255,255,0.08)",
  padding: "35px",
  borderRadius: "18px",
};

const featuresSection = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",
  gap: "30px",
  padding: "80px 60px",
  background: "#f1f5f9",
};

const feature = {
  background: "white",
  padding: "35px",
  borderRadius: "18px",
  textAlign: "center",
};

const ctaSection = {
  padding: "90px 40px",
  textAlign: "center",
  background:
    "linear-gradient(135deg,#052e16,#14532d)",
  color: "white",
};

const ctaTitle = {
  fontSize: "48px",
  marginBottom: "20px",
};

const ctaText = {
  fontSize: "18px",
  color: "#d1fae5",
  marginBottom: "35px",
};

const ctaButton = {
  padding: "16px 40px",
  background: "white",
  color: "#14532d",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "bold",
};