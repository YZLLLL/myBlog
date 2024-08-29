import type { RouteRecordRaw } from 'vue-router' 
const System: RouteRecordRaw[] = [{
  path: '/operate',
  name: 'operate',
  component: () => import('@/views/operate/index.vue'),
  children: [{
    path: 'addArticle',
    name: 'addArticle',
    component: () => import('@/views/operate/AddArticle.vue'),
  }, {
    path: 'articleList',
    name: 'articleList',
    component: () => import('@/views/operate/ArticleList.vue'),
  }, {
    path: 'editArticle/:id',
    name: 'editArticle',
    component: () => import('@/views/operate/EditArticle.vue'),
  }]
},]

export default System
