<template>
  <div class="lesson-list">
    <div class="list-head">
      <h2>
        <i class="icon-title"></i>
        <span class="title">标题：{{title}}</span>
        <router-link to="search" class="more" :knowledge-type="knowledge_type">更多&gt;</router-link>
      </h2>
    </div>
    <div class="list-content">
      <LessonWrap :lessonWrapData="data.lessonData" />
    </div>
  </div>
</template>

<script>
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
      .post("/", {})
      .then(response => {
        window.console.log(response);
        this.data.lessonData = response.data.lesson_list.children;
      })
      .catch(function(error) {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
.lesson {float: left;}
</style>
