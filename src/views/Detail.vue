<template>
  <div>
    <!-- <Breadcrumb :title="data.title" /> -->
    <LessonInfo
      v-if="[0,1,2,3].includes(viewType)"
      :book="book"
      :lessonData="data"
      :viewType="viewType"
    />
    <LessonVideo v-if="[4,5].includes(viewType)" :lessonData="data" :viewType="viewType" />
    <div class="gkkzb-row">
      <div class="gkkzb-nav-left">
        <ul>
          <li
            v-for="(item, index) in data.navLeftData.text"
            :key="index"
            :class="index == data.navLeftData.active ? 'curr' : ''"
            @click="handleNavLeft"
          >{{item}}</li>
        </ul>
      </div>
      <div class="gkkzb-nav-left fix" v-show="data.showNavFix">
        <ul>
          <li
            v-for="(item, index) in data.navLeftData.text"
            :key="index"
            :class="index == data.navLeftData.active ? 'curr' : ''"
            @click="handleNavLeft"
          >{{item}}</li>
        </ul>
      </div>
      <div class="gkkzb-cent clearboth">
        <div class="gkkzb-cent-left">
          <div class="gkkzb-cent-tab">
            <div class="tab-title">{{data.navLeftData.text[0]}}</div>
            <div v-html="data.knowledge_content"></div>
          </div>
          <div class="gkkzb-cent-tab" style="padding-bottom: 400px;">
            <div class="tab-title">{{data.navLeftData.text[1]}}</div>
            <div id="new_knowledge_list" class="knowledge_list">
              <ChapterList :chapterData="data.knowledgeList" />
            </div>
          </div>
          <div id class="comment_content_live gkkzb-cent-tab">
            <div class="tab-title">课程评价</div>
            <CommentList :courseId="data.courseId" />
          </div>
        </div>
        <div class="gkkzb-cent-right">
          <Teacher :teacherData="this.data.lessonDetail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Breadcrumb from "../components/Common/Breadcrumb.vue";
import LessonInfo from "./Detail/LessonInfo";
import LessonVideo from "./Detail/LessonVideo";
import ChapterList from "./Detail/ChapterList";
import CommentList from "./Detail/CommentList";
import Teacher from "./Detail/Teacher";

