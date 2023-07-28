<template>
  <div class="search-result">为您找到相关结果{{ total }}个</div>
  <div class="list-container" v-loading="loading">

    <ArticleList :articles="articles" />

    <el-empty v-if="articles&&articles.length==0" description="暂无搜索结果~" />
  </div>
  <el-pagination style="margin-bottom: 16px" :current-page="page" @current-change="getCurrentPage" :page-size="size" layout="prev, pager, next" :total="total" />

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
import ArticleList from "../components/ArticleList.vue"

const loading = ref(false);
const page = ref(1);
const size = 10;
const total = ref(0);
const articles = ref([])
function searchArticles(keyword) {
  loading.value = true;
  search({
    keyword,
    page: page.value,
    size
  }).then(({data}) => {
    articles.value = data.articles;
    total.value = data.total;
  }).finally(() => {
    loading.value = false;
  })
}

function getCurrentPage(newPage) {
  page.value = newPage;
  searchArticles(route.query.s)
}

const route = useRoute();
watch(() => route.query.s,(s) => {
  console.log(s)
  searchArticles(s)
}, {immediate: true})
</script>

<style scoped>
.search-result {
  font-style: italic;
  opacity: 0.6;
  font-size: 15px;
  letter-spacing: 0.1em;
}
</style>