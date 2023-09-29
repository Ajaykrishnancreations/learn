import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Logo from "../../Assets/Icon1.png";
import { signUp, login, userDetails } from "../../ApiService/ApiServices";
import jwt_decode from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Changed the state variable name
  const [password, setPassword] = useState(""); // Changed the state variable name
  const [isSignUp, setIsSignUp] = useState(false);
  const [course, setCourse] = useState("front-end");

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const Signup = async () => {
    try {
      const signupPayload = {
        name: firstName,
        email: email,
        phone: phone, // Use the correct state variable name
        password: password, // Use the correct state variable name
        role: course,
      };

      const signupResponse = await signUp(signupPayload);

      if (signupResponse.message === "User registered successfully") {
        const loginPayload = {
          email: email,
          password: password, // Use the correct state variable name
        };
        
        const loginResponse = await login(loginPayload);
        
        if (loginResponse?.message !== "Authentication failed") {
          const decodedToken = jwt_decode(loginResponse.accessToken);

          const userDetailsPayload = {
            userId: decodedToken,
            accessToken: loginResponse.accessToken,
          };

          const userDetailsResponse = await userDetails(userDetailsPayload);

          if (userDetailsResponse?.message !== "Authentication failed") {
            localStorage.setItem('session', JSON.stringify(userDetailsResponse));
            navigate("/home");
          } else {
            alert("Authentication failed during user details.");
          }
        } else {
          alert("Authentication failed during login.");
        }
      } else {
        alert("User registration failed.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // alert("Something went wrong during signup.");
    }
  };

  const handleSubmit = async () => {
    try {
      const loginPayload = {
        email: loginEmail,
        password: loginPassword,
      };
      const loginResponse = await login(loginPayload);
      if (loginResponse?.message !== "Authentication failed") {
        const decodedToken = jwt_decode(loginResponse.accessToken);
        const userDetailsPayload = {
          userId: decodedToken,
          accessToken: loginResponse.accessToken,
        };
        const userDetailsResponse = await userDetails(userDetailsPayload);
        if (userDetailsResponse?.message !== "Authentication failed") {
          localStorage.setItem('session', JSON.stringify(userDetailsResponse));
          navigate("/home");
        } else {
          alert("Authentication failed during user details.");
        }
      } else {
        alert("Authentication failed during login.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // alert("Something went wrong during login.");
    }
  };

  return (
    <>
      <Grid container>
        <Grid xs={6}>
          <img src="https://img.freepik.com/free-vector/science-atom-background-vector-gradient-blue-education-remix_53876-114102.jpg?w=826&t=st=1695205952~exp=1695206552~hmac=2d168229f5cf9fa9c4690db2d03d1655e6c859b53165116f0f82768979d5c48f4" alt="Background" />
        </Grid>
        <Grid xs={6} style={{ backgroundColor: "white", paddingTop: "10%" }}>
          <div className="login__maindiv--small">
            <center>
              <img className="mt-3" width={"100px"} src={Logo} alt="Logo" />
              <br />
              <Typography style={{ color: "#193389", fontWeight: 600, letterSpacing: 1 }}>E-Learning</Typography>
            </center>
            <div className="mt-4 w-50">
              {isSignUp ? (
                <>
                  <p className="font-grey-12-bold mb-1">Name</p>
                  <input className="form-control login-input" placeholder="Enter Your Name" type="text" onChange={(e) => setFirstName(e.target.value)} />
                  <p className="font-grey-12-bold mb-1 mt-2">EMAIL ID</p>
                  <input className="form-control login-input" placeholder="Enter Your Registered mail" type="text" onChange={(e) => setEmail(e.target.value)} />
                  <p className="font-grey-12-bold mb-1 mt-2">Phone</p>
                  <input className="form-control login-input" placeholder="Enter Phone Number" type="text" onChange={(e) => setPhone(e.target.value)} />
                  <p className="font-grey-12-bold mb-1 mt-2">Password</p>
                  <input className="form-control login-input" placeholder="Enter Password" type="text" onChange={(e) => setPassword(e.target.value)} />
                  <p className="font-grey-12-bold mb-1 mt-2">Select Course</p>
                  <select className="form-select login-input" onChange={(e) => setCourse(e.target.value)}>
                    <option value="front-end">Front-end Developer</option>
                    <option value="back-end">Back-end Developer</option>
                    <option value="full-stack">Full Stack Developer</option>
                  </select>
                  <button className="Button w-100 mt-4" onClick={Signup} data-testId="LoginPage-ChangePassword">
                    Verify & Sign in
                  </button>
                </>
              ) : (
                <>
                  <p className="font-grey-12-bold mb-1">EMAIL ID</p>
                  <input className="form-control login-input" placeholder="Enter Your Registered mail" type="text" onChange={(e) => setLoginEmail(e.target.value)} />
                  <p className="font-grey-12-bold mb-1 mt-2">Password</p>
                  <input className="form-control login-input" placeholder="Enter Password" type="text" onChange={(e) => setLoginPassword(e.target.value)} />
                  <button className="Button w-100 mt-4" onClick={handleSubmit} data-testId="LoginPage-ChangePassword">
                    login
                  </button>
                </>
              )}
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
