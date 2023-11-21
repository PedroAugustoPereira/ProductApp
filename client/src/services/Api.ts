import axios from "axios";

const baseUrl = "http://localhost:3000";

const Api = axios.create({
  baseURL: baseUrl,
});

export default Api;
