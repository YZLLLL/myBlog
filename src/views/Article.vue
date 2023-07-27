<template>
  <div class="article">
    <Editor v-loading="loading" :value="content" />
    <div class="other-info">
      <span class="updat-time">{{`更新时间：${formatTime(article.info.update_time)}`}}</span>
      <span>{{`阅读量：${article.info.pv} `}}</span><el-icon class="view"><View /></el-icon>
    </div>
    <div class="tags">
      标签：<el-tag class="tag" type="success" effect="dark" v-show="item" v-for="(item,index) in tags" :key="index">{{ item }}</el-tag>
    </div>
    <Comment :id="route.query.id" />
    <div class="like">
      <!-- <el-button type="danger" v-if="second!==s" :disabled="true" size="large" @click="doLike">{{`${second}秒后可再次点击`}}</el-button> -->
      <el-button type="danger" :disabled="disabled" :loading="likeLoading" size="large" @click="doLike">点赞{{` ( ${article.info.like_count} )`}}</el-button>
    </div>
    
    <div class="other-article">
      <div class="other-article-item">
        <span v-if="prev.id" @click="goArticle(prev)"><el-icon style="margin-right: 8px;"><Back /></el-icon>上一篇：{{ prev.title }}</span>
      </div>
      <div class="other-article-item">
        <span v-if="next.id" @click="goArticle(next)">下一篇：{{ next.title }}<el-icon style="margin-left: 8px;"><Right /></el-icon></span>
        </div>
    </div>
  </div>
  
</template>

<script setup>
import Editor from "../components/Editor.vue";
import Comment from "../components/comment/index.vue"
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, reactive, watchEffect, watch, computed, nextTick } from 'vue';
import { getArticle, like } from "../api/article"
import { formatTime } from "../utils/index"
import { useGroupStore } from "../stores/group"

// 点赞
const likeLoading = ref(false);
let disabled = ref(false);
const doLike = () => {
  likeLoading.value = true
  like({id: article.info.id}).then(() => {
    article.info.like_count++;
  }).finally(() => {
    likeLoading.value = false;
    disabled.value = true;
  })
}




const route = useRoute();

onMounted(() => {
  getArticleInfo(route.query.id);
})

// 获取文章详情
const article = reactive({
  info: {
    content: '',
    title: '',
    pv: 0,
    update_time: 0,
    like_count: 0,
    tags: ''
  }
});
const tags = computed(() => {
  let str = article.info.tags || "";
  return str.split(/,|，/)
})
const prev = ref({});
const next = ref({});
const loading = ref(false);
const getArticleInfo = (id) => {
  loading.value = true;
  getArticle(id).then(({data})=>{
    article.info = data.article;
    prev.value = data.prev;
    next.value = data.next;
  }).finally(() => {
    loading.value = false
  })
}

// 调整上一篇 下一篇
const router = useRouter();
const group = useGroupStore()
const goArticle = (item) => {
  group.setGroup({
    id: item.group_id,
    title: item.group_title
  })
  router.push(`/article?id=${item.id}`)
}

// 给md加上表头
const content = computed(() => {
  return `# ${article.info.title}\n${article.info.content}`
})

watch(() => route.query, (value) => {
  disabled.value = false;
  getArticleInfo(value.id);
})
</script>

<style scoped>
.article {
  position: relative;
}
.other-info {
  position: absolute;
  display: flex;
  align-items: center;
  opacity: 0.6;
  left: 16px;
  font-size: 13px;
  line-height: 14px;
  top: 16px;
  z-index: 1;
}
.view {
  margin-left: 10px;
}
.updat-time {
  margin-right: 32px;
}
.other-article {
  opacity: 0.6;
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
}
.other-article-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.other-article-item:hover {
  color: #409EFF;
  text-decoration: underline;
}
.like {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.tags{
  margin-top: 16px;
  font-size: 16px;
  font-style: italic;
}
.tag{
  margin: 0 5px;
}
</style>