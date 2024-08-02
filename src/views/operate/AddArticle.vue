<template>
  <div class="add-article">
    <div class="container">
      <el-form
        class="form"
        :rules="rules"
        :model="form"
        label-position="top"
        ref="formRef"
      >
        <el-form-item label="所在分类" prop="groupId">
          <el-cascader
            v-model="form.groupId"
            :options="groups"
            :props="props"
            placeholder="请输入文章标题"
          />
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章简介" prop="introduction">
          <el-input
            v-model="form.introduction"
            type="textarea"
            placeholder="请输入文章内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章标签" prop="tags">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in tagsOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <UploadArticle v-model="form.content" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: center; width: 100%">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
      <Editor
        class="editor"
        :value="form.content.trim().length ? form.content : '请选择文件'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "@/components/Editor.vue";
import UploadArticle from "./UploadArticle.vue";
import { getGroups } from "@/api/group";
import processMenu from "@/utils/processMenu";
import { addArticle } from '@/api/article'
import router from "@/router";
import { ElMessage } from "element-plus";

const tagsOptions = [
  {
    label: "HTML",
    value: "HTML",
  },
  {
    label: "CSS",
    value: "CSS",
  },
  {
    label: "JS",
    value: "JS",
  },
];

const form = ref({
  groupId: '',
  title: "",
  introduction: "",
  content: "",
  tags: [],
});

const rules = {
  groupId: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入文章简介", trigger: "blur" },
  ],
  content: [{ required: true, message: "请选择内容文件", trigger: "change" }],
  tags: [{ required: true, message: "请选择文章标签", trigger: "change" }],
};

const formRef = ref();
const handleSubmit = () => {
  formRef.value?.validate((vaild: boolean) => {
    if (vaild) {
      submitForm();
    }
  });
};
const loading = ref(false)
const submitForm = () => {
  loading.value = true
  addArticle({
    ...form.value,
    tags: form.value.tags.join(',')
  }).then((res: any) => {
    ElMessage.success('添加成功')
    router.back()
  }).finally(() => {
    loading.value = false
  })
};

const groups = ref<any[]>([])
const props = {
  expandTrigger: 'hover',
  emitPath: false,
  value: 'id',
  label: 'title'
}
getGroups().then(({ data }: { data: any[] }) => {
  groups.value = processMenu(data).sort((a: any, b: any) => a.id - b.id);
});
</script>

<style lang="scss" scoped>
.add-article {
  display: flex;
  justify-content: center;
  --form-width: 400px;
  .container {
    display: flex;
    max-width: 1200px;
    width: 100%;
    margin: 20px;
    padding-left: var(--form-width);
    .form {
      padding: 20px;
      position: fixed;
      left: 20px;
      top: 20px;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: var(--el-fill-color-light);
      width: var(--form-width);
    }
    .editor {
      flex-grow: 1;
      min-width: 400px;
    }
    .placeholder {
      padding: 30px;
      color: var(--el-text-color-placeholder);
    }
  }
}
@media (max-width: 750px) {
  .container {
    flex-direction: column;
    --form-width: calc(100%);
    padding-left: 0 !important;
    .form {
      position: static !important;
      margin-bottom: 20px;
    }
  }
}
</style>

<style>
#vditor {
  min-height: 0 !important;
}
</style>
