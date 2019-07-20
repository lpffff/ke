<template>
  <div class="container">
    <div class="filter-lesson">
      <ul class="list-wrap">
        <MFilterLi  :filterLiData="filterData.cat" />
        <MFilterLi  :filterLiData="filterData.tag_id" />
      </ul>
      <MFilterSearchBox />
    </div>
    <HomeLessonList title="公开课" :knowledge_type="1" />
    <HomeLessonList title="系列课" :knowledge_type="2" />
  </div>
</template>

<script>
import HomeLessonList from "./Home/HomeLessonList.vue";
import MFilterLi from "../components/MFilterLi.vue";
import MFilterSearchBox from "../components/MFilterSearchBox.vue";

export default {
  name: "Home",
  props: {
    msg: String,
    lessonData: {}
  },
  components: {
    HomeLessonList,
    MFilterLi,
    MFilterSearchBox
  },
  data() {
    return {
      filterData: this.$store.state.filterData
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background: url(/static/images/404.jpg) no-repeat center;
}
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
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
.filter {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 2px;
  box-sizing: border-box;
}

.filter .list-wrap {
  line-height: 26px;
  font-size: 14px;
}
.filter li {
  margin: 0 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.lesson-list {
  position: relative;
  width: 1200px;
  margin: 40px auto 0 auto;
  padding-bottom: 10px;
}
</style>
<style>
.lesson-list h2 {
  overflow: hidden;
}
.lesson-list .list-head .icon-title {
  float: left;
  width: 34px;
  height: 40px;
  background: url("http://s.sanhao.com/static/ke/images/icon-lesson.png")
    no-repeat top 10px left;
}
.lesson-list .list-head .title {
  float: left;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
  color: #333;
}
.lesson-list .list-head .more {
  float: right;
  line-height: 40px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
}
.lesson-list .list-head .more:hover {
  color: #1ebb51;
}
.lesson-list .list-content {
  position: relative;
  margin-top: 24px;
}
.filter-lesson .item-wrap {
  float: left;
  max-width: 835px;
  margin-left: 10px;
  overflow: hidden;
}
.filter-lesson li {
  padding-left: 30px;
  padding-right: 30px;
}
/*列表样式更改*/
.lesson-list .lesson {
  float: left;
  position: relative;
  height: 225px;
  margin-bottom: 30px;
  margin-left: 19px;
  border-radius: 5px;
  cursor: pointer;
}
.lesson-list .lesson:hover {
  -webkit-transform: translateY(-6px);
  -moz-transform: translateY(-6px);
  -ms-transform: translateY(-6px);
  -o-transform: translateY(-6px);
  transform: translateY(-6px);
}
.lesson-list .lesson:hover .lesson-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: bold;
  color: #1ebb51;
  white-space: normal;
}
.lesson-list .lesson-wrap {
  position: relative;
  margin-left: -20px;
}
</style>
