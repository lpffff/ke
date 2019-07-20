<template>
  <div class="comment-add">
    <div class="comment-eadt-box pos_r">
      <div class="no-user-eadt" v-if="!this.$store.state.isLogin"></div>
      <div class="comment-type">
        满意程度：
        <div class="comment-type-box">
          <div class="comment-type-star" :style="`width: ${19 * (data.comment_type + 1)}px`"></div>
          <ul class="ul_stars_edit" @click="handleStar">
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
          v-model="data.comment_content"
          id="comment-textarea"
        ></textarea>
      </div>
      <p class="comment-sub-p clearboth" id="comment-sub" title="评论" @click="subComment"></p>
    </div>
    <div class="comment-eadt-box" id="comment_id">
      <div v-for="(item, index) in data.commentData" :key="index" class="comment-li clearboth">
        <div class="comment-li-l">
          <img :src="item.pic || data.pic_default" class="pic" />
          <p class="name-p">{{item.account}}</p>
        </div>
        <div class="comment-li-r">
          <div
            class="comment-type-star"
            :style="`width: ${19*(item.comment_type + 1)}px`"
            :comment-type="item.comment_type"
          ></div>
          <p class="comment_content">{{item.comment_content}}</p>
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
        pic_default: "//s.sh.com/static/ke/images/teacher/default.png",
        comment_type: -1,
        comment_content: ""
      }
    };
  },
  methods: {
    handleStar: function(event) {
      let e = event || window.event;
      const stars = document.querySelectorAll(".ul_stars_edit li");
      console.log(stars, e);
      let index = Array.prototype.indexOf.call(stars, e.target);
      console.log(index);
      this.data.comment_type = index;
    },
    subComment: function() {
      const type = this.data.comment_type;
      const content = this.data.comment_content;
      if (type == -1) {
        alert("请选择评分");
        return;
      }
      if (content == "") {
        alert("请输入评论内容");
        return;
      }
      // axios
      axios
        .post(
          "/api.php?act=opencourse_comment&method=add&course_id=" +
            this.courseId +
            "&comment_type=" +
            type +
            "&comment_content=" +
            content
        )
        .then(function(res) {
          console.log(res);

          const newComment = {};
          newComment.comment_type = type;
          newComment.comment_content = content;
          newComment.account = this.$store.state.user.account;
          newComment.pic = this.$store.state.user.pic;
          this.data.commentData.unshift(newComment);
        })
        .catch(function(err) {
          console.log(err);
        });
      // endaxios
    },
    doSth: function() {}
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
        _.data.commentData = res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style scoped>
.comment-type {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}
.comment-type-box {
  position: relative;
  display: inline-block;
  background: url("//s.sanhao.com/static/ke/images/icons/star_off.png")
    no-repeat left center;
  width: 95px;
  height: 14px;
  background-size: auto 14px;
  cursor: pointer;
}
.comment-type-star {
  width: 0;
  height: 14px;
  margin-bottom: 10px;
  background: url("//s.sanhao.com/static/ke/images/icons/star_on.png") no-repeat
    left center;
  background-size: auto 14px;
}
.comment-type ul {
  position: absolute;
  left: 0;
  top: 0;
}
.comment-type li {
  width: 14px;
  height: 14px;
  float: left;
  padding-right: 5px;
}
.comment-type li.last {
  margin-right: 0;
}
.comment-eadt-box .textarea-box {
  width: 850px;
  height: 134px;
  background: url("//s.sh.com/static/ke/images/bg-comment.png") no-repeat center;
  background-size: 100%;
}
.comment-eadt-box textarea {
  height: 88px;
  border: none;
  font-size: 14px;
  background: transparent;
}
.comment-sub-p {
  position: absolute;
  right: 20px;
  bottom: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>

