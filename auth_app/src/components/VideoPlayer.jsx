import ReactPlayer from "react-player";

export default function VideoPlayer({
  url,
}) {

  return (

    <div style={card}>

      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="350px"
        playing={false}
        muted={false}
      />

    </div>
  );
}

const card = {

  borderRadius: "20px",

  overflow: "hidden",

  background: "#1e293b",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.3)",
};