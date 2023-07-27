<template>
  <TopComment v-for="item in topComments" :key="item.id" :comment="item" />
</template>

<script>
import { ref } from 'vue';
import { getTopComments } from "../../api/comment"
import TopComment from './TopComment.vue';
export default {
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {TopComment},
  setup(props) {
    const topComments = ref([]);
    const count = ref(0);
    getTopComments({
      articleId: props.id
    }).then(({data}) => {
      topComments.value = data.comments || [];
      count.value = data.total || 0;
    })

    return {
      topComments,
      count,
    }
  }
}
</script>

<style scoped>

</style>