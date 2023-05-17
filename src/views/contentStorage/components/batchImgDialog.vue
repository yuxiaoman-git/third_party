<template>
  <div>
    <el-alert
      title="温馨提示"
      type="warning"
      :closable="false"
      show-icon
    >
      <template slot='title'>
        <div class="iconSize">温馨提示：单张图形式：选中图片的文件夹，默认选取第一张，填写要批量导入的分集区间。</div>
        <div class="iconSize" style="margin-left: 65px;">多张图形式：图片以分集序号来命名，例如：1.jpg。2、选中要导入图片得文件夹</div>
      </template>
    </el-alert>
    <el-form
      class="app-container"
      :model="elForm"
      :rules="elRule"
      ref="ruleForm"
      label-width="80px"
    >
      <el-form-item label="媒体名称" prop="mediaObj">
        <SelectItmeRemote
          width="100%"
          type="checkMovie"
          remote
          v-model="elForm.mediaObj"
          @change="onchange"
        />
      </el-form-item>
      <el-form-item label="更新方式" prop="is_charge">
        <el-radio-group v-model="elForm.mode">
          <el-radio
            label="mul">多张图</el-radio>
          <el-radio
            label="one">一张图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分集" v-if="elForm.mode == 'one'">
        <div style="width: 45%">
          <span>从第</span>
          <el-input
            type="text"
            v-model="elForm.start_serial_num"
            v-enter-number="0"
            size="mini"
            style="width: 60px; margin: 0 4px"
          ></el-input>
          <span>集到第</span>
          <el-input
            type="text"
            v-model="elForm.end_serial_num"
            v-enter-number="0"
            size="mini"
            style="width: 60px; margin: 0 4px"
          ></el-input>
          <span>集</span>
        </div>
      </el-form-item>
      <el-form-item label="海报" v-if="(elForm.mode == 'one' && elForm.start_serial_num != 0 && elForm.end_serial_num != 0) || elForm.mode == 'mul'">
        <div class="poster" @click="handelSelect">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <input
          type="file"
          ref="inputFile"
          style="
            z-index: -2;
            position: absolute;
            width: 0;
            height: 0;
            clip: rect(0, 0, 0, 0);
          "
          @change="triggerFile($event)"
          webkitdirectory
        />
      </el-form-item>
      <el-table :data="fileList" border>
        <el-table-column prop="episode_num" width="80" label="分集序号" />
        <el-table-column prop="episode_id" width="80" label="分集ID" />
        <el-table-column prop="name" width="130" label="文件名" />
        <el-table-column prop="size" width="130" label="尺寸" />
        <el-table-column prop="msg" label="校验结果" min-width="180">
          <template slot-scope="{ row }">
            <ul v-if="row.msg !== 'ok' || !row.episode_id" class="color-error">
              <li v-if="row.msg !== 'ok'">{{ row.msg }}</li>
              <li v-if="!row.episode_id">未匹配到分集ID</li>
            </ul>
            <i v-else class="el-icon-check el-icon-success light"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import uploadImage from "@/components/uploadImage";

