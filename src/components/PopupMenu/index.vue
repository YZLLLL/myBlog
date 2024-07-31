<template>
  <el-drawer
    v-model="drawerVisible"
    title=""
    :show-close="false"
    class="popup-menu-drawer"
    size="50%"
    :direction="direction"
  >
  <el-menu :default-active="activeMenu" mode="vertical" class="menu">
      <Menu @close="close" :menu-items="groupStore.menus" />
    </el-menu>
  </el-drawer>
</template>

<script setup lang="ts">
import Menu from "@/views/Menu.vue";
import { useGroupStore } from "@/stores/group";
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from "vue-router";
const props = withDefaults(defineProps<{
  visible: boolean;
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
}>(), {
  direction: 'rtl'
})

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>()

const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const groupStore = useGroupStore()

const drawerVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})

const close = () => {
  drawerVisible.value = false
}

onMounted(() => {
  window.addEventListener('resize', close)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', close)
})
</script>

<style lang="scss">
.popup-menu-drawer {
    max-width: 200px;
}
</style>
