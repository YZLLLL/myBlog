import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { getInfo } from '@/api/user'
import router from '@/router'
import System from '@/router/modules/system'

import type { RouteRecordRaw } from 'vue-router' 

export const useUserStore = defineStore('user', () => {

  const token = ref<string | null>(localStorage.getItem('blog-user-token'))

  const setToken = (str: string | null) => {
    token.value = str
    if (str === null) {
      localStorage.removeItem('blog-user-token')
    } else {
      localStorage.setItem('blog-user-token', str)
    }
  }
  
  const theme = ref<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' ?? 'light')
  watch(() => theme.value, (val) => {
      localStorage.setItem('theme', val)
  })
  const switchTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const userInfo = ref<{
    username: string
  } | null>()
  const getUserInfo = () => {
    return getInfo().then((res: any) => {
      userInfo.value = res.data
    })
  }

  const adminRoutes = ref<RouteRecordRaw[]>([])
  const generateAdminRoutes = () => {
    [...System].forEach((route) => {
      adminRoutes.value.push(route)
      addRoute(route)
    })
  }
  function addRoute(route: RouteRecordRaw) {
    router.addRoute(route)
    if (route.children?.length) {
      route.children.forEach((child) => {
        if (child.path.startsWith('/')) child.path = child.path.slice(1)
        child.path = `${route.path}/${child.path}`
        addRoute(child)
      })
    }
  }


  const logout = () => {
    setToken(null)
    userInfo.value = null
    adminRoutes.value = []
  }

  return { theme, switchTheme, token ,setToken, userInfo, getUserInfo, adminRoutes, generateAdminRoutes, logout }
})

