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
import LessonWrap from "../../components/LessonWrap.vue";

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
        lessonData: [],
        filterData: this.$store.state.filterData
      }
    };
  },
  computed: {
    filterData() {
      return this.data.filterData;
    },
    filterCondition() {
      let _filterData = Object.assign({}, this.$store.state.filterData);
      let filterCondition = {};
      filterCondition = {
        cat: _filterData["cat"].data_active,
        tag_id: _filterData["tag_id"].data_active,
        limit: 0,
        count: 10,
        knowledge_type: this.knowledge_type,
        channel_id: 1
      };
      return filterCondition;
    }
  },
  methods: {
    setListData: function() {
      const _filterCondition = Object.assign({}, this.filterCondition);
      // window.console.log(_filterCondition);
      let url = `/api.php?act=opencourse&method=lists_by_knowledge&count=${_filterCondition.count}&channel_id=${_filterCondition.channel_id}&limit=${_filterCondition.limit}`;
      if (_filterCondition.cat != "" && _filterCondition.cat != undefined) {
        url += `&cat=${_filterCondition.cat}`;
      }
      if (
        _filterCondition.tag_id != "" &&
        _filterCondition.tag_id != undefined
      ) {
        url += `&tag_id=${_filterCondition.tag_id}`;
      }
      if (
        _filterCondition.knowledge_type != "" &&
        _filterCondition.knowledge_type != undefined
      ) {
        url += `&knowledge_type=${_filterCondition.knowledge_type}`;
      }
      if (
        _filterCondition.live_type != "" &&
        _filterCondition.live_type != undefined
      ) {
        url += `&live_type=${_filterCondition.live_type}`;
      }
      // window.console.log(url);
      axios
        .post(url)
        .then(res => {
          this.data.lessonData = res.data.data;
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  },
  watch: {
    filterData: {
      handler() {
        this.setListData();
      },
      deep: true
    }
  },
  created: function() {
    console.log("beforeMount");
    // window.console.log(this.$store);
    this.setListData();
  },
  mounted: function() {
    window.console.log("mounted");
  },
  beforeUpdate() {}
};
</script>

<style scoped>
.lesson-list_home .lesson {
  float: left;
}
</style>
