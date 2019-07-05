<template>
  <div class="lesson-list lesson-list_home">
    <div class="list-head">
      <h2>
        <i class="icon-title"></i>
        <span class="title">{{title}}</span>
        <router-link to="search" class="more" :knowledge-type="knowledge_type">更多&gt;</router-link>
      </h2>
    </div>
    <div class="list-content">
      <LessonWrap :lessonWrapData="data.lessonData" />
    </div>
  </div>
</template>

<script>
// import qs from "qs";
import axios from "axios";
import LessonWrap from "../LessonWrap.vue";

export default {
  name: "LessonList",
  components: {
    LessonWrap
  },
  props: {
    title: String,
    knowledge_type: String
  },
  data() {
    return {
      data: {
        lessonData: []
      }
    };
  },
  beforeCreate: function() {
    axios
      .post(
        "/api.php?act=opencourse&method=lists_by_knowledge&count=10&channel_id=1&limit=0&knowledge_type=1&_=1562230525694"
      )
      .then((response) =>{
        window.console.log(response.data);
        this.data.lessonData = response.data.data;
      })
      .catch(function(error) {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
.lesson-list_home .lesson {
  float: left;
}
</style>
