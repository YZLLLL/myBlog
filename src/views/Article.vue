<template>
  <div class="article">
    <Editor v-loading="loading" :value="content" />
    <div class="other-info">
      <span class="updat-time">{{`更新时间：${formatTime(article.info.update_time)}`}}</span>
      <span>{{`阅读量：${article.info.pv} `}}</span><el-icon class="view"><View /></el-icon>
    </div>

    <div class="like">
      <!-- <el-button type="danger" v-if="second!==s" :disabled="true" size="large" @click="doLike">{{`${second}秒后可再次点击`}}</el-button> -->
      <el-button type="danger" :disabled="disabled" :loading="likeLoading" size="large" @click="doLike">点赞{{` ( ${article.info.like_count} )`}}</el-button>
    </div>
    
    <div class="other-article">
      <div class="other-article-item"><el-icon style="margin-right: 8px;"><Back /></el-icon>上一篇</div>
      <div class="other-article-item">下一篇<el-icon style="margin-left: 8px;"><Right /></el-icon></div>
    </div>
  </div>
  
</template>

<script setup>
import Editor from "../components/Editor.vue";
import { useRoute } from "vue-router"
import { ref, onMounted, reactive, watchEffect, watch, computed } from 'vue';
import { getArticle, like } from "../api/article"
import { formatTime } from "../utils/index"
const article = reactive({
  info: {
    content: '',
    title: '',
    pv: 0,
    update_time: '',
    like_count: 0
  }
});
const loading = ref(false);

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

const getArticleInfo = (id) => {
  loading.value = true;
  getArticle(id).then(({data})=>{
    article.info = data[0];
  }).finally(() => {
    loading.value = false
  })
}

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
}
.like {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
</style>