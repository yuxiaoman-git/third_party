<template>
  <div style="display: flex; flex-flow: wrap">
    <div class="img-box" v-for="(item, i) in give" :key="i">
      <uploadImage v-model="item.url" v-if="item.url" />
    </div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :http-request="uploadSectionFile"
      accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .PBG, .GIF"
      multiple
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus avatar-uploader-icon" v-loading="loading"></i>
    </el-upload>
  </div>
</template>

<script>
import { Global } from "@/utils/myPublic";
import OSS from "ali-oss";
import uploadImage from "@/components/uploadImage";

export default {
  name: "multipleUploadImage",
  components: {
    uploadImage,
  },
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
      client: null,
      folder: `images/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
    };
  },
  methods: {
    async beforeAvatarUpload() {
      this.loading = true;
      const res = await this.$store.dispatch("user/injectorOssGetToken", {
        time: new Date(),
      });
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
        this.client = new OSS(ossConfig);
      }
      return true;
    },
    async uploadSectionFile(params) {
      const file = params.file;
      if (!this.client) {
        return;
      }
      this.loading = true;
      const result = await this.client.put(`${this.folder}/${file.name}`, file);
      this.loading = false;
      this.give.push({
        url: result.url,
      });
      // this.$emit("returnBack", result.url);
      // this.give = result.url;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.img-box {
  // display: flex;
  > div {
    margin-right: 7px;
  }
}
</style>