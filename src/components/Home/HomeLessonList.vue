<template>
  <div class="lesson-list lesson-list_home">
    <div class="list-head">
      <h2>
        <i class="icon-title"></i>
        <span class="title">{{title}}</span>
        <router-link to="search" class="more" :knowledge-type="knowledge_type">更多&gt;</router-link>
      </h2>
    </div>
    <div class="list-content">
      <LessonWrap :lessonWrapData="data.lessonData" />
    </div>
  </div>
</template>

<script>
// import qs from "qs";
import axios from "axios";
import LessonWrap from "../LessonWrap.vue";

export default {
  name: "LessonList",
  components: {
    LessonWrap
  },
  props: {
    title: String,
    knowledge_type: Number
  },
  data() {
    return {
      data: {
        test: 1,
        filterData: this.$store.state.filterData,
        filterCondition: this.$store.getters.searchFilterCondition,
        lessonData: []
      }
    };
  },
  methods: {
    updateLessonData() {
      window.console.log(this);
      const _filterCondition = this.data.filterCondition;
      let url = `/api.php?act=opencourse&method=lists_by_knowledge&count=${_filterCondition.count}&channel_id=${_filterCondition.channel_id}&limit=${_filterCondition.limit}`;
      if (_filterCondition.cat != "") {
        url += `&cat=${_filterCondition.cat}`;
      }
      if (_filterCondition.tag_id != "") {
        this.url += `&cat=${_filterCondition.tag_id}`;
      }
      if (_filterCondition.knowledge_type != "") {
        this.url += `&cat=${_filterCondition.knowledge_type}`;
      }
      if (_filterCondition.live_type != "") {
        this.url += `&cat=${_filterCondition.live_type}`;
      }
      window.console.log("url");
      window.console.log(url);
      axios
        .post(url)
        .then(response => {
          this.data.lessonData = response.data.data;
          window.console.log(this.data);
        })
        // .then(function(response) {
        //   window.console.log(this.data);
        //   this.data.lessonData = response.data.data;
        // })
        .catch(error => {
          window.console.log(error);
        });
    }
  },
  watch: {
    filterData: {
      handler(val, oldVal) {
        window.console.log("1");
      },
      deep: true
    }
  },
  created: function() {
    this.updateLessonData();
    window.console.log("created");
    this.data.test = "created";
  },
  beforeMount: function() {
    this.data.test = "beforeMount";
  },
  mounted: function() {
    window.console.log("mounted");
    window.console.log(this.data);
  },
  beforeUpdate: function() {
    this.data.test = "beforeUpdate";
  },
  updated: function() {
    this.data.test = "updated";
  }
};
</script>

<style scoped>
.lesson-list_home .lesson {
  float: left;
}
</style>
