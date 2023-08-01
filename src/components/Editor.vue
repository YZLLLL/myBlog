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
      vditor.value = new Vditor('vditor',{
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
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
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
</template>

<style scoped>
#vditor {
  border-radius: 0;
  border-color: #EBEEF5;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  min-height: 800px;
}
::v-deep .vditor-reset {
  padding-top: 32px !important;
  padding-bottom: 96px !important;
}
::v-deep .vditor-ir pre.vditor-reset[contenteditable="false"] {
  opacity: 1;
  cursor: auto;
}
::v-deep .vditor-toolbar{
  display: none;
}
::v-deep .vditor-content .vditor-outline {
  width: 180px;
  border-color: #EBEEF5;
}
</style>