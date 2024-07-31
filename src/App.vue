<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStroe = useUserStore()
// console.log(user)
const router = useRouter();
// 重写window.open
const open = window.open;

window.open = (url, ...args) => {
  return open(router.resolve(`/open?target=${url}`).href, ...args)
}

onMounted(() => {
  watch(() => userStroe.theme, (val) => {
    if (val === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, {immediate: true})
})


</script>

<template>
  <RouterView />
</template>
