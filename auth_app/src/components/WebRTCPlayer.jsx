import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function WebRTCPlayer() {

  const videoRef =
    useRef();

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    async function start() {

      try {

        const stream =
          await navigator
            .mediaDevices
            .getUserMedia({
              video: true,
              audio: true,
            });

        if (
          videoRef.current
        ) {

          videoRef.current.srcObject =
            stream;
        }

      } catch (err) {

        console.log(err);

        setError(
          "Camera access denied ❌"
        );
      }
    }

    start();

  }, []);

  return (

    <div style={container}>

      <h2>
        📡 Live Camera
      </h2>

      {error ? (

        <p style={errorText}>
          {error}
        </p>

      ) : (

        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          style={video}
        />

      )}

    </div>
  );
}

const container = {

  background: "#1e293b",

  padding: "20px",

  borderRadius: "20px",

  color: "white",
};

const video = {

  width: "100%",

  borderRadius: "16px",

  marginTop: "20px",
};

const errorText = {

  color: "#ef4444",

  marginTop: "20px",
};