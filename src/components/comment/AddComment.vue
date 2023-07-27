<template>
  <el-dialog
    v-model="dialogVisible"
    title="评论"
    width="40%"
  >
    
    <el-form ref="formEl" label-width="80px" :rules="rules" :model="form" class="demo-form-inline">
      <el-form-item label="昵称" prop="name">
        <el-input maxlength="10" show-word-limit v-model="form.name" placeholder="请输入昵称" clearable />
      </el-form-item>
      <el-form-item label="评论内容" prop="content">
        <el-input maxlength="128" show-word-limit :rows="3" type="textarea" v-model="form.content" placeholder="请输入您的评论" clearable />
      </el-form-item>
    </el-form>

    <div class="tips">tips： 评论通过审核后显示</div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="send(formEl)">
          发送
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
import { add } from "../../api/comment"


const loading = ref(false);
const dialogVisible = ref(false)

const form = reactive({
  name: "",
  content: "",
  articleId: "",
  pCommentId: "",
  replyName: "",
})
const rules = {
  name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入评论内容', trigger: 'blur' }]
}

function open(info) {
  console.log(info)
  const { articleId, pCommentId, replyName } = info
  form.name = localStorage.getItem("nickname") || "";
  form.content = "";
  form.articleId = articleId;
  form.pCommentId = pCommentId;
  form.replyName = replyName;
  dialogVisible.value = true;
}
defineExpose({
  open
})

const formEl = ref();
const submitting = ref(false)
async function send(formEl) {
  if (!formEl) return
  submitting.value = true;
  await formEl.validate((valid, fields) => {
    if (!valid) retrun;
    localStorage.setItem("nickname", form.name)
    add(form).then(() => {
      ElMessage({
        message: "评论成功，审核通过后方可显示",
        type: 'success',
        duration: 3000,
        grouping: true
      })
      console.log(ElMessage)
    }).finally(() => {
      submitting.value = false;
      loading.value = true;
      dialogVisible.value = false;
    })
  })
}
</script>

<style scoped>
.tips {
  font-style: italic;
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #909399;
}
</style>