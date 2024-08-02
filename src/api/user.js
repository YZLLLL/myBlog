import request from "../utils/request";

export function getKey() {
  return request({
    url: `/user/key`,
    method: "GET",
  });
}

export function getInfo() {
  return request({
    url: `/user/getInfo`,
    method: "get",
  });
}

export function login(data) {
  return request({
    url: `/user/login`,
    method: "post",
    data,
  });
}
