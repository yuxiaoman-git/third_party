<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      v-loading="loading"
      @submit.native.prevent
    >
      <el-form-item label="名称" prop="name">
        <SelectItmeRemote
          width="60%"
          type="checkMovie"
          remote
          v-model="ruleForm.name"
        />
      </el-form-item>
      <el-form-item label="媒体编码格式" prop="format">
        <SelectItme
            type="MediaCodingFormat"
            v-model="ruleForm.format"
            width="60%"
        />
      </el-form-item>
      <el-form-item label="尺寸限制" prop="is_charge">
        <el-radio-group v-model="sizeLimit" @change="sizeLimitChange()">
          <el-radio :label="1">限制尺寸</el-radio>
          <el-radio :label="2">原图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="媒体竖图" prop="media_verpic">
        <span slot="label">
          <span>媒体竖图</span>
          <div style="line-height: 1" v-show="ver_size">{{ ver_size }}</div>
        </span>
        <uploadImage
          :img-type="vertical_"
          :maxSize="10"
          @getSize="(data) => getSize('ver_size', data)"
          @getFileSize="(data) => getFileSize('len1', data)"
          v-model="ruleForm.media_verpic"
        ></uploadImage>
      </el-form-item>
      <el-form-item label="媒体横图" prop="media_horpic">
        <span slot="label">
          <span>媒体横图</span>
          <div style="line-height: 1" v-show="hor_size">{{ hor_size }}</div>
        </span>
        <uploadImage
          :img-type="horizontal_"
          :maxSize="10"
          v-model="ruleForm.media_horpic"
          @getSize="(data) => getSize('hor_size', data)"
          @getFileSize="(data) => getFileSize('len2', data)"
        ></uploadImage>
      </el-form-item>
      <el-form-item label="影片等级" prop="MediaRating">
        <SelectItme
          type="MediaRating"
          v-model="ruleForm.MediaRating"
          width="60%"
        />
      </el-form-item>
      <el-form-item label="看点" prop="focus">
        <el-input
          type="textarea"
          placeholder="看点"
          v-model.trim="ruleForm.focus"
          maxlength="85"
          show-word-limit
          style="width: 60%"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="审批号" prop="approval_num">
        <el-input
          placeholder="审批号"
          v-model.trim="ruleForm.approval_num"
          style="width: 60%"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="更新频率" prop="update_frequency">
        <el-input
          placeholder="更新频率"
          v-model.trim="ruleForm.update_frequency"
          maxlength="50"
          show-word-limit
          style="width: 60%"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="报备id" prop="report_id">
        <el-input
          placeholder="报备id"
          v-model.trim="ruleForm.report_id"
          maxlength="50"
          show-word-limit
          style="width: 60%"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="抢注工单id" prop="prior_cdn_id">
        <el-input
          placeholder="抢注工单id"
          v-model.trim="ruleForm.prior_cdn_id"
          maxlength="50"
          show-word-limit
          style="width: 60%"
        >
        </el-input>
      </el-form-item>

      <!-- <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="submitEdit('ruleForm', 'done')"
          >完成</el-button
        >
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import SelectItmeRemote from "@/components/SelectItmeRemote/index";
import SelectItme from "@/components/SelectItme/select.vue";
import uploadImage from "@/components/uploadImage";
const ruleForm = {
  id: "",
  name: null,
  media_verpic: "",
  media_horpic: "",
  pro_type: null,
  MediaRating: "",
  format: 1,
  focus: "",
  approval_num: "",
  update_frequency: "",
  report_id: "",
  prior_cdn_id: "",
};
export default {
  name: "fileInfoExtend",
  components: {
    SelectItmeRemote,
    SelectItme,
    uploadImage,
  },
  props: {
    onSuccess: {
      type: Function,
    },
    mediaId: {
      type: Number,
    },
  },
  data() {
    return {
      ruleForm: Object.assign({}, ruleForm),
      loading: false,
      rules: {
        name: [{ required: true, message: "请选择名称", trigger: "blur" }],
        media_verpic: [
          { required: true, message: "请选择图片", trigger: "change" },
        ],
        media_horpic: [
          { required: true, message: "请选择图片", trigger: "change" },
        ],
        pro_type: [
          { required: true, message: "请选择版本", trigger: "change" },
        ],
        MediaRating: [
          { required: true, message: "请选择影片等级", trigger: "change" },
        ],
        format: [
          { required: true, message: "请选择媒体编码格式", trigger: "change" },
        ],
        focus: [{ required: true, message: "请输入看点", trigger: "blur" }],
      },
      initBody: null,
      ver_size: "",
      hor_size: "",
      ver_fileSize: "",
      hor_fileSize: "",
      sizeLimit: null,
      vertical_: 'vertical',
      horizontal_: 'horizontal',
      imgObj: {},
    };
  },
  watch:{
    sizeLimit(val) {
      if (val == 1) {
        this.ruleForm.media_verpic = this.imgObj.media_verpic;
        this.ruleForm.media_horpic = this.imgObj.media_horpic;
      } else {
        this.ruleForm.media_verpic = this.imgObj.media_verpic1;
        this.ruleForm.media_horpic = this.imgObj.media_horpic1;
      }
    }
  },
  mounted() {
    this.injectorMediaExtDetail();
  },
  methods: {
    getSize(type, data) {
      this[type] = data;
    },
    getFileSize(type, data) {
      this[type] = data;
    },
    //详情
    async injectorMediaExtDetail() {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
      const body = {
        media_id: this.mediaId,
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
        if (data.media) {
          this.ruleForm.name = Object.assign(
            {
              value: data.media.id,
              label: data.media.name,
            },
            data.media
          );
        }
        // this.ruleForm.media_verpic = data.media_verpic;
        // this.ruleForm.media_horpic = data.media_horpic;
        this.imgObj = data;
        this.ruleForm.MediaRating = data.rating || "";
        this.ruleForm.focus = data.focus;
        this.ruleForm.approval_num = data.approval_num || "";
        this.ruleForm.format = data.format || 1;
        this.ruleForm.update_frequency = data.update_frequency || '';
        this.ruleForm.report_id = data.report_id || '';
        this.ruleForm.prior_cdn_id = data.prior_cdn_id || '';
        this.initBody = this.getBody();
        this.initBody.verpic_size = data.verpic_size;
        this.initBody.horpic_size = data.horpic_size;
        this.initBody.type = data.type ? data.type : 1;
        this.sizeLimit = data.type ? data.type : 1;
        this.len1 = data.len1 || 0;
        this.len2 = data.len2 || 0;
        this.sizeLimitChange()
      }
    },
    getBody() {
      return {
        media_id: this.ruleForm.name && this.ruleForm.name.value,
        media_verpic: this.ruleForm.media_verpic,
        media_horpic: this.ruleForm.media_horpic,
        rating: this.ruleForm.MediaRating || undefined,
        focus: this.ruleForm.focus,
        approval_num: this.ruleForm.approval_num,
        format: this.ruleForm.format,
        verpic_size: this.ver_size,
        horpic_size: this.hor_size,
        len1: this.len1,
        len2: this.len2,
        type: this.sizeLimit,
        update_frequency: this.ruleForm.update_frequency,
        report_id: this.ruleForm.report_id,
        prior_cdn_id: this.ruleForm.prior_cdn_id,
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
    submitEdit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const body = this.getBody();
          console.log(body)
          if (!this.isEqually(this.initBody, body)) {
            this.injectorMediaEditMediaExtField(body);
          } else {
            this.onSuccess && this.onSuccess(true);
          }
        }
      });
    },
    async injectorMediaEditMediaExtField(body) {
      this.$emit("on-loading", true);
      const res = await this.$store.dispatch(
        "injector/injectorMediaEditMediaExtField",
        body
      );
      this.$emit("on-loading", false);
      if (res && res.code === 0) {
        this.$message.success("修改成功");
        this.onSuccess && this.onSuccess(true);
      }
    },
    sizeLimitChange () {
      if (this.sizeLimit == 1) {
        this.vertical_ = 'vertical'
        this.horizontal_ = 'horizontal'
      } else {
        this.vertical_ = ''
        this.horizontal_ = ''
      }
    }
  },
};
</script>

<style>
</style>
