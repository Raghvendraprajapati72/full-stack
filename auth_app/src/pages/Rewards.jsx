import { useEffect, useState } from "react";
import axios from "axios";

export default function Rewards() {

  const [rewards,
    setRewards] =
    useState([]);

  const [userPoints,
    setUserPoints] =
    useState(0);

  const [loading,
    setLoading] =
    useState(true);

  const [redeeming,
    setRedeeming] =
    useState(null);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const API =
    "https://backend-api-onp4.onrender.com";

  /* =========================================
     LOAD REWARDS
  ========================================= */

  useEffect(() => {

    loadRewards();

  }, []);

  const loadRewards =
    async () => {

      try {

        setLoading(true);

        const [

          rewardsRes,

          userRes,

        ] = await Promise.all([

          axios.get(
            `${API}/rewards`
          ),

          axios.get(
            `${API}/auth/user/${user?.id}`
          ),

        ]);

        const rewardData =
          Array.isArray(
            rewardsRes.data
          )

            ? rewardsRes.data

            : rewardsRes.data.data ||
              [];

        setRewards(
          rewardData
        );

        setUserPoints(
          userRes.data.points || 0
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to load rewards ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  /* =========================================
     REDEEM REWARD
  ========================================= */

  const redeemReward =
    async (reward) => {

      if (!user) {

        return alert(
          "Please login first ❌"
        );
      }

      if (
        userPoints <
        reward.points
      ) {

        return alert(
          "Not enough points ❌"
        );
      }

      try {

        setRedeeming(
          reward.id
        );

        await axios.post(

          `${API}/rewards/redeem`,

          {
            userId:
              user.id,

            rewardId:
              reward.id,

            points:
              reward.points,
          }
        );

        alert(
          "Reward Redeemed Successfully ✅"
        );

        loadRewards();

      } catch (err) {

        console.log(err);

        alert(
          "Redeem failed ❌"
        );

      } finally {

        setRedeeming(null);
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
          Loading Rewards...
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
            🎉 Rewards Center
          </h1>

          <p style={subtitle}>
            Earn points from orders,
            promotions and activities
          </p>

        </div>

        <button
          style={refreshBtn}
          onClick={loadRewards}
        >
          🔄 Refresh
        </button>

      </div>

      {/* POINTS SECTION */}

      <div style={pointsCard}>

        <div style={pointsLeft}>

          <div style={starCircle}>
            ⭐
          </div>

          <div>

            <h2 style={pointsTitle}>
              Your Reward Points
            </h2>

            <p style={pointsText}>
              Earn more points by
              purchasing products,
              inviting friends and
              completing orders.
            </p>

          </div>

        </div>

        <div style={pointsRight}>

          <h1 style={pointsValue}>
            {userPoints}
          </h1>

          <p style={availableText}>
            Available Points
          </p>

        </div>

      </div>

      {/* REWARDS GRID */}

      <div style={grid}>

        {rewards.length === 0 ? (

          <div style={emptyCard}>

            <h2>
              No Rewards Available
            </h2>

          </div>

        ) : (

          rewards.map((r) => (

            <div
              key={r.id}
              style={card}
            >

              {/* BADGE */}

              <div style={badge}>

                {r.badge ||
                  "🎁"}

              </div>

              {/* TITLE */}

              <h2 style={rewardTitle}>
                {r.title}
              </h2>

              {/* DESCRIPTION */}

              <p style={desc}>
                {r.description ||
                  "Unlock exclusive benefits and discounts."}
              </p>

              {/* POINTS */}

              <div style={pointsRow}>

                <span style={pointTag}>
                  ⭐ {r.points} Points
                </span>

                <span style={discountTag}>
                  {r.discount ||
                    "10% OFF"}
                </span>

              </div>

              {/* STATUS */}

              <div style={statusBox}>

                {userPoints >=
                r.points ? (

                  <span
                    style={availableBadge}
                  >
                    ✅ Available
                  </span>

                ) : (

                  <span
                    style={lockedBadge}
                  >
                    🔒 Locked
                  </span>

                )}

              </div>

              {/* BUTTON */}

              <button

                style={{
                  ...btn,

                  opacity:
                    userPoints <
                    r.points

                      ? 0.5

                      : 1,
                }}

                disabled={
                  userPoints <
                  r.points
                }

                onClick={() =>
                  redeemReward(r)
                }
              >

                {redeeming ===
                r.id

                  ? "Redeeming..."

                  : "Redeem Reward"}

              </button>

            </div>
          ))
        )}

      </div>

      {/* ADMIN INFO */}

      {user?.role ===
        "admin" && (

        <div style={adminBox}>

          <h2>
            👑 Admin Control Panel
          </h2>

          <p style={adminText}>

            Admin can create,
            edit, assign rewards,
            manage promotions,
            set farmer benefits,
            control user points
            and launch seasonal campaigns.

          </p>

          <div style={adminFeatures}>

            <div style={adminCard}>
              🎁 Create Rewards
            </div>

            <div style={adminCard}>
              🌾 Farmer Promotions
            </div>

            <div style={adminCard}>
              🛒 Consumer Offers
            </div>

            <div style={adminCard}>
              📊 Reward Analytics
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================
   STYLES
========================================= */

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

  marginBottom: "35px",
};

const title = {

  fontSize: "52px",

  fontWeight: "800",

  marginBottom: "10px",
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

  cursor: "pointer",

  fontWeight: "bold",

  boxShadow:
    "0 10px 25px rgba(34,197,94,0.25)",
};

const pointsCard = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "20px",

  background:
    "linear-gradient(135deg,#16a34a,#15803d)",

  padding: "35px",

  borderRadius: "28px",

  marginBottom: "40px",

  boxShadow:
    "0 20px 40px rgba(34,197,94,0.25)",
};

const pointsLeft = {

  display: "flex",

  alignItems: "center",

  gap: "25px",
};

const starCircle = {

  width: "90px",

  height: "90px",

  borderRadius: "50%",

  background:
    "rgba(255,255,255,0.15)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "42px",
};

const pointsTitle = {

  fontSize: "32px",

  marginBottom: "10px",
};

const pointsText = {

  color: "#dcfce7",

  maxWidth: "550px",

  lineHeight: "1.8",
};

const pointsRight = {

  textAlign: "center",
};

const pointsValue = {

  fontSize: "72px",

  fontWeight: "900",
};

const availableText = {

  color: "#dcfce7",

  fontSize: "18px",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",

  gap: "30px",
};

const card = {

  background:
    "rgba(30,41,59,0.95)",

  borderRadius: "28px",

  padding: "30px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.25)",

  transition: "0.3s",
};

const badge = {

  width: "80px",

  height: "80px",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#f59e0b,#d97706)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "40px",

  marginBottom: "20px",
};

const rewardTitle = {

  fontSize: "28px",

  marginBottom: "15px",
};

const desc = {

  color: "#94a3b8",

  lineHeight: "1.8",

  marginBottom: "25px",
};

const pointsRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "20px",
};

const pointTag = {

  background:
    "rgba(34,197,94,0.15)",

  color: "#4ade80",

  padding: "10px 16px",

  borderRadius: "14px",

  fontWeight: "bold",
};

const discountTag = {

  background:
    "rgba(59,130,246,0.15)",

  color: "#60a5fa",

  padding: "10px 16px",

  borderRadius: "14px",

  fontWeight: "bold",
};

const statusBox = {

  marginBottom: "22px",
};

const availableBadge = {

  background:
    "rgba(34,197,94,0.18)",

  color: "#4ade80",

  padding: "10px 16px",

  borderRadius: "12px",

  fontWeight: "bold",
};

const lockedBadge = {

  background:
    "rgba(239,68,68,0.18)",

  color: "#f87171",

  padding: "10px 16px",

  borderRadius: "12px",

  fontWeight: "bold",
};

const btn = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border: "none",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "16px",

  boxShadow:
    "0 10px 20px rgba(34,197,94,0.2)",
};

const adminBox = {

  marginTop: "60px",

  background:
    "rgba(30,41,59,0.95)",

  borderRadius: "28px",

  padding: "35px",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const adminText = {

  color: "#94a3b8",

  lineHeight: "1.8",

  marginTop: "15px",

  marginBottom: "30px",
};

const adminFeatures = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "20px",
};

const adminCard = {

  background:
    "rgba(255,255,255,0.05)",

  padding: "22px",

  borderRadius: "18px",

  textAlign: "center",

  fontWeight: "bold",
};

const emptyCard = {

  background:
    "rgba(30,41,59,0.95)",

  padding: "50px",

  borderRadius: "24px",

  textAlign: "center",
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