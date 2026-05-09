/* =====================================================
   src/pages/Rewards.jsx
===================================================== */

export default function Rewards() {

  const rewards = [

    {
      id: 1,
      title:
        "🎁 Bronze Reward",
      points: 100,
    },

    {
      id: 2,
      title:
        "🥈 Silver Reward",
      points: 500,
    },

    {
      id: 3,
      title:
        "🥇 Gold Reward",
      points: 1000,
    },
  ];

  return (

    <div style={container}>

      <h1 style={title}>
        🎉 Rewards & Discounts
      </h1>

      <div style={pointsBox}>

        <h2>
          ⭐ Your Points:
          350
        </h2>

      </div>

      <div style={grid}>

        {rewards.map((r) => (

          <div
            key={r.id}
            style={card}
          >

            <h2>
              {r.title}
            </h2>

            <p>
              Unlock at
              {` ${r.points} `}
              points
            </p>

            <button style={btn}>
              Redeem
            </button>

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
  marginBottom: "25px",
};

const pointsBox = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "18px",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(280px,1fr))",
  gap: "20px",
};

const card = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "20px",
};

const btn = {
  marginTop: "15px",
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
};