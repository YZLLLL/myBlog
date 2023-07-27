<template>
  <TransitionGroup name="list" tag="div">
    <div class="comment-top-item" v-for="comment in comments" :key="comment.id">
      <div class="comment-top-user-info">
        <el-icon class="avatar" :size="24"><Avatar /></el-icon>
        <span class="comment-top-name">{{ comment.name }}</span>
        <span class="reply-text">回复</span>
        <span class="comment-top-name">{{ comment.reply_name }}</span>
      </div>
      <p class="comment-top-content">{{ comment.content }}</p>
      <div class="operate">
        <div>
          <span class="comment-top-time">{{ friendlyDate(comment.time) }}</span>
          <el-button @click="open(comment)" type="text">回复</el-button>
        </div>
        <div @click="doZan(comment)" v-loading="zanLoading" class="zan-container" :class="comment.isLike ? 'is-like' : ''">
          <IconZan class="zan" :color="comment.isLike ? '#F56C6C' : '#3D3D3D'" size="16px" />
          <span v-if="comment.like_count > 0">
            {{ `( ${comment.like_count} )` }}
          </span>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script>
import { friendlyDate } from "../../utils/index.js"
import { like } from "../../api/comment"
import IconZan from "../icons/IconZan.vue"
import { ref } from 'vue'

export default {
  props: {
    comments: {
      type: Array,
      default:() => []
    }
  },
  components: { IconZan },
  setup(props, { emit }) {
    const zanLoading = ref(false)
    function doZan(comment) {
      if (comment.isLike) return;
      zanLoading.value = true;
      like({commentId: comment.id}).then(() => {
        comment.like_count++;
        comment.isLike = true;
      }).finally(() => {
        zanLoading.value = false;
      })
    }

    function open(comment) {
      emit("subOpen", {
        articleId: comment.article_id,
        pCommentId: comment.p_comment_id,
        replyName: comment.name
      })
    }

    return {
      friendlyDate,
      zanLoading,
      doZan,
      open
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


.comment-top-item {
  border-top: 1px solid #CDD0D6;
  padding: 16px 32px;
  margin-top: 10px;
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
.reply-text {
  margin-left: 12px;
  color: #F56C6C;
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
.zan-container {
  display: flex;
  align-items: center;
  color: #909399;
  cursor: pointer;
}
.zan {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
.zan-container.is-like {
  color: #F56C6C;
  cursor: not-allowed;
}
</style>