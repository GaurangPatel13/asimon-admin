import { Axios } from "../constants/mainContent";

const apiUrl = "/admin";

export async function addNews(payload) {
  const response = await Axios.post(`${apiUrl}/news-create`, payload);
  return response?.data;
}
export async function addCategory(payload) {
  const response = await Axios.post(`${apiUrl}/add-category`, payload);
  return response?.data;
}

export async function addSubCategory(payload) {
  const response = await Axios.post(`${apiUrl}/add-subcategory`, payload);
  return response?.data;
}

export async function addChildCategory(payload) {
  const response = await Axios.post(`${apiUrl}/add-subsubcategory`, payload);
  return response?.data;
}

export async function getAllCategories() {
  const response = await Axios.get(`${apiUrl}/allcategories`);
  return response?.data;
}

export async function getSubCategorybyCategory(category) {
  const response = await Axios.get(
    `${apiUrl}/getSubcategories/?category=${category}`
  );
  return response?.data;
}

export async function addProductForm(payload) {
  const response = await Axios.post(`${apiUrl}/product/create`, payload);
  return response?.data;
}

export async function getAllProducts() {
  const response = await Axios.get(`${apiUrl}/product/all-products`);
  return response?.data;
}

export async function deleteProduct(id) {
  const response = await Axios.delete(`${apiUrl}/deleteProduct/${id}`);
  return response?.data;
}

export async function updateStockStatus(id) {
  const response = await Axios.put(`${apiUrl}/product/${id}/inStock`);
  return response?.data;
}

export async function editProduct(id, data) {
  const response = await Axios.put(
    `${apiUrl}/product/updateproduct/${id}`,
    data
  );
  return response?.data;
}

export async function getAllUsersList() {
  const response = await Axios.get(`${apiUrl}/get-users`);
  return response?.data;
}

export async function updateUserRank(id, data) {
  const response = await Axios.put(`${apiUrl}/updateRank/${id}`, data);
  return response?.data;
}
export async function deleteUser(id) {
  const response = await Axios.delete(`${apiUrl}/deleteUser/${id}`);
  return response?.data;
}

export async function getDashboardDetails() {
  const response = await Axios.get(`${apiUrl}/user-dashboard`);
  return response?.data;
}

export async function getUserById(id) {
  const response = await Axios.get(`${apiUrl}/getUser/${id}`);
  return response?.data;
}

export async function updateUser(id, data) {
  const response = await Axios.put(`${apiUrl}/updateUser/${id}`, data);
  return response?.data;
}

export async function getAllOrders() {
  const response = await Axios.get(`${apiUrl}/myOrders`);
  return response?.data;
}

export async function updateUserProfile(id, data) {
  console.log(id, data);
  const response = await Axios.put(`${apiUrl}/update-user/${id}`, data);
  return response?.data;
}

export async function getUserByFcid(data) {
  const response = await Axios.post(`${apiUrl}/get-user-by-fcid`, data);
  return response?.data;
}

export async function addFund(data) {
  const response = await Axios.post(`${apiUrl}/add-fund`, data);
  return response?.data;
}

export async function getFundRequest() {
  const response = await Axios.get(`${apiUrl}/all-transactions`);
  return response?.data;
}
export async function createFranchiseeAPI(data) {
  const response = await Axios.post(`${apiUrl}/franchisee/create`, data);
  return response?.data;
}
export async function fetchFranchisees() {
  const response = await Axios.get(`${apiUrl}/get-all-franchisee`);
  return response?.data;
}
export async function getAllCategory() {
  const response = await Axios.get(`${apiUrl}/allcategories`);
  return response?.data;
}

export async function getUsersStatus() {
  const response = await Axios.get(`${apiUrl}/get-users-status`);
  return response?.data;
}

export async function createPlan(data) {
  const response = await Axios.post(`${apiUrl}/create-plan`, data);
  return response?.data;
}

export async function getAllPlansList() {
  const response = await Axios.get(`${apiUrl}/get-all-plans`);
  return response?.data;
}

export async function updatePlan(id, data) {
  const response = await Axios.put(`${apiUrl}/update-plan/${id}`, data);
  return response?.data;
}

export async function deletePlan(id) {
  const response = await Axios.delete(`${apiUrl}/delete-plan/${id}`);
  return response?.data;
}
