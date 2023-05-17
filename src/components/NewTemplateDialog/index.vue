<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :top="top"
    :fullscreen="fullscreen"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <div slot="title" ref="header">
      <div>
        <span>{{ title }}</span>
        <el-link
          :underline="false"
          class="full-screen-box"
          @click="fullscreen = !fullscreen"
        >
          <svg-icon v-show="!fullscreen" icon-class="fullscreen" />
          <svg-icon v-show="fullscreen" icon-class="exit-fullscreen" />
        </el-link>
      </div>
    </div>
    <el-scrollbar>
      <div :style="styleObj">
        <slot> </slot>
      </div>
    </el-scrollbar>
    <span slot="footer" class="dialog-footer" ref="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        v-if="isShowSaveBtn"
        @click="handelSave"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "提示";
      },
    },
    width: {
      type: String,
      default() {
        return "500px";
      },
    },
    top: {
      type: String,
      default() {
        return "10px";
      },
    },
    show: {
      type: Boolean,
      default() {
        return false;
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isShowSaveBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    dialogVisible: {
      get() {
        this.fullscreen = false;
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      },
    },
  },
  data() {
    return {
      fullscreen: false,
      styleObj: {},
    };
  },
  watch: {
    fullscreen: {
      handler(newVal) {
        this.$nextTick(() => {
          const headerHeight = this.getOffsetHeight("header");
          const footerHeight = this.getOffsetHeight("footer");
          if (headerHeight && footerHeight) {
            this.$set(this, "styleObj", {
              minHeight: "100px",
              [newVal ? "height" : "maxHeight"]: newVal
                ? `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
                : `calc(100vh - ${headerHeight}px - ${footerHeight}px - ${this.top} - 10px)`,
            });
          }
        });
      },
      immediate: true,
    },
  },
  methods: {
    handelSave() {
      // this.dialogVisible = false;
      this.$emit("save");
    },
    getOffsetHeight(ref) {
      const dom = this.$refs[ref];
      const parentDom = dom && dom.parentNode;
      if (parentDom) {
        return parentDom.offsetHeight;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 0;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #eee;
  padding: 10px 20px 10px;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
  padding: 12px 20px 12px;
  .el-dialog__headerbtn {
    top: 12px;
  }
}
.full-screen-box {
  float: right;
  margin-right: 30px;
  color: #909399;
}
</style>
