<template>
  <li class="list-li clearfix" :id="data.id" :data-type="data.type" >
    <span class="front">{{ data.front}}</span>
    <div class="item-wrap clearboth">
      <span
        v-for="(item, index) in data.children"
        :key="index"
        class="item"
        :class="item.data_num == data.data_active ? 'active' : '' "
        :data-num="item.data_num ? item.data_num : ''"
        @click="handleChange"
      >{{item.text}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: "FilterLi",
  props: {
    filterLiData: Object
  },
  data() {
    return {
      data: this.filterLiData
    };
  },
  methods: {
    handleChange: function() {
      const active_data_num = event.target.getAttribute("data-num");
      const param = {};
      param[this.data.type] = active_data_num;
      this.$store.dispatch("handleFilterFun", param)
      window.console.log(this.$store.state.filterData.cat.data_active);
    },
  },
  beforeMount: function() {
    this.store1 = this.$store.state;
  }
};
</script>
<style scoped>
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

.filter-lesson .list-li {
    line-height: 26px;
    font-size: 14px;
}

.filter-lesson .front {
    float: left;
    margin: 10px 0;
    font-weight: bold;
    color: #333;
}

.filter-lesson .item-wrap {
    float: left;
    margin-left: 10px;
    overflow: hidden;
}

.filter-lesson .item {
    float: left;
    margin: 10px;
    padding: 0 15px;
    border-radius: 13px;
    color: #666;
    background: transparent;
    cursor: pointer;
}

.filter-lesson .item.active,
.filter-lesson .item:hover {
    color: #fff;
    background-color: #19b955;
    background-image: linear-gradient(-90deg, #19b955 0%, #6dd718 100%), linear-gradient(#37c879, #37c879);
    background-blend-mode: normal, normal;
}

.filter-lesson .to-my-lesson {
    position: absolute;
    top: 0;
    right: 30px;
    width: 92px;
    height: 38px;
    padding-top: 10px;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
    background: url("<%= BASE_URL %>img/bg-title.png") no-repeat center;
    cursor: pointer;
}

.filter-lesson .search-box {
    position: absolute;
    width: 426px;
    height: 20px;
    padding: 11px 0;
    bottom: -4px;
    right: 30px;
    line-height: 18px;
    font-size: 12px;
    background: url("<%= BASE_URL %>img/search2.png") no-repeat center;
}

.filter-lesson .search-box input {
    float: left;
    width: 300px;
    height: 18px;
    margin-left: 42px;
    line-height: 18px;
    color: #999;
    text-align: left;
    font-size: 12px;
    border: none;
    background: transparent;
}

.filter-lesson .keywords {
    float: left;
    margin-left: 30px;
}

.filter-lesson .keywords span {
    display: inline-block;
    padding: 0 11px;
    border-radius: 9px;
    cursor: pointer;
}

.filter-lesson .keywords .bg-white {
    background: #fff;
    color: #666;
}

.filter-lesson .keywords .bg-green {
    margin-left: 10px;
    background: #1ebb51;
    color: #fff;
}

.filter-lesson .btn-search {
    position: absolute;
    width: 40px;
    height: 42px;
    top: 0;
    right: 0;
    cursor: pointer;
}

.filter-list-wrap {
    padding-left: 30px;
    padding-right: 30px;
}
</style>
