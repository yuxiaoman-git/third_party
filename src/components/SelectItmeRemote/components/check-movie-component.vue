<template>
  <div class="movie-box">
    <div class="left">
      <el-image class="img" v-if="item.img" :src="item.img"></el-image>
    </div>
    <div class="right">
      <span>{{ item.label }}</span>
      <span class="ml-7 gray">{{ item.year }}</span>
      <span class="gray">（{{ item.id }}）</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.ml-7 {
  margin-left: 7px;
}
.gray {
  color: #b4b4b4;
}
.movie-box {
  display: flex;
  .left {
    width: 40px;
    margin-right: 4px;
    .img {
      width: 40px;
      vertical-align: middle;
    }
  }
}
</style>