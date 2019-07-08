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
@import url("../assets/css/filter.css");
</style>
