import { useUserStore } from "@/stores/user";
import router from "./index";

const whiteList = ["/login", "/home", "/group/*", "/article", "/search", "/open"];

const isWhiteList = (path: any) => {
  return whiteList.some((p) => new RegExp(p).test(path))
};
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.token) {
    if (to.path === "/login") return next({ path: "/" });
    if (userStore.adminRoutes.length) {
      return next();
    }
    await userStore.getUserInfo();
    await userStore.generateAdminRoutes();
    return next({ ...to, replace: true });
  } else {
    if (isWhiteList(to.path)) return next();
    return next(`/login?redirect=${to.fullPath ?? "/"}`);
  }
});
