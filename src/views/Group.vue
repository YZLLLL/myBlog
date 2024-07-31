<template>
  <div class="list-container" v-loading="loading">
    <ArticleList :articles="articles" />
    <el-empty v-if="articles&&articles.length==0" description="空空如也~" />
  </div>
  <!-- 当total为0时，page始终为1 -->
   <div class="pagination">
    <el-pagination style="margin-bottom: 12px" :current-page="page" @current-change="getCurrentPage" :page-size="size" layout="prev, pager, next" :total="total" />
   </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch, nextTick  } from "vue"
import { getArticles } from "../api/group"
import ArticleList from "../components/ArticleList.vue"

const route = useRoute();
const page = ref(1);
const size = ref(6);
const total = ref(0);
const articles = ref([]);
// const showPagination = ref(false);

// onMounted(() => {
//   getPageList(route.query.id);
// })

const loading = ref(false);
const getPageList = (groupId) => {
  loading.value = true;
  getArticles({
    page: page.value,
    limit: size.value,
    groupId
  }).then(({data}) => {
    total.value = data.total;
    articles.value = data.articles;
    // page.value = page.value;
  }).finally(() => {
    loading.value = false;
  })
}

const getCurrentPage = (newPage) => {
  page.value = newPage;
  // router.replace(`/group?id=${route.query.id}&page=${newPage}`)
  getPageList(route.params.id)
}

watch(()=>route.params.id, (id) => {
  if (id == undefined) return;
  page.value = 1;
  getPageList(id);
}, {immediate:true})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  --el-fill-color-blank: transparent;
}
</style>