<template>
  <div class="app-container">
    <div class="space-between">
      <!--      合作方名称  远程搜索-->
      <!--      产业位置 下拉-->
      <!--      合作方类型 下拉-->
      <!--      实体名称 下拉-->
      <!--      合作日期 下拉-->
      <!--      运营负责人 远程搜索-->
      <!--      商务负责人-->
      <!--      采购负责人  同上-->
      <el-form :inline="true" :model="formInline" @submit.native.prevent>
        <el-form-item label="合作方名称">
          <autocompleteSmart v-model="form.name" />
        </el-form-item>
        <el-form-item label="产业位置">
          <SelectItme type="entity" v-model="formInline.entity" width="150px" />
        </el-form-item>
        <el-form-item label="合作方类型">
          <SelectItme
            type="entity"
            v-model="formInline.entity1"
            width="150px"
          />
        </el-form-item>
        <el-form-item label="实体名称">
          <SelectItme
            type="entity"
            v-model="formInline.entity2"
            width="150px"
          />
        </el-form-item>
        <el-form-item label="合作日期">
          <el-date-picker
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="运营负责人">
          <autocompleteSmart v-model="form.name" />
        </el-form-item>
        <el-form-item label="商务负责人">
          <autocompleteSmart v-model="form.name" />
        </el-form-item>
        <el-form-item label="采购负责人">
          <autocompleteSmart v-model="form.name" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
        <el-button
          type="success"
          size="small"
          class="mb-16"
          @click="handelAdd"
          v-if="$checkPermission(['add'])"
        >
          新增
        </el-button>
      </el-form>
    </div>

    <el-table :data="list" border style="width: 100%" size="mini">
      <el-table-column prop="id" label="合作方ID"> </el-table-column>
      <el-table-column prop="abbr" label="合作方名称"> </el-table-column>
      <el-table-column prop="abbr" label="合作方类型"> </el-table-column>
      <el-table-column prop="entity_title" label="实体名称"> </el-table-column>
      <el-table-column prop="entity_title" label="产业位置"> </el-table-column>
      <el-table-column prop="entity_title" label="联系人姓名">
      </el-table-column>
      <el-table-column prop="entity_title" label="联系人电话">
      </el-table-column>
      <el-table-column prop="entity_title" label="合作开始时间">
      </el-table-column>
      <el-table-column prop="entity_title" label="合作结束时间">
      </el-table-column>
      <el-table-column prop="entity_title" label="运营负责人">
      </el-table-column>
      <el-table-column prop="entity_title" label="商务负责人">
      </el-table-column>
      <!--      <el-table-column prop="entity_title" label="采购负责人"> </el-table-column>-->
      <el-table-column prop="entity_title" label="备注"> </el-table-column>
      <el-table-column prop="entity_title" label="合同"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="handleEdit(row)"
            size="mini"
            v-if="$checkPermission(['edit'])"
            >更新</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            @click="handleDel(row)"
            size="mini"
            v-if="$checkPermission(['delete'])"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="total == 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[10]"
      @pagination="getList"
    />
    <el-dialog
      :title="dialogType == 'new' ? '新增' : '更新'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="700px"
    >
      <partnerDialog :info="dialogInfo" @onSubmit="onSubmit"></partnerDialog>
    </el-dialog>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
import Pagination from "@/components/Pagination";
import autocompleteSmart from "../contentManage/components/autocompleteSmart";
import partnerDialog from "./components/partnerDialog";

import { entity } from "./js/entity";
const form = {
  entity: "",
  name: "",
};
const formInline = {
  entity: "",
  name: "",
};
export default {
  name: "partnerManage",
  components: {
    SelectItme,
    Pagination,
    autocompleteSmart,
    partnerDialog,
  },
  data() {
    return {
      total: 0,
      loading: false,
      tableLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      dialogInfo: [],
      list: [],

      dataList: [],
      entity,
      dialogVisible: false,
      dialogType: "new",
      form: Object.assign({}, form),
      formInline: Object.assign({}, formInline),
      rules: {
        entity: [
          { required: true, message: "请选择实体类型", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.propertyEntityList();
  },
  methods: {
    handelAdd() {
      this.form = Object.assign({}, form);
      this.dialogVisible = true;
      this.dialogType = "new";
    },
    handleEdit(row) {
      this.form = Object.assign({}, form);
      this.dialogVisible = true;
      this.dialogType = "eidt";
      this.form.name = row.abbr;
      this.form.entity = row.type;
    },
    handleDel() {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {});
    },
    submitForm() {},
    async propertyEntityList() {
      const res = await this.$store.dispatch("property/propertyEntityList", {});
      if (res && res.code === 0 && res.data) {
        res.data.forEach((e) => {
          entity.forEach((el) => {
            if (e.type == el.value) {
              e.entity_title = el.label;
            }
          });
        });
        this.dataList = res.data.filter((e) => !e.is_all);
        this.list = this.filterList(
          this.formInline.entity,
          this.formInline.name
        );
      }
    },
    filterList(entity, name) {
      return this.dataList.filter((e) => {
        if (entity && name) {
          return e.type === entity && this.filterData(name, e.abbr);
        } else if (entity) {
          return e.type === entity;
        } else if (name) {
          return this.filterData(name, e.abbr);
        } else {
          return true;
        }
      });
    },
    filterData(name, dataOrigin) {
      const regstr = ["", ...name, ""].join(".*");
      const reg = new RegExp(regstr);
      return reg.test(dataOrigin);
    },
    onSubmit() {
      this.dialogVisible = false;
      this.list = this.filterList(this.formInline.entity, this.formInline.name);
    },

    getList() {
      this.propertyEntityList();
    },
  },
};
</script>

<style lang="scss" scoped>
.ml-10 {
  margin-left: 10px;
}
</style>
