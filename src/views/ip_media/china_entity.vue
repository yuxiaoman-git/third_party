<template>
  <div class="app-container">
    <div class="space-between">
      <el-form :inline="true" :model="formInline" @submit.native.prevent>
        <el-form-item label="实体ID">
          <el-input
            v-model="formInline.id"
            placeholder="实体ID"
            clearable
            width="150px"
          ></el-input>
        </el-form-item>
        <el-form-item label="实体类型">
          <SelectItem
            type="rightP_entity_category"
            v-model="formInline.category_id"
            width="100%"
          />
        </el-form-item>
        <el-form-item label="实体名称" prop="name">
          <el-input
            v-model="formInline.name"
            placeholder="实体名称"
            clearable
            width="150px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="success"
          size="small"
          class="mb-16"
          @click="handleAdd"
          v-if="$checkPermission(['add'])"
          >新增</el-button
        >
      </div>
    </div>

    <el-table :data="list" border style="width: 100%;" size="mini"
              v-loading="tableLoading"
    >
      <el-table-column prop="id" label="实体ID"> </el-table-column>
      <el-table-column prop="category_name" label="实体类型"> </el-table-column>
      <el-table-column prop="name" label="实体名称"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="handleEdit(row)"
            size="mini"
            v-if="$checkPermission(['edit'])"
            >修改</el-button
          >
<!--          <el-divider direction="vertical"></el-divider>-->
<!--          <el-button-->
<!--            type="text"-->
<!--            @click="handleDel(row)"-->
<!--            size="mini"-->
<!--            v-if="$checkPermission(['delete'])"-->
<!--            >删除</el-button-->
<!--          >-->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="total === 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getEntityList"
    />
    <el-dialog
      :title="dialogType === 'new' ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-form :model="form" ref="form" label-width="80px" :rules="dialogType === 'new' ? addRules : changeRules">
        <el-form-item v-if="dialogType === 'new'" label="实体类型" prop="category_id">
          <SelectItem
            type="rightP_entity_category"
            v-model="form.category_id"
          />
        </el-form-item>
        <el-form-item label="实体名称" prop="name">
          <el-input
            v-model.trim="form.name"
            style="width: 90%"
            placeholder="实体名称"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="submitForm('form', dialogType)"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItme/select.vue";
import Pagination from "@/components/Pagination";

const form = {
  id: "",
  category_id: "",
  name: null,
};
const formInline = {
  name: null,
  category_id: null,
  id: null
};
export default {
  name: "china_entity",
  components: {
    SelectItem,
    Pagination,
  },
  data() {
    return {
      list: [],
      dataList: [],
      dialogVisible: false,
      dialogType: "new",
      form: Object.assign({}, form),
      formInline: Object.assign({}, formInline),
      addRules: {
        category_id: [{ required: true, message: "请选择实体类型", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      changeRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      tableLoading: false,
      initDetail: {}
    };
  },
  mounted() {
    this.getEntityList();
  },
  methods: {
    handleAdd() {
      this.form = Object.assign({}, form);
      this.dialogVisible = true;
      this.dialogType = "new";
    },
    handleEdit(row) {
      this.form = Object.assign({}, form);
      this.dialogVisible = true;
      this.dialogType = "edit";
      this.form.name = row.name;
      this.form.category_id = row.category_id;
      this.form.id = row.id;
      this.initDetail = JSON.parse(JSON.stringify(this.form))
    },
    handleDel(row) {
      const id = row.id
      this.$confirm("确定要删除当前实体吗?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$store.dispatch("property/delEntity",
            {id}
          );
          if (res.code === 0) {
            this.refresh(row.category_id, 'delete', row.id)
          }
        })
        .catch(() => {});
    },
    async submitForm(formName, type) {
      const params = {}
      let handle = ''
      let url = ''

      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (type === 'new') {
            handle = 'add'
            params.category_id = this.form.category_id
            params.name = this.form.name
            url = "property/addEntityList"
          } else {
            if (this.form.name === this.initDetail.name) {
              this.dialogVisible = false;
              return
            }
            handle = 'update'
            params.name = this.form.name
            params.id = this.form.id
            params.category_id = this.form.category_id
            url = "property/updateEntityList"
          }
          const res = await this.$store.dispatch(
            url,
            {...params}
          );
          if (res.code === 0) {
            this.refresh(params.category_id, handle, params.id || '')
            this.dialogVisible = false;
          }
        }
      })
    },
    async getEntityList() {
      const params = {
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      this.tableLoading = true;
      const res = await this.$store.dispatch("property/getEntityList",
        {...params, ...this.formInline}
      );
      this.tableLoading = false;
      if (res && res.code === 0 && res.data) {
        this.list = res.data
        this.total = res.total_count || 0;
      }
    },
    onSubmit() {
      this.listQuery.page = 1
      this.getEntityList()
    },
    async refresh(entity_category_id, handle = '', id = '') {
      this.tableLoading = true
      const res = await this.$store.dispatch("property/refresh",
        {entity_category_id, handle, id}
      );
      if (res && res.code === 0) {
        this.$message.success(res.desc)
        this.getEntityList()
      } else {
        this.tableLoading = false
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.ml-10 {
  margin-left: 10px;
}
</style>
