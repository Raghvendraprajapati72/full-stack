/* =====================================================
   src/pages/News.jsx
===================================================== */

export default function News() {

  const news = [

    {
      id: 1,
      title:
        "🌾 Government launches new farmer scheme",
    },

    {
      id: 2,
      title:
        "🚚 Agro delivery expanded to new cities",
    },

    {
      id: 3,
      title:
        "💰 Farmers getting bonus rewards this month",
    },
  ];

  return (

    <div style={container}>

      <h1 style={title}>
        📰 Agro News & Updates
      </h1>

      <div style={grid}>

        {news.map((n) => (

          <div
            key={n.id}
            style={card}
          >

            <h2>
              {n.title}
            </h2>

            <p style={desc}>
              Latest platform update
              and agriculture news.
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#020617",
  padding: "30px",
  color: "white",
};

const title = {
  fontSize: "40px",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "20px",
};

const card = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "20px",
};

const desc = {
  color: "#94a3b8",
  marginTop: "10px",
};