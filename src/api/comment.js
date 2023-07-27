import request from "../utils/request";

export function getTopComments(params) {
  return request({
    url: `/comment/getTop`,
    method: "GET",
    params,
  });
}

export function getSubComments(params) {
  return request({
    url: `/comment/getSub`,
    method: "GET",
    params,
  });
}
