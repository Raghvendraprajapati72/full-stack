export default function Promotions() {

  return (

    <div style={container}>

      <h1 style={title}>
        🔥 Promotions Page
      </h1>

      <div style={card}>

        <h2>
          Farmer Promotions
        </h2>

        <p>
          Promote farmer products,
          discount offers,
          seasonal campaigns
          and featured products.
        </p>

        <button style={btn}>
          Create Promotion
        </button>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {

  minHeight: "100vh",

  background: "#020617",

  color: "white",

  padding: "40px",
};

const title = {

  fontSize: "42px",

  marginBottom: "30px",
};

const card = {

  background: "#1e293b",

  padding: "30px",

  borderRadius: "20px",

  maxWidth: "600px",
};

const btn = {

  marginTop: "20px",

  padding: "14px 24px",

  border: "none",

  borderRadius: "12px",

  background: "#22c55e",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};