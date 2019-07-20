<template>
  <div>
    <div id="mod_col_left" class="col_left_side">
      <img :src="lesson.teacher_pic" alt />
    </div>
    <div class="video_teacher_info">
      <h2>讲师：{{lesson.teacher_name}}</h2>
      <p>
        <span>{{lesson.sort_name}}{{lesson.tag_name}}</span>
        {{lesson.teacher_seniority}}年
      </p>
    </div>
    <!-- col_main #主要部分-->
    <div id="mod_col_main" class="col_main">
      <videoPlayer :options="videoOptions" />
    </div>

    <!-- col_right_side #右侧-->
    <div id="mod_col_right" class="col_right_side">
      <div class="tab_change">
        <ul>
          <li>课程目录（共{{knowledgeList.length || 1}}课时）</li>
        </ul>
      </div>
      <div class="chat_wrap chat_tab_box" style="display: block;">
        <div id="mod_chat_scroller" class="mod_chat_scroller">
          <div id="mod_chat_hall" class="mod_chat_hall clearboth">
            <ul>
              <li
                v-for="(item, index) in knowledgeList"
                :key="index"
                :class="item.course_id == knowledgeList.course_id ? 'curr' : ''"
              >
                <router-link
                  :to="{path: `/course-show-${item.course_id}`}"
                  :title="item.course_name"
                >
                  {{index+1}}.课时
                  {{item.course_name}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videoPlayer from "./VideoPlayer.vue";
export default {
  props: {
    lessonData: Object
  },
  components: {
    videoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        width: 900,
        height: 506,
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://video.sanhao.com/video/opencourse/266/266.m3u8"
          }
        ]
      }
    };
  },
  computed: {
    lesson: function() {
      return this.lessonData.lessonDetail;
    },
    wxDetail: function() {
      return this.lessonData.wxDetail;
    },
    knowledgeList: function() {
      return this.lessonData.knowledgeList;
    }
  },
  methods: {},
  created: function() {
    const _ = this;

    // const showSanHaoViode = function(){
    //   let videoUrl = _.lesson.video_m3u8 || _.lesson.audio_src_url;
    //   new sanHaoVideo('mod_col_main', videoUrl);
    // };
    // showSanHaoViode();
  }
};
</script>

<style scoped>
#mod_col_left img {
  width: 70px;
  height: 70px;
  display: block;
  margin-left: 20px;
  border-radius: 70px;
  margin-top: 15px;
}
#mod_col_right {
  width: 301px;
  overflow: hidden;
}

#mod_col_right .tab_change li {
  width: 100%;
  color: #fff;
  background: #2d2d2d;
  line-height: 45px;
  text-align: center;
}
#mod_chat_scroller {
  width: 300px;
  background: #2d2d2d;
  height: 361px;
  overflow-y: scroll;
}

#mod_col_right ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #333;
}

/*定义滚动条轨道 内阴影+圆角*/
#mod_col_right ::-webkit-scrollbar-track {
  background-color: #333;
}

/*定义滑块 内阴影+圆角*/
#mod_col_right ::-webkit-scrollbar-thumb {
  background-color: #666;
}

#mod_chat_hall li {
  padding: 14px 20px;
  font-size: 16px;
  line-height: 28px;
  border-top: 1px solid #252525;
  background: #2d2d2d;
}

#mod_chat_hall li.curr,
#mod_chat_hall li:hover {
  color: #fff;
  background: #222;
}

#mod_chat_hall li.curr a,
#mod_chat_hall li:hover a {
  color: #fff;
}

#mod_chat_hall li a {
  color: #999;
  overflow: hidden;
  display: block;
  height: 28px;
}

#mod_chat_hall li a:hover {
  color: #fff;
}
</style>


