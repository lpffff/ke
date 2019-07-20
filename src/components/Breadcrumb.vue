<template>
  <div class="breadcrumb">
    <a href="//www.sanhao.com">首页</a>
    >
    <router-link to="/">大师课</router-link>
    >
    <span class="current">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    title: String
  }
};
</script>

<style>
</style>
