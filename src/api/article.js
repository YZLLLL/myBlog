import request from "../utils/request";

export function getArticle(id) {
  return request({
    url: `/article/get?id=${id}`,
    method: "GET",
  });
}

// 获取热门文章
// params:{ limit }
export function getHotArticle(params) {
  return request({
    url: `/article/hot`,
    method: "GET",
    params,
  });
}

// 获取最新的文章
// params:{ limit }
export function getLatestArtcile(params) {
  return request({
    url: `/article/latest`,
    method: "GET",
    params,
  });
}

// 点赞
export function like(data) {
  return request({
    url: `/article/like`,
    method: "POST",
    data,
  });
}

// 搜索文章
export function search(params, config = {}) {
  return request({
    url: `/article/search`,
    method: "GET",
    params,
    ...config
  });
}
