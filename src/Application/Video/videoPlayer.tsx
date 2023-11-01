import React from "react";
import VideoPlayer from "react-video-js-player";

const MyVideoPlayer: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  return (
    <div>
      <VideoPlayer
        controls
        src={videoSrc}
        width="450"
        height="300"
        preload="auto"
        options={{
            controls: true, 
            playbackRates: [0.5, 1, 1.5, 2],
            controlBar: {
              playToggle: true,
              volumePanel: {
                inline: true,
              },
            },
          }}
      />
    </div>
  );
};

export default MyVideoPlayer;