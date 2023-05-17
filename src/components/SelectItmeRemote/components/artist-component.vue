<template>
  <div>
    <div>
      <span>{{ item.label }}</span>
      <span class="ml-7 gray">{{ item.gender }}</span>
    </div>
    <span class="birthday" v-if="item.birthday">生日:{{ item.birthday }}</span>
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
.birthday {
  font-size: 12px;
  color: #b4b4b4;
  display: inline-block;
  padding-top: 2px;
}
</style>