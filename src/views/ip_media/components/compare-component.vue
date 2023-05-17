<template>
  <el-dialog
    title="对比"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    top="20px"
    width="70%"
  >
    <sticky :z-index="10" type="dialog" :class-name="'sub-navbar2'">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, i) in tabs" :key="i" :index="i + ''">{{
          item.label
        }}</el-menu-item>
      </el-menu>
    </sticky>

    <el-card
      class="box-card"
      v-for="(item, i) in tabs"
      :ref="'card' + i"
      :key="i"
    >
      <div slot="header" class="clearfix">
        <span>{{ item.label }}</span>
      </div>
      <el-table
        :data="tableData"
        border
        size="mini"
        :header-cell-class-name="
          ({ row, column, rowIndex, columnIndex }) => {
            return headerCellClassName(
              row,
              column,
              rowIndex,
              columnIndex,
              item
            );
          }
        "
        style="width: 100%"
      >
        <el-table-column prop="right" fixed label="权利" width="80">
        </el-table-column>
        <el-table-column label="采购" align="center">
          <el-table-column
            :label="item.purchase_obj.media_tilte"
            align="center"
          >
            <el-table-column :label="item.purchase_obj.md">
              <el-table-column
                v-for="(item2, i2) in item.purchase_obj.list"
                :key="i2"
                :label="item2.title"
                width="100"
              >
                <template slot-scope="{ row }">
                  <tooltipComponent :row="row" :item="item2" />
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="卖出" align="center">
          <el-table-column :label="item.sale_obj.media_title" align="center">
            <el-table-column :label="item.sale_obj.md">
              <el-table-column
                v-for="(item2, i2) in item.sale_obj.list"
                :key="i2"
                :label="item2.title"
                width="100"
              >
                <template slot-scope="{ row }">
                  <tooltipComponent :row="row" :item="item2" />
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false"
        >取 消</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import tooltipComponent from "./tooltip-component";
