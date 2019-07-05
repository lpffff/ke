<template>
  <li class="list-li clearfix" :id="data.id">
    {{this.$store.state.cat}}
    <span class="front">{{ data.front}}</span>
    <div class="item-wrap clearboth">
      <span
        v-for="(item, index) in data.children"
        :key="index"
        class="item"
        :class="item.data_num == data.data_active ? 'active' : '' "
        :data-num="item.data_num ? item.data_num : ''"
        @click="handleChange();addCat();"
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
      const data_num = event.target.getAttribute("data-num");
      this.data.data_active = data_num;
    },
    addCat: function(){
      this.$store.state.cat++;
    }
  },
  beforeMount: function() {
    this.store1 = this.$store.state;
  }
};
</script>
<style scoped>
@import url("../assets/css/filter.css");
</style>
