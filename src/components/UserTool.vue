<template>
  <div class="user-tool">
    <button class="search-btn" @click="searchVisible = true">
      <span class="search-btn-box">
        <el-icon class="search-btn-box-icon"><Search /></el-icon>
        <span class="search-btn-box-placeholder">搜索</span>
      </span>
      <span class="search-btn-keys">
        <kbd class="search-btn-keys-item">
          <svg width="15" height="15" class="DocSearch-Control-Key-Icon">
            <path
              d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
              stroke-width="1.2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="square"
            ></path>
          </svg>
        </kbd>
        <kbd class="search-btn-keys-item">K</kbd>
      </span>
    </button>
    <div class="icons">
      <!-- <IconGithub /> -->
      <SwitchTopic />
      <el-icon class="fold" @click="popupMenuVisible = true"><Fold /></el-icon>
    </div>
    <PopupMenu v-model:visible="popupMenuVisible" />
    <SearchDialog v-model:visible="searchVisible" />
  </div>
</template>

<script setup lang="ts">
import { Fold, Search } from "@element-plus/icons-vue";
import IconGithub from "./icons/IconGithub.vue";
import SwitchTopic from "./SwitchTopic.vue";
import SearchDialog from "./SearchDialog.vue";
import { ref, watch } from "vue";
import PopupMenu from './PopupMenu/index.vue'


const searchVisible = ref(false);
watch(() => searchVisible.value, () => {
  if (searchVisible.value) {
    document.body.classList.add('search-open')
  } else {
    document.body.classList.remove('search-open')
  }
})
const popupMenuVisible = ref(false)
</script>

<style lang="scss" scoped>
.user-tool {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .search-btn {
    display: flex;
    align-items: center;
    border: 0;
    border-radius: 40px;
    color: #909399;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    height: 26px;
    margin: 0 6px;
    padding: 0 6px;
    justify-content: space-between;
    -webkit-user-select: none;
    user-select: none;
    background: rgba(255, 255, 255, 0.8);
    &:hover {
      box-shadow: inset 0 0 0 2px #409eff;
    }
    &-box {
      align-items: center;
      display: flex;
      &-icon {
        font-size: 1.4rem;
      }
      &-placeholder {
        padding: 0 12px 0 6px;
      }
    }
    &-keys {
      display: flex;
      &-item {
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
  .icons {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    gap: 6px;
  }
}
@media screen and (min-width: 960px) {
  .fold {
    display: none;
  }
}
@media (max-width: 750px) {
  .search-btn-box-placeholder,
  .search-btn-keys {
    display: none !important;
  }
}
</style>
