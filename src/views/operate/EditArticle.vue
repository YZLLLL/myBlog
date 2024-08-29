<template>
  <div class="edit-article">
    <div>
      <el-button type="text" @click="router.back()">返回上一级</el-button>
    </div>
    <div>
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
      </el-form>
    </div>
    <Editor
      :content="form.content"
      mode="sv"
      ref="editorRef"
      :disabled="false"
      :show-toolbar="true"
    />
    <div
      style="
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 24px;
      "
    >
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import { ref } from "vue";
import { getGroups } from "@/api/group";
import { editArticle, getArticle } from "@/api/article";
import processMenu from "@/utils/processMenu";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const getArticleDetail = () => {
  getArticle(route.params.id).then((res: any) => {
    if (res.code === 200) {
      const { group_id, content, introduction, tags, title } = res.data.article;
      form.value = {
        groupId: group_id,
        content,
        introduction,
        tags: tags.split(","),
        title,
      };
    }
  });
};
getArticleDetail();

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

const groups = ref<any[]>([]);
const props = {
  expandTrigger: "hover",
  emitPath: false,
  value: "id",
  label: "title",
};
getGroups().then(({ data }: { data: any[] }) => {
  groups.value = processMenu(data).sort((a: any, b: any) => a.id - b.id);
});

const form = ref({
  groupId: "",
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

const editorRef = ref()
const formRef = ref();
const handleSubmit = () => {
  formRef.value?.validate((vaild: boolean) => {
    if (vaild) {
      submitForm();
    }
  });
};
const loading = ref(false);
const submitForm = () => {
  loading.value = true;
  const content = editorRef.value.getValue()
  editArticle({
    id: route.params.id,
    ...form.value,
    content,
    tags: form.value.tags.join(","),
  })
    .then((res: any) => {
      if (res.code !== 200) return
      ElMessage.success("编辑成功");
      router.back();
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.edit-article {
  padding: 12px;
  .form {
    width: 600px;
  }
}
</style>
