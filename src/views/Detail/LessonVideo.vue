<template>
  <div class="gkkzb-detail-total">
    <div class="container">
      <Breadcrumb :title="wxDetail.knowledge_name" />
      <div class="clearboth">
        <h1 class="course-title clearboth">
          <p>{{lesson.course_name}}</p>
        </h1>
        <div id="room" class="section_wrap">
          <!-- 欢拓回放 -->
          <HuantuoArea v-if="lesson.is_live == 3 && wxDetail.live_type == 2" :lessonData="lessonData" />
          <!-- 录播 -->
          <RecordArea v-if="lesson.is_live == 3 && wxDetail.live_type == 3 && this.data.isShowVideo == true" :lessonData="lessonData" />
        </div>
      </div>
    </div>
  </div>
  <!-- <div>已报名展示课程视频</div> -->
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb";
import RecordArea from "./RecordArea";
import HuantuoArea from "./HuantuoArea";
// import axios from "axios";

export default {
  props: {
    lessonData: Object
  },
  data() {
    return {
      data: {
        isShowVideo: true
      }
    };
  },
  components: {
    Breadcrumb,
    HuantuoArea,
    RecordArea,
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
  watch: {
    $route: {
      handler(/*newName, oldName*/) {
        console.log("$route has changed");
        this.data.isShowVideo = false;
        this.$nextTick(() => {
          this.data.isShowVideo = true;
        });
      },
      deep: true
    }
  },
  mounted: function() {
    
  }
};
</script>

<style lang="less" scoped>
.gkkzb-detail-total {
  background: #242525;
  padding: 20px 0 0 0;
  .breadcrumb {
    position: relative;
    width: 1200px;
    color: #999;
    margin: 0 auto;
    font-size: 14px;
    /deep/ a {
      color: #999;
    }
    /deep/ .current {
      color: #fff;
    }
  }
  .course-title {
    margin-top: 22px;
    margin-bottom: 20px;
    line-height: 70px;
    font-weight: normal;
    p {
      float: left;
      display: inline-block;
      max-width: 350px;
      font-size: 18px;
      color: #fff;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
    }
  }
  .section_wrap {
    position: relative;
  }
}
</style>
