<template>
  <router-link to="/detail" class="lesson" :course-id="item.course_id">
    <div class="lesson-one">
      <img :src="item.knowledge_pic" :title="item.knowledge_name" />
      <div class="hover-view">
        <span>测试</span>
      </div>
    </div>
    <div class="lesson-two">
      <div class="part">
        <div class="lesson-title" title="测试系列课录播课">{{item.knowledge_name}}</div>
        <div class="lesson-p1">
          <span>{{`${new Date()}`}}</span> | <span class="green">1</span>课时
        </div>
      </div>
      <div class="part">
        <div class="part-left">
          <p>
            <span class="green">6828</span>人已报名
          </p>
        </div>
        <div class="price">
          <span class="green">免费</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {

  }
};
</script>

<style>
@import url("../assets/css/lesson.css");
</style>
