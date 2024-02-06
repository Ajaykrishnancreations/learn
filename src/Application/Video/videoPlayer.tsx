import React, { useEffect, useState } from 'react';
import Plyr from 'plyr-react';
import { getVideos } from '../../ApiService/ApiServices';

const VideoPlayer: React.FC = () => {
  const [videos, setVideos] = useState<any[]>();
  const video = require("../../Assets/sample.mp4");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        setVideos(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-screen-background">
      <div className="background-video-container">
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-overlay learning-content">
          <h1>Welcome to Learning module</h1>
          <p>You can access all the learning content here</p>
        </div>
      </div>
      <div className="row mt-5" style={{ margin: 0 }}>
      <h4 style={{color:"white"}}>Google Cloud Video</h4>
        {videos?.map((video, index: any) => (
          <div key={index} className="col-3" style={{ height: 250, padding: 10 }}>
            <center>
              <Plyr
                options={{
                  controls: [
                    "play-large",
                    "play",
                    // "rewind",
                    // "fast-forward",
                    "progress",
                    "current-time",
                    "mute",
                    "volume",
                    "settings",
                    "pip",
                    "fullscreen"
                  ],
                  previewThumbnails: { enabled: false, src: "" }
                }}
                source={{
                  type: "video",
                  sources: [

                    {
                      src: `http://localhost:4000/stream/High%2F${video}`,
                      type: "video/mp4",
                      size: 1080
                    },
                    {
                      src: `http://localhost:4000/stream/Medium%2F${video}`,
                      type: "video/mp4",
                      size: 480
                    },
                    {
                      src: `http://localhost:4000/stream/Low%2F${video}`,
                      type: "video/mp4",
                      size: 360
                    },
                  ],
                }}
              />
              <b style={{ padding: '10px', color: 'white' }}>{video.title}</b>
            </center>
          </div>
        ))}
      </div>
      <div className='p-3'>
        <div>
          <h4 style={{color:"white"}}>Gumlet Videos</h4>
        </div>
        <div style={{ width: "500px", height: "300px" }}>
          <Plyr
            options={{
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen"
              ],
              previewThumbnails: { enabled: false, src: "" }
            }}
            source={{
              type: "video",
              sources: [
                {
                  src: `https://video.gumlet.io/65730582f4694c8344b38bb2/657aca4289663470dd908f50/download.mp4`,
                  type: "video/mp4",
                  size: 1080
                },
                {
                  src: `https://video.gumlet.io/65730582f4694c8344b38bb2/657acbb589663470dd9099ed/download.mp4`,
                  type: "video/mp4",
                  size: 480
                },
                {
                  src: `https://video.gumlet.io/65730582f4694c8344b38bb2/657acbd289663470dd909ac7/download.mp4`,
                  type: "video/mp4",
                  size: 360
                },
              ],
            }}
          />
        </div>
      </div>
      <div className='p-3'>
        <div>
          <h4 style={{color:"white"}}>Google storage Videos</h4>
        </div>
        <div style={{ width: "500px", height: "300px" }}>
          <Plyr
            options={{
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen"
              ],
              previewThumbnails: { enabled: false, src: "" }
            }}
            source={{
              type: "video",
              sources: [
                {
                  src: `https://storage.googleapis.com/varsh-storage/High/compressed_1701860745660_post.mp4`,
                  type: "video/mp4",
                  size: 1080
                },
                {
                  src: `https://storage.googleapis.com/varsh-storage/Medium/compressed_1701860745660_post.mp4`,
                  type: "video/mp4",
                  size: 480
                },
                {
                  src: `https://storage.googleapis.com/varsh-storage/Low/compressed_1701860745660_post.mp4`,
                  type: "video/mp4",
                  size: 360
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;