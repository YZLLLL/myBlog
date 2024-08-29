import request from "../utils/request";

export function getArticle(id) {
  return request({
    url: `/article/get?id=${id}`,
    method: "GET",
  });
}

export function getArticleList(params) {
  return request({
    url: `/article/list`,
    method: "GET",
    params
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
export function getLatestArticle(params) {
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

// 添加文章
export function addArticle(data) {
  return request({
    url: `/article/add`,
    method: "POST",
    data,
  });
}

// 删除文章
export function delArticle(data) {
  return request({
    url: `/article/del`,
    method: "POST",
    data,
  });
}

// 删除文章
export function showArticle(data) {
  return request({
    url: `/article/show`,
    method: "POST",
    data,
  });
}

// 修改文章
export function editArticle(data) {
  return request({
    url: `/article/edit`,
    method: "POST",
    data,
  });
}

