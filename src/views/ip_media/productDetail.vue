<template>
  <div class="app-container">
    <div class="space-between" style="align-items: end">
      <div>
        <search-component ref="searchBar" @getData="getData"/>
      </div>
      <div>
        <!--    控制可选项是否展示-->
        <el-popover
          placement="right" width="1000" trigger="click"
          style="position: relative;top: -16px"
        >
          <div class="checkboxWrap">
            <div class="checkbox" style="padding: 10px">
              <div class="info">
                <div class="title">
                  常用媒资信息
                </div>
                <el-checkbox-group class="checkboxGroup" v-model="checkList">
                  <el-checkbox v-for="item in tableOption_common"
                               v-if="item.value !== 'up_copyright' || $checkPermission(['edit'])"
                               :label="item.label"
                               :value="item.value"
                               v-model="item.isShow"
                               @change="checkboxChange(item, 'normal')"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="info">
                <div class="title">
                  不常用媒资信息
                </div>
                <el-checkbox-group class="checkboxGroup" v-model="checkList">
                  <el-checkbox v-for="item in tableOption_less"
                               v-if="item.value !== 'buyer_company' || $checkPermission(['edit'])"
                               :label="item.label"
                               :value="item.value"
                               v-model="item.isShow"
                               @change="checkboxChange(item, 'less')"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <el-button type="primary"  slot="reference">显示其他字段</el-button>
        </el-popover>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 100%"
      v-loading="tableLoading"
    >
      <!--      状态标签 节目名称 类型 授权区域 授权开始时间 授权结束时间 黑白名单类型 实体类型  实体  终端  转授权 授权方式-->
      <el-table-column fixed prop="id" label="ID" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed prop="media_name" label="节目名称">
      </el-table-column>
      <el-table-column prop="status_label" label="状态标签">
        <template slot-scope="{ row }">
          <p style="margin: 0">{{ row.status_label }}</p>
          <p style="margin: 0">{{ row.item_status }}</p>
        </template>
      </el-table-column>
      <el-table-column  prop="type" label="类型">
      </el-table-column>
      <el-table-column  prop="authorized_area" label="授权区域">
      </el-table-column>
      <el-table-column  prop="authorize_start_at" label="授权开始时间">
      </el-table-column>
      <el-table-column  prop="authorize_end_at" label="授权结束时间">
      </el-table-column>
      <el-table-column  prop="is_white" label="黑白名单类型">
      </el-table-column>
      <el-table-column  prop="entity_category" label="实体类型">
      </el-table-column>
      <el-table-column  prop="entity" width="120px" label="实体">
      </el-table-column>
      <el-table-column  prop="terminals" width="120px" label="终端">
      </el-table-column>
      <el-table-column  prop="with_granted" label="转授权">
      </el-table-column>
      <el-table-column  prop="authorized_way" label="授权方式">
      </el-table-column>
      <!--   可选显示区1   -->
      <template v-if="checkList_table.length > 0">
        <el-table-column
          v-for="item in checkList_table"
          :prop="item.value"
          :label="item.label"
          show-overflow-tooltip
        ></el-table-column>
      </template>
      <!--   可选显示区2   -->
      <template v-if="checkList_less.length > 0">
        <el-table-column
          v-for="item in checkList_less"
          :prop="item.value"
          :label="item.label"
          show-overflow-tooltip
        ></el-table-column>
      </template>

      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="mini"
            :loading="row.loading"
            @click="handleEdit(row)"
            v-if="$checkPermission(['edit'])"
          >修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="mini"
            @click="handleDelete(row)"
            v-if="$checkPermission(['delete'])"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="total == 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[10,20,50,100]"
      @pagination="getList"
    />

    <!--    更新信息弹窗    -->
    <setRight
      v-model="dialogVisible"
      :formData="detailForm"
      @getRightForm="getRightForm"
    />
  </div>

</template>

<script>
import Pagination from "@/components/Pagination";
import searchComponent from "./components/filmRight/search-productDetail";
import setRight from "./components/filmRight/setRight";
import store from "@/store";

