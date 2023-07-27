import request from "../utils/request";

export function getKey() {
  return request({
    url: `/user/key`,
    method: "GET",
  });
}

export function login(data) {
  return request({
    url: `/user/login`,
    method: "post",
    data,
  });
}
