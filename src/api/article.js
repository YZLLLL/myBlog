import request from "../utils/request"

export function getArticle(id) {
  return request({
    url: `/article/${id}`,
    method: "GET"
  })
}

// 获取热门文章
// params:{ limit }
export function getHotArticle(params) {
  return request({
    url: `/article/hot`,
    method: "GET",
    params
  })
}

// 点赞
export function like(data) {
  return request({
    url: `/article/like`,
    method: "POST",
    data
  })
}