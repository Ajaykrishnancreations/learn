import React, { useEffect, useRef, useState } from 'react';
import { getVideos } from "../../ApiService/ApiServices";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
interface Video {
  _id: string;
  title: string;
  video: string;
  __v: number;
}

const VideoPlayer: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = require("../../Assets/sample.mp4");
  const [networkSpeed, setNetworkSpeed] = useState<string | null>(null);
  const [networkSpeed1, setNetworkSpeed1] = useState<any>(null);
  useEffect(() => {
    const calculateNetworkSpeed = () => {
       // @ts-ignore
      if (navigator.connection) {
         // @ts-ignore
        const { downlink } = navigator.connection;
        setNetworkSpeed(`${downlink} Mbps`);
        setNetworkSpeed1(parseInt(downlink));
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
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
    if (videoRef.current) {
      videojs(videoRef.current, function () {
      });
    }
    return () => {
      if (videoRef.current) {
        videojs(videoRef.current).dispose();
      }
    };
  }, []);


  return (
    <div className='video-screen-background'>
      <div className="background-video-container">
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-overlay learning-content" style={{ paddingTop: "500px" }}>
          <h1>Welcome to Learning module</h1>
          <p>You can access all the learning content here</p>
        </div>
      </div>
      <p className='video-heading'>Based on your Search History</p>
      <p style={{color:"white"}}>Network Speed {networkSpeed}</p>
      <div className='row'>
      {videos.map((video, index) => (
        <div key={video._id} className='col-3' style={{ height: 250 }}>
          <center>
            <video
              ref={videoRef}
              data-setup='{}'
              className="video-js vjs-default-skin"
              controls
            >
              <source
                src={`http://localhost:4000/${video.video}`}
                type="video/mp4"
              />
            </video>
            <b style={{ padding: "10px", color: "white" }}>{video.title}</b>
          </center>
        </div>
      ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
