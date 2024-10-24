import axios from "axios";

const { create } = axios;
import type { NewAxiosInstance } from "@src/typings/http";

// 实例化 axios
const http = create({
  baseURL: "https://tzkserver.omnifield.xyz",
  headers: { "Content-Type": "application/json" },
  timeout: 15 * 60 * 1000,
}) as NewAxiosInstance;

// 请求拦截器
http.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  async (response) => {
    let result; // 默认值
    if (response.data.success) {
      result = Promise.resolve(response);
    } else {
      result = Promise.reject(response);
    }
    return result;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
