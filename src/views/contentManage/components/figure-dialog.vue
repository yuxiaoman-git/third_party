<template>
  <!-- 新增人物 -->
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    v-if="dialogVisible"
    :title="dialogType === 'edit' ? '修改艺术家' : '新增艺术家'"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      size="small"
      v-loading="loading"
    >
      <el-form-item label="名字" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          placeholder="名字"
          style="width: 60%"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="ruleForm.birthday"
          value-format="yyyy-MM-dd"
          type="date"
          style="width: 60%"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="职业">
        <SelectItme
          type="job"
          v-model="ruleForm.profession"
          multiple
          width="60%"
        />
      </el-form-item>
      <el-form-item label="性别">
        <SelectItme type="gender" v-model="ruleForm.gender" width="60%" />
      </el-form-item>
      <div style="text-align: right">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
const ruleForm = {
  name: "",
  birthday: "",
  birthplace: "",
  profession: [],
  gender: null,
};
export default {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    dialogType: {
      type: String,
      default() {
        return "";
      },
    },
    rowId: {
      type: [String, Number],
      default() {
        return "";
      },
    },
  },
  components: { SelectItme },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  data() {
    return {
      ruleForm: Object.assign({}, ruleForm),
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
      },
    };
  },
  mounted() {
    if (this.dialogType === "edit") {
      this.imdbCelebrityDetail();
    }
  },
  methods: {
    confirm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { name, birthday, gender } = this.ruleForm;
          const body = {
            name, //人物名               【必传】
            birthday, //出生日期 年-月-日    【必传】
            profession: this.ruleForm.profession.join("/"), //职业，多个以/分割       【非必传】
            gender:
              gender == "man" ? "男" : gender == "woman" ? "女" : undefined,
          };
          if (this.dialogType === "edit") {
            body.celebrity_id = this.ruleForm.id;
            this.imdbEditCelebrity(body);
          } else {
            this.imdbAddCelebrity(body);
          }
        } else {
          return false;
        }
      });
    },
    async imdbEditCelebrity(body) {
      const res = await this.$store.dispatch("media/imdbEditCelebrity", body);
      if (res.code === 0) {
        this.$message.success("修改成功");
        this.dialogVisible = false;
        this.$emit("getData", true);
      }
    },
    async imdbAddCelebrity(body) {
      const res = await this.$store.dispatch("media/imdbAddCelebrity", body);
      if (res.code === 0) {
        this.$message.success("新增成功");
        this.dialogVisible = false;
        this.$emit("getData", true);
      }
    },
    async imdbCelebrityDetail() {
      this.loading = true;
      const res = await this.$store.dispatch("media/imdbCelebrityDetail", {
        celebrity_id: this.rowId,
      });
      this.loading = false;
      this.loading = false;
      if (res.code === 0) {
        const data = res.data || {};
        this.ruleForm.id = data.id;
        this.ruleForm.name = data.name;
        this.ruleForm.birthday = data.birthday;
        this.ruleForm.gender =
          data.gender === "男" ? "man" : data.gender === "女" ? "woman" : null;
        if (data.profession) {
          this.ruleForm.profession = data.profession.split("/");
        } else {
          this.ruleForm.profession = [];
        }
      }
    },
  },
};
</script>

<style>
</style>
