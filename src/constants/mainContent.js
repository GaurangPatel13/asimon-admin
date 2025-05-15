import axios from "axios";
import logo from "../assets/images/logo.png";

export const MainContent = {
  name: "Aetheric Dynamics",
  logo: logo,
};
export const backendConfig = {
  // base: "http://192.168.29.192:8080/api",
  // origin: "http://192.168.29.192:8080",

  base: "https://cnfp6kct-5047.inc1.devtunnels.ms/api",
  origin: "https://cnfp6kct-5047.inc1.devtunnels.ms/",
  // base: "https://adm.api.smartchainstudio.in/api",
  // origin: "https://adm.api.smartchainstudio.in",

  // base: "https://api.uniquedirectselling.in/api",
  // origin: "https://api.uniquedirectselling.in",
};

const token = localStorage.getItem("token");
export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
