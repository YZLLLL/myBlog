import type { RouteRecordRaw } from 'vue-router' 
const System: RouteRecordRaw[] = [{
  path: '/operate',
  name: 'operate',
  component: () => import('@/views/operate/index.vue'),
  children: [{
    path: 'addArticle',
    name: 'addArticle',
    component: () => import('@/views/operate/AddArticle.vue'),
  }]
},]

export default System