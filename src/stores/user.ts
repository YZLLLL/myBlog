import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const user = ref({})
  const setUser = (data) => {
    user.value = data
  }

  const theme = ref<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' ?? 'light')
  watch(() => theme.value, (val) => {
      localStorage.setItem('theme', val)
  })
  const switchTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  return { user, setUser, theme, switchTheme }
})
