import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import jwt from 'jsonwebtoken';
// todo 下载一个 浏览器端 解析jwt的库

export const useUserStore = defineStore('group', () => {
  
  const user = ref({})
  const setUser = (data) => {
    user.value = data
  }
  return { user, setUser }
})
