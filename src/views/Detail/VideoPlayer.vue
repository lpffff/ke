<template>
  <div class="player">
    <video-player class="vjs-custom-skin" :options="options" @ready="playerReadied"></video-player>
  </div>
</template>

<script>
// custom skin css
// import '../src/custom-theme.css'

// videojs
import videojs from "video.js";
window.videojs = videojs;
// hls plugin for videojs6
require("videojs-contrib-hls/dist/videojs-contrib-hls.js");

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      data:{

      },
      // videojs options
      playerOptions: {
        // videojs and plugin options
        width: "900",
        height: "506",
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://video.sanhao.com/video/opencourse/266/266.m3u8"
          }
        ],
        controlBar: {
          // timeDivider: false,
          // durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster:
          "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg"
      }
    };
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    }
  }
};
</script>