import request from "../utils/request"

export function getGroups() {
  return request({
    url: '/group/get',
    method: "GET"
  })
}


export function getArticles(params) {
  return request({
    url: '/group/getArticles',
    method: "GET",
    params
  })
}

