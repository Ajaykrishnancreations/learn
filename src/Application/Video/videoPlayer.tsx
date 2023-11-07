import React, { useEffect, useRef, useState } from 'react';
import { getVideos } from "../../ApiService/ApiServices";

// Define the type for a video object
interface Video {
  _id: string;
  title: string;
  video: string;
  __v: number;
}

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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

  // useEffect(() => {
  //   // if (videos.length > 0 && videoRef.current) {
  //   //   videoRef.current.src = `http://localhost:4000/${videos[currentVideoIndex].video}`;
  //   //   videoRef.current.load();
  //   //   videoRef.current.play();
  //   // }
  // }, [videos, currentVideoIndex]);

  // const handleVideoChange = (index: number) => {
  //   setCurrentVideoIndex(index);
  // };

  return (
    <div>
      {/* <video ref={videoRef} controls className="video-js" /> */}
      <div>
        {videos.map((video, index) => (
          <div key={video._id}>
              {video.title}
            <video src={`http://localhost:4000/${video.video}`} controls className="video-js" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
