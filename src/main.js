import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'

Vue.use(VueAxios, axios)

// axios.defaults.baseURL = 'api/'
import "./assets/css/common.css";

Vue.config.productionTip = false;
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
Vue.prototype.HT = window.location.host.split('.')[1];

require("./mock/Mock.js");

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
