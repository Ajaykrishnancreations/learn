import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { getVideos } from '../../ApiService/ApiServices';

const VideoPlayer: React.FC = () => {
  const [videos, setVideos] = useState<any[]>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
      });
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, []);

  return (
    <div className="video-screen-background">
      <div className="row" style={{ margin: 0 }}>
        {videos?.map((video, index: any) => (
            <div key={index} className="col-3" style={{ height: 250, padding:10 }}>
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
    </div>
  );
};

export default VideoPlayer;

// import React, { useEffect, useRef, useState } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import { getVideos } from '../../ApiService/ApiServices';

// const VideoPlayer: React.FC = () => {
//   const [videos, setVideos] = useState<any[]>();
//   const [networkSpeed, setNetworkSpeed] = useState<string | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const video = require("../../Assets/sample.mp4");

//   useEffect(() => {
//     const calculateNetworkSpeed = () => {
//       // @ts-ignore
//       if (navigator.connection) {
//         // @ts-ignore
//         const { downlink } = navigator.connection;
//         setNetworkSpeed(`${downlink} Mbps`);
//       } else {
//         setNetworkSpeed('Network speed not available');
//       }
//     };

//     calculateNetworkSpeed();
//     window.addEventListener('online', calculateNetworkSpeed);
//     window.addEventListener('offline', () => setNetworkSpeed('Offline'));

//     return () => {
//       window.removeEventListener('online', calculateNetworkSpeed);
//       window.removeEventListener('offline', () => setNetworkSpeed('Offline'));
//     };
//   }, []);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await getVideos();
//         setVideos(response);
//         console.log(response);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };
//     fetchVideos();
//   }, []);

//   useEffect(() => {
//     if (videoRef.current) {
//       const player = videojs(videoRef.current, {
//         autoplay: false,
//         controls: true,
//         responsive: true,
//         fluid: true,
       

//       });
//       return () => {
//         if (player) {
//           player.dispose();
//         }
//       };
//     }
//   }, []);

//   return (
//     <div className="video-screen-background">
//       <div className="background-video-container">
//         <video autoPlay loop muted className="background-video">
//           <source src={video} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="text-overlay learning-content">
//           <h1>Welcome to Learning module</h1>
//           <p>You can access all the learning content here</p>
//         </div>
//       </div>
//       <div className="row" style={{ margin: 0 }}>
//         {videos?.map((video, index: any) => (
//           video?.map((item: any, index: number) => (
//             <div key={index} className="col-3" style={{ height: 250, padding: 40 }}>
//               <center>
//                 {/* Use a separate ref for each video player */}
//                 <video
//                   ref={(videoPlayerRef) => {
//                     if (videoPlayerRef) {
//                       const player = videojs(videoPlayerRef, {
//                         autoplay: false,
//                         controls: true,
//                         responsive: true,
//                         preload: 'auto',    // 'auto', 'metadata', or 'none'
//                         loop: false,
//                         fluid: true,
//                         poster: "https://static.vecteezy.com/system/resources/previews/002/221/017/original/cyber-technology-security-hacker-on-digital-screen-network-protection-background-design-illustration-free-vector.jpg",
//                         playbackRates: [0.5, 1, 1.5, 2],
                       
//                       });

//                       // Dispose the player when the component unmounts
//                       return () => {
//                         if (player) {
//                           player.dispose();
//                         }
//                       };
//                     }
//                     return null;
//                   }}
//                   className="video-js vjs-default-skin"
//                   controls
//                   width="100%"
//                   height="100%"
//                   data-setup="{}"
//                 >
//                   <source src={`http://localhost:4000/stream/${item?.id}`} type="video/mp4" />
//                 </video>
//                 <b style={{ padding: '10px', color: 'white' }}>{video.title}</b>
//               </center>
//             </div>
//           ))
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;