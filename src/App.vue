<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  beforeCreate: function() {
    if (window.Util.user != undefined) {
      this.$store.dispatch("setUserInfoFun", window.Util.user);
      this.$store.dispatch("getBooklistFun");
    }
  },
  mounted: function() {
    if (!this.$store.state.isLogin) {
      const loginBtn = document.querySelector(".log_btn");
      loginBtn.onclick = function(event) {
        const e = event || window.event;
        e.preventDefault();
        window.location.href =
          "//www.sh.com/login.php?redirect_url=" +
          encodeURIComponent(window.location.href);
      };
    }
  }
};
</script>

<style scoped>
/* @import './assets/css/filter.css'; */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
