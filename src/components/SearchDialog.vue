<template>
  <div class="mask" v-show="props.visible" @click="handleClose">
    <div class="modal" @click.stop="">
      <div class="search-box">
        <el-input
          v-model="keywords"
          @update:modelValue="handleSearch"
          class="search-input"
          placeholder="搜索"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <el-button link @click="handleClose" style="padding-left: 0.8rem">
          取消
        </el-button>
      </div>
      <div class="search-result-container" v-loading="searchLoading">
        <template v-if="keywords.length">
          <div class="search-result search-history">
            <ul class="record">
              <li
                class="record-item"
                :class="{ 'is-active': item.id === hoverId }"
                @mouseenter="handleMouseEnter(item.id)"
                v-for="item in resultList"
                :key="item.id"
              >
                <router-link
                  @click="handleClick(item)"
                  :to="`/article?id=${item.id}`"
                >
                  <div class="record-item-box">
                    <div class="record-item-box-title">
                      <el-icon><Document /></el-icon>
                      <span>{{ item.title }}</span>
                    </div>
                    <span></span>
                  </div>
                </router-link>
              </li>
            </ul>
            <el-empty
              v-if="!searchLoading && resultList.length === 0"
              :description="`无法找到相关结果: ${keywords}`"
            >
              <template #image>
                <el-icon><Search /></el-icon>
              </template>
            </el-empty>
          </div>
        </template>
        <template v-else>
          <el-button link
            v-if="recordList.length === 0"
            style="
              display: flex;
              height: 100%;
              width: 100%;
              align-items: center;
              justify-content: center;
            "
          >
            暂无搜索历史
          </el-button>
          <div v-else class="search-history">
            <div>搜索历史</div>
            <ul class="record">
              <li
                class="record-item"
                :class="{ 'is-active': item.id === hoverId }"
                @mouseenter="handleMouseEnter(item.id)"
                v-for="(item, index) in recordList"
                :key="item.title"
              >
                <router-link :to="`/article?id=${item.id}`">
                  <div class="record-item-box">
                    <div class="record-item-box-title">
                      <el-icon><PieChart /></el-icon>
                      <span>{{ item.title }}</span>
                    </div>
                    <el-icon @click.prevent="delRecord(index)"><Close /></el-icon>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <div class="footer">
        <ul class="footer-list">
          <li class="footer-list-item">
            <kbd class="footer-list-item-key"><IconEnter /></kbd>
            <span>选择</span>
          </li>
          <li class="footer-list-item">
            <kbd class="footer-list-item-key"><IconDown /></kbd>
            <kbd class="footer-list-item-key"><IconUp /></kbd>
            <span>切换</span>
          </li>
          <li class="footer-list-item">
            <kbd class="footer-list-item-key"><IconEsc /></kbd>
            <span>关闭</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PieChart, Close, Document, Search } from "@element-plus/icons-vue";
import IconEsc from "./icons/IconEsc.vue";
import IconUp from "./icons/IconUp.vue";
import IconDown from "./icons/IconDown.vue";
import IconEnter from "./icons/IconEnter.vue";
import { search } from "@/api/article";
import { debounce } from "@/utils/index";

const props = defineProps<{
  visible: boolean;
}>();
const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void;
}>();

const keywords = ref("");
const handleClose = () => {
  keywords.value = "";
  emits("update:visible", false);
};

const hoverId = ref();
const handleMouseEnter = (id: any) => {
  console.log('hoverId', hoverId.value)
  hoverId.value = id;
};

const resultList = ref<any[]>([]);
let abortController: AbortController;
const searchLoading = ref(false);
const handleSearch = () => {
  hoverId.value = undefined
  abortController?.abort("cancel");
  abortController = new AbortController();
  searchLoading.value = true;
  search(
    {
      keyword: keywords.value,
      page: 1,
      size: 9999,
    },
    {
      signal: abortController.signal,
    }
  ).then(
    (res: any) => {
      searchLoading.value = false;
      resultList.value = res.data?.articles ?? [];
    },
    (e: any) => {
      searchLoading.value = false;
      if (e.config?.signal?.reason === "cancel") return;
    }
  );
};

const recordList = ref<any[]>([]);
onMounted(() => {
  getRecords();
});
const getRecords = () => {
  try {
    recordList.value = JSON.parse(
      localStorage.getItem("search-history") ?? "[]"
    );
  } catch (e) {
    recordList.value = [];
    setRecords([]);
  }
};
const setRecords = (list: any[]) => {
  localStorage.setItem("search-history", JSON.stringify(list));
};
const addRecord = (record: any) => {
  const index = recordList.value.find((item) => item.id === record.id);
  if (index !== undefined) {
    recordList.value.splice(index, 1);
  }
  recordList.value.unshift(record);
  setRecords(recordList.value);
};
const delRecord = (index: number) => {
  recordList.value.splice(index, 1);
  setRecords(recordList.value);
};

const handleClick = (item: any) => {
  handleClose();
  addRecord({
    title: item.title,
    id: item.id,
  });
};
</script>

<style lang="scss" scoped>
.mask {
  --modal-width: 560px;
  --modal-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
    0px 8px 20px rgba(0, 0, 0, 0.08);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: var(--searchbox-background);
  .modal {
    background: var(--modal-background);
    border-radius: 6px;
    box-shadow: var(--modal-shadow);
    flex-direction: column;
    margin: 60px auto auto;
    width: var(--modal-width);
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    position: relative;
    .search-box {
      display: flex;
      padding: 12px 12px 0;
      .search-input {
        --el-component-size: 56px;
        flex: 1;
        ::v-deep(.el-input__wrapper) {
        box-shadow: inset 0 0 0 2px #409eff;

        }
        background: var(--bg-color);
        border-radius: 4px;
        font-size: 1.2rem;
      }
    }
    .search-result-container {
      flex-grow: 1;
      overflow: auto;
      min-height: 24vh;
    }
    .search-history {
      padding: 12px 12px 0;
      .record {
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px 0;
        &-item {
          border-radius: 8px;
          box-shadow: 0 1px 3px 0 #d4d9e1;
          &-box {
            display: flex;
            height: 56px;
            padding: 0 12px;
            align-items: center;
            justify-content: space-between;
            &-title {
              display: flex;
              align-items: center;
              gap: 8px;
            }
          }
        }
        &-item.is-active {
          background: #409eff;
          color: #fff;
        }
      }
    }
    .footer {
      color: #909399;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 -1px 0 0 #e0e3e8, 0 -3px 6px 0 rgba(69, 98, 155, 0.12);
      &-list {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        &-item {
          display: flex;
          align-items: center;
          gap: 2px;
          &-key {
            align-items: center;
            background: rgba(125, 125, 125, 0.1);
            border-radius: 3px;
            box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
              0 1px 2px 1px rgba(30, 35, 90, 0.4);
            color: #909399;
            display: flex;
            height: 18px;
            justify-content: center;
            margin-right: 0.4em;
            position: relative;
            padding: 0 0 2px;
            border: 0;
            top: -1px;
            width: 20px;
          }
        }
      }
    }
  }
}
@media (max-width: 750px) {
  .modal {
    position: fixed;
    inset: 0;
    margin-top: 0 !important;
    height: 100vh;
    max-height: 100vh !important;
    width: 100vw !important;
    .footer {
      display: none;
    }
  }
}
// @media screen and (min-width: 960px) {
//   .modal {
//     margin: 60px auto auto;
//   }
// }
</style>