import SelectItmeRemote from "@/components/SelectItmeRemote";
import { Global, getImageSize } from "@/utils/myPublic";
import { getFileMD5 } from "@/components/uploadImage/js/getFileMD5";
import { accDiv, accAdd, Subtr } from "@/filters";
import OSS from "ali-oss";
export default {
  components: {
    SelectItmeRemote,
    uploadImage,
  },
  data() {
    return {
      elForm: {
        mode: "mul",
        start_serial_num: '',
        end_serial_num: '',
      },
      elRule: {
        mediaObj: [{ required: true, message: "请选择", trigger: "change" }],
      },
      episodeList: [],
      fileList: [],
      action: `images/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
      imgType: "horizontal",
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
    checkImage(imgWidth, imgHeight) {
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
        // this.$message.error(ratioMsg);
        return ratioMsg;
      }
      if (ratio < minRatio || ratio > maxRatio) {
        // this.$message.error(ratioMsg);
        return ratioMsg;
      }
      return "ok";
    },
    getSize(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
          const data = e.target.result;
          const res = await getImageSize(data);
          const { width, height } = res || {};
          resolve({
            width,
            height,
          });
        };
      });
    },
    getFileName(filename) {
      if (typeof filename == "string") {
        // 如果文件没有后缀名，返回null
        if (!filename.includes(".")) {
          return null;
        }
        return filename.split(".").shift();
      } else {
        throw new Error("filename must be a string type");
      }
    },
    getExt(filename) {
      if (typeof filename == "string") {
        // 如果文件没有后缀名，返回null
        if (!filename.includes(".")) {
          return null;
        }
        return "." + filename.split(".").pop().toLowerCase();
      } else {
        throw new Error("filename must be a string type");
      }
    },
    handelSelect() {
      if (this.elForm.start_serial_num * 1 > this.elForm.end_serial_num * 1) {
        return this.$message.error("开始集数不能大于结束集数");
      }
      this.$refs.inputFile && this.$refs.inputFile.click();
    },
    uploadFile(file, ossConfig) {
      return new Promise(async (resolve) => {
        const fileName = (await getFileMD5(file)) + this.getExt(file.name);
        const client = new OSS(ossConfig);
        const result = await client.put(`${this.action}/${fileName}`, file);
        resolve({ url: decodeURI(result.url) });
      });
    },
    getOssToken() {
      return new Promise((resolve) => {
        (async () => {
          const res = await this.$store.dispatch(
            "user/injectorOssGetToken",
            {}
          );
          if (res.code === 0) {
            const Credentials = res.data && res.data.Credentials;
            const ossConfig = {
              region: Global.region,
              bucket: Global.bucket,
              accessKeyId: Credentials.AccessKeyId,
              accessKeySecret: Credentials.AccessKeySecret,
              stsToken: Credentials.SecurityToken,
            };
            resolve(ossConfig);
          }
        })();
      });
    },
    async triggerFile(event) {
      const file = event.target.files;
      this.fileList = [];
      if (this.elForm.mode == 'one') {
        const e = file[0]
        const r = await this.getSize(e);
        const msg = this.checkImage(r.width, r.height);
        for (let i = Number(this.elForm.start_serial_num); i <= Number(this.elForm.end_serial_num); i++ ) {
          this.fileList.push({
            file: e,
            name: e.name,
            episode_num: i,
            size: `${r.width}x${r.height}`,
            msg: msg,
          });
        }
      } else {
        for (const e of file) {
          if (e.type.split('/')[0] != 'image') {
            break
          }
          const r = await this.getSize(e);
          const msg = this.checkImage(r.width, r.height);
          this.fileList.push({
            file: e,
            name: e.name,
            episode_num: this.getFileName(e.name),
            size: `${r.width}x${r.height}`,
            msg: msg,
          });
        }
      }
      this.setEpisodeId();
    },
    async onchange() {
      if (!(this.elForm.mediaObj && this.elForm.mediaObj.id)) {
        return;
      }
      const res = await this.$store.dispatch("injector/imdbSearchEpisode", {
        serial_num: "",
        media_id: this.elForm.mediaObj.id,
      });
      if (res.code === 0) {
        this.episodeList = res.data || [];
        this.setEpisodeId();
      }
    },
    setEpisodeId() {
      this.fileList.forEach((e) => {
        this.$set(e, "episode_id", undefined);
        this.episodeList.forEach((el) => {
          if (e.episode_num == el.serial_num) {
            this.$set(e, "episode_id", el.id);
          }
        });
      });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.fileList.length == 0) {
            return this.$message.error("请选择海报");
          }
          const flag = this.fileList.some(
            (e) => !e.episode_id || e.msg !== "ok"
          );
          if (flag) {
            return this.$message.error(
              "存在未匹配到分集Id或海报尺寸不符合规则，请检查"
            );
          }
          this.$emit("on-loading", true);
          const episodes = [];
          const ossConfig = await this.getOssToken();
          if (this.elForm.mode == 'one') {
            const { file, size } = this.fileList[0];
            console.log(this.fileList)
            const res = await this.uploadFile(file, ossConfig);
            for (let i = 0; i < this.fileList.length; i++) {
              const { episode_id } = this.fileList[i];
              episodes.push({
                id: episode_id,
                url: res.url,
                size: size,
              });
            }
          } else {
            for (let i = 0; i < this.fileList.length; i++) {
              const { file, episode_id, size } = this.fileList[i];
              const res = await this.uploadFile(file, ossConfig);
              episodes.push({
                id: episode_id,
                url: res.url,
                size: size,
              });
            }
          }
          this.imdb_bulk_episode_picture({
            episodes,
          });
        }
      });
    },
    async imdb_bulk_episode_picture(body) {
      const res = await this.$store.dispatch(
        "injector/imdb_bulk_episode_picture",
        body
      );
      this.$emit("on-loading", false);
      if (res.code === 0) {
        this.$message.success("操作成功");
        this.$emit("on-success");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.poster {
  position: relative;
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
  border-color: #409eff;
}
.color-error {
  color: #f56c6c;
}
.light {
  background-color: #f0f9eb;
  color: #67c23a;
}
</style>
