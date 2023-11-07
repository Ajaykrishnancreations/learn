import { Alert } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";

let appConfig: any;
const configUrl = 'http://localhost:4000';

export const getAxiosInstance = () => {
  axios?.interceptors.request.use((req) => {
    const token = localStorage.getItem("accessToken");
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  // Response interceptor for API calls
  axios?.interceptors.response.use(
    (resp) => {
      return resp;
    },
    async function (error) {
      const refreshTokens = {
        refreshToken:localStorage.getItem("refreshToken")
      };
      if(error.response?.status === 401)
      {
        refreshToken(refreshTokens)
      }
      if(error.response?.status === 500)
      {
        // alert("Please logout and login again");
      }
      if (!error.response?.config) {
        return error;
      }
      var config: AxiosRequestConfig = {
        method: "get",
        baseURL: `${appConfig.tokenUrl}`,
      };
      return axios(config).then(function (response) {
        localStorage.setItem("accessToken", response.data.access_token);
        error.response.config.headers["Authorization"] = `Bearer ${response.data.access_token}`;
        return axios(error.response.config);
      });
    }
  );
};

export const getConfig = async () => {
  const path = 'http://localhost:4000';
  const res = await axios.get(`${configUrl}/${path}`);
  return res && res.data ? res.data : null;
};

// Login method
export interface signUp {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export const signUp = async (payload: signUp) => {
  const path = `/register`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'post',
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
};

export interface login {
  email: string;
  password: string;
}
export const login = async (payload: login) => {
  const path = `/login`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'post',
        data: payload
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export interface loginDetail {
  accessToken: any;
  userId: any;
}
export const userDetails = async (payload: loginDetail) => {
  const path = `/view/user`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}/${payload.userId.userId}`,
        method: 'get',
        headers: { access_token: payload.accessToken }
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};
interface emailPayload {
  email: string
}
export const getCourse = async (emailPaylod: emailPayload) => {
  const path = `/getcourse`;
  try {
    const response = await axios.request({
      url: `${configUrl}${path}`,
      method: 'get',
      data: { emailPaylod }
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllStudentInfo = async () => {
  const path = `/getAllStudentInfo`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'get',
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

export const getUserInfo = async (Payload: any) => {
  const path = `/getUserDetais`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}/${Payload?.email}`,
        method: 'get',
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
export interface post {
  title: string
  img: string
  description: string
  role: string
}
export const postCourse = async (payload: post) => {
  const path = `/addcourse`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'post',
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};
export interface userUpdate {
  _id: string
  name: string
}
export const userUpdate = async (payload: userUpdate) => {
  const path = `/updateUser`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'put',
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const getPosts = async () => {
  const path = `/getPosts`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'get',
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
export interface CommunityPost {
  name: string
  img: any
  description: any
}

export const addPost = async (payload: CommunityPost) => {
  const path = `/addNewPost`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'post',
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export interface courseUpdate {
  _id: any
title: string|number
img:any
description:string|number
role:any
}
export const courseUpdates = async (payload: courseUpdate) => {
  const path = `/courseUpdate`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'put',
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const refreshToken = async (payload: any) => {
  console.log(payload,"payloadpayload");
  const path = `/RefreshToken`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'post',
        data: payload
      });
      localStorage.setItem('accessToken',response?.data?.accessToken);
      localStorage.setItem('refreshToken',response?.data?.refreshToken);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;

    }
};
export const addVideo = async (payload: any) => {
  const path = `/addNewVideo`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'post',
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const getVideos = async () => {
  const path = `/getVideos`;
    try {
      const response = await axios.request({
        url: `${configUrl}${path}`,
        method: 'get',
      });
      return response.data;

    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }