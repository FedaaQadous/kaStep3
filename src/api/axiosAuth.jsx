import axios from "axios";

const token =localStorage.getItem("userToken")
const axiosAuth = axios.create({
  baseURL: 'https://mytshop.runasp.net/api/',
  headers: {
    Authorization:`Bearer ${token}`
}
});

export default axiosAuth;