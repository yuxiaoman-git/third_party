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
          <div class="media-title-box">
            <div class="media-title topicStyle">
              {{ item.storage_id }}-{{ item.serial_num}}
            </div>
          </div>
          <div class="partner-box">
            <div class="topicStyle">{{ item.partner_name }}</div>
          </div>
          <div class="media-box">
            <el-tooltip class="item" effect="dark" :content="item.media_name" placement="top-start">
              <div class="topicStyle">{{ item.media_name }}</div>
            </el-tooltip>
          </div>
          <div
            class="err-box"
            v-if="item.code !== 0"
          >
            <el-tooltip class="item" effect="dark" :content="item.desc" placement="top-start">
              <div class="topicStyle">
                {{ item.desc }}
              </div>
            </el-tooltip>
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
import debounce from "throttle-debounce/debounce";
import {getStorage} from "@/utils/auth";
export default {
  name: "cdnBatchInject",
  props: {
    dataList: {
      type: [Array,Object],
      default() {
        return [];
      },
    },
  },
  watch:{
    dataList: {
      handler(val) {
        this.list = JSON.parse(JSON.stringify(val));
        this.getList()
      }
    }
  },
  data() {
    return {
      collapse: true,
      isShow: false,
      list: [],
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
  mounted() {
  },
  methods: {
    getList() {
      for (const item of this.list) {
        this.injectorTaskAdd(item);
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
      const { storage_id, partner_id, level } = item || {};
      const { uid } = getStorage("userInfo") || {};
      const index = this.list.findIndex((e) => {
        return (
          e.storage_id === item.storage_id && e.partner_id === item.partner_id
        );
      });
      const body = {
        storage_id,
        partner_id,
        level,
        uid,
      };
      const res = await this.$store.dispatch("injector/injectorTaskAdd", body);
      this.list[index].code = res.code
      this.list[index].desc = res.desc
    },
    retry(item) {
      this.injectorTaskAdd(item);
    },
    handleRemove(item, i) {
      this.list.splice(i, 1);
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
        //width: 30%;
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

