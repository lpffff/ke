<template>
  <div>
    <Breadcrumb :title="data.title" />
    <div class="gkkzb-detail-total">
      <LessonInfo v-if="!this.data.isBook" :book="book" />
      <LessonVideo v-if="this.data.isBook" />
    </div>
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
      <div class="gkkzb-cent clearboth">
        <div class="gkkzb-cent-tab">
          <div class="tab-title">{{data.navLeftData.text[0]}}</div>
          <p>
            <img src alt />
          </p>
        </div>
        <div class="gkkzb-cent-tab">
          <div class="tab-title">{{data.navLeftData.text[1]}}</div>
          <div id="new_knowledge_list" class="knowledge_list">
            <div class="chapter_list">
              <ul id="chapter_listli">
                <li v-for="(item, index) in data.knowledgeList" :key="index" :course-id="item.course_id">
{{item.course_name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="gkkzb-cent-tab"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb.vue";
import LessonInfo from "../components/Detail/LessonInfo";
import LessonVideo from "../components/Detail/LessonVideo";
export default {
  name: "Detail",
  components: {
    Breadcrumb,
    LessonInfo,
    LessonVideo
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
        knowledgeList: []
      }
    };
  },
  computed: {
  },
  methods: {
    book: function() {
      this.data.isBook = true;
    },
    handleNavLeft: function() {
      const navLeftLi = document.querySelectorAll(".gkkzb-nav-left li");
      const index = Array.prototype.indexOf.call(navLeftLi, event.target);
      console.log(index);
      // const index = event.target
      this.data.navLeftData.active = index;
    }
  },
  created: function() {
    const _this = this;
    axios
      .post(
        "/api.php?act=opencourse&method=detail&course_id=" + _this.data.courseId
      )
      .then(function(response) {
        console.log('detail');
        console.log(response);
        //单课详情
        _this.data.lessonDetail = response.data.data;
        axios
          .post(
            "/api.php?act=opencourse_knowledge&method=wx_detail&knowledge_id=" +
              response.data.data.knowledge_id
          )
          .then(function(response) {
            console.log('wx_detail');
            console.log(response);
            //系列课详情
            _this.data.wxDetail = response.data.data;
            axios
              .post(
                "/api.php?act=opencourse&method=lists&knowledge_id=" +
                  response.data.data.knowledge_id
              )
              .then(function(response) {
                console.log('lists');
                console.log(response);
                _this.data.knowledgeList = response.data.data;
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
  beforeMount: function (){
    console.log(this);
  }
};

</script>

<style>
@import url("../assets/css/open-course-live.css");
</style>
