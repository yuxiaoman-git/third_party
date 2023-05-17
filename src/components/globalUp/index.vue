<template>
  <div :class="[collapse ? '' : 'show', 'global-uploader']">
    <span class="dot" v-if="collapse" @click="handelShow" title="展开">
      <i class="el-icon-full-screen"></i>
    </span>
    <uploader
      ref="uploader"
      :options="options"
      :file-status-text="statusText"
      class="uploader-example uploader-app"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      @file-removed="removeFile"
      @change="change"
      @files-added="filesAdded"
      @files-submitted="filesSubmitted"
    >
      <!-- <uploader-unsupport></uploader-unsupport> -->
      <uploader-drop class="global-uploader-btn">
        <!-- <p>Drop files here to upload or</p> -->
        <uploader-btn ref="uploadBtn" class="global-uploader-btn" :attrs="attrs"
          >select files</uploader-btn
        >
        <!-- <uploader-btn :attrs="attrs">select images</uploader-btn> -->
        <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
      </uploader-drop>
      <uploader-list v-show="panelShow">
        <div
          class="file-panel"
          slot-scope="props"
          :class="{ collapse: collapse }"
        >
          <div class="file-title">
            <div>文件列表</div>
            <div class="operate">
              <el-button
                @click="fileListShow"
                type="text"
                :title="collapse ? '展开' : '折叠'"
              >
                <i class="el-icon-minus"></i>
              </el-button>
              <el-button @click="close" type="text" title="关闭">
                <i class="el-icon-close"></i>
              </el-button>
            </div>
          </div>
          <div class="hint">
            <span>
              <i
                class="el-icon-warning"
                style="color: #ffa900; font-size: 14px"
              ></i>
              正在上传,上传过程中请勿全局刷新页面，请耐心等待…
            </span>
            <el-link
              v-if="unusual_program.length > 0"
              class="fr"
              :underline="false"
              @click="drawer = true"
              type="primary"
              >上传失败</el-link
            >
          </div>
          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file ref="files" :file="file" :list="true">
              </uploader-file>
            </li>
            <div class="no-file" v-if="!props.fileList.length">
              暂无待上传文件
            </div>
          </ul>
        </div>
      </uploader-list>
    </uploader>
    <el-drawer
      title="文件上传失败，请检查后重新上传"
      :visible.sync="drawer"
      direction="rtl"
      size="70%"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <ul class="ul-box">
        <li v-for="(item, index) in unusual_program" :key="index">
          <span class="fl overflow-hidden">{{ item.originalName }}</span>
          <i
            class="el-icon-close el-icon cursor-pointer fr"
            @click="handelDelete(item.filename)"
          ></i>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import UploaderFile from "./components/file.vue";
import OperateDB from "@/utils/operateDB";
import { ACCEPT_CONFIG } from "@/components/globalUp/js/config";
import Bus from "@/assets/js/bus";

// console.log(process.env)

