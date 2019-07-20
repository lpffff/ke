<template>
  <div class="lesson-list lesson-list_recommend">
    <h2 class="title">{{title}}</h2>
    <div class="list-content">
      <LessonWrap :lessonWrapData="data.lessonData" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LessonWrap from "../../components/LessonWrap.vue";

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
    //mock
    // axios
    //   .post("/guess", {})
    //   .then(res => {
    //     console.log("guess");
    //     window.console.log(res);
    //     this.data.lessonData = res.data.lesson_list.children;
    //   })
    //   .catch(function(error) {
    //     window.console.log(error);
    //   });
    axios
      .post("/api.php?act=opencourse&method=guess")
      .then(res => {
        this.data.lessonData = res.data.data;
      })
      .catch();
  }
};
</script>

<style>
.lesson-list_recommend {
  margin-top: 0;
}
.lesson-list_recommend .title {
  height: 20px;
  line-height: 20px;
  padding-left: 7px;
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  border-left: 3px solid #19b955;
}
.lesson-list_recommend .lesson {
  width: 100%;
}
.lesson-list_recommend .lesson .lesson-p1 {
  width: 120%;
  font-size: 12px;
  -webkit-transform: scale(calc(10 / 12));
  -moz-transform: scale(calc(10 / 12));
  -ms-transform: scale(calc(10 / 12));
  -o-transform: scale(calc(10 / 12));
  transform: scale(calc(10 / 12));
  transform-origin: left;
}
.lesson-list_recommend .lesson-one {
  height: 115px;
}
.lesson-list_recommend .lesson-two {
  padding-left: 0;
  padding-right: 0;
}
</style>
