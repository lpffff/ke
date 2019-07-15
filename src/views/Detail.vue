<template>
  <div>
    <!-- <Breadcrumb :title="data.title" /> -->
    <LessonInfo v-if="!this.data.isBook" :book="book" :data="data" />
    <LessonVideo v-if="this.data.isBook" />
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
          <div class="gkkzb-cent-tab" style="padding-bottom: 2000px;">
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
        <div class="gkkzb-cent-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Breadcrumb from "../components/Common/Breadcrumb.vue";
import LessonInfo from "../components/Detail/LessonInfo";
import LessonVideo from "../components/Detail/LessonVideo";
import ChapterList from "../components/Detail/ChapterList";
import CommentList from "../components/Detail/CommentList";

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
    CommentList
  },
  data() {
    return {
      data: {
        courseId: this.$route.params.courseId,
        lessonDetail: {},
        wxDetail: {},
        title: "详情页标题啊",
        isBook: false,
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
    course_content() {
      let course_content = this.data.lessonDetail.course_content;
      course_content = htmlspecialchars_decode(course_content);
      return course_content;
    }
  },
  // watch: function(){

  // },
  methods: {
    book: function() {
      this.data.isBook = true;
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
    const _this = this;
    axios
      .post(
        "/api.php?act=opencourse&method=detail&course_id=" + _this.data.courseId
      )
      .then(function(response) {
        // console.log('detail');
        // console.log(response);
        //单课详情
        _this.data.lessonDetail = response.data.data;
        axios
          .post(
            "/api.php?act=opencourse_knowledge&method=wx_detail&knowledge_id=" +
              response.data.data.knowledge_id
          )
          .then(function(response) {
            // console.log('wx_detail');
            // console.log(response);
            //系列课详情
            _this.data.wxDetail = response.data.data;

            let knowledge_content = _this.data.wxDetail.knowledge_content;
            knowledge_content = htmlspecialchars_decode(knowledge_content);
            _this.data.knowledge_content = knowledge_content;
            axios
              .post(
                "/api.php?act=opencourse&method=lists&knowledge_id=" +
                  response.data.data.knowledge_id
              )
              .then(function(response) {
                // console.log('lists');
                // console.log(response);
                _this.data.knowledgeList = response.data.data;
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
