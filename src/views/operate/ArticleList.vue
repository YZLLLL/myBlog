<template>
  <div class="article-list">
    <div>
      <el-button type="text" @click="router.back()">返回上一级</el-button>
    </div>
    <el-form>
      <el-form-item label="文章状态">
        <el-select
          v-model="form.isShow"
          clearable
          placeholder="请选择文章状态"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <div v-for="(item, index) in list" :key="item.id" class="article">
        <el-link :href="`/article?id=${item.id}`">
          {{ item.title }}
        </el-link>
        <div>
          <el-button v-if="item.is_show === 1" @click="handleHide(item.id, index)" type="text">隐藏</el-button>
          <el-button v-if="item.is_show === 0" @click="handleShow(item.id, index)" type="text">显示</el-button>
          <el-button @click="handleEdit(item.id)" type="text">编辑</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleList, delArticle, showArticle } from "@/api/article";
import { ElMessage } from "element-plus";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const options = [
  {
    value: 1,
    label: "显示",
  },
  {
    value: 0,
    label: "隐藏",
  },
];

const handleHide = (id: number, index: number) => {
  delArticle({id}).then((res: any) => {
    if (res.code === 200) {
      list.value.splice(index, 1)
      ElMessage.success('操作成功')
    }
  })
}
const handleShow = (id: number, index: number) => {
  showArticle({id}).then((res: any) => {
    if (res.code === 200) {
      list.value.splice(index, 1)
      ElMessage.success('操作成功')
    }
  })
}
const router = useRouter()
const handleEdit = (id: number) => {
  router.push(`/operate/editArticle/${id}`)
}

const form = ref({
  isShow: undefined,
});
const list = ref<any[]>([]);
const getList = () => {
  getArticleList({
    isShow: form.value.isShow === '' ? undefined : form.value.isShow,
  }).then((res: any) => {
    if (res.code === 200) {
      list.value = res.data.articles;
    } else {
      list.value = [];
    }
  });
};

onMounted(() => {
  getList();
});

watch(
  () => form.value,
  () => {
    getList();
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.article-list {
  padding: 12px;
}
.article {
  padding: 10px;
}
</style>
