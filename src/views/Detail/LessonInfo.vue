<template>
  <div class="gkkzb-detail-total">
    <div class="container">
      <Breadcrumb :title="wxDetail.knowledge_name" />
      <div class="gkkzb-cent clearboth">
        <div class="total-left">
          <img class="gkkzb-detail-logo" :src="wxDetail.knowledge_pic" />
        </div>
        <div class="total-right">
          <h1 class="course-title">
            <p>{{lesson.course_name}}</p>

            <span class="book-num">
              <span class="num">{{wxDetail.student_num}}</span>人已报名
            </span>
          </h1>
          <div class="total-d2 clearboth">
            <div class="key">主讲教师：</div>
            <div class="value">{{lesson.teacher_name}}</div>
          </div>
          <div class="total-d2 clearboth">
            <div class="key">开课时间：</div>
            <div class="value">{{startTime.M}}月{{startTime.d}}日</div>
            <div class="value">{{startTime.H}}:{{startTime.m}}-{{endTime.H}}:{{endTime.m}}</div>
          </div>
          <div class="total-d2 clearboth">
            <div class="key">课程时长：</div>
            <div class="value">1.5小时/每节，共1节</div>
          </div>
          <div class="total-d2 clearboth">
            <div class="left clearboth">
              <div class="key">适合学员：</div>
              <div class="value" data-type="for_student">适合学员</div>
            </div>
            <div class="right clearboth">
              <div class="key">有效期至：</div>
              <div class="value">无限次播放</div>
            </div>
          </div>
          <!-- 未预约 -->
          <div class="total-d4 clearboth">
            <a v-if="[0,1].includes(viewType)" class="gkkzb-btn btn-red" id="book-course"  @click="$parent.book">
              立即报名
              <span class="price f30">免费</span>
            </a>
            <a v-if="$props.isBook" class="gkkzb-btn btn-red">
              进入直播间
            </a>
          </div>
          <!-- 未开始 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb";
import { getLessonTtTime,getDate } from "../../assets/js/Util";
export default {
  props: {
    lessonData: Object,
    viewType: Number
  },
  components: {
    Breadcrumb
  },
  computed: {
    lesson: function() {
      return this.lessonData.lessonDetail;
    },
    startTime: function(){
      const tt_id = this.lesson.start_tt_id,
      course_time = this.lesson.course_time;
      let startTime = getLessonTtTime(course_time,tt_id);
      startTime = getDate(startTime*1000);
      return startTime;
    },
    endTime: function(){
      const tt_id = this.lesson.end_tt_id,
      course_time = this.lesson.course_time;
      let endTime = getLessonTtTime(course_time,tt_id);
      endTime = getDate(endTime*1000);
      return endTime;
    },
    wxDetail: function() {
      return this.lessonData.wxDetail;
    }
  },
  created: function() {
    
  }
};
</script>

<style scoped>
.gkkzb-detail-total {
  padding: 20px 0;
  background: #f5fafa;
}
.gkkzb-detail-total .gkkzb-cent {
  padding: 20px;
  border: 1px solid #eee;
  background: #fff;
}
.total-right {
  padding-top: 32px;
}
.course-title {
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  overflow: hidden;
}
.course-title > p {
  float: left;
  display: inline-block;
  line-height: 22px;
  max-width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.course-title .book-num {
  float: right;
  font-size: 14px;
  color: #666;
  background: #fff;
}
.course-title .book-num .num {
  color: #ff6029;
}
.gkkzb-btn .price {
    position: absolute;
    right: 14px;
    font-size: 18px;
    color: #fffc01;
    font-weight: bold;
}
</style>