import Sticky from "@/components/Sticky"; // 粘性header组件
import { confList } from "../js/propertyConf";
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const tabs = [
  {
    label: "区域",
    type: "REGION",
    flag: "area",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
          solo: true,
          subs: "11",
          term: "1000",
        },
        {
          title: "上海",
          solo: false,
          subs: "11",
          term: "1111",
        },
        {
          title: "深圳",
          solo: true,
          subs: "11",
          term: "1010",
        },
        {
          title: "天津",
          solo: true,
          subs: "11",
          term: "1010",
        },
        {
          title: "山东",
          solo: true,
          subs: "11",
          term: "1010",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
          solo: true,
          subs: "11",
        },
        {
          title: "上海",
          solo: true,
          subs: "11",
        },
        {
          title: "山东",
          solo: true,
          subs: "11",
        },
        {
          title: "河南",
          solo: true,
          subs: "11",
        },
      ],
    },
  },
  {
    label: "平台",
    type: "PCWEB",
    flag: "plat",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
  },
  {
    label: "OTT",
    type: "OTT",
    flag: "ott",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
          solo: 1,
          subs: 2,
        },
        {
          title: "上海",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
  },
  {
    label: "专网OTT",
    type: "SOTT",
    flag: "sott",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
  },
  {
    label: "IPTV",
    type: "IPTV",
    flag: "iptv",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
  },
  {
    label: "数字电视",
    type: "DTV",
    flag: "dtv",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
  },
  {
    label: "电视台",
    type: "TV",
    flag: "tv",
    purchase_obj: {
      md: "白名单",
      media_tilte: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
    sale_obj: {
      md: "白名单",
      media_title: "变形金刚",
      list: [
        {
          title: "北京",
        },
        {
          title: "上海",
        },
      ],
    },
  },
];
export default {
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
  },
  components: { Sticky, tooltipComponent },
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
      tableData: confList,
      tabs: JSON.parse(JSON.stringify(tabs)),
      activeIndex: "0",
      scrolltop: 0,
      scroll: false,
    };
  },
  watch: {
    //监听 滑轮滚动的值的变化 来实现自动锚点, 即改变pageIndex
    scrolltop(scrollTop) {
      if (this.scroll) {
        return;
      }
      scrollTop += 100;
      let i = -1;
      const len = this.tabs.length;
      while (++i < len) {
        const curAnchorScrollTop = this.tabs[i].top;
        const nextAnchorScrollTop = this.tabs[i + 1] && this.tabs[i + 1].top;
        if (
          scrollTop >= curAnchorScrollTop &&
          nextAnchorScrollTop &&
          scrollTop < nextAnchorScrollTop
        ) {
          this.activeIndex = i + "";
          break;
        } else if (scrollTop >= curAnchorScrollTop && i === len - 1) {
          this.activeIndex = i + "";
          break;
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tabs.forEach((e, i) => {
        e.top =
          this.$refs["card" + i] && this.$refs["card" + i][0].$el.offsetTop;
      });
    });

    this.$el && this.$el.addEventListener("scroll", this.handleScroll);
    this.propertyEntityList();
    this.propertyConf();
  },
  methods: {
    headerCellClassName(row, column, rowIndex, columnIndex, item) {
      const purchase_list = (item.purchase_obj && item.purchase_obj.list) || [];
      if (
        (rowIndex === 0 && columnIndex === 1) ||
        (rowIndex === 1 && columnIndex === 0) ||
        (rowIndex === 2 && columnIndex === 0) ||
        (rowIndex === 3 && purchase_list.length > columnIndex)
      ) {
        return "table-bg";
      }

      if (
        (rowIndex === 0 && columnIndex === 2) ||
        (rowIndex === 1 && columnIndex === 1) ||
        (rowIndex === 2 && columnIndex === 1) ||
        rowIndex === 3
      ) {
        return "table-bg2";
      }
    },
    async propertyEntityList() {
      // const res = await this.$store.dispatch("property/propertyEntityList", {});
      // if (res && res.code === 0 && res.data) {
      // }
    },
    async propertyConf() {
      const res = await this.$store.dispatch("property/property_conf", {});
      if (res && res.code === 0) {
        const data = res.data || {};
        this.tableData.forEach((e) => {
          data[e.key].forEach((el) => {
            for (const k in el) {
              if (e.key !== "term") {
                this.$set(e, el[k], {
                  title: k,
                  icon: e.iconList.get(el[k]),
                });
              }
            }
          });
          if (e.key === "term") {
            this.$set(e, e.key, JSON.parse(JSON.stringify(data[e.key])));
            e[e.key].forEach((ele) => {
              const k = Object.keys(ele)[0];
              this.$set(ele, "icon", e.iconList.get(ele[k]));
              this.$set(ele, "title", k);
            });
          }
        });
      }
    },
    handleScroll() {
      this.scrolltop = this.$el.scrollTop; //获取页面元素距离顶部的距离
    },

    scrollTo(to, duration, callback) {
      const start = this.position();
      const change = to - start;
      const increment = 20;
      let currentTime = 0;
      duration = typeof duration === "undefined" ? 500 : duration;
      const that = this;
      const animateScroll = function () {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        // move the document.body
        that.move(val);
        // do the animation unless its over
        if (currentTime < duration) {
          requestAnimFrame(animateScroll);
        } else {
          if (callback && typeof callback === "function") {
            // the animation is done so lets callback
            callback();
          }
        }
      };
      animateScroll();
    },
    move(amount) {
      this.$el.scrollTop = amount;
    },
    position() {
      return this.$el.scrollTop;
    },
    handleSelect(key) {
      this.scroll = true;
      const top = this.tabs[key].top;

      this.scrollTo(top - 50, 800, () => {
        this.scroll = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 16px;
}
::v-deep .el-table {
  .table-bg {
    background: #fdf5e6 !important;
  }
  .table-bg2 {
    background: #f0f9eb !important;
  }
}
</style>
