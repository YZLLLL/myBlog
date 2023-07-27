<template>
  <div class="comment-top-item">
    <div class="comment-top-user-info">
      <el-icon class="avatar" :size="24"><Avatar /></el-icon>
      <span class="comment-top-name">{{ comment.name }}</span>
    </div>
    <p class="comment-top-content">{{ comment.content }}</p>
    <div class="operate">
      <div>
        <span class="comment-top-time">{{ friendlyDate(comment.time) }}</span>
        <el-button type="text">回复</el-button>
      </div>
      <span>zan</span>
    </div>
    <div></div>
    <el-button class="comment-foot" type="text" v-if="!showMore && comment.replyCount > 0" @click="getComments">
      ——— 展开{{ comment.replyCount }}条回复
      <el-icon class="to-load-more"><ArrowDown /></el-icon>
    </el-button>
    <template v-if="showMore">
      <el-button class="comment-foot" type="text" v-if="comment.replyCount > subComments.length" @click="getComments">
        —— 展开更多回复
        <el-icon class="to-load-more"><ArrowDown /></el-icon>
      </el-button>
      <el-button class="comment-foot" type="text" @click="getSubComments">
        收起
        <el-icon class="to-load-more"><ArrowUp /></el-icon>
      </el-button>
    </template>
    
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getSubComments } from "../../api/comment"
import { friendlyDate } from "../../utils/index.js"
export default {
  name: "TopComment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  // components: {TopCommentVue},
  setup(props) {
    const showMore = ref(false);
    const subComments = ref([]);


    const query = reactive({
      page: 1,
      limit: 10,
      commentId: props.comment.id
    })
    const loading = ref(false)
    function getComments() {
      loading.value = true;
      getSubComments({...query}).then(({data}) => {
        showMore.value = true;
      }).finally(() => {
        loading.value = false;
      })
    }

    return {
      showMore,
      getComments,
      subComments,
      friendlyDate
    }
  }
}
</script>

<style scoped>
.comment-top-item {
  border: 1px solid #DCDFE6;
  padding: 16px 32px;
  margin: 20px 0;
}
.comment-top-user-info {
  display: flex;
  align-items: center;
}
.comment-top-content {
  white-space: pre-line;
  word-break: break-all;
}
.avatar {
  border: 1px solid #CDD0D6;
  border-radius: 50%;
  padding: 2px;
  opacity: 0.6;
}
.comment-top-name {
  margin-left: 12px;
  font-size: 16px;
  font-weight: 600;
}
.operate {
  display: flex;
  justify-content: space-between;
}
.comment-top-time {
  font-size: 12px;
  opacity: 0.8;
  margin-right: 12px;
}
</style>