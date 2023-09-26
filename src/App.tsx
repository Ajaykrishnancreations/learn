import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Themes } from "./Helpers/Theme";
import Loader from "./Helpers/Loadable";
import { PageFrame } from "./Helpers/Outlet";
const Login = React.lazy(() => import("./Application/Loginpage/index"));
const Home = React.lazy(() => import("./Application/Homepage/index"))
const UserProfile = React.lazy(() => import ("./Application/Profile/index"))
function App() {
  return (
    <div>
      <Themes>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PageFrame />}>
              <Route path="/home" element={<Home />} />
               <Route path="/Profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </Themes>
    </div>
  );
}

export default App;
