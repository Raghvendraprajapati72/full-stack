import ReactPlayer from "react-player";

export default function VideoPlayer({
  url,
}) {

  return (

    <div style={card}>

      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="350px"
      />

    </div>
  );
}

const card = {
  borderRadius: "20px",
  overflow: "hidden",
  background: "#1e293b",
};