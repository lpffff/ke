<template v-if="lesson.is_live == 2">
  <div>
    <!-- :src="data.iframeSrc" -->
    <iframe
      style="width: 100%; height: 551px;background: #fff;"
      
      frameborder="0"
    ></iframe>
    <div class="video_teacher_info">
      <h2>讲师：{{lesson.teacher_name}}</h2>
      <p>{{lesson.sort_name}}{{lesson.tag_name}} {{lesson.teacher_seniority}}年</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    lessonData: Object
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
  mounted: function() {
    window.access_token = "";
    console.log(this);
    const roomId = this.lesson.room_id;
    const courseId = this.lesson.course_id;
    axios
      .post(
        "/open-course.php?do=open&id=" +
          roomId +
          "&course=" +
          courseId
      )
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>