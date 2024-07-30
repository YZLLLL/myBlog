<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
// import { useUserStore } from "./stores/user";
// const user = useUserStore();
// console.log(user)
const router = useRouter();
// 重写window.open
const open = window.open;

window.open = (url, ...args) => {
  return open(router.resolve(`/open?target=${url}`).href, ...args)
}


</script>

<template>
  <RouterView />
</template>
