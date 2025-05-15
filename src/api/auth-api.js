import { Axios } from "../constants/mainContent";

const apiUrl = "/admin";

export async function loginWithEmailAdmin(payload) {
  const response = await Axios.post(`${apiUrl}/login`, payload);
  return response?.data;
}

export async function createDistributor(payload) {
  const response = await Axios.post(`${apiUrl}/userRegistration`, payload);
  return response?.data;
}


// *********************************************************************