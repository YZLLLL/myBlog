<template>
  <TransitionGroup name="list" tag="div">
    <div class="article-item" @click="goArticle(item)" v-for="item in articles" :key="item.id">
      <img class="cover" :src="item.cover || 'https://fbimg.fangxinxue.net/plan/202108/27/163006392734634.jpeg'" alt="" />
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <div class="intro text-line-2">{{ item.introduction }}</div>
        <div class="footer">
          <el-icon><View /></el-icon>
          <span class="view">{{ item.pv }}</span>
          <span class="updat-time">{{ formatTime(item.update_time) }}</span>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { useRouter } from "vue-router";
import { formatTime } from "../utils/index"
const { articles } = defineProps({
  articles: {
    type: Array,
    default: () => []
  }
})

const router = useRouter();
const goArticle = (item) => {
  router.push(`/article?id=${item.id}`)
}
</script>

<style scoped>
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
  border-radius: 5px;
  object-fit: cover;
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
  letter-spacing: 0.1em;
}
.footer {
  display: flex;
  align-items: center;
  margin-top: 12px;
  font-size: 12px;
  opacity: 0.6;
}
.view {
  margin: 0 18px 0 4px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>