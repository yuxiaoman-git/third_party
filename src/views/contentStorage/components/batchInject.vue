<template>
  <div v-if="isShow">
    <span class="dot" @click="handelShow" v-show="!collapse" title="展开">
      <i class="el-icon-full-screen"></i>
    </span>
    <div
      class="card"
      :style="{ bottom: uploadPanelShow ? 317 + 30 + 'px' : '' }"
      v-show="collapse"
    >
      <div class="title">
        <div class="left">注入列表</div>
        <div class="operate">
          <el-button
            @click="handelShow"
            type="text"
            :title="collapse ? '展开' : '折叠'"
          >
            <i class="el-icon-minus"></i>
          </el-button>
          <el-button @click="handleClose" type="text" title="关闭">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
      </div>
      <ul class="list-box">
        <li
          v-for="(item, i) in list"
          :key="i"
          :class="[
            item.code === 0
              ? 'bg-succeed'
              : item.code !== 0 && item.code !== undefined
              ? 'bg-err'
              : '',
          ]"
        >
          <div
            class="media-title-box"
            @mouseenter="handleDivMouseEnter($event)"
            @mouseleave="handleDivMouseleave($event)"
          >
            <div class="media-title topicStyle">
              {{ item.media && item.media.name }}-{{ item.storage_id }}-{{
                item.episode && item.episode.serial_num
              }}
            </div>
          </div>
          <div
            class="partner-box"
            @mouseenter="handleDivMouseEnter($event)"
            @mouseleave="handleDivMouseleave($event)"
          >
            <div class="topicStyle">{{ item.partner_title }}</div>
          </div>
          <div
            class="time-box"
            @mouseenter="handleDivMouseEnter($event)"
            @mouseleave="handleDivMouseleave($event)"
          >
            <div class="topicStyle">{{ item.create_time }}</div>
          </div>
          <div
            @mouseenter="handleDivMouseEnter($event)"
            @mouseleave="handleDivMouseleave($event)"
            class="err-box"
            v-if="item.code !== 0"
          >
            <div class="topicStyle">
              {{ item.desc }}
            </div>
          </div>
          <div class="btn-box">
            <span v-if="item.code === 0">成功</span>
            <el-button
              type="text"
              v-if="item.code !== 0"
              :loading="item.loading"
              @click="retry(item)"
              >重试</el-button
            >
            <el-button
              type="text"
              v-if="item.code !== 0"
              @click="handleRemove(item, i)"
            >
              <i class="el-icon-close"></i>
            </el-button>
          </div>
        </li>
      </ul>
    </div>
    <el-tooltip ref="tooltip" placement="top" :content="tooltipContent">
    </el-tooltip>
  </div>
