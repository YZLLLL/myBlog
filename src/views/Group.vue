<template>
  <div class="list-container" v-loading="loading">
    <div class="article-item" @click="goArticle(item)" v-for="item in articles" :key="item.id">
      <img class="cover" src="" alt="" />
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <div class="intro text-line-2">{{ item.introduction }}</div>
      </div>
    </div>
    
    <el-empty v-if="articles&&articles.length==0" description="空空如也~" />
  </div>
  <!-- 当total为0时，page始终为1 -->
  <el-pagination style="margin-bottom: 16px" :current-page="page" @current-change="getCurrentPage" :page-size="size" background layout="prev, pager, next" :total="total" />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch, nextTick  } from "vue"
import { getArticles } from "../api/group"

const route = useRoute();
const page = ref(1);
const size = ref(2);
const total = ref(0);
const articles = ref([]);
// const showPagination = ref(false);

onMounted(() => {
  getPageList(route.query.id);
})

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
  getPageList(route.query.id)
}

const router = useRouter();
const goArticle = (item) => {
  router.push(`/article?id=${item.id}`)
}


watch(()=>route.query.id, (id) => {
  getPageList(id);
})
</script>

<style scoped>
.list-container {
  padding: 10px 20px;
  margin-bottom: 20px;
  /* min-height: calc(100vh - 60px + 60px + 80px); */
  background-color: #fff;
  border-radius: 20px;
}
.article-item {
  display: flex;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid #c8c9cc;
  cursor: pointer;
  /* border-radius: 20px; */
}
.article-item:hover {
  background-color: #f4f4f5;
}
.article-item:hover .text {
  text-decoration: underline;
  color: #409EFF;
  transform: scale(1.01);
}

.article-item:last-of-type {
  border-bottom: none;
}
.cover {
  width: 80px;
  height: 80px;
  margin-right: 40px;
  flex-shrink: 0;
}
.text {
  transition: all 0.1s;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.intro {
  margin-top: 6px;
  font-size: 14px;
  opacity: 0.6;
  line-height: 24px;
}

</style>