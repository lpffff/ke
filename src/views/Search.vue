<template>
  <div class="container">
    <div class="main-left">
      <div id="filterLesson" class="filter-lesson">
        <ul class="list-wrap list-wrap1">
          <MFilterLi :filterLiData="this.$store.state.filterData.cat" />
          <MFilterLi :filterLiData="this.$store.state.filterData.tag_id" />
        </ul>
        <ul class="list-wrap list-wrap2">
          <MFilterLi :filterLiData="this.$store.state.filterData.knowledge_type" />
        </ul>
        <MFilterSearchBox />
      </div>
      <SearchLessonList :lessonWrapData="data.lessonData" :filterLiData="this.$store.state.filterData.live_type" />
    </div>
    <div class="main-right">
      <RecommendList :lessonWrapData="data.guessData" title="推荐课程" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MFilterLi from "../components/MFilterLi";
import MFilterSearchBox from "../components/MFilterSearchBox";
import SearchLessonList from "./Search/SearchLessonList";
import RecommendList from "./Search/RecommendList";
export default {
  name: "Search",
  components: {
    MFilterLi,
    MFilterSearchBox,
    SearchLessonList,
    RecommendList
  },
  data() {
    return {
      data: {
        filterData: [
          {
            type: "cat",
            id: "catWrap",
            front: "年级",
            children: [
              { data_num: "", text: "全部" },
              { data_num: "13", text: "四年级" },
              { data_num: "14", text: "五年级" },
              { data_num: "15", text: "六年级" }
            ],
            data_active: ""
          },
          {
            type: "tag_id",
            id: "tagWrap",
            front: "学科",
            children: [
              { data_num: "", text: "全部" },
              { data_num: "1", text: "语文" },
              { data_num: "2", text: "数学" },
              { data_num: "3", text: "英语" },
              { data_num: "4", text: "物理" },
              { data_num: "5", text: "化学" }
            ],
            data_active: ""
          },
          {
            type: "knowledge_type",
            id: "knowledgeWrap",
            front: "类型",
            children: [
              { data_num: "", text: "全部" },
              { data_num: "1", text: "公开课" },
              { data_num: "2", text: "系列课" }
            ],
            data_active: ""
          },
          {
            type: "live_type",
            id: "liveTypeWrap",
            front: "",
            children: [
              { data_num: "", text: "全部" },
              { data_num: "1", text: "即将开始" },
              { data_num: "2", text: "回放" },
              { data_num: "3", text: "录播" }
            ],
            data_active: ""
          }
        ],
        lessonData: [],
        guessData: []
      }
    };
  },
  beforeCreate: function() {
    axios
      .post("/", {})
      .then(res => {
        // window.console.log(res);
        this.data.lessonData = res.data.lesson_list.children;
      })
      .catch(function(error) {
        window.console.log(error);
      });
    axios
      .post("/guess", {})
      .then(res => {
        // window.console.log(res);
        this.data.guessData = res.data.lesson_list.children;
      })
      .catch(function(error) {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
/*搜索筛选*/
.container{overflow: hidden;}
.main-left {
  position: relative;
  float: left;
  width: 954px;
  margin-right: 40px;
}
.main-right {
  position: relative;
  float: left;
  width: 204px;
}
.filter-lesson {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 2px;
  box-sizing: border-box;
}
.filter-list-wrap.list-wrap3 {
  padding-left: 0;
  border-bottom: 1px solid #f0f0f0;
}
.filter-lesson .list-wrap2 {
  padding-top: 10px;
  border-top: 1px dashed #ddd;
}
.filter-lesson .list-wrap2 .item {
  border-radius: 0;
}
</style>
<style>
.list-wrap3 {
  margin-top: 16px;
}
.list-wrap3 .item {
  float: left;
  margin-right: 40px;
  font-size: 16px;
  color: #333;
  background: transparent;
  cursor: pointer;
  line-height: 44px;
  border-bottom: 4px solid transparent;
}
.list-wrap3 .item.active {
  color: #1ebb51;
  border-color: #1ebb51;
}
</style>
