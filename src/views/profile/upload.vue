<template>
  <div>
    <input type="file" ref="file" @change="handelChange($event)" />
    <el-button @click="handelClick">提交</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    handelChange(e) {
      console.log(e.target.files[0]);
    },
    handelClick() {
      // console.log(this.$refs.file && this.$refs.file.files);
      const file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append("file", file);
      axios({
        method: "post",
        url: `http://192.168.1.64:8018/api/1/matrix/app?cmd=upload`,
        // url: `http://127.0.0.1:9999/files/app`,
        onUploadProgress: (progressEvent) => {
          console.log(
            progressEvent.loaded / progressEvent.total || 0,
            "progressEvent"
          );
          // this.progress = progressEvent.loaded / progressEvent.total || 0;
        },
        // headers: {
        //   Authorization: "mytoken",
        // },
        data: formData,
        // body: {
        //   platform: "win32",
        //   arch: "ia32",
        //   version: "1.0.0",
        // },
        // files: file,
      })
        .then((res) => {
          console.log(res, "res");
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>