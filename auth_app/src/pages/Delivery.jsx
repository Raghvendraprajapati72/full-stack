import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function Delivery() {

  const [deliveries,
    setDeliveries] =
    useState([]);

  useEffect(() => {

    loadDeliveries();

  }, []);

  const loadDeliveries =
    async () => {

      const res =
        await axios.get(
          "http://localhost:5000/delivery"
        );

      setDeliveries(
        res.data
      );
    };

  return (

    <div style={container}>

      <h1>
        🚚 Delivery Tracking
      </h1>

      <div style={grid}>

        {deliveries.map((d) => (

          <div
            key={d.id}
            style={card}
          >

            <h2>
              {d.product_name}
            </h2>

            <p>
              📍 From:
              {d.sender_address}
            </p>

            <p>
              📍 To:
              {d.receiver_address}
            </p>

            <p>
              👨 Delivery Boy:
              {d.delivery_boy}
            </p>

            <p>
              📌 Status:
              {d.status}
            </p>

            <iframe
              title="map"
              width="100%"
              height="220"
              style={{
                border: 0,
                borderRadius: "12px"
              }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${d.current_location}&output=embed`}
            />

          </div>
        ))}

      </div>

    </div>
  );
}

const container = {
  padding: "120px 40px",
  background: "#020617",
  minHeight: "100vh",
  color: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: "25px",
  marginTop: "30px",
};

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "18px",
};