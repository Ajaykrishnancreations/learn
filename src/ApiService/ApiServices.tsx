import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

let appConfig: any;
let axiosInstance: AxiosInstance | undefined;
const configUrl = 'http://localhost:4000';

export const getAxiosInstance = (data: any) => {
  if (axiosInstance) {
    return axiosInstance;
  }

  appConfig = data[0]?.config;
  axiosInstance = axios.create({
    baseURL: `${configUrl}`,
    timeout: 15000,
  });

  axiosInstance?.interceptors.request.use((req) => {
    const token = localStorage.getItem("Access_Token");
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  // Response interceptor for API calls
  axiosInstance?.interceptors.response.use(
    (resp) => {
      return resp;
    },
    async function (error) {
      if (!error.response?.config && error.response?.status !== 401) {
        return error;
      }
      var config: AxiosRequestConfig = {
        method: "get",
        baseURL: `${appConfig.tokenUrl}`,
      };
      return axios(config).then(function (response) {
        localStorage.setItem("Access_Token", response.data.access_token);
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
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}`,
      method: 'post',
      data: payload
    });

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; 
  }
}
};

export interface login {
  email: string;
  password: string;
}
export const login = async (payload: login) => {
  const path = `/login`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}`,
      method: 'post',
      data: payload
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};

export interface loginDetail {
  accessToken: any;
  userId: any;
}
export const userDetails = async (payload:loginDetail) => {
  const path = `/view/user`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}/${payload.userId.userId}`,
      method: 'get',
      headers:{access_token:payload.accessToken}
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};
interface emailPayload{
  email:string
}
export const getCourse = async (emailPaylod:emailPayload) => {
  const path = `/getcourse`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}`,
      method: 'get',
      data:{emailPaylod}
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};

export const getAllStudentInfo = async () => {
  const path = `/getAllStudentInfo`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}`,
      method: 'get',
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};

export const getUserInfo = async (Payload:any) => {
  const path = `/getUserDetais`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}/${Payload?.email}`,
      method: 'get',
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};

export interface post {
  title:string
  img:string
  description:string
  role:string
}

export const postCourse = async (payload: post) => {
  const path = `/addcourse`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}`,
      method: 'post',
      data: payload
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};

export interface userUpdate {
  _id:string
  name:string
}
export const userUpdate = async (payload: userUpdate) => {
  const path = `/updateUser`;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: `${configUrl}`,
    });
  }
  else{
  try {
    const response = await axiosInstance.request({
      url: `${path}`,
      method: 'put',
      data: payload
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};