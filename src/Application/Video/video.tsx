import React, { FunctionComponent,useState } from "react";
import VideoPlayer from './videoPlayer';

const Video: FunctionComponent = () => {
      return (
        <div className="App">
        <h1>Video.js in React TypeScript with Yarn</h1>
        <VideoPlayer />
      </div>
      );
    };
export default Video;