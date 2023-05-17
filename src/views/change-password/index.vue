<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      size="small"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="旧密码" prop="oldPwd">
        <el-input
          v-model="ruleForm.oldPwd"
          type="password"
          class="w-60per"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          v-model="ruleForm.newPwd"
          type="password"
          class="w-60per"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="affirmNewPwd">
        <el-input
          v-model="ruleForm.affirmNewPwd"
          type="password"
          class="w-60per"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getStorage } from "@/utils/auth";

export default {
  name: "ChangePassword",
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入旧密码"));
    //   } else if (value.length < 6 || value.length > 12) {
    //     callback(new Error("密码长度6到12个字符"));
    //   } else {
    //     callback();
    //   }
    // };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度6到12个字符"));
      } else {
        if (this.ruleForm.affirmNewPwd !== "") {
          this.$refs.ruleForm.validateField("affirmNewPwd");
        }
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认新密码"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度6到12个字符"));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error("输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPwd: "",
        newPwd: "",
        affirmNewPwd: "",
      },
      rules: {
        // oldPwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        newPwd: [{ required: true, validator: validatePass2, trigger: "blur" }],
        affirmNewPwd: [
          { required: true, validator: validatePass3, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async changePassword() {
      const { uid } = getStorage("userInfo") || {};
      const body = {
        customer_uid: uid,
        password: this.ruleForm.newPwd,
      };
      const res = await this.$store.dispatch("role/userModifyPassword", body);
      if (res && res.code === 0) {
        this.$message.success("修改成功，请重新登录！");
        await this.$store.dispatch("user/resetLogout");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changePassword();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.w-60per {
  width: 60%;
}
</style>