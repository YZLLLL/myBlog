<script>
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { ref, onMounted, reactive, toRefs, watch } from 'vue';
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const reactiveProps = reactive(props);
    const vditor = ref();
    const loading = ref(false);
    const init = (value) => {
      loading.value = true;
      vditor.value = new Vditor('vditor', {
        toolbar: [],
        outline: {
          enable: true,
          position: "right"
        },
        toolbarConfig: {
          hide: true,
          pin: true
        },
        cache: {
          enable: false,
        },
        // 将一些cdn放到了本地 public下
        cdn: import.meta.env.VITE_APP_PUBLIC_JS,
        height: '100%',
        width: '100%',
        mode: 'ir',
        value,
        after: () => {
          vditor.value.disabled();
          loading.value = false;
          const outlines = document.querySelectorAll('.vditor-outline__content span[data-target-id]');
          outlines.forEach((el) => {
            const target = document.querySelector(`#${el.dataset.targetId}`)
            el.addEventListener('click', (e) => {
              e.stopPropagation()
              window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
              })
            })
          })
        }
      })
    }
    
    watch(() => reactiveProps.value, (value) => {
      init(value)
    })
    return {
      reactiveProps,
      loading
    }
  }
}
</script>

<template>
  <div v-loading="loading" id="vditor"></div>
  <div id="outline"></div>
</template>

<style scoped lang="scss">
#vditor {
  border-radius: 0;
  border-color: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  min-height: 800px;
  overflow: hidden;
  --textarea-text-color: var(--el-menu-text-color);
}
::v-deep .vditor-reset {
  padding: 32px 1rem 96px !important;
}
::v-deep .vditor-ir pre.vditor-reset[contenteditable="false"] {
  opacity: 1;
  cursor: auto;
}
::v-deep .vditor-toolbar{
  display: none;
}
::v-deep .vditor-content .vditor-outline {
  width: 200px;
  border-color: #EBEEF5;
  position: sticky;
  top: 120px;
  padding: 1.2rem;
  .vditor-outline__title {
    display: none;
  }
}
</style>
<style>
@media screen and (max-width: 960px) {
  .vditor-outline{
    display: none !important;
  }
}
</style>