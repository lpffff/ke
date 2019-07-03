<template>
  <li class="list-li clearfix" :id="data.id">
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
    handleChange: function(event) {
      window.console.log(event.target);
      const data_num = event.target.getAttribute("data-num");
      this.data.data_active = data_num;
    }
  },
  beforeMount: function() {
    window.console.log(this.data);
  }
};
</script>
<style scoped>
@import url("../assets/css/filter.css");
</style>
