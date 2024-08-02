import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: "/home",
      component: () => import('../views/Main.vue'),
      children: [{
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
      }, {
        path: '/group/:id',
        name: 'group',
        component: () => import('../views/Group.vue'),
      }, {
        path: '/article',
        name: 'article',
        component: () => import('../views/Article.vue')
      }, {
        path: '/search',
        name: 'search',
        component: () => import('../views/Search.vue')
      }]
    },
    {
      path: '/open',
      name: 'open',
      component: () => import('../views/Open.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
