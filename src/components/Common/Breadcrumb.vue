<template>
  <div class="breadcrumb">
    <router-link to="//www.sanhao.com">首页</router-link>>
    <router-link to="/">大师课</router-link>>
    <span>{{title}}</span>
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
