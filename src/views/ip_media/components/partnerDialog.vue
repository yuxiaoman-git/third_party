<template>
  <div>
    <!--    *合作方名称-->
    <!--    *产业位置-->
    <!--    *业务类型-->
    <!--    合同编号-->
    <!--    *合作开始时间-->
    <!--    接入方式  下拉-->
    <!--    *合作结束时间-->
    <!--    合作联系人-->
    <!--    *合作方类型  下拉-->
    <!--    联系人电话-->
    <!--    实体名称  下拉-->
    <!--    运营负责人-->
    <!--    商务负责人-->
    <!--    采购负责人-->
    <!--    备注-->
    <el-form :model="form" ref="form" label-width="100px" :rules="rules"
             :inline="true">
      <el-form-item label="合作方名称" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="合作方名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="产业位置" prop="entity">
        <SelectItem type="entity" v-model="form.entity" width="190px"/>
      </el-form-item>
      <el-form-item label="业务类型" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="业务类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="合同编号" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="合同编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="合作开始时间" prop="name">
        <el-date-picker
          style="width: 190px"
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="接入方式" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="接入方式"
        ></el-input>
      </el-form-item>
      <el-form-item label="合作结束时间" prop="name">
        <el-date-picker
          style="width: 190px"
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合作联系人" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="合作联系人"
        ></el-input>
      </el-form-item>
      <el-form-item label="合作方类型" prop="entity">
        <SelectItem type="entity" v-model="form.entity" width="190px"/>
      </el-form-item>
      <el-form-item label="联系人电话" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="联系人电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="实体名称" prop="entity">
        <SelectItem type="entity" v-model="form.entity" width="190px"/>
      </el-form-item>
      <el-form-item label="运营负责人" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="运营负责人"
        ></el-input>
      </el-form-item>
      <el-form-item label="商务负责人" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="商务负责人"
        ></el-input>
      </el-form-item>
      <el-form-item label="采购负责人" prop="name">
        <el-input
          style="width: 190px"
          v-model.trim="form.name"
          placeholder="采购负责人"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          style="width: 490px"
          type="textarea"
          :rows="3"
          v-model="form.comment"
          placeholder="备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;margin-right: 100px">
        <el-button size="small" @click="submitForm('form')"
        >取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm('form')"
        >保 存</el-button>
    </div>
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItme/select";

export default {
  name: "partnerDialog",
  components: {
    SelectItem
  },
  data() {
    return {
      form: {
        name: '',
        date: ''
      },
      rules: {}
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('onSubmit')
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
