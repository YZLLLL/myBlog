<template>
  <div class="comment-title">评论列表<span v-if="totalCount">{{ `( ${totalCount} )` }}</span></div>
  <div v-loading="loading">
    <TopComment @open="open" v-for="item in topComments" :key="item.id" :comment="item" />
    <el-pagination v-if="!topComments||!topComments.length==0"  style="margin-bottom: 16px" :current-page="page" @current-change="getCurrentPage" :page-size="size" background layout="prev, pager, next" :total="total" />
  </div>

  <el-empty v-if="topComments&&topComments.length==0" description="空空如也~" />
  <div class="comment-btn-container">
    <el-button type="danger" @click="openDialog" size="large">发表评论</el-button>
  </div>
  
  <AddComment ref="addComment" />
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { getTopComments, count } from "../../api/comment"
import TopComment from './TopComment.vue';
import AddComment from './AddComment.vue';
import { useRoute } from 'vue-router';
export default {
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: { TopComment, AddComment },
  setup(props) {
    const topComments = ref([]);
    const total = ref(0);
    const size = 5;
    const page = ref(1);
    const loading = ref(false);
    // getCurrentPage(1);
    // const route = useRoute();
    // console.log(route.query, route.query.id)
    watch(() => props.id, () => {
      topComments.value = [];
      page.value = 1;
      total.value = 0;
      getCurrentPage(1);
      getCount();
    }, {immediate: true});

    const totalCount = ref(0)
    function getCount() {
      count({
        articleId: props.id
      }).then(({data}) => {
        totalCount.value = data.total;
      })
    }

    function getCurrentPage(newPage) {
      page.value = newPage;
      getPageList(newPage)
    }
    function getPageList(page) {
      loading.value = true;
      getTopComments({
        page,
        limit: size,
        articleId: props.id
      }).then(({data}) => {
        topComments.value = data.comments || [];
        total.value = data.total || 0;
      }).finally(() => {
        loading.value = false;
      })
    }

    const addComment = ref(null);

    function open(data) {
      addComment.value.open(data);
    }

    function openDialog() {
      addComment.value.open({
        articleId: props.id,
        pCommentId: 0
      });
    }
    // onMounted(() => {
      
    // })
    
    

    return {
      topComments,
      total,
      totalCount,
      size,
      page,
      loading,
      addComment,
      open,
      getCurrentPage,
      openDialog
    }
  }
}
</script>

<style scoped>
.comment-title {
  font-size: 16px;
  font-weight: 600;
  color: #606266;
  font-style: italic;
}
.comment-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}
</style>