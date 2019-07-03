<template>
  <div class="lesson-wrap clearboth">
    <Lesson
      v-for="(item, index) in lessonWrapData"
      :item="item"
      :key="index"
      :course-id="item.course_id"
    />
  </div>
</template>

<script>
import Lesson from './Lesson.vue'

export default {
  components: {
    Lesson
  },
  props: {
    lessonWrapData: Array
  }
};
</script>

<style>
</style>
