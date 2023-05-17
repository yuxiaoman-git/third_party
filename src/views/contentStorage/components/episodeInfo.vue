<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      v-loading="loading"
      @submit.native.prevent
    >
      <el-form-item label="媒体" prop="name">
        <SelectItmeRemote
          width="60%"
          type="checkMovie"
          remote
          disabled
          v-model="ruleForm.name"
        />
      </el-form-item>
      <el-form-item label="分集标题" prop="title">
        <el-input
          type="textarea"
          style="width: 60%"
          v-model="ruleForm.title"
          placeholder="分集标题"
          maxlength="128"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="第几集">
        <el-input
          type="text"
          v-model="ruleForm.serial_num"
          v-enter-number="0"
          disabled
          placeholder="第几集"
          style="width: 60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="海报" prop="episode_horpic">
        <span slot="label">
          <span>海报</span>
          <div style="line-height: 1" v-show="ver_size">{{ ver_size }}</div>
        </span>
        <uploadImage
          @getSize="getSize"
          v-model="ruleForm.episode_horpic"
          img-type="horizontal"
        ></uploadImage>
      </el-form-item>
      <el-form-item label="简介" prop="storyline">
        <el-input
          type="textarea"
          placeholder="简介"
          v-model.trim="ruleForm.storyline"
          maxlength="128"
          show-word-limit
          style="width: 60%"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="submitEdit('ruleForm', 'third')"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadImage from "@/components/uploadImage";
import SelectItmeRemote from "@/components/SelectItmeRemote";
const ruleForm = {
  name: null,
  title: "",
  storyline: "",
  id: "",
  serial_num: "",
  episode_horpic: "",
};
export default {
  name: "episodeInfo",
  components: {
    uploadImage,
    SelectItmeRemote,
  },
  props: {
    onSuccess: {
      type: Function,
    },
  },
  data() {
    return {
      ver_size: "",
      ruleForm: Object.assign({}, ruleForm),
      rules: {
        episode_horpic: [
          { required: true, message: "请输入海报", trigger: "change" },
        ],
        storyline: [
          { required: true, message: "请输入简介", trigger: "change" },
        ],
      },
      loading: false,
      initBody: null,
    };
  },
  methods: {
    getSize(data) {
      this.ver_size = data;
    },
    async imdbEpisodeDetail(episode_id) {
      const body = {
        episode_id,
      };
      this.loading = true;
      const res = await this.$store.dispatch(
        "injector/imdbEpisodeDetail",
        body
      );
      this.loading = false;
      this.ruleForm = Object.assign({}, ruleForm);
      if (res && res.code === 0) {
        const data = res.data || {};
        this.ruleForm.id = data.id;
        this.ruleForm.name = {
          value: data.media.id,
          label: data.media.name,
        };
        this.ruleForm.serial_num = data.serial_num;
        this.ruleForm.episode_horpic = data.episode_horpic;
        this.ruleForm.storyline = data.storyline;
        this.ruleForm.title = data.title;
        this.initBody = this.getBody();
      }
    },
    getBody() {
      return {
        media_id: this.ruleForm.name && this.ruleForm.name.value,
        serial_num: this.ruleForm.serial_num,
        episode_horpic: this.ruleForm.episode_horpic,
        storyline: this.ruleForm.storyline,
        episode_id: this.ruleForm.id,
        title: this.ruleForm.title,
      };
    },
    isEqually(obj1, obj2) {
      for (const k in obj1) {
        if (obj1[k] !== obj2[k]) {
          return false;
        }
      }
      return true;
    },
    submitEdit(formName, step) {
      return new Promise((resolve) => {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const body = this.getBody();
            if (!this.isEqually(this.initBody, body)) {
              this.imdbEditEpisode(
                Object.assign(body, { horpic_size: this.ver_size })
              );
            }
            if (step) {
              this.onSuccess &&
                this.onSuccess({
                  next: step,
                });
            }
            resolve(true);
          }
        });
      });
    },
    async imdbEditEpisode(body) {
      await this.$store.dispatch("injector/imdbEditEpisode", body);
    },
  },
};
</script>

<style>
</style>