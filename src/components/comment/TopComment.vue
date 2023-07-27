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
        <el-button @click="open" type="text">回复</el-button>
      </div>
      <div @click="doZan" v-loading="zanLoading" class="zan-container" :class="comment.isLike ? 'is-like' : ''">
        <IconZan class="zan" :color="comment.isLike ? '#F56C6C' : '#3D3D3D'" size="16px" />
        <span v-if="comment.like_count > 0">
          {{ `( ${comment.like_count} )` }}
        </span>
      </div>
      
    </div>
    <div class="subcomment-container" v-loading="loading">
      <SubComment @subOpen="subOpen" :comments="subComments" />
    </div>
    <el-button class="comment-foot" type="text" v-if="!showMore && comment.replyCount > 0" @click="getComments">
      ——— 展开{{ comment.replyCount }}条回复
      <el-icon class="to-load-more"><ArrowDown /></el-icon>
    </el-button>
    <template v-if="showMore">
      <el-button class="comment-foot show-more" type="text" v-if="comment.replyCount > subComments.length" @click="getComments">
        —— 展开更多回复
        <el-icon class="to-load-more"><ArrowDown /></el-icon>
      </el-button>
      <el-button class="comment-foot" type="text" @click="retract">
        收起
        <el-icon class="to-load-more"><ArrowUp /></el-icon>
      </el-button>
    </template>
    
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getSubComments, like } from "../../api/comment"
import { friendlyDate } from "../../utils/index.js"
import SubComment from "./SubComment.vue";
import IconZan from "../icons/IconZan.vue"
export default {
  name: "TopComment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { SubComment, IconZan },
  setup(props, { emit }) {
    const showMore = ref(false);
    
    const query = reactive({
      page: 1,
      limit: 5,
      commentId: props.comment.id
    })
    const loading = ref(false);
    const subComments = ref([]);
    const total = ref(0);
    function getComments() {
      if (loading.value) return
      showMore.value = true;
      loading.value = true;
      getSubComments({...query}).then(({data}) => {
        query.page++;
        subComments.value = [...subComments.value, ...data.comments];
        total.value = data.total;
      }).finally(() => {
        loading.value = false;
      })
    }

    function open() {
      console.log(props)
      emit("open", {
        articleId: props.comment.article_id,
        pCommentId: props.comment.p_comment_id,
      })
    }

    function subOpen(info) {
      emit("open", info)
    }

    const zanLoading = ref(false)
    function doZan() {
      if (props.comment.isLike) return;
      zanLoading.value = true;
      like({commentId: props.comment.id}).then(() => {
        props.comment.like_count++;
        props.comment.isLike = true;
      }).finally(() => {
        zanLoading.value = false;
      })
    }

    function retract() {
      query.page = 1;
      subComments.value = [];
      total.value = 0;
      showMore.value = false;
    }

    return {
      showMore,
      loading,
      getComments,
      subComments,
      friendlyDate,
      doZan,
      retract,
      zanLoading,
      open,
      subOpen
    }
  }
}
</script>

<style scoped>
.comment-top-item {
  border: 2px solid #DCDFE6;
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
.subcomment-container {
}
.show-more {
  margin-right: 20px;
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