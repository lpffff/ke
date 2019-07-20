<template>
  <div class="chapter_list">
    <ul id="chapter_listli">
      <li v-for="(item, index) in chapterData" :key="index" :course-id="item.course_id">
        <router-link :to="{path: '/course-show-' + item.course_id}">
          <span class="circle"></span>
          <span class="title">{{index + 1}}.{{item.course_name}}</span>
          <span class="chapter_time">
            <span
              class="c_list_btn hf"
              :room_id="item.room_id"
              :data-course-name="item.course_name"
              :data-course-price="item.course_price"
            >进入学习</span>
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    chapterData: Array
  },
  data() {
    return {
      data: {}
    };
  }
};
</script>

<style scoped>
.chapter_list ul {
  width: 100%;
  height: auto;
}
.chapter_list ul li {
  width: 100%;
  height: 56px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  border-bottom: 1px dashed #e4e4e4;
}
.chapter_list ul li a {
  width: 100%;
  float: left;
  line-height: 56px;
  display: block;
  background: #fff;
  font-size: 16px;
}
.chapter_list ul li a:hover {
  width: 100%;
  float: left;
  line-height: 56px;
  display: block;
  background: #f7f7f7;
  font-size: 16px;
}
.chapter_list ul li .aclick_bg .circle {
  color: #fefefe;
}
.chapter_list ul li .aclick_bg .title {
  color: #333;
}
.chapter_list ul li .aclick_bg .chapter_time {
  color: #999;
  white-space: nowrap;
}
.chapter_list ul li .circle {
  width: 30px;
  height: 56px;
  float: left;
  line-height: 56px;
  margin-right: 10px;
  color: #999;
  text-align: right;
  display: inline-block;
  background: url(//s.sh.com/static/ke/images/icon-course.png) no-repeat center
    right;
}
.chapter_list ul li .title {
  width: 600px;
  float: left;
  color: #333;
  line-height: 56px;
  display: inline-block;
  overflow: hidden;
  height: 56px;
}
.chapter_list ul li .chapter_time {
  float: right;
  color: #999;
  position: relative;
  max-width: 180px;
  top: 0;
  margin: 0 10px 0 0;
  overflow: hidden;
  font-size: 14px;
  text-align: right;
}
.c_list_btn {
  display: inline-block;
  min-width: 58px;
  height: 26px;
  padding: 0 16px;
  line-height: 26px;
  border-radius: 13px;
  text-align: center;
  color: #fff;
}
.c_list_btn.hf,
.c_list_btn.schf {
  background-color: #19b955;
  background-image: linear-gradient(-90deg, #19b955 0%, #6dd718 100%),
    linear-gradient(#f5f5f5, #f5f5f5);
  background-blend-mode: normal, normal;
}
.c_list_btn.c_name {
  background-color: #fc3f4c;
}
.c_list_btn .icon-ongoing {
  display: inline-block;
  content: "";
  width: 11px;
  height: 9px;
  margin-right: 6px;
  background: url("//s.sh.com/static/ke/images/icon-ongoing.png") no-repeat
    center;
}
</style>
