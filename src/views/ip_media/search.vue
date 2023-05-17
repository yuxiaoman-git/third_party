<template>
  <div class="app-container">
    <div class="space-between">
      <div style="width: 100%">
        <search-component
          ref="searchBar"
          @getData="getData"
          @handleAdd="handleAdd"
        />
      </div>
      <div>
        <div>
          <el-button
            type="success"
            native-type="submit"
            @click="handleAdd()"
            v-if="$checkPermission(['add'])"
            >新增
          </el-button>
        </div>
        <div style="margin-top: 10px">
          <!--    控制可选项是否展示-->
          <el-popover
            class="showOthers"
            placement="right"
            width="1000"
            trigger="click"
          >
            <div class="checkboxWrap">
              <div class="checkbox" style="padding: 10px">
                <div class="info">
                  <div class="title">常用媒资信息</div>
                  <el-checkbox-group class="checkboxGroup" v-model="checkList">
                    <template v-for="item in tableOption_common">
                      <el-checkbox
                        :key="item.value"
                        v-if="
                          item.value !== 'up_copyright' ||
                          $checkPermission(['edit'])
                        "
                        :label="item.label"
                        :value="item.value"
                        v-model="item.isShow"
                        @change="checkboxChange(item, 'normal')"
                      ></el-checkbox>
                    </template>
                  </el-checkbox-group>
                </div>
                <div class="info">
                  <div class="title">不常用媒资信息</div>
                  <el-checkbox-group class="checkboxGroup" v-model="checkList">
                    <template v-for="item in tableOption_less">
                      <el-checkbox
                        :key="item.value"
                        v-if="
                          item.value !== 'buyer_company' ||
                          $checkPermission(['edit'])
                        "
                        :label="item.label"
                        :value="item.value"
                        v-model="item.isShow"
                        @change="checkboxChange(item, 'less')"
                      ></el-checkbox>
                    </template>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              slot="reference"
              >显示其他字段</el-button
            >
          </el-popover>
        </div>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 100%"
      v-loading="tableLoading"
    >
      <!--      状态标签  类型  题材 集数  单集时长 总时长  出品年代  清晰度  国别  剧情简介  发行许可证-->
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="60"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column fixed prop="media_name" label="节目名称">
      </el-table-column>
      <el-table-column prop="status_label" label="状态标签"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="theme" label="题材"> </el-table-column>
      <el-table-column prop="episodes" label="集数"> </el-table-column>
      <el-table-column prop="episodes_time" label="单集时长"> </el-table-column>
      <el-table-column prop="total_time" label="总时长"> </el-table-column>
      <el-table-column prop="year" label="出品年代"> </el-table-column>
      <el-table-column prop="definition" label="清晰度"> </el-table-column>
      <el-table-column prop="area" label="国别"> </el-table-column>
      <el-table-column prop="plots" show-overflow-tooltip label="剧情简介">
      </el-table-column>
      <el-table-column prop="publish_licence" label="发行许可证">
      </el-table-column>
      <!--   可选显示区1   -->
      <template v-if="checkList_table.length > 0">
        <el-table-column
          show-overflow-tooltip
          v-for="item in checkList_table"
          :key="item.value"
          :prop="item.value"
          :label="item.label"
        ></el-table-column>
      </template>
      <!--   可选显示区2   -->
      <template v-if="checkList_less.length > 0">
        <el-table-column
          show-overflow-tooltip
          v-for="item in checkList_less"
          :key="item.value"
          :prop="item.value"
          :label="item.label"
        ></el-table-column>
      </template>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="mini"
            :loading="row.loading"
            @click="handleEdit(row)"
            v-if="$checkPermission(['edit'])"
            >修改</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="mini"
            @click="handleDelete(row)"
            v-if="$checkPermission(['delete'])"
            >删除</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="mini"
            @click="bindDialog(row)"
            v-if="$checkPermission(['edit'])"
            >绑定产品ID</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="total == 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[10, 20, 50, 100]"
      @pagination="getList"
    />

    <!--    更新信息弹窗    -->
    <el-dialog
      :title="
        dialogType == 'new' ? '新增' : dialogType == 'edit' ? '更新' : '选择'
      "
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="900px"
      style="max-height: 90vh; overflow-y: auto"
    >
      <el-tabs v-model="activeName" class="user-select">
        <el-tab-pane label="基础设置" name="basicSet">
          <basics-set
            :type="dialogType"
            :form="basicsForm"
            ref="basicsSet"
          ></basics-set>
        </el-tab-pane>
        <el-tab-pane
          v-for="(item, i) in tabs"
          :label="item.category"
          :name="item.category"
          :key="i"
        >
          <public-template
            :tempForm="item"
            :tab="item.id"
            :dialogType="dialogType"
            :ref="item.category"
            :copyright_delete="copyright_delete"
            @handleGroupDel="handleGroupDel"
          />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSave"
          >保 存</el-button
        >
      </span>
    </el-dialog>

    <!--     绑定产品ID       -->
    <new-template-dialog
      class="dialog_bind"
      title="绑定产品ID"
      v-bind.sync="dialogVisibleBind"
      v-if="dialogVisibleBind.show"
      width="500px"
      style="margin-top: 200px"
      @save="submitBindMethod('bindForm')"
    >
      <div>
        <el-alert
          title="注意: 请正确绑定产品ID,绑定成功后此版权在流程中列表不显示。"
          type="warning"
          :closable="false"
          show-icon
        >
        </el-alert>
        <el-form
          class="bindForm"
          :model="bindForm"
          ref="bindForm"
          label-width="80px"
          :rules="bindRules"
        >
          <el-form-item label="产品ID" prop="productId">
            <el-input
              style="width: 200px"
              placeholder="产品ID"
              v-model.trim="bindForm.productId"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </new-template-dialog>
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItme";
import publicTemplate from "./components/filmRight/public-template";
import basicsSet from "./components/basics-set";
import Pagination from "@/components/Pagination";
import NewTemplateDialog from "@/components/NewTemplateDialog";
import searchComponent from "./components/filmRight/search-component";
import { isObjectValueEqual } from "@/utils";
import store from "@/store";

