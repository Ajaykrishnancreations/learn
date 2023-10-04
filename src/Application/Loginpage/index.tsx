import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Logo from "../../Assets/Icon1.png";
import { signUp, login, userDetails } from "../../ApiService/ApiServices";
import jwt_decode from 'jwt-decode';

type FormData = {
  firstName: string;
  email: string;
  phone: string;
  password: string;
  course: string;
  loginEmail: string;
  loginPassword: string;
};

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const onSubmitSignup: SubmitHandler<FormData> = async (data) => {
    try {
      const signupPayload = {
        name: data.firstName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.course,
      };

      const signupResponse = await signUp(signupPayload);

      if (signupResponse.message === "User registered successfully") {
        const loginPayload = {
          email: data.email,
          password: data.password,
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
    }
  };

  const onSubmitLogin: SubmitHandler<FormData> = async (data) => {
    try {
      const loginPayload = {
        email: data.loginEmail,
        password: data.loginPassword,
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
    }
  };

  return (
    <>
      <Grid container>
      <Grid xs={6}>
          <img style={{height:"100%"}} src="https://img.freepik.com/free-vector/science-atom-background-vector-gradient-blue-education-remix_53876-114102.jpg?w=826&t=st=1695205952~exp=1695206552~hmac=2d168229f5cf9fa9c4690db2d03d1655e6c859b53165116f0f82768979d5c48f4" alt="Background" />
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
                <form onSubmit={handleSubmit(onSubmitSignup)}>
                  <p className="font-grey-12-bold mb-1">Name</p>
                  <input
                    className="form-control login-input"
                    placeholder="Enter Your Name"
                    type="text"
                    {...register("firstName", { required: "Name is required" })}
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}

                  <p className="font-grey-12-bold mb-1">EMAIL ID</p>
                  <input
                    className="form-control login-input"
                    placeholder="Enter Your Registered mail"
                    type="text"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}

                  <p className="font-grey-12-bold mb-1">Phone</p>
                  <input
                    className="form-control login-input"
                    placeholder="Enter Phone Number"
                    type="text"
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone && <p>{errors.phone.message}</p>}

                  <p className="font-grey-12-bold mb-1">Password</p>
                  <input
                    className="form-control login-input"
                    placeholder="Enter Password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}

                  <p className="font-grey-12-bold mb-1">Select Course</p>
                  <select className="form-select login-input" {...register("course")}>
                    <option value="front-end">Front-end Developer</option>
                    <option value="back-end">Back-end Developer</option>
                    <option value="full-stack">Full Stack Developer</option>
                  </select>

                  <button className="Button w-100 mt-4" type="submit" data-testId="LoginPage-ChangePassword">
                    Verify & Sign in
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                  <p className="font-grey-12-bold mb-1">EMAIL ID</p>
                  <input
                    className="form-control login-input"
                    placeholder="Enter Your Registered mail"
                    type="text"
                    {...register("loginEmail", { required: "Email is required" })}
                  />
                  {errors.loginEmail && <p>{errors.loginEmail.message}</p>}

                  <p className="font-grey-12-bold mb-1 mt-2">Password</p>
                  <input
                    className="form-control login-input"
                    placeholder="Enter Password"
                    type="password"
                    {...register("loginPassword", { required: "Password is required" })}
                  />
                  {errors.loginPassword && <p>{errors.loginPassword.message}</p>}

                  <button className="Button w-100 mt-4" type="submit" data-testId="LoginPage-ChangePassword">
                    Login
                  </button>
                </form>
              )}
              <p className="font-grey-12-bold mt-2 float-end">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <button className="back-border-none" onClick={handleToggleSignUp}>
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an Account?{" "}
                    <button className="back-border-none" onClick={handleToggleSignUp}>
                      Sign up
                    </button>
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
