<template>
  <div v-loading="loading">1231231</div>
</template>


<script setup>
/**
 * todo
 * 完成这个组件
 * 将group组件的article列表项目拆成一个组件
 */
import { ref, watch } from "vue";
import { search } from "../api/article"
import { useRoute } from "vue-router";
const route = useRoute();
watch(() => route.query.i,(s) => {
  searchArticles(s)
})

const loading = ref(false);
const page = ref(1);
const size = 10;
const total = ref(0);
function searchArticles(keyword) {
  loading.value = true;
  search({
    keyword,
    page,
    size
  }).then(({data}) => {
    console.log(data)
  }).finally(() => {
    loading.value = false;
  })
}
</script>

<style>

</style>