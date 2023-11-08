import React, { useEffect, useRef, useState } from 'react';
import { getVideos } from "../../ApiService/ApiServices";
const video = require("../../Assets/sample.mp4");
interface Video {
  _id: string;
  title: string;
  video: string;
  __v: number;
}
const VideoPlayer: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
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
  }, []);
  return (
    <div className='video-screen-background'>
      <div className="background-video-container">
      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-overlay learning-content" style={{paddingTop:"500px"}}>
        <h1>Welcome to Learning module</h1>
        <p>You can access all the learning content here</p>
      </div>
    </div>
    <p className='video-heading'>Based on your Search History</p>
    <div className='row'>
      {videos.map((video, index) => (
        <div key={video._id} className='col-3'>
          <center>
          <video src={`http://localhost:4000/${video.video}`} controls className="video-js" /><br/>
          <b style={{padding:"10px",color:"white"}}>{video.title}</b>
          </center>
        </div>
      ))}
    </div>
    </div>
  );
};

export default VideoPlayer;
