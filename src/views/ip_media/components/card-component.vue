<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <el-table
      :data="tableData"
      border
      size="mini"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column fixed label="单选" width="60">
        <template slot-scope="{ row, $index }">
          <el-radio v-model="radio" :label="$index"><span></span></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="mid" label="媒体ID" width="80"> </el-table-column>
      <el-table-column
        prop="title"
        label="媒体名称"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="year"
        label="年份"
        width="80"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="授权时间"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="" label="提交人" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop=""
        label="提交部门"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="创建时间"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    give: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      radio: null,
      tableData: [
        {
          mid: 1,
          date: "2016-05-02",
          title: "变形金刚",
          year: "2020",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          mid: 2,
          date: "2016-05-04",
          title: "变形金刚",
          year: "2020",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          mid: 3,
          date: "2016-05-01",
          title: "变形金刚",
          year: "2020",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          mid: 4,
          date: "2016-05-03",
          title: "变形金刚",
          year: "2020",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  watch: {
    radio: {
      handler(i) {
        if (i !== null) {
          const obj = this.tableData[i];
          this.$emit("returnBack", obj);
        } else {
          this.$emit("returnBack", null);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// .box-card {
//   margin-bottom: 16px;
// }
</style>