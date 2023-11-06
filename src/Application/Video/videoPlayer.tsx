import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
const VideoPlayer: React.FC = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const player = videojs(videoRef.current!, {
      controls: true, // Show video controls
    });
    player.src({
      src:'/SampleVideo.mp4',
      type: 'video/mp4',
    });
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default VideoPlayer;