const detailForm = {
  buffer_period: '',
  editing_remark: '',
  granted_area: '',
  authorized_way: null,
  is_audio: '',
  is_video: '',
  is_download: '',
  is_safeguard: null,
  vip_pay: null,
  with_granted: {},
  editing_program: [],
  extra: [],
  terminals: [],
}
export default {
  name: "productDetail",
  components: {
    Pagination,
    searchComponent,
    setRight
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: "new",
      activeName: "basicSet",
      tableData: [],
      total: 0,
      loading: false,
      tableLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      searchForm: {},
      detailForm: JSON.parse(JSON.stringify(detailForm)),
      // 合同号、节目集数、单集时长、总时长、年份、定点采购、提交人、提交部门、VIP付费等
      excelDialogVisible: false,
      fileList: [],

      showCheckbox: false,
      tableOption_common: [],
      tableOption_less: [],
      checkList:[],
      checkList_table:[],
      checkList_less:[],
      checkListNormal_table:[],
    };
  },
  computed: {
    property_conf: {
      get() {
        return this.$store.state.property.property_conf;
      },
    },
  },
  mounted() {
    this.propertyList();
    this.search_config()
  },
  methods: {
    getData(data) {
      this.searchForm = data;
      this.listQuery.page = 1;
      this.propertyList();
    },
    getList() {
      this.propertyList();
    },
    //  获取列表数据
    async propertyList() {
      const params = {
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      this.tableLoading = true;
      const res = await this.$store.dispatch(
        "property/productDetailsList",
        {...params, ...this.searchForm}
      );
      this.tableLoading = false;
      if (res.code === 0) {
        this.tableData = res.data;
        this.total = res.total_count || 0;
      }
    },
//  表格可选字段逻辑
    checkboxChange(val, type) {
      let list = this.checkList_table
      if (type === 'normal') {
        list = this.checkList_table
      } else {
        list = this.checkList_less
      }
      if (list.indexOf(val) == -1) {
        list.push(val);
      } else {
        list.splice(list.indexOf(val), 1);
      }
    },
    //  删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('确认发起删除操作?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$store.dispatch("property/details_delete", {
            id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("删除成功");
            this.propertyList();
          }
        }).catch(() => {
      });
    },
    //  新增
    handleAdd() {
      this.handleCommand()
    },
    //  获取表格可选显示字段
    async search_config() {
      const res = await store.dispatch(
        "property/search_config",
      );
      if (res.code === 0) {
        const data = res.data || {};
        for (const i in data['details_show_others']) {
          if ( i === 'commonly_use') {
            for (const j in data['details_show_others'][i]) {
              this.tableOption_common.push({
                value: j,
                label: data['details_show_others'][i][j],
              });
            }
          } else {
            for (const j in data['details_show_others'][i]) {
              this.tableOption_less.push({
                value: j,
                label: data['details_show_others'][i][j],
              });
            }
          }
        }
      }
    },
    async handleEdit(row) {
      this.$set(row, "loading", true);
      this.detailForm.id = row.id
      this.detailForm.is_white = row.is_white
      const res = await this.$store.dispatch("property/copyright_detail", {
        id: row.id,
      });
      if (res.code === 0) {
        this.detailForm = res.data
        this.detailForm.vip_pay = {value: res.data.vip_pay}
        this.detailForm.is_safeguard = {value: res.data.is_safeguard}
        this.detailForm.is_download = {value: res.data.is_download}
        this.detailForm.with_granted = {value: res.data.with_granted}
        this.detailForm.authorized_way = {value: res.data.authorized_way}
        this.detailForm.terminals =
          res.data.terminals &&
          res.data.terminals.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });
        this.detailForm.editing_program =
          res.data.editing_program &&
          res.data.editing_program.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });
        this.detailForm.extra =
          res.data.extra &&
          res.data.extra.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });

        this.dialogVisible = true
      }
      this.$set(row, "loading", false);
    },
    async getRightForm(data) {
      const body = Object.assign({}, data)
      console.log(body)
      const res = await this.$store.dispatch("property/detailsUpdate", {
        ...body
      });
      if (res.code === 0) {
        this.$message.success(res.desc);
        this.dialogVisible = false
        this.propertyList()
      }
    },

  },

};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-top: 0;
}

.checkboxWrap{
  .checkbox{
    //border: 1px solid #ccc;
    //margin-bottom: 20px;
    .info{
      display: -webkit-box;
      margin-bottom: 20px;
      .title{
        width: 130px;
        font-size: 15px;
      }
      .checkboxGroup{
        width: 840px;
        .el-checkbox{
          min-width: 110px;
          margin-right: 20px;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.el-tooltip__popper.is-dark{
  max-width: 600px;
}
</style>
