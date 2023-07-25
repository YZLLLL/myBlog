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
    // let flag = false;
    onMounted(() => {
      init(reactiveProps.value)
    })

    const init = (value) => {
      vditor.value = new Vditor('vditor',{
        toolbar: [],
        toolbarConfig: {
          hide: true,
          pin: true
        },
        cache: {
          enable: false,
        },
        // 将一些cdn放到了本地 public下
        cdn: "/public",
        height: '100%',
        width: '100%',
        mode: 'ir',
        value,
        after: () => {
          vditor.value.disabled();
        }
      })
    }
    
    watch(() => reactiveProps.value, (value) => {
      init(value)
    })
    return {
      reactiveProps
    }
  }
}
</script>

<template>
  <div id="vditor"></div>
</template>

<style scoped>
::v-deep .vditor-ir pre.vditor-reset[contenteditable="false"] {
  opacity: 1;
  cursor: auto;
}
</style>