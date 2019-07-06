<template>
  <Breadcrumb :title="data.title" />
</template>

<script>
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
  name: "Detail",
  components: {
    Breadcrumb
  },
  data() {
    return {
      data: {
        title: "详情页标题啊"
      }
    };
  }
};
</script>

<style>
</style>
