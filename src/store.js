import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: true,
    user: {
      // status: 0,
      // code: 0,
      // data: {
      //   nickname: "136****4685",
      //   account: "136****4685",
      //   pic: "",
      //   type: "2",
      //   user_id: "233292"
      // }
    },
    count: 1,
    filterData: JSON.parse(localStorage.getItem("filterData")) || {
      cat: {
        type: "cat",
        id: "catWrap",
        front: "年级",
        children: [
          { data_num: "", text: "全部" },
          { data_num: "13", text: "四年级" },
          { data_num: "14", text: "五年级" },
          { data_num: "15", text: "六年级" },
          { data_num: "6", text: "初一" },
          { data_num: "5", text: "初二" },
          { data_num: "4", text: "初三" },
          { data_num: "3", text: "高一" },
          { data_num: "2", text: "高二" },
          { data_num: "1", text: "高三" }
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
    recommendLessonData: [],
    wx_booklist: [],
    wx_booklistIds: []
  },
  getters: {
    isLogin: function (state) {
      let isLogin = false;
      if (state.user.status == 0) {
        isLogin = true
      } else {
        isLogin = false;
      }
      return isLogin;
    },
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
      let homeFilterCondition = {
        cat: state.filterData["cat"].data_active,
        tag_id: state.filterData["tag_id"].data_active,
        limit: 0,
        count: 10,
        knowledge_type: state.knowledge_type,
        channel_id: 1
      };
      return homeFilterCondition;
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
      localStorage.setItem("filterData", JSON.stringify(state.filterData));
    },
    setUserInfo(state, param) {
      state.user = param;
    },
    getBooklist(state) {
      axios
        .post("/api.php?act=opencourse&method=wx_booklist")
        .then(function(res) {
          // console.log(res);
          state.wx_booklist = res.data.data;
          state.wx_booklist.map(function(item) {
            state.wx_booklistIds.push(item.knowledge_id);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    book(state, params) {
      axios
        .post(
          "/api.php?act=opencourse_knowledge&method=book&knowledge_id=" +
            params.knowledge_id
        )
        .then(function(res) {
          console.log(res);
          if (res.data.status == 0) {
            state.wx_booklistIds.push(params.knowledge_id);
          } else {
            window.location.href = "//www.sh.com/login.php";
          }
        })
        .catch(function(err) {
          console.log(err);
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
    homeFilterLessonDataFun(context, param) {
      context.commit("homeFilterLessonData", param);
    },
    searchFilterLessonDataFun(context) {
      context.commit("searchFilterLessonData");
    },
    setUserInfoFun(context, param) {
      context.commit("setUserInfo", param);
    },
    getBooklistFun(context) {
      context.commit("getBooklist");
    },
    bookFun(context, params) {
      context.commit("book", params);
    }
  }
});
