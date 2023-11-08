import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Themes } from "./Helpers/Theme";
import Loader from "./Helpers/Loadable";
import { PageFrame } from "./Helpers/Outlet";
import { getAxiosInstance } from "./ApiService/ApiServices";
const Login = React.lazy(() => import("./Application/Loginpage/index"));
const Home = React.lazy(() => import("./Application/Homepage/index"));
const Community = React.lazy(() => import("./Application/Community/Community"));
const UserProfile = React.lazy(() => import ("./Application/Profile/index"));
const Video = React.lazy(() => import ("./Application/Video/video"));
function App() {
  getAxiosInstance()
  return (
    <div>
      <Themes>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PageFrame />}>
            <Route path="/home" element={<Home />} />
            <Route path="/Profile" element={<UserProfile />} />
            <Route path="/Community" element={<Community />} />
            </Route>
            <Route path="/Course" element={<Video />} />
          </Routes>
        </Suspense>
      </Themes>
    </div>
  );
}

export default App;
