import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/css/common.css";

Vue.config.productionTip = false;

require("./mock/Mock.js");

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
