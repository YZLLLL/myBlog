<template>
  <div class="list-container">
    <div class="article-item" @click="goArticle(item)" v-for="item in articles" :key="item.id">
      <img class="cover" src="" alt="" />
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <div class="intro">{{ item.introduction }}</div>
      </div>
    </div>
    
    <el-empty v-if="articles&&articles.length==0" description="空空如也~" />
  </div>
  <el-pagination v-model:current-page="page" @current-change="getPageList(route.query.id)" :page-size="size" background layout="prev, pager, next" :total="total" />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue"
import { getArticles } from "../api/group"

const page = ref(1);
const size = ref(3);
const total = ref(0);
const articles = ref([])

const getPageList = (groupId) => {
  getArticles({
    page: page.value,
    limit: size.value,
    groupId
  }).then(({data}) => {
    total.value = data.total;
    articles.value = data.articles;
  })
}

const router = useRouter();
const goArticle = (item) => {
  router.push(`/group/article?id=${item.id}`)
}

const route = useRoute();
onMounted(() => {
  getPageList(route.query.id);
})
watch(()=>route.query, (value) => {
  page.value = 1;
  console.log(2)
  getPageList(value.id);
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

}
.title {
  font-size: 16px;
}
.intro {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.6;
}

</style>