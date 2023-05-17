<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="content"
      placement="top"
      v-if="row.key !== 'term' && row.key !== 'opes' && row.key !== 'power'"
    >
      <i :class="icon"></i>
    </el-tooltip>

    <div v-else>
      <el-tooltip
        v-for="(e, i) in getTerm(item[row.key], row[row.key], row.key)"
        :key="i"
        class="item"
        effect="dark"
        :content="e.title"
        placement="top"
      >
        <i :class="e.icon"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    content() {
      return (
        this.row[this.item[this.row.key]] &&
        this.row[this.item[this.row.key]].title
      );
    },
    icon() {
      return (
        this.row[this.item[this.row.key]] &&
        this.row[this.item[this.row.key]].icon
      );
    },
  },
  methods: {
    getTerm(str, list, key) {
      const arr = [];
      if (str && list) {
        if (key === "power") {
          str = (str + "").padStart(2, "0");
        }
        for (let i = 0; i < str.length; i++) {
          if (str[i] == "1") {
            const obj = list[list.length - 1 - i];
            arr.push(obj);
          }
        }
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.danger {
  color: #f56c6c;
}
.blue {
  color: #409eff;
}
.font-size-20 {
  font-size: 20px;
}
.box-card {
  margin-top: 16px;
}
</style>