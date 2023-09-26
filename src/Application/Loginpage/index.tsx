import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Logo from "../../Assets/Icon1.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Add state for sign-up form
  const [course, setCourse] = useState("front-end");

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async () => {
    navigate("/home");
  };

  return (
    <>
      <Grid container>
        <Grid
          xs={6}
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-vector/science-atom-background-vector-gradient-blue-education-remix_53876-114102.jpg?w=826&t=st=1695205952~exp=1695206552~hmac=2d168229f5cf9fa9c4690db2d03d1655e6c859b5316516f0f82768979d5c48f4")',
            height: "100vh",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundSize: "cover",
            backgroundSize: "cover",
          }}
        ></Grid>
        <Grid xs={6} style={{ backgroundColor: "white", paddingTop: "10%" }}>
          <div className="login__maindiv--small">
            <center>
              <img className="mt-3" width={"100px"} src={Logo} />
              <br />
              <Typography style={{ color: "#193389", fontWeight: 600, letterSpacing: 1 }}>E-Learning</Typography>
            </center>
            <div className="mt-4 w-50">
              {isSignUp ? ( // Render sign-up form if isSignUp is true
                <>
                  <p className="font-grey-12-bold mb-1">First Name</p>
                  <input className="form-control login-input" placeholder="Enter Your First Name" type="text" />
                  <p className="font-grey-12-bold mb-1 mt-2">Last Name</p>
                  <input className="form-control login-input" placeholder="Enter Your Last Name" type="text" />
                  <p className="font-grey-12-bold mb-1 mt-2">EMAIL ID</p>
                  <input className="form-control login-input" placeholder="Enter Your Registered mail" type="text" />
                  <p className="font-grey-12-bold mb-1 mt-2">Password</p>
                  <input className="form-control login-input" placeholder="Enter Password" type="text" />
                  <p className="font-grey-12-bold mb-1 mt-2">Select Course</p>
                  <select className="form-select login-input" onChange={(e) => setCourse(e.target.value)}>
                    <option value="front-end">Front-end Developer</option>
                    <option value="back-end">Back-end Developer</option>
                    <option value="full-stack">Full Stack Developer</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="font-grey-12-bold mb-1">EMAIL ID</p>
                  <input className="form-control login-input" placeholder="Enter Your Registered mail" type="text" onChange={(e) => setEmail(e.target.value)} />
                  <p className="font-grey-12-bold mb-1 mt-2">Password</p>
                  <input className="form-control login-input" placeholder="Enter Password" type="text" onChange={(e) => setPassword(e.target.value)} />
                </>
              )}
              <button className="Button w-100 mt-4" onClick={() => handleSubmit()} data-testId="LoginPage-ChangePassword">
                {isSignUp ? "Sign Up" : "Verify & Sign in"} {/* Change button text based on isSignUp */}
              </button>
              <p className="font-grey-12-bold mt-2 float-end">
                {isSignUp ? (
                  <>
                    Already have an account? <button className="back-border-none" onClick={handleToggleSignUp}>Sign in</button>
                  </>
                ) : (
                  <>
                    Don't have an Account? <button className="back-border-none" onClick={handleToggleSignUp}>Sign up</button>
                  </>
                )}
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;