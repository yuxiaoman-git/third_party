<template>
  <div>
    <el-dialog
      title="权利详情"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="80%"
    >
      <el-card class="box-card" style="margin-bottom: 16px" v-loading="loading">
        <el-row :gutter="20" type="flex" class="flex-warp">
          <el-col :span="8" class="mb-18">
            <span>媒体名称：</span>
            <span>{{ settingForm.media && settingForm.media.title }} </span>
          </el-col>
          <el-col :span="8" class="mb-18">
            <span>授权时间：</span>
            <span>{{ settingForm.start | formatDate("all") }} - </span>
            <span>{{ settingForm.end | formatDate("all") }}</span>
          </el-col>
          <el-col :span="8" class="mb-18">
            <span>定点采购：</span>
            <span>{{ settingForm.desig === false ? "否" : "是" }} </span>
          </el-col>
          <el-col :span="8" class="mb-18">
            <span>节目编号：</span>
            <span>{{ settingForm.item_id }} </span>
          </el-col>
          <el-col :span="8" class="mb-18">
            <span>备注：</span>
            <span>{{ settingForm.comment }} </span>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        v-loading="loading"
        class="box-card"
        v-for="(item, i) in tabs"
        :key="i"
        style="margin-bottom: 16px"
      >
        <div slot="header" class="clearfix">
          <span>{{ item.label }}</span>
          <span> - {{ item.md === 0 ? "黑名单" : "白名单" }}</span>
        </div>
        <div v-if="item.md === 0" class="exclude">
          <span>排除：</span>
          <span v-for="(el, index) in item.blkd" :key="index">{{
            index !== item.blkd.length - 1 ? `${el.abbr}、` : el.abbr
          }}</span>
        </div>
        <el-table :data="getTableData(item.type)" border style="width: 100%">
          <el-table-column prop="right" label="权利" width="100" fixed="left">
          </el-table-column>
          <el-table-column
            v-for="(ele, i) in item.list"
            :key="i"
            :label="ele.label"
            width="130"
          >
            <template slot-scope="{ row }">
              <tooltipComponent :row="row" :type="item.type" :item="ele" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tooltipComponent from "./tooltip-component";
import { confList } from "../../js/propertyConf";

const tabs = [
  {
    label: "区域设置",
    type: "REGION",
    flag: "area",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "平台",
    type: "PCWEB",
    flag: "plat",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "OTT",
    type: "OTT",
    flag: "ott",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "专网OTT",
    type: "SOTT",
    flag: "sott",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "IPTV",
    type: "IPTV",
    flag: "iptv",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "数字电视",
    type: "DTV",
    flag: "dtv",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "电视台",
    type: "TV",
    flag: "tv",
    md: 1,
    list: [],
    blkd: [],
  },
  {
    label: "音频平台",
    type: "AUDIO",
    flag: "audio",
    md: 1,
    list: [],
    blkd: [],
  },
];
export default {
  name: "rightDetails",
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    detailsObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: { tooltipComponent },
  computed: {
    dialogVisible: {
      get() {
        return this.give;
      },
      set(val) {
        this.$emit("returnBack", val);
      },
    },
  },
  data() {
    return {
      loading: true,
      tabs: JSON.parse(JSON.stringify(tabs)),
      settingForm: {},
      tableData: confList,
    };
  },
  mounted() {
    this.propertyConf();
    this.propertyDetail();
  },
  methods: {
    getTableData(type) {
      if (type !== "IPTV" && type !== "SOTT") {
        return confList.filter((e) => e.key !== "opes");
      }
      return confList;
    },
    propertyConf() {
      const data = this.detailsObj.propertyConf || {};
      this.tableData.forEach((e) => {
        data[e.key].forEach((el) => {
          for (const k in el) {
            if (e.key !== "term" && e.key !== "opes" && e.key !== "power") {
              this.$set(e, el[k], {
                title: k,
                icon: e.iconList.get(el[k]),
              });
            }
          }
        });
        if (e.key === "term" || e.key === "opes") {
          this.$set(e, e.key, JSON.parse(JSON.stringify(data[e.key])));
          e[e.key].forEach((ele) => {
            const k = Object.keys(ele)[0];
            this.$set(ele, "icon", e.iconList.get(ele[k]));
            this.$set(ele, "title", k);
          });
        }
        if (e.key === "power") {
          this.$set(e, e.key, JSON.parse(JSON.stringify(data[e.key])));
          e[e.key].forEach((ele) => {
            const k = Object.keys(ele)[0];
            this.$set(ele, "icon", e.iconList.get(ele[k]));
            this.$set(ele, "title", k);
          });
        }
      });
    },
    async propertyDetail() {
      this.loading = true;
      let url;
      if (this.detailsObj.type === "purchase") {
        url = "property/propertyDetail";
      } else if (this.detailsObj.type === "sale") {
        url = "property/saleDetail";
      }
      if (!url) {
        return;
      }
      const res = await this.$store.dispatch(url, {
        id: this.detailsObj._id,
      });
      this.loading = false;
      const { code, data = {} } = res || {};
      if (code === 0) {
        this.settingForm = {
          start: data.start,
          end: data.end,
          comment: data.comment,
          item_id: data.item_id,
          media: data.media,
          desig: data.desig,
        };

        this.tabs.forEach((e) => {
          e.md = data.china_property.mask[e.type];
          e.list = data.china_property[e.flag].map((el) => {
            const item = this.detailsObj.entityList.filter(
              (ele) => ele.id === el.entity
            );
            if (item.length) {
              return Object.assign(el, {
                label: item[0].abbr,
              });
            } else {
              return el;
            }
          });
          e.blkd = data.china_property.blkd.filter((el) => el.type == e.type);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.exclude {
  font-size: 14px;
  margin-bottom: 7px;
}
.danger {
  color: #f56c6c;
}
.blue {
  color: #409eff;
}
.font-size-20 {
  font-size: 20px;
}
::v-deep .el-dialog__body {
  padding: 10px;
}
.flex-warp {
  flex-wrap: wrap;
}
.mb-18 {
  margin-bottom: 18px;
}
</style>
