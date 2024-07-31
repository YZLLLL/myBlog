import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGroupStore = defineStore('group', () => {
  const group = ref({})
  const setGroup = (data) => {
    group.value = data
  }
  const menus = ref<any[]>([])
  const setMenus = (data: any[]) => {
    menus.value = data
  }
  return { group, setGroup, menus, setMenus }
})
