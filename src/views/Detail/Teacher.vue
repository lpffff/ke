<template>
  <div class="teacher-d-wrap">
    <div class="teacher-d2">
      <h4>教师介绍</h4>
      <div class="content">
        <div class="top">
          <img :src="teacherData.teacher_pic" />

          <div class="top-r">
            <p>
              <span class="key">教师姓名：</span>
              <span class="value">{{teacherData.teacher_name}}</span>
            </p>
            <p>
              <span class="key">科目学段：</span>
              <span class="value">{{teacherData.sort_name}}{{teacherData.tag_name}}</span>
            </p>
            <p>
              <span class="key">教学时长：</span>
              <span class="value">{{teacherData.teacher_seniority}}年</span>
            </p>
          </div>
        </div>
        <div class="bott">
          <span class="key">介绍：</span>{{teacherData.teacher_introduction}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teacherData: Object
  },
  beforeMount: function() {
    // console.log(this.teacherData)
  }
};
</script>

<style scoped>
.teacher-d2 {
  min-height: auto;
  padding: 10px 0 0;
  text-align: left;
  border: #e8e8e8 solid 1px;
}
.teacher-d2 h4 {
  padding-left: 10px;
  border-left: 4px solid #1cba53;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-weight: bold;
}
.teacher-d2 .content {
  padding: 12px 15px;
}
.teacher-d2 .top {
  display: table;
  white-space: nowrap;
}
.teacher-d2 .top img {
  display: table-cell;
  width: 133px;
  height: auto;
  vertical-align: middle;
}
.teacher-d2 .top-r {
  display: table-cell;
  padding-left: 15px;
  vertical-align: middle;
  text-align: left;
}
.teacher-d2 .top p {
    color: #999;
    line-height: 16px;
    font-size: 14px;
    margin-top: 9px;
}
.teacher-d2 .key {
  font-weight: bold;
  color: #333;
}
.bott {margin-top: 15px;line-height: 28px;}
</style>
