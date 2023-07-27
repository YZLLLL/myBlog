import axios from "axios";
import { ElNotification } from "element-plus";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000", // api 的 base_url
  timeout: 60 * 1000, // 请求超时时间
});
instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json;charset=utf-8";
  let token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});
instance.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    console.log(error);
    if (error.code == 501) {
      ElNotification.error({
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
