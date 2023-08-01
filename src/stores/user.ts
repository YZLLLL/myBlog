import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('group', () => {
  
  const user = ref({})
  const setUser = (data) => {
    user.value = data
  }
  return { user, setUser }
})
