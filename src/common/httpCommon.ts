import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
