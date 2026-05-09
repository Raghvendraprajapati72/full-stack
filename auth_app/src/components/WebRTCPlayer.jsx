import {
  useEffect,
  useRef,
} from "react";

export default function WebRTCPlayer() {

  const videoRef =
    useRef();

  useEffect(() => {

    async function start() {

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          });

      if (videoRef.current) {

        videoRef.current.srcObject =
          stream;
      }
    }

    start();

  }, []);

  return (

    <div style={container}>

      <h2>
        📡 Live Camera
      </h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        style={video}
      />

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