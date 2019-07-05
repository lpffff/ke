<template>
  <div class="row">
    <div class="list-wrap3"><MFilterLi :filterLiData="filterLiData" /></div>
    <div class="lesson-list">
      <div class="list-content">
        <LessonWrap :lessonWrapData="lessonWrapData" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MFilterLi from "../MFilterLi.vue";
import LessonWrap from "../LessonWrap.vue";

export default {
  name: "LessonList",
  components: {
    LessonWrap,
    MFilterLi
  },
  props: {
    title: String,
    knowledge_type: String,
    lessonWrapData: Array,
    filterLiData: Object
  },
  data() {
    return {
      data: {}
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

<style>
</style>
