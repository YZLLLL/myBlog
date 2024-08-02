import axios from "axios";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/user";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // api 的 base_url
  timeout: 60 * 1000, // 请求超时时间
});
instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json;charset=utf-8";
  const userStore = useUserStore()
  let token = userStore.token;
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
    const code = error.response.status;
    if (code == 501) {
      ElNotification.error({
        message: error.message,
      });
    }

    if (code === 401) {
      ElNotification.error({
        message: "登录过期，请重新登录",
      })
      const userStore = useUserStore()
      userStore.logout()
      location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
