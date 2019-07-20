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
import MFilterLi from "../../components/MFilterLi.vue";
import LessonWrap from "../../components/LessonWrap.vue";

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
      axios
        .post(url)
        .then(res => {
          // window.console.log(res);
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
    this.setListData();
  },
  mounted: function(){}
};
</script>

<style>
</style>
