<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" @submit.native.prevent>
      <el-form-item label="媒体名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="" label-width="10px">
        <el-button
          type="primary"
          native-type="submit"
          @click.native.prevent="handelSearch"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border size="mini" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="" label="图片" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="" label="题材"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="dialogVisible = true"
            >权利历史</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <right-history v-model="dialogVisible" v-if="dialogVisible" />
  </div>
</template>

<script>
import rightHistory from "./components/right-history";

export default {
  name: "search_old",
  components: { rightHistory },
  data() {
    return {
      form: {},
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          name: "变形金刚",
          type: "电影",
        },
        {
          id: 2,
          name: "变形金刚",
          type: "电影",
        },
        {
          id: 3,
          name: "变形金刚",
          type: "电影",
        },
        {
          id: 4,
          name: "变形金刚",
          type: "电影",
        },
      ],
    };
  },
};
</script>

<style>
</style>