//  权利组
const group = [
  {
    value: [],
    data: [],
    rightForm: {
      buffer_period: "",
      editing_remark: "",
      granted_area: "",
      authorized_way: 1,
      is_audio: 1,
      is_video: 1,
      is_download: 1,
      is_safeguard: 1,
      vip_pay: 1,
      with_granted: 1,
      editing_program: [],
      extra: [],
      terminals: [],
    },
  },
];
//  实体tab
const tabs = [
  {
    alias: "",
    blkdGroup: JSON.parse(JSON.stringify(group)),
    category: "",
    data: [],
    entity: [],
    group: JSON.parse(JSON.stringify(group)),
    id: 31,
    md: { value: "" },
  },
];
//  基本信息字段
const basicsForm = {
  status_label: [],
  product_id: null,
  real_episodes: null,
  episodes: "",
  remark: "",
  media_name: null,
  partner_name: null,
  authorize_start_at: "",
  authorize_end_at: "",
  program_owner: "",
  film_release_licence: { value: 1 },
  copyright_chain: { value: 1 },
  authorized_area_id: { value: 1 },
  definition: { value: 1 },
  buyer_company: { value: 1 },
  item_level: { value: 1 },
  document_name: "",
};
const bindForm = {
  productId: "",
};
export default {
  name: "search",
  components: {
    publicTemplate,
    basicsSet,
    Pagination,
    searchComponent,
    SelectItem,
    NewTemplateDialog,
  },
  data() {
    return {
      form123: {},
      template_name: "",
      dialogVisible: false,
      dialogType: "new",
      activeName: "basicSet",
      tableData: [],
      tabs: JSON.parse(JSON.stringify(tabs)),
      tabsTemplate: JSON.parse(JSON.stringify(tabs)),
      total: 0,
      loading: false,
      tableLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
      },
      basicsForm: JSON.parse(JSON.stringify(basicsForm)),
      initBasicsForm: {},
      propertyData: [],
      detailsObj: {
        type: "purchase",
      },
      initChina_property: [],
      searchForm: {},
      // 合同号、节目集数、单集时长、总时长、年份、定点采购、提交人、提交部门、VIP付费等
      tableOption_common: [],
      tableOption_less: [],
      showCheckbox: false,
      checkList: [],
      checkList_table: [],
      checkList_less: [],
      commonly_use: [],
      less_use: [],
      copyright_delete: [],
      dialogVisibleBind: {
        show: false,
        loading: false,
      },
      bindForm: JSON.parse(JSON.stringify(bindForm)),
      bindRules: {
        productId: [
          { required: true, message: "请输入产品ID", trigger: "blur" },
        ],
      },
      bindCopyId: "",
    };
  },
  computed: {
    property_conf: {
      get() {
        return this.$store.state.property.property_conf;
      },
    },
  },
  watch: {
    // activeName: {
    //   handler(active) {
    //     if (
    //       active === "AUDIO" &&
    //       this.dialogType == "new"
    //     ) {
    //       for (const item of this.tabs) {
    //         if (item.type == "AUDIO") {
    //           for (const el of item.group) {
    //             el.rightForm.power = [{ value: 2 }];
    //           }
    //         }
    //       }
    //     }
    //   },
    // },
  },
  mounted() {
    this.propertyList();
    this.propertyEntityList();
    this.search_config();
  },
  methods: {
    getData(data) {
      this.searchForm = data;
      this.listQuery.page = 1;
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
        "property/propertyList",

        { ...params, ...this.searchForm }
      );
      this.tableLoading = false;
      if (res.code === 0) {
        this.tableData = res.data;
        this.total = res.total_count || 0;
      }
    },
    // 整理各实体数据
    async propertyEntityList() {
      const res = await this.$store.dispatch("property/entity_config", {});
      if (res.code === 0 && res.data) {
        this.detailsObj.entityList = res.data;
        this.tabsTemplate = [];
        this.tabs.splice(res.data.length);
        for (const i in res.data) {
          const data_ = res.data[i].entity.map((el) => {
            return {
              key: el.id,
              id: el.id,
              label: el.name,
            };
          });
          const index = res.data[i].entity.findIndex((e) => e.id === 1);
          if (index === -1) {
            data_.unshift({
              id: 1,
              key: 1,
              title: "all",
              label: "全部",
              abbr: "全部",
              type: res.data[i].category,
            });
          }
          const group_ = JSON.parse(JSON.stringify(group));
          group_[0].data = JSON.parse(JSON.stringify(data_));
          this.tabsTemplate.push(
            Object.assign(
              {
                data: data_,
                md: { value: 1 },
                group: JSON.parse(JSON.stringify(group_)),
                blkdGroup: JSON.parse(JSON.stringify(group_)),
              },
              res.data[i]
            )
          );
        }
        this.tabs = JSON.parse(JSON.stringify(this.tabsTemplate));
        // console.log(this.tabs)
      }
    },

    //  获取具体信息
    async handleEdit(row) {
      this.$set(row, "loading", true);
      this.copyright_delete = [];
      const res = await this.$store.dispatch("property/base_entity_detail", {
        id: row.id,
      });
      if (res.code === 0) {
        //  整理基本信息
        this.basicsForm.id = row.id;
        for (const i in res.data) {
          if (i === "entity") {
            // console.log(res.data[i])
          } else {
            if (
              i === "film_release_licence" ||
              i === "copyright_chain" ||
              i === "authorized_area_id" ||
              i === "definition" ||
              i === "buyer_company" ||
              i === "item_level"
            ) {
              this.basicsForm[i] = { value: res.data[i] };
            } else if (
              i === "product_id" ||
              i === "real_episodes" ||
              i === "episodes" ||
              i === "remark" ||
              i === "authorize_start_at" ||
              i === "authorize_end_at" ||
              i === "program_owner" ||
              i === "document_name"
            ) {
              this.basicsForm[i] = res.data[i];
            }
          }
        }
        this.basicsForm.status_label =
          res.data.status_label &&
          res.data.status_label.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });
        this.basicsForm.media_name = res.data.media && {
          value: res.data.media.id,
          label: res.data.media.id + " - " + res.data.media.name,
        };
        this.basicsForm.partner_name = res.data.partner && {
          value: res.data.partner.id,
          label: res.data.partner.title,
        };
        this.initBasicsForm = JSON.parse(JSON.stringify(this.basicsForm));

        //  整理实体信息
        const entityData = res.data.entity;
        this.tabs = JSON.parse(JSON.stringify(this.tabsTemplate));
        this.tabs.forEach((item) => {
          const blkd_ = entityData[item.alias].is_white ? "group" : "blkdGroup";
          if (entityData[item.alias].group) {
            item.md.value = entityData[item.alias].is_white;
            entityData[item.alias].group.forEach((el, index) => {
              const obj = {};
              obj.value = el.entity_ids;
              obj.groupId = el.id;
              obj.data = JSON.parse(JSON.stringify(item.data));
              obj.rightForm = JSON.parse(JSON.stringify(el));
              this.$set(item[blkd_], index, obj);
            });
          } else {
            item.md.value = 1;
            item[blkd_] = JSON.parse(JSON.stringify(group));
            item[blkd_][0].data = item.data;
          }
        });
        const china_property = [];
        for (const j in entityData) {
          china_property.push(entityData[j]);
        }
        // this.initChina_property = JSON.parse(JSON.stringify(china_property));
        this.initChina_property = [];
        this.formatCurrentEntityData(china_property, this.initChina_property);
        // console.log(china_property)
        // console.log(this.initChina_property)
        // console.log(this.tabs)
        this.dialogType = "edit";
        this.activeName = "basicSet";
        this.dialogVisible = true;
      }
      this.$set(row, "loading", false);
    },

    handleSave() {
      this.propertyData = [];
      let flag = true;
      this.tabs.forEach((e) => {
        const md = e.md && e.md.value * 1;
        if (md === 1) {
          e.group.forEach((item) => {
            if (item.rightForm.terminals.length) {
              const obj = Object.assign(this.formattingRight(item.rightForm), {
                is_white: md,
                entity_category_id: e.id,
                entity_ids: item.value,
              });
              item.groupId ? (obj.id = item.groupId) : "";
              this.propertyData.push(obj);
            } else if (item.value.length > 0) {
              flag = false;
            }
          });
        } else {
          e.blkdGroup.forEach((item) => {
            if (item.rightForm.terminals.length) {
              const obj = Object.assign(this.formattingRight(item.rightForm), {
                is_white: md,
                entity_category_id: e.id,
                entity_ids: item.value,
              });
              item.groupId ? (obj.id = item.groupId) : "";
              this.propertyData.push(obj);
            } else if (item.value.length > 0) {
              flag = false;
            }
          });
        }
      });
      if (flag) {
        this.getBasicData();
      } else {
        this.$message.warning("存在未设置权利的分组，请检查");
        flag = true;
      }
    },

    formatCurrentEntityData(data, target) {
      data.forEach((e) => {
        if (e.is_white === 1) {
          e.group.forEach((item) => {
            if (item.terminals.length) {
              const obj = Object.assign(this.formattingRight(item), {
                is_white: e.is_white,
                entity_category_id: item.entity_category_id,
                id: item.id,
                entity_ids: item.entity_ids,
              });
              item.groupId ? (obj.id = item.groupId) : "";
              target.push(obj);
            }
          });
        } else if (e.is_white === 0) {
          e.group.forEach((item) => {
            if (item.terminals.length) {
              const obj = Object.assign(this.formattingRight(item), {
                is_white: e.is_white,
                entity_category_id: item.entity_category_id,
                id: item.id,
                entity_ids: item.entity_ids,
              });
              item.groupId ? (obj.id = item.groupId) : "";
              target.push(obj);
            }
          });
        }
      });
    },

    async propertyEdit(base) {
      if (this.dialogType == "new") {
        const res = await this.$store.dispatch("property/insert", {
          base: base,
          entity: this.propertyData,
        });
        if (res.code === 0) {
          this.dialogVisible = false;
          this.$message.success("权利保存成功");
          this.propertyList();
        }
      } else {
        // const oldGroupId = this.initChina_property.map((el) => {
        //   return el.id
        // })
        // const newGroupId = this.propertyData.map((el) => {
        //   return el.id
        // })
        // const del_ = oldGroupId.filter((e) => newGroupId.indexOf(e) < 0);

        if (
          isObjectValueEqual(this.propertyData, this.initChina_property) &&
          isObjectValueEqual(this.basicsForm, this.initBasicsForm)
        ) {
          this.dialogVisible = false;
          return;
        }
        this.$confirm("此修改将影响本批次其他媒体权利，是否继续?", "提示", {
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          type: "warning",
        })
          .then(async () => {
            const del_list = this.copyright_delete;
            const res = await this.$store.dispatch("property/baseUpdate", {
              base: base,
              entity: this.propertyData,
              del_list,
            });
            if (res.code === 0) {
              this.dialogVisible = false;
              this.$message.success("权利保存成功");
            }
            this.propertyList();
          })
          .catch(() => {});
      }
    },
    //  获取数据
    getList() {
      this.propertyList();
    },
    //  表格可选字段逻辑
    checkboxChange(val, type) {
      let list = this.checkList_table;
      if (type === "normal") {
        list = this.checkList_table;
      } else {
        list = this.checkList_less;
      }
      if (list.indexOf(val) == -1) {
        list.push(val);
      } else {
        list.splice(list.indexOf(val), 1);
      }
    },
    //  删除
    handleDelete(row) {
      // console.log(row)
      this.$confirm("确认发起删除操作?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$store.dispatch("property/base_delete", {
            id: row.id,
          });
          if (res && res.code === 0) {
            this.$message.success("删除成功");
            await this.propertyList();
          }
        })
        .catch(() => {});
    },
    //  新增
    handleAdd() {
      this.handleCommand();
    },
    //  获取表格可选显示字段
    async search_config() {
      const res = await store.dispatch("property/search_config");
      if (res.code === 0) {
        const data = res.data || {};
        for (const i in data["base_show_others"]) {
          if (i === "commonly_use") {
            for (const j in data["base_show_others"][i]) {
              this.tableOption_common.push({
                value: j,
                label: data["base_show_others"][i][j],
              });
            }
          } else {
            for (const j in data["base_show_others"][i]) {
              this.tableOption_less.push({
                value: j,
                label: data["base_show_others"][i][j],
              });
            }
          }
        }
      }
    },
    //  初始化数据
    async handleCommand() {
      this.tabs.forEach((el) => {
        el.md.value = 1;
        el.group = JSON.parse(JSON.stringify(group));
        el.blkdGroup = JSON.parse(JSON.stringify(group));
        el.group.forEach((ele) => {
          ele.data = JSON.parse(JSON.stringify(el.data));
        });
        el.blkdGroup.forEach((ele) => {
          ele.data = JSON.parse(JSON.stringify(el.data));
        });
      });
      this.dialogVisible = true;
      this.dialogType = "new";
      this.activeName = "basicSet";
      this.basicsForm = JSON.parse(JSON.stringify(basicsForm));
    },
    getBasicData() {
      // console.log(this.basicsForm)
      this.$refs.basicsSet.$refs["basicForm"].validate((valid) => {
        if (valid) {
          const basicData = JSON.parse(JSON.stringify(this.basicsForm));
          const body = {};

          basicData.id ? (body.id = basicData.id) : "";
          body.document_name = basicData.document_name;
          body.contract_id = basicData.contract_id;
          body.partner_id =
            basicData.partner_name && basicData.partner_name.value;
          body.copyright_chain =
            basicData.copyright_chain && basicData.copyright_chain.value;
          body.media_id = basicData.media_name && basicData.media_name.value;
          body.status_label = {};
          basicData.status_label.forEach((el) => {
            body.status_label[el.value] = el.label;
          });
          body.product_id = basicData.product_id
            ? basicData.product_id * 1
            : null;
          body.authorize_start_at = basicData.authorize_start_at;
          body.authorize_end_at = basicData.authorize_end_at;
          body.authorized_area_id =
            basicData.authorized_area_id && basicData.authorized_area_id.value;
          body.definition = basicData.definition && basicData.definition.value;
          body.buyer_company =
            basicData.buyer_company && basicData.buyer_company.value;
          body.program_owner = basicData.program_owner;
          body.film_release_licence =
            basicData.film_release_licence &&
            basicData.film_release_licence.value;
          body.item_level = basicData.item_level && basicData.item_level.value;
          body.real_episodes =
            (basicData.real_episodes && basicData.real_episodes * 1) || 0;
          body.remark = basicData.remark;
          body.episodes = basicData.episodes || 0;
          // console.log(body)
          this.propertyEdit(body);
        } else {
          this.$message.warning("请正确填写基础设置");
          this.activeName = "basicSet";
        }
      });
    },
    //  整理权利数据
    formattingRight(rightForm) {
      const obj = {};
      obj.buffer_period = rightForm.buffer_period;
      obj.editing_remark = rightForm.editing_remark;
      obj.granted_area = rightForm.granted_area;
      obj.authorized_way = rightForm.authorized_way;
      obj.is_audio = rightForm.is_audio;
      obj.is_video = rightForm.is_video;
      obj.is_download = rightForm.is_download;
      obj.is_safeguard = rightForm.is_safeguard;
      obj.vip_pay = rightForm.vip_pay;
      obj.with_granted = rightForm.with_granted;
      obj.editing_program = {};
      rightForm.editing_program &&
        rightForm.editing_program.forEach((el) => {
          el.label
            ? (obj.editing_program[el.value] = el.label)
            : (obj.editing_program[el.id] = el.name);
        });
      obj.extra = {};
      rightForm.extra &&
        rightForm.extra.forEach((el) => {
          el.label
            ? (obj.extra[el.value] = el.label)
            : (obj.extra[el.id] = el.name);
        });
      obj.terminals = {};
      rightForm.terminals &&
        rightForm.terminals.forEach((el) => {
          el.label
            ? (obj.terminals[el.value] = el.label)
            : (obj.terminals[el.id] = el.name);
        });
      return obj;
    },
    //  监听删除组
    handleGroupDel(data) {
      this.copyright_delete = JSON.parse(JSON.stringify(data));
    },
    bindDialog(row) {
      this.dialogVisibleBind.show = true;
      this.bindCopyId = row.id;
    },
    submitBindMethod(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            id: this.bindCopyId,
            product_id: this.bindForm.productId,
          };
          this.tableLoading = true;
          const res = await this.$store.dispatch(
            "property/bindProduct",
            params
          );
          this.tableLoading = false;
          if (res.code === 0) {
            this.dialogVisibleBind.show = false;
            this.bindForm.productId = "";
            this.$message.success(res.desc);
            this.getList();
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.el-tooltip__popper.is-dark {
  max-width: 600px;
}
</style>
<style lang="scss" scoped>
.mb-18 {
  margin-bottom: 18px;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
::v-deep .el-dialog__body {
  padding-top: 0;
}
::v-deep .bindForm {
  margin-top: 20px;
}
.checkboxWrap {
  .checkbox {
    //border: 1px solid #ccc;
    //margin-bottom: 20px;
    .info {
      display: -webkit-box;
      margin-bottom: 20px;
      .title {
        width: 130px;
        font-size: 15px;
      }
      .checkboxGroup {
        width: 840px;
        .el-checkbox {
          min-width: 90px;
          margin-right: 20px;
        }
      }
    }
  }
}
//.showOthers{
//  float: right;
//  position: relative;
//  top: -60px;
//  right: 10px;
//  button{
//    width: 122px;
//  }
//}
</style>