import {
  htmlspecialchars_decode,
  scrollToTop,
  throttle
} from "../assets/js/Util";
export default {
  name: "Detail",
  components: {
    // Breadcrumb,
    LessonInfo,
    LessonVideo,
    ChapterList,
    CommentList,
    Teacher
  },
  data() {
    return {
      data: {
        courseId: this.$route.params.courseId,
        lessonDetail: {},
        wxDetail: {},
        title: "详情页标题啊",
        navLeftData: {
          text: ["课程详情", "课程目录", "课程评价"],
          active: 0,
          activeClass: "curr"
        },
        knowledgeList: [],
        knowledge_content: "",
        timer: null,
        isChangeWhileScroll: true,
        centLeftTop: [],
        navLeftTop: 0,
        showNavFix: false
      }
    };
  },
  computed: {
    viewType() {
      /**
       * 按条件展示课程信息
       * *课程信息
       * 0    未登录
       * 1    未预约      
       * 2    未开始      is_live2 live_type1
       * 3    直博间      is_live1 live_type1
       * 4    伪直播  
       * 5    回放生成中  is_live3 live_type1
       * *课程视频
       * 6    欢拓回放    is_live3 live_type2
       * 7    录播回放    is_live3 live_type3
       *     
       */
      let viewType = 0;
      if (!this.$store.state.isLogin) {
        viewType = 0;
        return
      } else if(!this.isBook) {
        viewType = 1;
        return
      } else if(this.data.lessonDetail.is_live == 2){
        viewType = 2;
        return
      } else if(this.data.lessonDetail.is_live == 1 && this.data.wxDetail.live_type == 1){
        viewType = 3;
        return
      } else if(viewType == 100){
        viewType = 4;//伪直播条件
        return
      } else if(this.data.lessonDetail.is_live == 3 && this.data.wxDetail.live_type == 1){
        viewType = 5;
        return
      } else if(this.data.wxDetail.live_type == 2){
        viewType = 6;
        return
      } else if(this.data.wxDetail.live_type == 3){
        viewType = 7;
        return
      }
      console.log(viewType);
      return viewType;
      
    },
    course_content() {
      let course_content = this.data.lessonDetail.course_content;
      course_content = htmlspecialchars_decode(course_content);
      return course_content;
    },
    isBook() {
      const wx_booklistIds = this.$store.state.wx_booklistIds;
      let isBook = false;

      if (wx_booklistIds.indexOf(this.data.wxDetail.knowledge_id) != -1) {
        isBook = true;
      }
      return isBook;
    }
  },
  // watch: function(){

  // },

  methods: {
    book: function() {
      const knowledge_id = this.data.wxDetail.knowledge_id;
      this.$store.dispatch("bookFun", { knowledge_id: knowledge_id });
    },
    getNavLeftTop: function() {
      const navLeft = document.querySelector(".gkkzb-nav-left");
      const navLeftTop = navLeft.offsetTop;
      return (this.data.navLeftTop = navLeftTop);
    },
    handleNavLeft: function() {
      this.data.isChangeWhileScroll = false;
      window.addEventListener(
        "scroll",
        function(event) {
          var e = event || window.event;
          e.preventDefault();
          e.returnValue = false;
          return false;
        },
        false
      );
      const navLeftLi = document.querySelectorAll(".gkkzb-nav-left li");
      const index = Array.prototype.indexOf.call(navLeftLi, event.target) % 3;
      this.data.navLeftData.active = index;
      const goTop = this.data.centLeftTop[index] - 57;
      scrollToTop(window, goTop, 400);
      setTimeout(() => {
        this.data.isChangeWhileScroll = true;
        window.addEventListener(
          "scroll",
          function(event) {
            var e = event || window.event;
            e.returnValue = true;
          },
          false
        );
      }, 2000);
    },
    whileWinScroll: function() {
      const winY = window.scrollY;
      // this.data.winY = window.scrollY;
      const _this = this,
        change = this.data.isChangeWhileScroll,
        arrTop = this.data.centLeftTop;
      if (winY > this.data.navLeftTop && this.data.showNavFix == false) {
        this.data.showNavFix = true;
      } else if (winY < this.data.navLeftTop && this.data.showNavFix == true) {
        this.data.showNavFix = false;
      }
      if (change) {
        let winY = window.scrollY;
        for (let i = 0; i <= arrTop.length - 1; i++) {
          (function(i) {
            if (arrTop[i + 1] != undefined) {
              if (winY >= arrTop[i] && winY < arrTop[i + 1]) {
                _this.data.navLeftData.active = i;
                return;
              } else if (winY > arrTop[i + 1]) {
                _this.data.navLeftData.active = i;
              }
            }
          })(i);
        }
      } else {
        return;
      }
    },
    getcentLeftTop: function() {
      const centLeftTop = [],
        leftCent = document.querySelectorAll(".gkkzb-cent-tab");
      for (let i = 0; i < leftCent.length; i++) {
        centLeftTop.push(leftCent[i].offsetTop);
      }
      this.data.centLeftTop = centLeftTop;
    },
    getNavLeftActive() {
      const // winY = this.data.winY,
        winY = window.scrollY,
        arrTop = this.data.centLeftTop;
      let navLeftActive = 0;
      for (let i = 0; i <= arrTop.length - 1; i++) {
        (function(i) {
          if (arrTop[i + 1].length > 0) {
            if (winY > arrTop[i] && winY < arrTop[i + 1]) {
              navLeftActive = i;
              return;
            }
          } else if (winY > arrTop[i]) {
            navLeftActive = i;
          }
        })(i);
      }
      this.data.navLeftData.active = navLeftActive;
    }
  },
  created: function() {
    console.log(this);
    const _this = this;
    axios
      .post(
        "/api.php?act=opencourse&method=detail&course_id=" + _this.data.courseId
      )
      .then(function(res) {
        console.log("detail");
        console.log(res);
        _this.data.lessonDetail = res.data.data;
        //单课详情
        axios
          .post(
            "/api.php?act=opencourse_knowledge&method=wx_detail&knowledge_id=" +
              res.data.data.knowledge_id
          )
          .then(function(res) {
            console.log("wx_detail");
            console.log(res);
            //系列课详情
            _this.data.wxDetail = res.data.data;

            let knowledge_content = _this.data.wxDetail.knowledge_content;
            knowledge_content = htmlspecialchars_decode(knowledge_content);
            _this.data.knowledge_content = knowledge_content;
            axios
              .post(
                "/api.php?act=opencourse&method=lists&knowledge_id=" +
                  res.data.data.knowledge_id
              )
              .then(function(res) {
                // console.log('lists');
                // console.log(res);
                _this.data.knowledgeList = res.data.data;
                _this.getcentLeftTop();
                _this.getNavLeftTop();
              });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
        alert("该课程已下架");
        // history.go(-1);
      });
  },
  beforeMount: function() {},
  mounted: function() {
    window.addEventListener("scroll", throttle(this.whileWinScroll, 200));
  },
  // 销毁timer
  beforeDestroy() {
    // clear timer
    clearInterval(this.timer);
  }
};
</script>

<style>
@import url("../assets/css/open-course-live.css");
/* 目录 */
#new_knowledge_list {
  position: relative;
  width: 100%;
}
</style>
