<template>
  <div class="row">
    <div class="list-wrap3"><MFilterLi :filterLiData="filterLiData" /></div>
    <div class="lesson-list">
      <div class="list-content">
        <LessonWrap :lessonWrapData="data.lessonData" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MFilterLi from "../MFilterLi.vue";
import LessonWrap from "../LessonWrap.vue";

export default {
  name: "LessonList",
  components: {
    LessonWrap,
    MFilterLi
  },
  props: {
    title: String,
    knowledge_type: String,
    lessonWrapData: Array,
    filterLiData: Object
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
        knowledge_type: _filterData["knowledge_type"].data_active,
        live_type: _filterData["live_type"].data_active,
        limit: 0,
        count: 12,
        channel_id: 1
      };
      return filterCondition;
    }
  },
  methods:{
    setListData: function() {
      const _filterCondition = Object.assign({}, this.filterCondition);
      window.console.log(_filterCondition);
      let url = `/api.php?act=opencourse&method=lists_by_knowledge&count=${_filterCondition.count}&channel_id=${_filterCondition.channel_id}&limit=${_filterCondition.limit}`;
      if (_filterCondition.cat != "" && _filterCondition.cat != undefined) {
        url += `&cat=${_filterCondition.cat}`;
      }
      if (_filterCondition.tag_id != "" && _filterCondition.tag_id != undefined) {
        url += `&tag_id=${_filterCondition.tag_id}`;
      }
      if (_filterCondition.knowledge_type != "" && _filterCondition.knowledge_type != undefined) {
        url += `&knowledge_type=${_filterCondition.knowledge_type}`;
      }
      if (_filterCondition.live_type != "" && _filterCondition.live_type != undefined) {
        url += `&live_type=${_filterCondition.live_type}`;
      }
      window.console.log(url);
      axios
        .post(url)
        .then(response => {
          window.console.log(response);
          this.data.lessonData = response.data.data;
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
    // data: {
    //   handler(newValue, oldValue) {
    //     console.log("变了");
    //     console.log(newValue);
    //   },
    //   deep: true
    // },
    filterData: {
      handler(newValue, oldValue) {
        window.console.log("变了");
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
  mounted: function(){
    window.console.log(this.$store.state);
  }
};
</script>

<style>
</style>
