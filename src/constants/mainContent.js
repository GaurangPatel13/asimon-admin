import axios from "axios";
import logo from "../assets/images/logo.png";

export const MainContent = {
  name: "Asimon Dynamics",
  logo: logo,
};
export const backendConfig = {
  base: "http://192.168.1.60:5047/api",
  origin: "http://192.168.1.60:5047",
  
  // base: "https://cnfp6kct-5049.inc1.devtunnels.ms/api",
  // origin: "https://cnfp6kct-5049.inc1.devtunnels.ms/",
  // base: "https://adm.api.smartchainstudio.in/api",
  // origin: "https://adm.api.smartchainstudio.in",

  // base: "https://asimon.api.smartchainstudio.in/api",
  // origin: "https://asimon.api.smartchainstudio.in",
};

const token = localStorage.getItem("token");
export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
 