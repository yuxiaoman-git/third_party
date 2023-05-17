<template>
  <div class="app-container">
    <!--    <filter-pane @filterMsg="filterMsg" :filter-data="filterData" :listQuery="selectedFilter" />-->
    <el-form
      :inline="true"
      size="small"
      :model="form"
      ref="ruleForm"
      label-width="80px"
      v-loading="loading"
      @submit.native.prevent
    >
      <el-form-item label="媒体名称">
        <el-input v-model="form.name" placeholder="" class="filter-item" />
      </el-form-item>

      <el-form-item label="合作商">
        <SelectItme type="cooperative" v-model="form.cooperative" />
      </el-form-item>
      <el-form-item label="状态">
        <SelectItme type="TaskStatus" v-model="form.TaskStatus" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          @click.native.prevent="filterMsg"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: max-content"
    >
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column
        prop="name"
        label="文件名称"
        width="230"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="分集序号"
        width="100"
        prop="episode_sn"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="分集标题"
        width="200"
        prop="episode_title"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="合作方" width="100" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.partner && row.partner.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="等级"
        width="60"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{
            row.level === 1
              ? "普通"
              : row.level === 2
              ? "优先"
              : row.level === 3
              ? "抢片"
              : row.level === 7
              ? "定时"
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="140" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ filterItems(TaskStatus, row.status).label }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="{ row }">
          <div class="operate-btn">
            <span
              @click="handelInjector(row)"
              v-if="isRefill(row.status) && $checkPermission(['edit'])"
              >重新注入</span
            >
            <span
              @click="handleUpdate(row)"
              v-if="
                row.is_show && !row.in_pending && $checkPermission(['edit'])
              "
              >更新</span
            >
            <span
              @click="handleDel(row)"
              v-if="
                row.is_show && !row.in_pending && $checkPermission(['edit'])
              "
              >删除</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      layout="total,sizes, prev, pager, next, jumper"
      @pagination="getList"
    />
    <el-dialog
      title="发起注入"
      :visible.sync="dialogInjectVisible"
      v-if="dialogInjectVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form
        :model="injectRuleForm"
        :rules="injectRules"
        ref="injectRuleForm"
        label-width="80px"
      >
        <el-form-item label="合作商" prop="cooperative">
          <el-input
            v-model="injectRuleForm.cooperative"
            disabled
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="taskLevel">
          <SelectItme
            type="taskLevel"
            v-model="injectRuleForm.taskLevel"
            width="100%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInject('injectRuleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import filterPane from "@/components/filterPane";
import SelectItme from "@/components/SelectItme/select.vue";
import Pagination from "@/components/Pagination";
import { TaskStatus } from "@/utils/getOptions";
import { filterItems } from "@/utils/myPublic";

const injectRuleForm = {
  task_id: "",
  cooperative: null,
  taskLevel: 1,
};
export default {
  name: "injectManage_",
  components: { SelectItme, Pagination, filterPane },
  data() {
    return {
      TaskStatus,
      loading: false,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      dialogInjectVisible: false,
      injectRuleForm: Object.assign({}, injectRuleForm),
      injectRules: {
        taskLevel: [
          { required: true, message: "请输入等级", trigger: "change" },
        ],
      },
      form: {
        name: "",
        cooperative: null,
        TaskStatus: null,
      },
      filterData: {
        elinput: [
          {
            name: "媒体名称",
            key: "name",
          },
        ],
        elselect: [
          {
            name: "合作商",
            key: "cooperative",
            type: "cooperative",
          },
          {
            name: "状态",
            key: "TaskStatus",
            type: "TaskStatus",
          },
        ],
      },
      selectedFilter: {},
    };
  },
  mounted() {
    // console.log(typeof (this.$route.query.cooperative))
    if (this.$route.query.cooperative) {
      this.form.cooperative = Number(this.$route.query.cooperative);
    }
    if (this.$route.query.name) {
      this.form.name = this.$route.query.name;
    }
    this.injectorTaskSearch();
  },
  methods: {
    filterItems,
    filterMsg() {
      // this.form = data;
      this.listQuery.page = 1;
      this.injectorTaskSearch();
    },
    isRefill(status) {
      for (const item of TaskStatus) {
        if (item.value == status && item.refill) {
          return true;
        }
      }
      return false;
    },
    getList() {
      this.injectorTaskSearch();
    },
    // async injectorTaskList() {
    //   const { page, limit: page_size } = this.listQuery;
    //   const body = {
    //     page,
    //     page_size,
    //   };
    //   const res = await this.$store.dispatch("injector/injectorTaskList", body);
    //   if (res.code === 0) {
    //     const data = res.data || {};
    //     this.total = data.total_page * page_size;
    //     this.tableData = data.data_list;
    //   }
    // },
    handelSearch() {
      this.listQuery.page = 1;
      this.injectorTaskSearch();
    },
    async injectorTaskSearch() {
      const {
        name: storage_name,
        cooperative: partner_id,
        TaskStatus: task_status,
      } = this.form;
      const { page, limit: page_size } = this.listQuery;
      const body = {
        storage_name,
        partner_id: partner_id || 0,
        task_status: task_status || undefined,
        page,
        page_size,
      };
      this.loading = true;
      const res = await this.$store.dispatch(
        "injector/injectorTaskSearch",
        body
      );
      this.loading = false;
      if (res.code === 0) {
        const data = res.data || {};
        this.total = data.total_item;
        this.tableData = data.data_list;
      }
    },
    handelInjector(row) {
      this.injectRuleForm = Object.assign({}, injectRuleForm);
      this.dialogInjectVisible = true;
      this.injectRuleForm.task_id = row.id;
      if (row.partner) this.injectRuleForm.cooperative = row.partner.name;
    },
    submitInject(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const body = {
            task_id: this.injectRuleForm.task_id,
            level: this.injectRuleForm.taskLevel,
          };
          const res = await this.$store.dispatch(
            "injector/injectorTaskReAdd",
            body
          );
          if (res.code === 0) {
            this.$message.success("注入已发起");
            this.dialogInjectVisible = false;
            this.injectorTaskSearch();
          }
        }
      });
    },
    handleDel(row) {
      // console.log(row.id)
      this.$confirm("确认发起工单删除操作?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/media_remove", {
            task_id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("删除成功");
            this.injectorTaskSearch();
          }
        })
        .catch(() => {});
    },
    handleUpdate(row) {
      this.$confirm("确认发起工单更新操作?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/media_update", {
            task_id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("更新成功");
            this.injectorTaskSearch();
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>
