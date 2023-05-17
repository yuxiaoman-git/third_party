<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="formInline" @submit.native.prevent
               style="display: flex;width: 100%"
               class="searchBar"
      >
          <el-form-item label="媒体名称">
            <el-input v-model="formInline.media_name" placeholder="请输入媒体名称" clearable style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="合作商">
            <SelectItem
              type="cooperative"
              v-model="formInline.partner"
              width="140px"
            />
          </el-form-item>
          <el-form-item label="定时日期">
            <el-date-picker
              v-model="formInline.datetime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 140px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" @click="handleQuery()"
            >查询
            </el-button>
          </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" v-loading="loading" border style="width: 100%"
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="id" label="任务ID"> </el-table-column>
      <el-table-column prop="media_name" label="媒体名称"> </el-table-column>
      <el-table-column prop="name" label="文件名"> </el-table-column>
      <el-table-column prop="datetime" label="定时时间"> </el-table-column>
<!--      <el-table-column prop="name" label="发起人"> </el-table-column>-->
      <el-table-column prop="partner.name" label="注入平台"></el-table-column>
      <el-table-column prop="level_name" label="状态"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="{ row }">
          <div class="operate-btn">
            <span @click="handleEdit(row)" v-if="$checkPermission(['edit'])">修改</span>
            <span @click="handleDel(row)" v-if="$checkPermission(['delete'])">删除</span>
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
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      custom-class="custom-dialog"
      width="500px"
      top="20px"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        label-width="100px"
      >
        <el-form-item label="定时时间" prop="datetime">
          <el-date-picker
            v-model="editForm.datetime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editCronTask('injectRuleForm')"
        >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import SelectItem from "@/components/SelectItme";
import {getStorage} from "@/utils/auth";

const formInline = {
  media_name: '',
  datetime: '',
  partner: null,
};
const editForm = {
  datetime: '',
};

export default {
  name: "timingList",
  components: {
    Pagination,
    SelectItem,
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      loading: false,
      form: {},
      tableData: [],
      formInline: JSON.parse(
        JSON.stringify(Object.assign({}, formInline))
      ),
      editForm: JSON.parse(
        JSON.stringify(Object.assign({}, editForm))
      ),
      editFormRules: {
        datetime: [{required: true, message: "请选择图片", trigger: "blur" }],
      },
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      editObj: {}
    };
  },
  mounted() {
    this.cronList();
  },
  methods: {
    getList() {
      this.cronList();
    },
    handleQuery() {
      this.listQuery.page = 1
      this.cronList();
    },
    async cronList() {
      const {
        listQuery: { page, limit: page_size },
        formInline: { media_name, partner, datetime },
      } = this;
      this.loading = true;
      const res = await this.$store.dispatch("injector/cronList", {
        partner_id: partner && partner.value,
        media_name,
        datetime,
        page,
        page_size,
      });
      this.loading = false;
      if (res.code === 0) {
        this.tableData = (res.data && res.data.data_list) || [];
        this.total = res.data.total_item;
      }
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.editObj = row
    },
    handleDel(row) {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/deleteCronTask", {
            level: row.level,
            task_id:  row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("删除成功");
            await this.cronList();
          }
        }).catch(() => {});
    },
    async editCronTask() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const { sid = '', uid = 0 } = getStorage('userInfo') || {}
          const { level, id: task_id } = this.editObj;
          const datetime = this.editForm.datetime;
          const body = {
            level,
            task_id,
            datetime
          }
          const params = {
            sid,
            uid
          }
          const res = await this.$store.dispatch("injector/editCronTask", {
            body, params
          });
          this.loading = false;
          if (res.code === 0) {
            this.$message.success("修改成功");
            this.dialogVisible = false
            await this.cronList();
          }
        }
      })
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
