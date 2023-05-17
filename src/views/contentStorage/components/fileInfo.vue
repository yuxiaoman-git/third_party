<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      v-loading="loading"
      label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="ruleForm.name" style="width: 60%"></el-input>
      </el-form-item>
      <el-form-item label="内容类型" prop="contentType">
        <SelectItme
          type="contentType"
          v-model="ruleForm.contentType"
          width="60%"
        />
      </el-form-item>
      <el-form-item label="版本" prop="pro_type">
        <SelectItme type="pro_type" v-model="ruleForm.pro_type" width="60%" />
      </el-form-item>
      <el-form-item label="清晰度" prop="definition">
        <SelectItme
          type="definition"
          v-model="ruleForm.definition"
          width="60%"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="injectorStorageEdit('ruleForm', 'four')"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
const ruleForm = {
  id: "",
  name: "",
  contentType: "",
  pro_type: "",
  definition: "",
};
export default {
  name: "fileInfo",
  components: {
    SelectItme,
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
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        contentType: [
          { required: true, message: "请选择内容类型", trigger: "change" },
        ],
        pro_type: [
          { required: true, message: "请选择版本", trigger: "change" },
        ],
        definition: [
          { required: true, message: "请选择清晰度", trigger: "change" },
        ],
      },
      initBody: null,
    };
  },
  methods: {
    //详情
    async injectorStorageDetail(id) {
      this.loading = true;
      const res = await this.$store.dispatch("injector/injectorStorageDetail", {
        storage_id: id,
      });
      this.loading = false;
      this.ruleForm = Object.assign({}, ruleForm);
      if (res && res.code === 0) {
        const data = res.data || {};
        this.ruleForm.id = data.id;
        this.ruleForm.name = data.name;
        this.ruleForm.contentType = data.content_type + "" || "";
        this.ruleForm.pro_type = data.pro_type || "";
        this.ruleForm.definition = data.definition || "";
        this.initBody = this.getBody();
      }
    },
    getBody() {
      return {
        storage_id: this.ruleForm.id,
        name: this.ruleForm.name,
        content_type: this.ruleForm.contentType,
        pro_type: this.ruleForm.pro_type,
        definition: this.ruleForm.definition,
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
    injectorStorageEdit(formName, step) {
      return new Promise((resolve) => {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const body = this.getBody();
            if (!this.isEqually(this.initBody, body)) {
              await this.$store.dispatch("injector/injectorStorageEdit", body);
            }
            resolve(true);
            if (step) {
              this.onSuccess &&
                this.onSuccess({
                  next: step,
                });
            }
          }
        });
      });
    },
  },
};
</script>

<style>
</style>