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
        lessonData: [],
        filterData: this.$store.state.filterData,
        filterCondition: {}
      }
    };
  },
  methods: {
    setListData: function() {
      const _filterCondition = this.data.filterCondition;
      window.console.log(_filterCondition);
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
      window.console.log(url);
      // axios
      //   .post(url)
      //   .then(response => {
      //     // window.console.log(this.data);
      //     this.data.lessonData = response.data.data;
      //   })
      //   // .then(function(response) {
      //   //   window.console.log(this.data);
      //   //   this.data.lessonData = response.data.data;
      //   // })
      //   .catch(error => {
      //     window.console.log(error);
      //   });
    }
  },
  beforeMount: function() {
    console.log("beforeMount");
    window.console.log(this.$store);
    let _filterData = Object.assign({}, this.$store.state.filterData);
    console.log(_filterData);
    this.data.filterCondition = {
      cat: _filterData["cat"].data_active,
      tag_id: _filterData["tag_id"].data_active,
      limit: 0,
      count: 10,
      knowledge_type: this.knowledge_type,
      channel_id: 1
    };
    this.setListData();
    window.console.log(this.data);
  },
  computed: {
    filterData() {
      return this.data.filterData;
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
        console.log("变了");
        console.log(newValue);
        this.setListData();
      },
      deep: true
    }
  },
  mounted: function() {
    console.log("mounted");
    const _this = this;
  },
  beforeUpdate() {
    console.log(this.filterData);
  }
};
</script>

<style scoped>
.lesson-list_home .lesson {
  float: left;
}
</style>
