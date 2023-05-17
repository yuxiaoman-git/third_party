<template>
  <div class="app-container">
    <div class="filter-pane">
      <filter-pane @filterMsg="filterMsg" :filter-data="filterData" />
      <div>
        <el-button type="primary" @click="dialogVisible = true">导出</el-button>
      </div>
    </div>

    <el-table :data="tableData" v-loading="loading" border style="width: 100%"
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="partner_name" label="合作商名称" width="100">
      </el-table-column>
      <el-table-column prop="media_id" label="媒体ID"> </el-table-column>
      <el-table-column prop="media_name" label="媒体名称"> </el-table-column>
      <el-table-column prop="media_episodes" label="分集总数"> </el-table-column>
      <el-table-column prop="media_category" label="媒体类型">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="success">{{ row.media_category }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="change_category" label="注入类型">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="warning">{{ row.change_category }}</el-tag>
          </div>
        </template></el-table-column>
      <el-table-column prop="valid_num" label="有效注入"> </el-table-column>
      <el-table-column prop="invalid_num" label="无效注入"> </el-table-column>
      <el-table-column prop="injector_num" label="注入总条数"> </el-table-column>
      <el-table-column prop="start_time" label="开始时间"> </el-table-column>
      <el-table-column prop="end_time" label="结束时间"> </el-table-column>

      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="{ row }">
          <div class="operate-btn">
            <span
              @click.stop="handleView(row)"
            >查看详情</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      layout="sizes, prev, pager, next, jumper"
      @pagination="getList"
    />
    <export-component :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import filterPane from "@/components/filterPane";
import exportComponent from "./components/export-component";
export default {
  name: "media",
  components: {
    Pagination,
    filterPane,
    exportComponent,
  },
  data() {
    return {
      dialogVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      loading: false,
      form: {},
      tableData: [],
      filterData: {
        elinput: [
          {
            name: "媒体名称",
            key: "wd",
          },
        ],
        elselect: [
          {
            name: "合作商",
            key: "cooperative",
            type: "cooperative",
            width: 140,
          },
        ],
      },
    };
  },
  mounted() {
    this.injectorHistory();
  },
  methods: {
    getList() {
      this.injectorHistory();
    },
    filterMsg(data) {
      this.form = data;
      this.injectorHistory();
    },
    async injectorHistory() {
      const {
        listQuery: { page, limit: page_size },
        form: { wd, cooperative: lsp_id },
      } = this;
      this.loading = true;
      const res = await this.$store.dispatch("injector/injectorHistory", {
        lsp_id,
        wd,
        page,
        page_size,
      });
      this.loading = false;
      if (res.code === 0) {
        this.tableData = (res.data && res.data.data_list) || [];
        this.total = res.data.total_page * page_size;
      }
    },
    handleView(row) {
      this.$router.push(`/contentStorage/injectManage?cooperative=${row.partner_id}&name=${row.media_name}`);
    }
  },
};
</script>

<style lang='scss' scoped>
.filter-pane {
  display: flex;
  justify-content: space-between;
}
</style>
