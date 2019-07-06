import Vue from "vue";
import Vuex from "vuex";

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
    }
  },
  getters: {
    getStateCount: function(state) {
      state.count = state.count + 1;
    }
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
      // window.console.log(state.filterData);
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
    }
  }
});
