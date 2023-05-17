<template>
  <div>
    <!-- :picker-options="pickerOptions" -->
    <el-form :inline="true" size="small" @submit.native.prevent>
      <el-form-item label="日期" v-if="filterData.timeSelect">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          class="filter-item"
        />
      </el-form-item>
      <el-form-item
        v-for="(item, index) in filterData.elinput"
        :key="item.key"
        :label="item.name"
      >
        <el-input
          v-model="listQuery[item.key]"
          :placeholder="item.name"
          :style="{ width: item.width ? item.width + 'px' : '200px' }"
          class="filter-item"
        />
      </el-form-item>

      <el-form-item
        v-for="(item, index) in filterData.elselect"
        :key="item.key"
        :label="item.name"
      >
        <SelectItme
          :type="item.type"
          v-model="listQuery[item.key]"
          :width="item.width ? item.width + 'px' : '200px'"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          @click.native.prevent="handleSearch"
        >
          查询
        </el-button>
        <!-- <el-button type="warning" @click="handleRest"> 重置 </el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import SelectItme from "@/components/SelectItme/select.vue";

export default {
  components: { SelectItme },
  props: {
    filterData: {
      type: Object,
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dateRange: ["", ""],
      listQuery: {},
    };
  },
  watch: {
    // filterData(val) {
    //   if (val.elinput.length > 0) {
    //     val.elinput.map((item) => {
    //       this.listQuery[item.key] = "";
    //     });
    //   }
    //   if (val.elselect.length > 0) {
    //     val.elinput.map((item) => {
    //       this.listQuery[item.key] = "";
    //     });
    //   }
    // },
    //缓存进页面想清空可用
    "filterData.rest": {
      handler: function (val) {
        if (val) {
          this.handleRest();
        }
      },
      deep: true,
    },
  },
  created() {},
  methods: {
    handleSearch() {
      const data = JSON.parse(JSON.stringify(this.listQuery));
      if (this.dateRange && this.dateRange[0] !== "") {
        data.beginDate = this.dateRange[0];
        data.endDate = this.dateRange[1];
      }
      Object.keys(data).forEach(function (key) {
        if (data[key] === "" || data[key] === null || data[key] === undefined) {
          delete data[key];
        }
      });
      this.$emit("filterMsg", data);
    },
    handleRest() {
      const data = JSON.parse(JSON.stringify(this.listQuery));
      Object.keys(data).forEach(function (key) {
        delete data[key];
      });
      this.listQuery = data;
      this.dateRange = ["", ""];
      this.$emit("filterMsg", data);
    },
  },
};
</script>

<style  scoped lang='scss'>
</style>

