import React, { useEffect, useRef, useState } from 'react';
import { getVideos } from "../../ApiService/ApiServices";
import ReactPlayer from 'react-player';

const VideoPlayer: React.FC = () => {
  const [videos, setVideos] = useState<any[]>();
  const [networkSpeed, setNetworkSpeed] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const calculateNetworkSpeed = () => {
      // @ts-ignore
      if (navigator.connection) {
        // @ts-ignore
        const { downlink } = navigator.connection;
        setNetworkSpeed(`${downlink} Mbps`);
      } else {
        setNetworkSpeed('Network speed not available');
      }
    };

    calculateNetworkSpeed();
    window.addEventListener('online', calculateNetworkSpeed);
    window.addEventListener('offline', () => setNetworkSpeed('Offline'));

    return () => {
      window.removeEventListener('online', calculateNetworkSpeed);
      window.removeEventListener('offline', () => setNetworkSpeed('Offline'));
    };
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        setVideos(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <div className='video-screen-background'>
      <div className="background-video-container">
        <ReactPlayer
          url={require("../../Assets/sample.mp4")}
          playing
          loop
          muted
          width="100%"
          height="100%"
          className="background-video"
        />
        <div className="text-overlay learning-content" style={{ paddingTop: "500px" }}>
          <h1>Welcome to Learning module</h1>
          <p>You can access all the learning content here</p>
        </div>
      </div>
      <p className='video-heading'>Based on your Search History</p>
      <p style={{ color: "white" }}>Network Speed {networkSpeed}</p>
      <div className='row'>
        {videos?.map((video, index: any) => (
          video?.map((item: any, index: number) => (
            <div key={index} className='col-3' style={{ height: 250 }}>
              <center>
                <ReactPlayer
                  url={`http://localhost:4000/stream/${item?.id}`}
                  controls
                  width="100%"
                  height="100%"
                />
                <b style={{ padding: "10px", color: "white" }}>{video.title}</b>
              </center>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
