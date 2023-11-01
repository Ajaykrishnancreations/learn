import React, { FunctionComponent,useState } from "react";
import VideoPlayer from './videoPlayer';

const video = require('../../Assets/Sample Video.mp4');

const Video: FunctionComponent = () => {
    const videoSource = video;
      return (
        <div className="App">
          <h1>React Video Player</h1>
          <div style={{borderRadius:"40px"}}><VideoPlayer videoSrc={videoSource} /></div>
        </div>
      );
    };
export default Video;