<template>
  <div class="app-container">
    <div class="space-between">
      <div>
        <search-component @getData="getData" />
      </div>
      <div>
        <el-dropdown
          v-if="$checkPermission(['add'])"
          @command="handleCommand"
          trigger="click"
        >
          <el-button type="success" :loading="loading" @click="handleClick">
            新增<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-scrollbar style="height: 60vh">
              <el-dropdown-item
                v-for="(item, i) in templateList"
                :key="item._id"
                :command="item._id"
                >{{ item.template_name }}</el-dropdown-item
              >
            </el-scrollbar>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: max-content"
      v-loading="tableLoading"
    >
      <el-table-column prop="_id" label="ID" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="item_id"
        label="节目编号"
        show-overflow-tooltip
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="con_id"
        label="合同编号"
        show-overflow-tooltip
        width="200"
      >
      </el-table-column>
      <el-table-column prop="media.mid" label="媒体ID" width="100">
      </el-table-column>
      <el-table-column prop="media.title" label="节目名称" width="180">
      </el-table-column>
      <el-table-column prop="media.year" label="年份" width="80">
      </el-table-column>
      <el-table-column label="授权开始时间" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.start | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授权结束时间" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.end | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="定点采购" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.desig === false ? "否" : "是" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="提交人" width="100">
      </el-table-column>
      <el-table-column prop="user.dpmt" label="提交部门" width="100">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="备注"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="{ row }">
          <span>{{ row.date | formatDate("all") }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="{ row }">
          <el-button type="text" size="mini" @click="handleView(row)"
            >详情</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="mini"
            :loading="row.loading"
            @click="handelEdit(row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[10]"
      @pagination="getList"
    />
    <el-dialog
      :title="dialogType == 'new' ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="800px"
    >
      <el-tabs v-model="activeName" class="user-select">
        <el-tab-pane
          v-for="(item, i) in tabs"
          :label="item.label"
          :name="item.type"
          :key="i"
        >
          <public-template
            :tempForm="item"
            :tab="item.type"
            :platform="item.allTerm"
            :ref="item.type"
          />
        </el-tab-pane>
        <el-tab-pane label="基础设置" name="seven">
          <basics-set :type="dialogType" :form="basicsForm"></basics-set>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="success"
          size="small"
          class="fl"
          v-show="activeName !== 'seven'"
          @click="addgroup"
          >新增组</el-button
        >
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="handleSave"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <right-details
      v-model="dialogVisibleDetails"
      :detailsObj="detailsObj"
      v-if="dialogVisibleDetails"
    />
  </div>
</template>

<script>
import publicTemplate from "./components/public-template";
import Pagination from "@/components/Pagination";
import basicsSet from "./components/basics-set";
import rightDetails from "./components/right-details";
import searchComponent from "./components/search-component";
import { formatDate } from "@/filters/index";
import { isObjectValueEqual } from "@/utils/index";

const group = [
  {
    value: [],
    data: [],
    rightForm: {
      solo: null,
      subs: null,
      gard: null,
      term: [],
      usge: null,
      vip: null,
      power: [],
      adds: null,
    },
  },
];
const tabs = [
  {
    label: "区域设置",
    type: "REGION",
    flag: "area",
    allTerm: true,
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "平台",
    type: "PCWEB",
    flag: "plat",
    allTerm: true,
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "OTT",
    type: "OTT",
    flag: "ott",
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "专网OTT",
    type: "SOTT",
    flag: "sott",
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "IPTV",
    type: "IPTV",
    flag: "iptv",
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "数字电视",
    type: "DTV",
    flag: "dtv",
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "电视台",
    type: "TV",
    flag: "tv",
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
  {
    label: "音频平台",
    type: "AUDIO",
    flag: "audio",
    allTerm: true,
    data: [],
    md: { value: 1 },
    group: JSON.parse(JSON.stringify(group)),
    blkdGroup: JSON.parse(JSON.stringify(group)),
  },
];
const basicsForm = {
  type: "sale",
  time: [],
  media_list: [],
  desig: null,
  comment: "",
  item_id: "",
};
export default {
  name: "sale",
  components: {
    publicTemplate,
    Pagination,
    basicsSet,
    rightDetails,
    searchComponent,
  },
  data() {
    return {
      template_name: "",
      tableData: [],
      total: 0,
      tableLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      dialogVisible: false,
      dialogType: "new",
      tabs: JSON.parse(JSON.stringify(tabs)),
      activeName: tabs[0].type,
      propertyData: {},
      basicsForm: JSON.parse(JSON.stringify(basicsForm)),
      initBasicsForm: {},
      dialogVisibleDetails: false,
      loading: false,
      detailsObj: {
        type: "sale",
      },
      templateList: [],
      initChina_property: {},
      searchForm: {},
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
    activeName: {
      handler(active) {
        if (
          active === "AUDIO" &&
          this.template_name == "空白模板" &&
          this.dialogType == "new"
        ) {
          for (const item of this.tabs) {
            if (item.type == "AUDIO") {
              for (const el of item.group) {
                el.rightForm.power = [{ value: 2 }];
              }
            }
          }
        }
      },
    },
  },
  mounted() {
    this.saleList();
    this.propertyEntityList();
    this.propertyConf();
    this.propertyTemplateList();
  },
  methods: {
    getData(data) {
      this.searchForm = data;
      this.listQuery.page = 1;
      this.saleListPost();
    },
    async saleListPost() {
      const params = { page: this.listQuery.page };
      this.tableLoading = true;
      const res = await this.$store.dispatch(
        "property/saleListPost",

        { params, body: this.searchForm }
      );
      this.tableLoading = false;
      if (res.code === 0) {
        this.tableData = res.data || [];
        this.total = res.total || 0;
      }
    },
    handelAdd() {
      this.dialogVisible = true;
      this.dialogType = "new";
    },
    addgroup() {
      if (this.$refs[this.activeName]) {
        this.$refs[this.activeName][0].add();
      }
    },
    async propertyTemplateList() {
      this.loading = true;
      const res = await this.$store.dispatch(
        "property/propertyTemplateList",
        {}
      );
      if (res.code === 0) {
        this.loading = false;
        this.templateList = res.data || [];
        this.templateList.push({
          _id: 0,
          template_name: "空白模板",
        });
      }
    },
    handleClick() {
      if (this.templateList && !this.templateList.length) {
        this.$message.warning("无模板");
      }
    },
    async handleCommand(command) {
      if (command !== 0) {
        const china_property = this.templateList.filter(
          (e) => e._id === command
        )[0];
        this.template_name = china_property.template_name;
        this.bindData(china_property);
      } else {
        this.template_name = "空白模板";
        this.tabs.forEach((el) => {
          el.md.value = 1;
          el.group = JSON.parse(JSON.stringify(group));
          el.blkdGroup = JSON.parse(JSON.stringify(group));
          el.group.forEach((ele) => {
            ele.rightForm.power = [
              {
                value: 1,
              },
              {
                value: 2,
              },
            ];
            ele.data = JSON.parse(JSON.stringify(el.data));
          });
          el.blkdGroup.forEach((ele) => {
            ele.rightForm.power = [
              {
                value: 1,
              },
              {
                value: 2,
              },
            ];
            ele.data = JSON.parse(JSON.stringify(el.data));
          });
        });
      }
      this.dialogVisible = true;
      this.dialogType = "new";
      this.activeName = this.tabs[0].type;
      this.basicsForm = JSON.parse(JSON.stringify(basicsForm));
    },
    async handelEdit(row) {
      this.$set(row, "loading", true);
      const res = await this.$store.dispatch("property/saleDetail", {
        id: row._id,
      });
      if (res.code === 0) {
        this.basicsForm = JSON.parse(JSON.stringify(basicsForm));

        this.basicsForm.time = [
          formatDate(res.data.start),
          formatDate(res.data.end),
        ];
        this.basicsForm.media_list = [
          Object.assign(res.data.media, {
            label: res.data.media.title,
            value: res.data.media.mid,
          }),
        ];
        this.basicsForm.date = res.data.date;
        this.basicsForm.user = res.data.user;
        this.basicsForm.comment = res.data.comment;
        this.basicsForm.item_id = res.data.item_id;
        this.basicsForm._id = res.data._id;
        this.basicsForm.con_id = res.data.con_id;
        this.basicsForm.dpmt = res.data.dpmt;
        if (res.data.desig === true || res.data.desig === false) {
          this.basicsForm.desig = {
            value: res.data.desig,
          };
        }
        this.initBasicsForm = JSON.parse(JSON.stringify(this.basicsForm));
        const china_property = res.data.china_property || [];
        this.initChina_property = JSON.parse(JSON.stringify(china_property));
        this.bindData(china_property);
        this.dialogVisible = true;
        this.dialogType = "edit";
        this.activeName = this.tabs[0].type;
      }
      this.$set(row, "loading", false);
    },
    handleView(row) {
      this.detailsObj._id = row._id;
      this.dialogVisibleDetails = true;
    },
    bindData(china_property) {
      let blkd_;
      this.tabs.forEach((e) => {
        e._id = china_property._id;
        e._cls = china_property._cls;
        e.md = {
          value: china_property.mask[e.type],
        };
        if (e.md.value === 1) {
          blkd_ = "group";
        } else if (e.md.value === 0) {
          blkd_ = "blkdGroup";
        }
        e[blkd_] = [];
        if (!china_property[e.flag].length) {
          e[blkd_] = JSON.parse(JSON.stringify(group));
          e[blkd_][0].data = e.data;
        }
        china_property[e.flag].forEach((el) => {
          const entity = china_property[e.flag]
            .filter((ele) => ele.grp == el.grp)
            .map((elem) => elem.entity);
          const obj = {
            value: entity,
            data: JSON.parse(JSON.stringify(e.data)),
            rightForm: {},
            grp: el.grp,
          };
          for (const k in el) {
            if (k !== "entity") {
              if (k == "term" || k == "opes") {
                obj.rightForm[k] = this.getTerm(el[k], this.property_conf[k]);
              } else if (k == "power") {
                obj.rightForm[k] = this.getTerm(
                  (el[k] + "").padStart(2, "0"),
                  this.property_conf[k]
                );
              } else {
                obj.rightForm[k] = {
                  value: el[k],
                };
              }
            }
          }
          const index = e[blkd_].findIndex((el) => {
            return el.grp == obj.grp;
          });
          if (index == -1) {
            e[blkd_].push(obj);
          }
        });
        if (e.md && e.md.value === 0) {
          const list = china_property.blkd
            .filter((el) => el.type === e.type)
            .map((ele) => ele.entity);
          if (list.length) {
            e[blkd_].push({
              value: list,
              data: e.data,
            });
          }
        }
      });
    },
    handleSave() {
      if (!this.propertyData.mask) {
        this.propertyData.mask = {};
      }
      this.propertyData.blkd = [];
      this.tabs.forEach((e) => {
        if (this.dialogType === "edit") {
          this.propertyData._id = e._id;
        } else {
          this.propertyData._id = undefined;
        }
        this.propertyData._cls = e._cls;
        this.propertyData[e.flag] = [];
        const md = e.md && e.md.value * 1;
        this.propertyData.mask[e.type] = md;
        if (md === 1) {
          //保存白名单
          e.group.forEach((el, i) => {
            for (const item of el.value) {
              const obj = Object.assign(this.formattingRight(el.rightForm), {
                entity: item,
                grp: i + 1,
              });
              this.propertyData[e.flag].push(obj);
            }
          });
        } else if (md === 0) {
          //设置黑名单
          e.blkdGroup.forEach((el, i) => {
            for (const item of el.value) {
              if (i === 0) {
                const obj = Object.assign(this.formattingRight(el.rightForm), {
                  entity: item,
                  grp: i + 1,
                });
                this.propertyData[e.flag].push(obj);
              } else {
                const obj = { entity: item };
                obj.type = e.type;
                obj.abbr = el.data.filter((e) => e.id === obj.entity)[0].abbr;
                this.propertyData.blkd.push(obj);
              }
            }
          });
        }
      });
      if (this.dialogType === "new") {
        return this.sale_add();
      }
      this.saleEdit();
      this.saleMainEdit();
    },
    async saleEdit() {
      if (isObjectValueEqual(this.propertyData, this.initChina_property)) {
        this.dialogVisible = false;
        return;
      }
      this.$confirm("此修改将影响本批次其他媒体权利，是否继续?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$store.dispatch(
            "property/saleEdit",
            this.propertyData
          );
          if (res && res.code === 0) {
            this.dialogVisible = false;
            this.$message.success("权利保存成功");
          }
        })
        .catch(() => {});
    },
    async saleMainEdit() {
      if (this.basicsForm.media_list.length === 0) {
        return this.$message.error("媒体信息不能为空");
      }

      if (!this.basicsForm.time) {
        return this.$message.error("授权时间不能为空");
      }
      if (isObjectValueEqual(this.basicsForm, this.initBasicsForm)) {
        return;
      }
      const media = {
        mid: this.basicsForm.media_list[0].mid,
        title: this.basicsForm.media_list[0].title,
        year: this.basicsForm.media_list[0].year,
      };

      const body = {
        comment: this.basicsForm.comment,
        item_id: this.basicsForm.item_id,
        con_id: this.basicsForm.con_id,
        date: formatDate(this.basicsForm.date, "all"),
        start: formatDate(this.basicsForm.time[0]),
        end: formatDate(this.basicsForm.time[1]),
        media: media,
        user: this.basicsForm.user,
        _id: this.basicsForm._id,
        dpmt: this.basicsForm.dpmt,
        desig: this.basicsForm.desig && this.basicsForm.desig.value,
      };
      const res = await this.$store.dispatch("property/saleMainEdit", body);
      if (res && res.code === 0) {
        this.dialogVisible = false;
        this.$message.success("基础信息保存成功");
        this.saleList();
      }
    },
    getTerm(str, list) {
      const arr = [];
      for (let i = 0; i < str.length; i++) {
        if (str[i] == "1") {
          const obj = list[list.length - 1 - i];
          for (const k in obj) {
            arr.push({
              value: obj[k],
            });
          }
        }
      }
      return arr;
    },
    formattingRight(rightForm) {
      const obj = {};
      for (const k in rightForm) {
        if (Array.isArray(rightForm[k])) {
          const sum = rightForm[k]
            .map((e) => e.value)
            .reduce((prev, cur) => {
              return prev + cur;
            }, 0);
          if (sum > 0) {
            obj[k] = this.binary(sum, this.property_conf[k].length);
            if (k === "power") {
              obj[k] = obj[k] * 1;
            }
          }
        } else if (
          rightForm[k] !== null &&
          typeof rightForm[k] === "object" &&
          !Array.isArray(rightForm[k])
        ) {
          obj[k] = rightForm[k].value;
        } else {
          if (k !== "index") {
            obj[k] = rightForm[k];
          }
        }
      }
      if (!obj.opes) {
        obj.opes = "0000";
      }
      return obj;
    },
    binary(num, Bits) {
      const resArry = [];
      const xresArry = [];
      let i = 0;
      for (; num > 0; ) {
        resArry.push(num % 2);
        num = parseInt(num / 2);
        i++;
      }
      for (let j = i - 1; j >= 0; j--) xresArry.push(resArry[j]);
      if (Bits < xresArry.length) {
        console.log("位数小于二进制位数");
      }
      if (Bits) {
        for (let r = xresArry.length; r < Bits; r++) {
          xresArry.unshift(0);
        }
      }
      return xresArry.join().replace(/,/g, "");
    },
    async sale_add() {
      if (this.basicsForm.media_list.length === 0) {
        return this.$message.error("媒体信息不能为空");
      }
      if (this.basicsForm.time.length == 0) {
        return this.$message.error("授权时间不能为空");
      }
      const body = {
        start: this.basicsForm.time[0],
        end: this.basicsForm.time[1],
        media_list: this.basicsForm.media_list.map((el) => {
          return {
            mid: el.mid,
            title: el.title,
            year: el.year,
          };
        }),
        china_property: this.propertyData,
        con_id:
          this.basicsForm.media_list.length > 0
            ? this.basicsForm.media_list[0].con_id
            : "",
        comment: this.basicsForm.comment,
        item_id: this.basicsForm.item_id,
        desig: this.basicsForm.desig && this.basicsForm.desig.value,
      };
      const res = await this.$store.dispatch("property/sale_add", body);
      if (res && res.code === 0) {
        this.dialogVisible = false;
        this.$message.success("保存成功");
        this.saleList();
      }
    },
    async saleList() {
      this.tableLoading = true;
      const res = await this.$store.dispatch("property/saleList", {
        page: this.listQuery.page,
        // page_size: this.listQuery.limit,
      });
      this.tableLoading = false;
      if (res && res.code === 0) {
        this.tableData = res.data || [];
        this.total = res.total || 0;
      }
    },
    getList() {
      if (
        !(
          this.searchForm !== null &&
          typeof this.searchForm === "object" &&
          !Object.keys(this.searchForm).length
        )
      ) {
        return this.saleListPost();
      }
      this.saleList();
    },
    async propertyEntityList() {
      const res = await this.$store.dispatch("property/propertyEntityList", {});
      if (res && res.code === 0 && res.data) {
        this.detailsObj.entityList = res.data;
        this.tabs.forEach((el) => {
          el.data = res.data.filter((ele) => {
            if (el.type == ele.type) {
              return Object.assign(ele, { key: ele.id, label: ele.abbr });
            }
          });

          const index = el.data.findIndex((e) => e.is_all);
          if (index === -1) {
            el.data.unshift({
              id: 1,
              key: 1,
              title: "all",
              label: "全部",
              abbr: "全部",
              type: el.type,
            });
          }
          el.group.forEach((ele) => {
            ele.data = JSON.parse(JSON.stringify(el.data));
          });
          el.blkdGroup.forEach((ele) => {
            ele.data = JSON.parse(JSON.stringify(el.data));
          });
        });
      }
    },
    async propertyConf() {
      const res = await this.$store.dispatch("property/property_conf", {});
      if (res && res.code === 0) {
        const data = res.data || {};
        this.detailsObj.propertyConf = data;
        this.$store.commit("property/SET_PROPERTY", data);
      }
    },
  },
};
</script>

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
</style>
