<template>
  <div class="search-box">
      <input
        type="text"
        id="search-text"
        name="search-text"
        max-length="11"
        placeholder="请输入您所需的相关课程"
      >
      <div class="btn-search"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
  background: url("/img/bg-title.png") no-repeat center;
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
  background: url("/img/search2.png") no-repeat center;
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

</style>