const url = `${
  process.env.VUE_APP_URL
}/${new Date().getFullYear()}/${
  new Date().getMonth() + 1
}/${new Date().getDate()}`;
export default {
  components: { UploaderFile },
  data() {
    return {
      drawer: false,
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中",
      },
      db: new OperateDB(),
      target: '',
      options: {
        // target: `${url}?cmd=upload`,
        target: () => {
          return this.target
        },
        testChunks: false, //不校验
        chunkSize: 1024 * 1024 * 1024 * 50,
        simultaneousUploads: 1, //并发上传数
        maxChunkRetries: 3, //最大自动失败重试上传次数，值可以是任意正整数
        chunkRetryInterval: 800, // 重试间隔，值可以是任意正整数，
        processParams: () => {
          return {};
        },
        successStatuses: [200, 201, 202, 204],
        query: {},
      },
      attrs: {
        accept: ACCEPT_CONFIG.getAll(),
      },
      panelShow: false, //选择文件后，展示上传panel
      collapse: false,
      completedList: [],
      params: {},
      unusual_program: [],
      typeFlag: 'injector',
    };
  },
  computed: {
    //Uploader实例
    uploader() {
      return this.$refs.uploader.uploader;
    },
    isLogin() {
      return this.$store.getters.token;
    },
  },
  watch: {
    isLogin: {
      handler(n) {
        if (!n) {
          this.uploader.cancel && this.uploader.cancel();
        }
      },
      immediate: true,
    },
    panelShow: {
      handler(flag) {
        this.$store.commit("uploadPanel/set_panel_show", flag);
      },
    },
    collapse: {
      handler(flag) {
        this.$store.commit("uploadPanel/set_expand", flag);
      },
    },
  },
  mounted() {
    Bus.$on("selectFiles", async (query) => {
      this.params = query;
      const uploadStr = `/api/1/matrix/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}?cmd=upload`
      let numFlag = -1
      for (const item of this.params.fileList) {
        numFlag += 1
        if (query.domainUrls && query.domainUrls.length > 0) {
          this.target = query.domainUrls[numFlag] + uploadStr
          this.typeFlag = 'origin'
        } else {
          this.target = `${url}?cmd=upload`
          this.typeFlag = 'injector'
        }
        this.$set(item.file, "originalName", item.originalName);
        this.$set(item.file, "episodeId", item.episodeId);
        this.$set(item.file, "media_id", item.media_id);
        this.$set(item.file, "media_name", item.media_name);
        this.$set(item.file, "pro_type", item.pro_type);
        this.$set(item.file, "episode", item.episode);
        this.$set(item.file, "definition", item.definition);
        this.$set(item.file, "content_type", item.content_type);
        this.uploader.addFile(item.file);
        const res = await this.db.get(item.file.name);
        if (!res) {
          this.db.add({
            filename: item.file.name,
            originalName: item.originalName,
          });
        }
      }
    });
    this.get_storage();
  },
  methods: {
    handleClose(done) {
      done();
    },
    async get_storage() {
      this.unusual_program = [];
      const list = await this.db.getAll();
      const time = new Date().getTime();
      list.forEach((program) => {
        if (time > program.createTime + 86400000) {
          this.db.delete(program.filename);
        } else {
          this.unusual_program.push(program);
        }
      });
      if (this.unusual_program.length > 0) {
        this.panelShow = true;
      }
    },
    fileListShow() {
      this.collapse = !this.collapse;
    },
    handelShow() {
      this.collapse = !this.collapse;
    },
    close() {
      this.panelShow = false;
      this.uploader.cancel && this.uploader.cancel();
    },
    async injectorMediaUploadVideoInfo(result) {
      console.log(result)
      const {episode_id} = result
      // const {
      //   name,
      //   url,
      //   media_id,
      //   // pro_type,
      //   episode_id,
      //   // definition,
      //   // content_type,
      //   md5,
      //   episode
      // } = result;
      let param = {}
      let postUrl = 'injector/injectorMediaUploadVideoInfo';
      if (this.typeFlag == 'origin') {
        postUrl = 'origin/metaVideoUpload';
        param = result
        param.episode_id = episode_id || null
        // param = {
        //   name,
        //   url,
        //   media_id,
        //   md5,
        //   episode: episode.toString(),
        // }
      } else {
        postUrl = 'injector/injectorMediaUploadVideoInfo';
        param = result
        param.episode_id = episode_id || null
      }
      const res = await this.$store.dispatch(
        postUrl,
        param
      );
      if (res && res.code === 0) {
        Bus.$emit("getSucceed", {});
      }
    },
    removeFile(file) {
      if (this.isLogin && this.panelShow) {
        this.db.delete(file.file.name);
      }
      return;
    },
    onFileProgress() {
      // console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
    },
    async onFileSuccess(rootFile, file, message) {
      const {
        media_id,
        pro_type,
        episodeId,
        definition,
        content_type,
        media_name,
        episode,
      } = file.file;
      const messageObj = JSON.parse(message);
      // const { md5 } = messageObj;
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf("."));
      const name = `${media_name}-${episode}${fileExtension}`;
      const params = {
        name,
        // md5,
        url: this.target.split('?cmd=upload')[0] + `/${fileName}`,
        media_id: media_id,
        pro_type: pro_type,
        episode_id: episodeId,
        definition: definition,
        content_type: content_type,
        episode: episode
      }
      const body = Object.assign({}, params , messageObj )
      this.injectorMediaUploadVideoInfo( body );
      this.db.delete(fileName);
    },
    async handelDelete(filename) {
      this.db.delete(filename);
      this.unusual_program = await this.db.getAll();
    },
    async onFileAdded() {
      this.panelShow = true;
    },
    filesAdded() {},
    filesSubmitted() {},
    onFileError() {},
    change() {},
  },
};
</script>

<style scoped lang="scss">
.global-uploader {
  position: fixed;
  z-index: 20;
  right: 15px;
  bottom: 15px;
  transition: all 0.2s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translateY(115%);
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;

  .uploader-app {
    width: 520px;
  }
  .hint {
    background: #fff7dd;
    padding: 10px;
    font-size: 12px;
  }
  .file-panel {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 7px 7px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .file-title {
      display: flex;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px solid #ddd;

      .operate {
        flex: 1;
        text-align: right;
      }
    }

    .file-list {
      position: relative;
      height: 240px;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #fff;
      padding: 0;

      > li {
        background-color: #fff;
      }
    }

    &.collapse {
      .file-title {
        background-color: #e7ecf2;
      }
    }
  }

  .no-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
  ::v-deep .uploader-file-info {
    font-size: 12px;
  }
  ::v-deep .uploader-file[status="success"] {
    background: #e2eeff;
  }

  ::v-deep .uploader-file-icon {
    &:before {
      content: "" !important;
    }

    &[icon="image"] {
      background: url(../../assets/images/image-icon.png);
    }
    &[icon="video"] {
      background: url(../../assets/images/video-icon.png);
    }
    &[icon="unknown"] {
      background: url(../../assets/images/video-icon.png);
    }
    &[icon="document"] {
      background: url(../../assets/images/text-icon.png);
    }
  }

  ::v-deep .uploader-file-actions > span {
    margin-right: 6px;
  }
  ::v-deep .uploader-file-actions {
    .uploader-file-pause,
    .uploader-file-resume {
      display: none;
    }
  }
  ::v-deep .uploader-file-status {
    span:last-child {
      i {
        display: none;
      }
    }
  }
}
.show.global-uploader {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translateY(0);
}
.dot {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background: #1890ff;
  position: absolute;
  top: -80px;
  right: 15px;
}

/* 隐藏上传按钮 */
.global-uploader-btn {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
::v-deep .el-drawer__header {
  margin-bottom: 0px;
  padding-left: 10px;
  padding-right: 5px;
  color: #303133;
  span:focus {
    outline: none;
  }
}
.ul-box {
  padding-left: 7px;
  padding-right: 7px;
  height: 270px;
  overflow-y: auto;
  li {
    line-height: 20px;
    height: 20px;
    font-size: 12px;
    color: #606266;
    .overflow-hidden {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 270px;
      display: inline-block;
    }
    .cursor-pointer {
      cursor: pointer;
    }
  }
}
</style>
