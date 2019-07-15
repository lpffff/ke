<template>
  <div class="comment-add">
    <div class="comment-eadt-box pos_r">
      <div class="no-user-eadt"></div>
      <div class="comment-type">
        满意程度：
        <div class="comment-type-box">
          <div class="comment-type-star"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li class="last"></li>
          </ul>
        </div>
      </div>
      <div class="textarea-box">
        <textarea
          maxlength="200"
          placeholder="请详细介绍您的上课感受，例如，课程收获、老师风格、课程内容等，以便我们为您提供更好的课程服务。"
          id="comment-textarea"
        ></textarea>
      </div>
      <p class="comment-sub-p clearboth" id="comment-sub" title="评论"></p>
    </div>
    <div class="comment-eadt-box" id="comment_id">
      <div v-for="(item, index) in data.commentData" :key="index" class="comment-li clearboth">
        <div class="comment-li-l">
          <img :src="item.user_pic || data.user_pic_default" class="pic" />
          <p class="name-p">151****5057</p>
        </div>
        <div class="comment-li-r">
          <div class="comment-type-star" style="width: 95px"></div>
          <p class="comment_content">老师讲的很好，是那种愿意付出类的老师！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    courseId: String
  },
  data() {
    return {
      data: {
        commentData: [],
        user_pic_default: "//s.sh.com/static/ke/images/teacher/default.png",
      }
    };
  },
  created() {
    const _ = this;
    console.log(this.courseId);
    axios
      .post(
        "/api.php?act=opencourse_comment&method=lists&course_ids=" +
          this.courseId
      )
      .then(function(res) {
        console.log(res);
        _.data.commentData = res.data.data;
        console.log(_.data.commentData);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style scoped>
</style>

