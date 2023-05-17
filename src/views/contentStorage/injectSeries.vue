<template>
  <div class="app-container">
    <filter-pane @filterMsg="filterMsg" :filter-data="filterData" />
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="lsp_name" label="合作商"> </el-table-column>
      <el-table-column prop="action" label="对接行为" align="center">
        <template slot-scope="{ row }">
          <div>
            <el-tag :type="row.action == 'DELETE' ? 'warning' : row.action == 'REGIST' ? '' : 'success'">{{ row.action }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="media_id" label="媒体ID"> </el-table-column>
      <el-table-column prop="media_name" label="媒体名称"> </el-table-column>
      <el-table-column prop="state" label="任务状态"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="update_time" label="更新时间"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="160px">
        <template slot-scope="{ row }">
          <div class="operate-btn">
            <span
              @click="handleUpdate(row)"
              v-if="row.is_show && $checkPermission(['edit'])">更新</span>
            <span
              @click="handleInject(row)"
              v-if="row.state === '失败' && row.action === 'REGIST' && $checkPermission(['edit'])">重新注入</span>
            <span
              @click="handleDel(row)"
              v-if="row.is_show && $checkPermission(['edit'])">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import filterPane from "@/components/filterPane";

export default {
  name: "injectSeries",
  components: { Pagination, filterPane },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        limit: 20,
      },
      form: {
        lsp_id: "",
      },
      filterData: {
        elselect: [
          {
            name: "合作商",
            key: "lsp_id",
            type: "cooperative",
          },
          {
            name: "任务状态",
            key: "status",
            type: "seriesStatus",
          },
        ],
        elinput: [
          {
            name: "媒体名称",
            key: "media_name",
          },
        ],
      },
    };
  },
  mounted() {
    this.injectorSeries();
  },
  methods: {
    getList() {
      this.injectorSeries();
    },
    filterMsg(data) {
      this.form = data;
      this.injectorSeries();
    },
    async injectorSeries() {
      const {
        listQuery: { page, limit: page_size },
      } = this;
      const {lsp_id, status, media_name} = this.form;
      this.loading = true;
      const res = await this.$store.dispatch("injector/injectorSeries", {
        page,
        page_size,
        lsp_id,
        status,
        media_name
      });
      this.loading = false;
      if (res.code === 0) {
        this.tableData = res.data || [];
        this.total = res.total_pages * this.listQuery.limit;
      }
    },
    handleDel(row) {
      this.$confirm('确认发起工单删除操作?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/series_remove", {
            task_id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("删除成功");
            this.injectorSeries();
          }
        }).catch(() => {});
    },
    handleUpdate(row) {
      this.$confirm('确认发起工单更新操作?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/series_update", {
            task_id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("更新成功");
            this.injectorSeries();
          }
        }).catch(() => {});
    },
    handleInject(row) {
      this.$confirm('确认发起重新注入?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/seriesReAdd", {
            sync_id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("剧头重注已发起");
            this.injectorSeries();
          }
        }).catch(() => {});
    },
  },
};
</script>

<style>
</style>
