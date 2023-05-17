<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :mode="form" size="small" @submit.native.prevent>
        <el-form-item label="产品名称">
          <el-input
            v-model.trim="form.name"
            style="width: 150px"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select
            v-model="form.type"
            style="width: 150px"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.config['type']"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点限制">
          <el-input
            v-model.trim="form.site_limit"
            placeholder="请输入"
            style="width: 150px"
            clearable
          />
        </el-form-item>
        <el-form-item label="法务合规">
          <el-select
            v-model="form.legal_compliance"
            style="width: 150px"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.config['legal_compliance']"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上游版权">
          <el-input
            v-model.trim="form.up_copyright"
            placeholder="请输入"
            style="width: 150px"
            clearable
          />
        </el-form-item>
        <el-form-item label="授权开始">
          <el-date-picker
            v-model="form.authorized_start_time"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 150px"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="授权结束">
          <el-date-picker
            v-model="form.authorized_end_time"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 150px"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="授权权利">
          <el-select
            v-model="form.right"
            style="width: 150px"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.config['right']"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权方式">
          <el-select
            v-model="form.authorized_way"
            style="width: 150px"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.config['authorized_way']"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品状态">
          <el-select
            v-model="form.item_status"
            style="width: 150px"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in this.config['item_status']"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="媒体库绑定">
          <el-select
            v-model="form.media_bind"
            style="width: 150px"
            placeholder="请选择"
            clearable
          >
            <el-option label="已绑定" :value="false"> </el-option>
            <el-option label="未绑定" :value="true"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版权绑定状态">
          <el-select
            v-model="form.copyright_bind"
            style="width: 150px"
            placeholder="请选择"
            clearable
          >
            <el-option label="可新增版权" :value="true"> </el-option>
            <el-option label="可更新版权" :value="false"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            @click.native.prevent="handleSearch()"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="产品ID"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        show-overflow-tooltip
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="media.name"
        width="100"
        show-overflow-tooltip
        label="媒资节目名称"
      >
      </el-table-column>
      <el-table-column
        prop="director"
        width="180"
        show-overflow-tooltip
        label="导演"
      >
      </el-table-column>
      <el-table-column
        prop="actor"
        width="180"
        show-overflow-tooltip
        label="主演"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        width="100"
        show-overflow-tooltip
        label="产品类型"
      >
      </el-table-column>
      <el-table-column
        prop="item_status"
        show-overflow-tooltip
        width="100"
        label="产品状态"
      >
      </el-table-column>
      <el-table-column
        prop="episodes"
        show-overflow-tooltip
        width="100"
        label="集数"
      >
      </el-table-column>
      <el-table-column
        prop="medium_episodes"
        show-overflow-tooltip
        width="100"
        label="介质集数"
      >
      </el-table-column>
      <el-table-column
        prop="media.total_time"
        show-overflow-tooltip
        width="100"
        label="总时长"
      >
      </el-table-column>
      <el-table-column
        prop="clarity"
        show-overflow-tooltip
        width="100"
        label="清晰度"
      >
      </el-table-column>
      <el-table-column
        prop="grade"
        width="100"
        show-overflow-tooltip
        label="等级"
      >
      </el-table-column>
      <el-table-column
        prop="authorized_way"
        width="150"
        show-overflow-tooltip
        label="授权方式"
      >
      </el-table-column>
      <el-table-column
        prop="copyright_risk"
        width="150"
        show-overflow-tooltip
        label="版权风险"
      >
      </el-table-column>
      <el-table-column
        prop="authorized_start_time"
        width="180"
        show-overflow-tooltip
        label="授权开始"
      >
      </el-table-column>
      <el-table-column
        prop="authorized_end_time"
        width="180"
        show-overflow-tooltip
        label="授权结束"
      >
      </el-table-column>
      <el-table-column
        prop="up_copyright"
        width="180"
        show-overflow-tooltip
        label="上游版权"
      >
      </el-table-column>
      <el-table-column
        prop="play_app"
        width="180"
        show-overflow-tooltip
        label="上星平台"
      >
      </el-table-column>
      <el-table-column
        prop="play_time"
        width="180"
        show-overflow-tooltip
        label="上星时间"
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        width="180"
        show-overflow-tooltip
        label="登记日期"
      >
      </el-table-column>
      <el-table-column
        prop="right"
        width="180"
        show-overflow-tooltip
        label="授权权利"
      >
      </el-table-column>
      <el-table-column
        prop="site_limit"
        width="180"
        show-overflow-tooltip
        label="站点限制"
      >
      </el-table-column>
      <el-table-column
        prop="authorized_way_desc"
        width="180"
        show-overflow-tooltip
        label="授权描述"
      >
      </el-table-column>
      <el-table-column
        prop="copy_chain"
        width="180"
        show-overflow-tooltip
        label="版权链"
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        width="180"
        show-overflow-tooltip
        label="备注"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="details(row)"
                     v-if="$checkPermission(['view'])"
            >详情</el-button
          >
          <el-button type="text" size="small" @click="handelClick(row)"
                     v-if="$checkPermission(['edit'])"
          >{{
              row.copyright_id == 0 ? "新增版权" : "更新版权"
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="total == 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[20]"
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
          <product-basics-set
            :type="dialogType"
            :form="basicsForm"
            ref="basicsSet"
          ></product-basics-set>
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
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="handleSave"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="detailsDialog"
      v-if="detailsDialog"
      :close-on-click-modal="false"
      top="20px"
      width="98vw"
    >
      <product-details-dialog
        :id="details_id"
        :copyrightId="copyrightId"
      ></product-details-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import SelectItem from "@/components/SelectItme";
import publicTemplate from "./components/filmRight/public-template";
import productBasicsSet from "./components/product-basics-set";
import productDetailsDialog from "./components/product-details-dialog.vue";
import store from "@/store";
import { isObjectValueEqual } from "@/utils";

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
  remark: "",
  program_owner: "",
  film_release_licence: { value: 1 },
  copyright_chain: { value: 1 },
  buyer_company: { value: 1 },
  document_name: "",
  product_id: null,
  media_id: null,
};
export default {
  name: "product_list",
  components: {
    Pagination,
    SelectItem,
    publicTemplate,
    productBasicsSet,
    productDetailsDialog,
  },
  data() {
    return {
      detailsDialog: false,
      detailsObj: {
        type: "purchase",
      },
      tableOption_common: [],
      tableOption_less: [],
      dialogVisible: false,
      dialogType: "new",
      activeName: "basicSet",
      basicsForm: JSON.parse(JSON.stringify(basicsForm)),
      tabs: JSON.parse(JSON.stringify(tabs)),
      tabsTemplate: JSON.parse(JSON.stringify(tabs)),
      copyright_delete: [],
      tableData: [],
      total: 0,
      form: {
        copyright_bind: null,
      },
      listQuery: {
        page: 1,
        limit: 20,
      },
      config: {},
      propertyData: [],
      tableLoading: false,
      details_id: 0,
      copyrightId: 0,
    };
  },
  mounted() {
    this.copyright_product_list_config();
    this.getList();
    this.propertyEntityList();
    this.search_config();
  },
  methods: {
    details(row) {
      this.detailsDialog = true;
      this.details_id = row.id;
      this.copyrightId = row.copyright_id;
    },
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
    },
    async getList() {
      this.tableLoading = true;
      const res = await this.$store.dispatch(
        "property/copyright_product_list",
        {
          ...this.form,
          page: this.listQuery.page,
          pageSize: this.listQuery.limit,
        }
      );
      this.tableLoading = false;
      this.total = res.total_count || 0;
      this.tableData = res.data || [];
    },
    async copyright_product_list_config() {
      const res = await this.$store.dispatch(
        "property/copyright_product_list_config",
        {}
      );
      if (res.code == 0) {
        this.config = res.data || [];
      }
    },
    //  监听删除组
    handleGroupDel(data) {
      this.copyright_delete = JSON.parse(JSON.stringify(data));
    },
    handelClick(row) {
      if (!row.copyright_id) {
        //新增
        this.handleCommand(row);
      } else {
        this.handleEdit(row); //更新
      }
    },
    //  获取具体信息
    async handleEdit(row) {
      this.$set(row, "loading", true);
      this.copyright_delete = [];
      const res = await this.$store.dispatch(
        "property/copyright_product_base",
        {
          id: row.copyright_id,
        }
      );
      if (res.code === 0) {
        //  整理基本信息
        this.basicsForm.id = res.data.id;
        for (const i in res.data) {
          if (i === "entity") {
            // console.log(res.data[i])
          } else {
            if (
              i === "film_release_licence" ||
              i === "copyright_chain" ||
              i === "buyer_company" ||
              i === "item_level"
            ) {
              this.basicsForm[i] = { value: res.data[i] };
            } else if (
              i === "product_id" ||
              i === "media_id" ||
              i === "remark" ||
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
          label: res.data.media.name,
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

    //  初始化数据
    async handleCommand(row) {
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
      this.basicsForm.product_id = row.id;
      this.basicsForm.media_id = row.media.id;
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
          body.media_id = basicData.media_id;
          body.status_label = {};
          basicData.status_label.forEach((el) => {
            body.status_label[el.value] = el.label;
          });
          body.product_id = basicData.product_id
            ? basicData.product_id * 1
            : null;
          // body.authorize_start_at = basicData.authorize_start_at;
          // body.authorize_end_at = basicData.authorize_end_at;
          body.authorized_area_id =
            basicData.authorized_area && basicData.authorized_area.value;
          body.definition = basicData.definition && basicData.definition.value;
          body.buyer_company =
            basicData.buyer_company && basicData.buyer_company.value;
          body.program_owner = basicData.program_owner;
          body.film_release_licence =
            basicData.film_release_licence &&
            basicData.film_release_licence.value;
          body.item_level = basicData.item_level && basicData.item_level.value;
          // body.real_episodes =
          //   (basicData.real_episodes && basicData.real_episodes * 1) || 0;
          body.remark = basicData.remark;
          // body.episodes = basicData.episodes || 0;
          this.propertyEdit(body);
        } else {
          this.$message.warning("请正确填写基础设置");
          this.activeName = "basicSet";
        }
      });
    },
    async propertyEdit(base) {
      if (this.dialogType == "new") {
        const res = await this.$store.dispatch(
          "property/copyright_product_insert",
          {
            base: base,
            entity: this.propertyData,
          }
        );
        if (res.code === 0) {
          this.dialogVisible = false;
          this.$message.success("权利保存成功");
          this.getList();
        }
      } else {
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
            const res = await this.$store.dispatch(
              "property/copyright_product_update",
              {
                base: base,
                entity: this.propertyData,
                del_list,
              }
            );
            if (res.code === 0) {
              this.dialogVisible = false;
              this.$message.success("权利保存成功");
            }
            this.getList();
          })
          .catch(() => {});
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
  },
};
</script>

<style scoped>
::v-deep .el-dialog__body {
  padding-top: 0 !important;
}
</style>