</template>
<script>
import HandleDB from "../js/handleDB";
import debounce from "throttle-debounce/debounce";
import { getStyle } from "element-ui/src/utils/dom";
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      collapse: true,
      isShow: false,
      list: [],
      db: new HandleDB(),
      tooltipContent: "",
    };
  },
  computed: {
    uploadPanelShow: {
      get() {
        return (
          this.$store.state.uploadPanel.uploadPanelShow &&
          !this.$store.state.uploadPanel.expand
        );
      },
    },
  },
  created() {
    this.activateTooltip = debounce(50, (tooltip) =>
      tooltip.handleShowPopper()
    );
  },
  async mounted() {
    const res = await this.db.getAll();
    if (res && res.length) {
      this.list = JSON.parse(JSON.stringify(res));
      if (this.list.length) {
        this.isShow = true;
      }
    }
  },
  methods: {
    getList() {
      const data_list = JSON.parse(JSON.stringify(this.dataList));
      for (const item of data_list) {
        delete item.id;
      }
      for (const item of data_list) {
        const index = this.list.findIndex((e) => {
          return (
            e.storage_id === item.storage_id && e.partner_id === item.partner_id
          );
        });
        if (index === -1) {
          this.db.add(item);
          this.list.push(item);
          this.injectorTaskAdd(item);
        } else {
          this.db.update(item.storage_id, item.partner_id, item);
          this.list.splice(index, 1, item);
          this.injectorTaskAdd(item);
        }
      }
      if (!this.isShow) {
        this.isShow = true;
      }
      if (!this.collapse) {
        this.collapse = true;
      }
    },
    handelShow() {
      this.collapse = !this.collapse;
    },
    handleClose() {
      this.isShow = false;
    },
    async injectorTaskAdd(item) {
      const { storage_id, partner_id, level, uid } = item || {};
      const body = {
        storage_id,
        partner_id,
        level,
        uid,
      };
      this.$set(item, "loading", true);
      delete item.code;
      const res = await this.$store.dispatch("injector/injectorTaskAdd", body);
      this.$set(item, "desc", res.desc);
      this.$set(item, "code", res.code);
      this.$set(item, "loading", false);
      if (res.code === 0) {
        this.db.delete(storage_id, partner_id);
      }
    },
    retry(item) {
      this.injectorTaskAdd(item);
    },
    handleRemove(item, i) {
      this.list.splice(i, 1);
      this.db.delete(item.storage_id, item.partner_id);
    },
    // 鼠标移入
    handleDivMouseEnter(event) {
      const target = event.target;
      // 判断是否text-overflow, 如果是就显示tooltip
      let child = target.querySelector(".groupItemClass");
      // 在此处我一共有三个class控制三块class，这一块主要是对<el-menu>以及文本区域控制，所以class要有多个。
      // 如果区域宽度被限定，则通过高度判断
      let heightFlag = false;
      if (!child) {
        child = target.querySelector(".setItemClass");
        if (!child) {
          // 文本区域
          child = target.querySelector(".topicStyle");
        }
      }
      if ((child && child.scrollHeight) > (child && child.offsetHeight)) {
        heightFlag = true;
      }
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange();
      range.setStart(child, 0);
      range.setEnd(child, child.childNodes.length);
      const rangeWidth = range.getBoundingClientRect().width; // 文本区域宽度
      const padding =
        (parseInt(getStyle(target, "paddingLeft"), 10) || 0) +
        (parseInt(getStyle(target, "paddingRight"), 10) || 0);
      if (
        rangeWidth + padding > target.offsetWidth ||
        child.scrollWidth > child.offsetWidth ||
        (heightFlag && this.$refs.tooltip)
      ) {
        const tooltip = this.$refs.tooltip;
        // TODO 会引起整个 Table 的重新渲染，需要优化
        this.tooltipContent = target.innerText || target.textContent;
        tooltip.referenceElm = target;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = "none");
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      }
    },

    // 鼠标移出
    handleDivMouseleave() {
      const tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ml-10 {
  margin-left: 10px;
}
.dot {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background: #e6a23c;
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 22;
}
.card {
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 520px;
  border: 1px solid #e2e2e2;
  background: #fff;
  z-index: 9;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  border-radius: 7px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    .left {
      font-size: 14px;
    }
  }
  .list-box {
    height: 240px;
    overflow-y: auto;
    padding-left: 0;
    li {
      display: flex;
      justify-content: space-between;
      height: 49px;
      line-height: 49px;
      border-bottom: 1px solid #cdcdcd;
      padding: 0 15px;
      font-size: 14px;
      .media-title-box {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 30%;
      }
      .partner-box,
      .time-box {
        width: 20%;
        text-indent: 10px;
      }
      .err-box {
        width: 30%;
        text-indent: 10px;
        // color: #dd6161;
      }
      .topicStyle {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn-box {
        width: 20%;
        text-indent: 10px;
        overflow: hidden;
        .el-button.is-loading:before {
          background: transparent;
        }
      }
    }
    .bg-succeed {
      background: #e2eeff;
    }
    .bg-err {
      background: #ffe0e0;
    }
  }
  .err-color {
    color: #67c23a;
  }
  .el-icon-close,
  .el-icon-minus {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>