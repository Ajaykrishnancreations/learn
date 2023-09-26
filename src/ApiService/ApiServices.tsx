import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
let appConfig: any;
export let axiosInstance: AxiosInstance | undefined;
const configUrl = 'https://localhost:4000';

interface contact{
  id:string
  password:string
}


export const getAxiosInstance = (data: any) => {
  if (axiosInstance) {
    return axiosInstance;
  }

  appConfig = data[0]?.config;
  axiosInstance = axios.create({
    baseURL: `${appConfig.apiBaseUrl}`,
    timeout: 15000,
  });

  axiosInstance?.interceptors.request.use((req) => {
    const token = localStorage.getItem("Access_Token");
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
  //Response interceptor for API calls
  axiosInstance?.interceptors.response.use(
    (resp) => {
      return resp;
    },
    async function (error) {
      console.log("ApiService: Interceptor: ", error);
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
  const path = 'https://localhost:4000';
  const res = await axios.get(`${configUrl}/${path}`);
  return res && res.data ? res.data : null;
};

// Login method
export const Login = async (contact:contact) => {
  const path = `api/id?${contact.id}&password?${contact.password}`;
  const res = await axios.post(`${configUrl}/${path}`);
  return res && res.data ? res.data : null;
};