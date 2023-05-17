<template>
  <div>
    <el-form
      :model="form"
      label-width="120px"
      class="min-height-400 basicSet"
      ref="basicForm"
      :inline="true"
      :rules="rules"
    >
      <el-form-item label="版权文件名称" prop="document_name">
        <el-input
          v-model="form.document_name"
          placeholder="版权文件名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="授权链是否完整" prop="copyright_chain">
        <SelectItme
          width="100%"
          type="rightP_copyright_chain"
          v-model="form.copyright_chain"
        />
      </el-form-item>
      <el-form-item label="状态标签" prop="status_label">
        <SelectItme
          width="100%"
          type="rightP_status_label"
          multiple
          v-model="form.status_label"
        />
      </el-form-item>
      <el-form-item label="节目负责人" prop="program_owner">
        <el-input
          v-model="form.program_owner"
          placeholder="节目负责人"
        ></el-input>
      </el-form-item>
      <el-form-item label="签署公司" prop="buyer_company">
        <SelectItme
          width="100%"
          type="rightP_buyer_company"
          v-model="form.buyer_company"
        />
      </el-form-item>
      <el-form-item label="是否有龙标" prop="film_release_licence">
        <SelectItme
          width="100%"
          type="whether"
          v-model="form.film_release_licence"
        />
      </el-form-item>
      <el-form-item label="备注" style="display: block" prop="remark">
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.remark"
          placeholder="备注"
          style="width: 680px"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectItmeRemote from "@/components/SelectItmeRemote";
import SelectItme from "@/components/SelectItme";

export default {
  components: {
    SelectItmeRemote,
    SelectItme,
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      rules: {
        document_name: [
          { required: true, message: "请输入版权文件名称", trigger: "blur" },
        ],
        product_id: [
          { required: true, message: "请输入产品ID", trigger: "blur" },
        ],
        media_name: [
          {
            required: true,
            message: "未识别到正确的产品ID",
            trigger: "change",
          },
        ],
        program_owner: [
          { required: true, message: "请输入节目负责人", trigger: "blur" },
        ],
        copyright_chain: [
          {
            required: true,
            message: "请选择授权链是否完整",
            trigger: "change",
          },
        ],
        status_label: [
          { required: true, message: "请选择状态标签", trigger: "change" },
        ],
        buyer_company: [
          { required: true, message: "请选择签署公司", trigger: "change" },
        ],
        film_release_licence: [
          { required: true, message: "请选择是否有龙标", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    mediaInfo() {
      return this.form.media_name ? this.form.media_name.label : "";
    },
  },
  methods: {
    async getMedia() {
      if (this.form.product_id) {
        const res = await this.$store.dispatch("property/searchById", {
          product_id: this.form.product_id,
        });
        if (res.code === 0 && res.data.media) {
          this.form.media_name = {
            value: res.data.media.id,
            label: res.data.media.name,
          };
        } else {
          this.form.media_name = undefined;
          // this.$message.warning("未识别到对应节目");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.min-height-400 {
  min-height: 400px;
}
::v-deep .basicSet .el-form-item__content {
  width: 280px !important;
}
::v-deep .basicSet .el-date-editor.el-input {
  width: 280px;
}
</style>
