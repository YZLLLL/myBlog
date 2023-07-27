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

export function like(data) {
  return request({
    url: `/comment/like`,
    method: "POST",
    data,
  });
}

export function add(data) {
  return request({
    url: `/comment/add`,
    method: "POST",
    data,
  });
}

export function count(params) {
  return request({
    url: `/comment/count`,
    method: "GET",
    params,
  });
}

