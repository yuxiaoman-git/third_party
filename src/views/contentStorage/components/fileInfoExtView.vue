<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      v-loading="loading"
      @submit.native.prevent
    >
      <el-form-item label="名称" prop="name">
        <span>{{ ruleForm.name }}</span>
      </el-form-item>
      <el-form-item label="媒体竖图" prop="media_verpic">
        <span slot="label">
          <span>媒体竖图</span>
          <div style="line-height: 1" v-show="ver_size">{{ ver_size }}</div>
        </span>
        <uploadImage
          img-type="vertical"
          :view="true"
          @getSize="(data) => getSize('ver_size', data)"
          v-model="ruleForm.media_verpic"
        ></uploadImage>
      </el-form-item>
      <el-form-item label="媒体横图" prop="media_horpic">
        <span slot="label">
          <span>媒体横图</span>
          <div style="line-height: 1" v-show="hor_size">{{ hor_size }}</div>
        </span>
        <uploadImage
          img-type="horizontal"
          :view="true"
          v-model="ruleForm.media_horpic"
          @getSize="(data) => getSize('hor_size', data)"
        ></uploadImage>
      </el-form-item>
      <el-form-item label="影片等级" prop="MediaRating">
        <span>{{ ruleForm.MediaRating }}</span>
      </el-form-item>
      <el-form-item label="看点" prop="focus">
        <span>{{ ruleForm.focus }}</span>
      </el-form-item>
      <el-form-item label="审批号" prop="approval_num">
        <span>{{ ruleForm.approval_num }}</span>
      </el-form-item>
      <el-form-item label="更新频率" prop="update_frequency">
        <span>{{ ruleForm.update_frequency }}</span>
      </el-form-item>
      <el-form-item label="报备id" prop="report_id">
        <span>{{ ruleForm.report_id }}</span>
      </el-form-item>
      <el-form-item label="抢注工单id" prop="prior_cdn_id">
        <span>{{ ruleForm.prior_cdn_id }}</span>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="submitEdit('ruleForm', 'done')"
          >完 成</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadImage from "@/components/uploadImage";
import { MediaRating } from "@/utils/getOptions";
const ruleForm = {
  id: "",
  name: null,
  media_verpic: "",
  media_horpic: "",
  pro_type: null,
  MediaRating: null,
  focus: "",
  approval_num: "",
};
export default {
  name: "fileInfoExt",
  components: {
    uploadImage,
  },
  props: {
    onSuccess: {
      type: Function,
    },
  },
  data() {
    return {
      ruleForm: Object.assign({}, ruleForm),
      loading: false,
      rules: {},
      ver_size: "",
      hor_size: "",
    };
  },
  methods: {
    getSize(type, data) {
      this[type] = data;
    },
    //详情
    async injectorMediaExtDetail(id) {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
      const body = {
        media_id: id,
      };
      this.loading = true;
      const res = await this.$store.dispatch(
        "injector/injectorMediaExtDetail",
        body
      );
      this.loading = false;
      this.ruleForm = Object.assign({}, ruleForm);
      if (res && res.code === 0) {
        const data = res.data || {};
        this.ruleForm.id = data.id;
        this.ruleForm.name = data.media && data.media.name;
        this.ruleForm.media_verpic = data.media_verpic ? data.media_verpic : data.media_verpic1;
        this.ruleForm.media_horpic = data.media_horpic ? data.media_horpic : data.media_horpic1;
        const [ratingObj] = MediaRating.filter((e) => e.value == data.rating);
        this.ruleForm.MediaRating = ratingObj && ratingObj.label;
        this.ruleForm.focus = data.focus;
        this.ruleForm.approval_num = data.approval_num || "";
        this.ruleForm.update_frequency = data.update_frequency || "";
        this.ruleForm.report_id = data.report_id || "";
        this.ruleForm.prior_cdn_id = data.prior_cdn_id || "";
      }
    },
    submitEdit(formName, step) {
      return new Promise((resolve) => {
        resolve(true);
        if (step) {
          this.onSuccess &&
            this.onSuccess({
              next: step,
            });
        }
      });
    },
  },
};
</script>

<style>
</style>
