import axios from "axios";

const apiServer = axios.create({
  baseURL: "/api",
});

export default apiServer;
