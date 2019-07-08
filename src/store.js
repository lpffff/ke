import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
    filterData: {
      cat: {
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
      tag_id: {
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
      knowledge_type: {
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
      live_type: {
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
    },
    homeFilterLessonData: [],
    searchFilterLessonData: [],
    recommendLessonData: []
  },
  getters: {
    searchFilterCondition: function(state) {
      return {
        cat: state.filterData["cat"].data_active,
        tag_id: state.filterData["tag_id"].data_active,
        knowledge_type: state.filterData["knowledge_type"].data_active,
        live_type: state.filterData["live_type"].data_active,
        limit: 0,
        count: 12,
        channel_id: 1
      };
    },
    homeFilterCondition: function(state) {
      state.homeFilterCondition = {
        cat: state.filterData["cat"].data_active,
        tag_id: state.filterData["tag_id"].data_active,
        limit: 0,
        count: 10,
        knowledge_type: state.knowledge_type,
        channel_id: 1
      };
    },
  },
  mutations: {
    add(state) {
      state.count = state.count + 1;
    },
    reduction(state) {
      state.count = state.count + 1;
    },
    handleFilter(state, param) {
      const type = Object.keys(param)[0];
      state.filterData[type].data_active = param[type];
    },
    homeFilterLessonData(state, getters, param){
      const sfc = getters.searchFilterCondition;
      let url = `/api.php?act=opencourse&method=lists_by_knowledge&count=${
        sfc.count
      }&channel_id=${sfc.channel_id}&limit=${sfc.limit}`;
      if (sfc.cat != "") {
        url += `&cat=${sfc.cat}`;
      }
      if (sfc.tag_id != "") {
        this.url += `&cat=${sfc.tag_id}`;
      }
      this.url += `&cat=${param.knowledge_type}`;
      window.console.log("url");
      window.console.log(url);
      let homeFilterLessonData = [];
      axios
        .post(url)
        .then(response => {
          window.console.log(response);
          homeFilterLessonData = response.data.data;
          return homeFilterLessonData;
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    searchFilterLessonData(state, getters){
      const sfc = getters.searchFilterCondition;
      let url = `/api.php?act=opencourse&method=lists_by_knowledge&count=${
        sfc.count
      }&channel_id=${sfc.channel_id}&limit=${sfc.limit}`;
      if (sfc.cat != "") {
        url += `&cat=${sfc.cat}`;
      }
      if (sfc.tag_id != "") {
        this.url += `&cat=${sfc.tag_id}`;
      }
      if (sfc.knowledge_type != "") {
        this.url += `&cat=${sfc.knowledge_type}`;
      }
      if (sfc.live_type != "") {
        this.url += `&cat=${sfc.live_type}`;
      }
      window.console.log("url");
      window.console.log(url);
      let searchFilterLessonData = [];
      axios
        .post(url)
        .then(response => {
          window.console.log(response);
          searchFilterLessonData = response.data.data;
          return searchFilterLessonData;
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  },
  actions: {
    addFun(context) {
      context.commit("add");
    },
    reductionFun(context) {
      context.commit("reduction");
    },
    handleFilterFun(context, param) {
      context.commit("handleFilter", param);
    },
    homeFilterLessonDataFun(context,param){
      context.commit("homeFilterLessonData", param);
    },
    searchFilterLessonDataFun(context){
      context.commit("searchFilterLessonData");
    }
  }
});
