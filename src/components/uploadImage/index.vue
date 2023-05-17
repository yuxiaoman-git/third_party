<template>
  <div>
    <el-upload
      :class="['avatar-uploader', view ? '' : 'upload-hover']"
      action="#"
      :disabled="view"
      :show-file-list="false"
      :http-request="uploadSectionFile"
      :before-upload="beforeAvatarUpload"
      accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .PBG, .GIF"
    >
      <div
        class="poster"
        :style="{ width: width, height: height }"
        v-if="give"
        v-loading="loading"
        @mouseleave="handelMouseleave"
      >
        <el-image
          style="width: 100%; height: 100%"
          :src="`${give}?x-oss-process=image/resize,m_lfit,h_${parseInt(
            height
          )},w_${parseInt(width)}`"
          fit="contain"
        ></el-image>
        <span
          @click.stop="handlePreview"
          @mouseleave="mouseleave"
          @mousemove="mousemove"
          class="MaterialModalButton_preview__16ilD"
          :class="[opacity_0 ? 'opacity_0' : '']"
          >预览</span
        >
        <span class="DeleteIcon_delete__1gtI_" v-if="!view">
          <i class="el-icon-close" @click.stop.prevent="handleRemove"></i>
        </span>
      </div>
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
        :style="{ width: width, height: height }"
        v-loading="loading"
      ></i>
    </el-upload>
    <el-image-viewer
      class="image-viewer"
      v-if="fileimage"
      :on-close="onClose"
      :url-list="[give]"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { Global, getImageSize } from "@/utils/myPublic";
import { getFileMD5 } from "./js/getFileMD5";
import { accDiv, accAdd, Subtr } from "@/filters";
import OSS from "ali-oss";

export default {
  name: "uploadImage",
  components: { ElImageViewer },

  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: String,
      default: () => {
        return "";
      },
    },
    view: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    width: {
      type: String,
      default: () => {
        return "60px";
      },
    },
    height: {
      type: String,
      default: () => {
        return "60px";
      },
    },
    imgType: {
      type: String,
      default: () => {
        return "";
      },
    },
    action: {
      type: String,
      default: () => {
        return `images/${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`;
      },
    },
    maxSize: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  watch: {
    give: {
      async handler(n) {
        const res = await getImageSize(n);
        this.$emit("getSize", res && res.size);
      },
    },
  },
  data() {
    return {
      opacity_0: false,
      fileimage: false,
      loading: false,
      imgMap: {
        horizontal: {
          //横图
          minRatio: Subtr(1.77, 0.01),
          maxRatio: accAdd(1.77, 0.01),
          minWidth: 720,
          ratioMsg: "请上传宽高比16:9，尺寸不能小于720像素的图片",
        },
        vertical: {
          minRatio: Subtr(0.72, 0.01),
          maxRatio: accAdd(0.72, 0.01),
          minWidth: 540,
          ratioMsg: "请上传宽高比13:18，尺寸不能小于540像素的图片",
        }, //竖图
        auto: {},
      },
    };
  },
  methods: {
    handelMouseleave() {
      this.opacity_0 = false;
    },
    mouseleave() {
      this.opacity_0 = true;
    },
    mousemove() {
      this.opacity_0 = false;
    },
    triggerCheck(val) {
      this.dispatch("ElFormItem", "el.form.change", [val]);
    },
    handleRemove() {
      this.$emit("returnBack", "");
      this.triggerCheck("");
    },
    onClose() {
      this.fileimage = false;
    },
    handlePreview() {
      this.fileimage = true;
    },
    getExtendName(fileName) {
      const index = fileName.lastIndexOf(".");
      if (index > -1) {
        return fileName.substring(index);
      }
      return "";
    },
    async uploadSectionFile(params) {
      const file = params.file;
      const fileName = (await getFileMD5(file)) + this.getExtendName(file.name);
      this.loading = true;
      const res = await this.$store.dispatch("user/injectorOssGetToken", {});
      this.loading = false;
      if (res && res.code === 0) {
        const Credentials = res.data && res.data.Credentials;
        const ossConfig = {
          region: Global.region,
          bucket: Global.bucket,
          accessKeyId: Credentials.AccessKeyId,
          accessKeySecret: Credentials.AccessKeySecret,
          stsToken: Credentials.SecurityToken,
        };
        const client = new OSS(ossConfig);
        const result = await client.put(`${this.action}/${fileName}`, file);
        this.$emit("returnBack", decodeURI(result.url));
        this.triggerCheck(decodeURI(result.url));
      }
    },
    checkImage(imgWidth, imgHeight) {
      if (!this.imgType) {
        //不校验
        return true;
      }
      let minWidth, minRatio, maxRatio, ratioMsg;
      const ratio = accDiv(imgWidth, imgHeight).toFixed(2);
      if (this.imgType == "auto") {
        if (ratio < 1) {
          //校验竖图的宽高比
          ({ minWidth, minRatio, maxRatio, ratioMsg } =
            this.imgMap["vertical"]);
        }
        if (ratio >= 1) {
          //校验横图的宽高比
          ({ minWidth, minRatio, maxRatio, ratioMsg } =
            this.imgMap["horizontal"]);
        }
      } else if (this.imgType) {
        //校验
        ({ minWidth, minRatio, maxRatio, ratioMsg } =
          this.imgMap[this.imgType]);
      }
      if (imgWidth < minWidth) {
        this.$message.error(ratioMsg);
        return false;
      }
      if (ratio < minRatio || ratio > maxRatio) {
        this.$message.error(ratioMsg);
        return false;
      }
      return true;
    },
    beforeAvatarUpload(file) {
      const that = this
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
          const data = e.target.result;
          const res = await getImageSize(data);
          const { width, height } = res || {};
          if (this.checkImage(width, height)) {
            that.$emit('getFileSize', file && file.size)
            const fileSize = file && file.size || 0
            if (that.imgType && that.maxSize && fileSize / 1024 / 1024 > that.maxSize ) {
              this.$message.error(`图片大小不能超过${that.maxSize}M`)
              reject();
            }
            resolve();
          } else {
            reject();
          }
        };
      });
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-viewer {
  ::v-deep .el-icon-circle-close {
    color: #fff;
  }
}
::v-deep .avatar-uploader {
  display: flex;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  &.upload-hover .el-upload:hover {
    border-color: #409eff;
  }
  .el-loading-spinner {
    height: 42px;
  }
}

::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.poster {
  position: relative;
  width: 60px;
  height: 60px;
  .DeleteIcon_delete__1gtI_ {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 18px;
    height: 18px;
    background: #e6f9ff;
    z-index: 70;
    padding: 0 2px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    -moz-border-radius: 0 3px 0 12px;
    border-radius: 0 3px 0 12px;
  }
}

.poster:hover {
  .MaterialModalButton_preview__16ilD {
    opacity: 1;
  }
  .opacity_0 {
    opacity: 0;
  }
}
.MaterialModalButton_preview__16ilD {
  display: -webkit-inline-flex;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate(-50%);
  -moz-transform: translate(-50%);
  -ms-transform: translate(-50%);
  transform: translate(-50%);
  z-index: 10;
  white-space: nowrap;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 100%;
  height: 20px;
  opacity: 0;
}
</style>

