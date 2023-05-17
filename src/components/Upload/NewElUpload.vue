<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :http-request="uploadSectionFile"
    >
      <i
        class="el-icon-plus avatar-uploader-icon"
        :style="{ width: width, height: height }"
      ></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
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
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed() {},
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getExtendName(filename) {
      if (typeof filename == "string") {
        // 如果文件没有后缀名，返回null
        if (!filename.includes(".")) {
          return "";
        }
        return "." + filename.split(".").pop().toLowerCase();
      } else {
        throw new Error("filename must be a string type");
      }
    },
    async uploadSectionFile() {},
  },
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader {
  // display: flex;
  width: 360px;
  line-height: 100%;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .el-loading-spinner {
    height: 42px;
  }
  .el-upload-list__item:first-child {
    margin-top: 7px;
  }
}

::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

