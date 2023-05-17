<template>
  <div>
    <el-dialog
      title="设置权利"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      width="800px"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="ruleForm"
        label-width="80px"
      >
        <el-form-item label="授权权利" class="flex-width mb-0" prop="power">
          <SelectItme
            type="power"
            v-model="ruleForm.power"
            el="checkbox"
            :tab="tab"
            multiple
          />
        </el-form-item>
        <el-form-item label="授权方式" prop="solo" class="flex-width mb-0">
          <SelectItme type="solo" el="radio" v-model="ruleForm.solo" />
        </el-form-item>
        <el-form-item
          label="运营商"
          prop="opes"
          class="flex-width mb-0"
          v-if="tab === 'IPTV' || tab === 'SOTT'"
        >
          <SelectItme
            type="opes"
            multiple
            el="checkbox"
            v-model="ruleForm.opes"
          />
        </el-form-item>
        <el-form-item label="终端" prop="term" class="flex-width mb-0">
          <SelectItme
            type="term"
            multiple
            el="checkbox"
            :platform="platform"
            v-model="ruleForm.term"
          />
        </el-form-item>
        <el-divider content-position="left" class="divider"
          ><i class="font-weight">合作权利</i></el-divider
        >
        <el-form-item label="转授权" prop="subs" class="flex-width-33">
          <SelectItme type="subs" v-model="ruleForm.subs" width="100%" />
        </el-form-item>
        <el-form-item label="维权" prop="gard" class="flex-width-33">
          <SelectItme type="gard" v-model="ruleForm.gard" width="100%" />
        </el-form-item>
        <el-form-item label="允许下载" prop="usge" class="flex-width-33">
          <SelectItme type="usge" v-model="ruleForm.usge" width="100%" />
        </el-form-item>
        <el-form-item label="VIP付费" prop="vip" class="flex-width-33">
          <SelectItme type="vip" v-model="ruleForm.vip" width="100%" />
        </el-form-item>
        <el-form-item label="附加权" prop="adds" class="flex-width-33 flex-1">
          <SelectItme type="adds" v-model="ruleForm.adds" width="100%" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="handelSave('ruleForm')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme";
export default {
  components: { SelectItme },
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    tab: {
      type: String,
      default() {
        return "";
      },
    },
    platform: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    give: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.give;
      },
      set(val) {
        this.$emit("returnBack", val);
      },
    },
    ruleForm: {
      get() {
        return this.form;
      },
    },
  },
  data() {
    return {
      rules: {
        // regp: [{ required: true, message: "请选择", trigger: "change" }],
        power: [{ required: true, message: "请选择", trigger: "change" }],
        solo: [{ required: true, message: "请选择", trigger: "change" }],
        subs: [{ required: true, message: "请选择", trigger: "change" }],
        gard: [{ required: true, message: "请选择", trigger: "change" }],
        term: [{ required: true, message: "请选择", trigger: "change" }],
        usge: [{ required: true, message: "请选择", trigger: "change" }],
        vip: [{ required: true, message: "请选择", trigger: "change" }],
        adds: [{ required: true, message: "请选择", trigger: "change" }],
        opes: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  mounted() {},
  methods: {
    handelSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$emit("getRightForm", this.ruleForm);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .divider {
  margin: 20px 0 24px 0;
  .font-weight {
    font-weight: bold;
  }
}
::v-deep .ruleForm {
  display: flex;
  flex-wrap: wrap;
  .flex-width {
    flex: 0 1 50%;
  }
  .flex-width-33 {
    flex: 0 0 33.33%;
  }
  .flex-1 {
    flex: 1;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .el-form-item__label {
    font-weight: 500;
  }
}
</style>
