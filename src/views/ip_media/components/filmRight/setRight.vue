<template>
  <div>
    <el-dialog
      title="设置权利"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      top="7vh"
      width="1000px"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="ruleForm"
        label-width="80px"
      >
        <div style="max-width: 49%;border-right: 1px dotted #ccc">
          <el-form-item label="音频权" prop="is_audio" class="flex-width mb-0">
            <el-radio-group v-model="ruleForm.is_audio">
              <el-radio :label="1" :value="1">有</el-radio>
              <el-radio :label="0" :value="0">无</el-radio>
              <el-radio :label="2" :value="2">未知</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="视频权" prop="is_video" class="flex-width mb-0">
            <el-radio-group v-model="ruleForm.is_video">
              <el-radio :label="1" :value="1">有</el-radio>
              <el-radio :label="0" :value="0">无</el-radio>
              <el-radio :label="2" :value="2">未知</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="终端" prop="terminals" class="flex-width mb-0 checkboxSet">
            <SelectItme
              type="rightP_terminals"
              multiple
              @change="checkboxChange($event,'terminals')"
              @renderComplete="renderComplete('terminals')"
              ref="terminals"
              el="checkbox"
              v-model="ruleForm.terminals"
            />
          </el-form-item>
          <el-form-item label="转授权" prop="with_granted" class="flex-width">
            <SelectItme type="rightP_with_granted" v-model="ruleForm.with_granted" width="90%" />
          </el-form-item>
          <el-form-item label="定向转授区域" prop="granted_area" class="granted_area" v-if="ruleForm.with_granted.value === 2">
            <el-input v-model="ruleForm.granted_area"
                      placeholder="定向转授区域"
                      maxlength="80" style="width: 90%"
                      show-word-limit></el-input>
          </el-form-item>
        </div>

        <div style="max-width: 48%;margin-left: 3%">
          <el-form-item label="授权方式" prop="authorized_way" class="flex-width mb-0">
            <SelectItme type="rightP_authorized_way" el="radio" v-model="ruleForm.authorized_way" />
          </el-form-item>
          <el-form-item label="缓冲期" prop="buffer_period">
            <el-input v-model="ruleForm.buffer_period" type="number"
                      placeholder="缓冲期（天）"
                      maxlength="10" style="width: 90%"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="允许下载" prop="is_download" class="flex-width">
            <SelectItme type="whether" v-model="ruleForm.is_download" width=90% />
          </el-form-item>
          <el-form-item label="VIP付费" prop="vip_pay" class="flex-width">
            <SelectItme type="rightP_vip_pay" v-model="ruleForm.vip_pay" width="90%" />
          </el-form-item>
          <el-form-item label="维权" prop="is_safeguard" class="flex-width">
            <SelectItme type="whether" v-model="ruleForm.is_safeguard" width="90%" />
          </el-form-item>
          <el-form-item label="附加权利" prop="extra" class="flex-width flex-1">
            <SelectItme type="rightP_extra" el="checkbox"
                        multiple
                        ref="extra"
                        @change="checkboxChange($event, 'extra')"
                        @renderComplete="renderComplete('extra')"
                        v-model="ruleForm.extra" width="90%" />
          </el-form-item>
          <el-form-item label="剪辑" prop="editing_program" class="flex-width flex-1">
            <SelectItme type="rightP_editing_program" el="checkbox"
                        multiple
                        ref="editing_program"
                        v-model="ruleForm.editing_program" width="90%" />
          </el-form-item>
          <el-form-item label="剪辑备注" prop="editing_remark">
            <el-input v-model="ruleForm.editing_remark"
                      placeholder="剪辑备注"
                      maxlength="60" style="width: 90%"
                      show-word-limit></el-input>
          </el-form-item>
        </div>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="handleSave('ruleForm')"
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

    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    give: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    tab: {
      type: Number,
      default: () => {
        return 0;
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
        return this.formData;
      },
    },
  },
  data() {
    return {
      rules: {
        is_audio: [{ required: true, message: "请选择", trigger: "change" }],
        is_video: [{ required: true, message: "请选择", trigger: "change" }],
        authorized_way: [{ required: true, message: "请选择", trigger: "change" }],
        terminals: [{ required: true, message: "请选择终端", trigger: "change" }],
        with_granted: [{ required: true, message: "请选择", trigger: "change" }],
        editing_program: [{ required: true, message: "请选择", trigger: "change" }],
        editing_remark: [{ required: false, message: "请填写剪辑备注", trigger: "blur" }],
        buffer_period: [{ required: true, message: "请选择", trigger: "change" }],
        is_download: [{ required: true, message: "请选择", trigger: "change" }],
        vip_pay: [{ required: true, message: "请选择", trigger: "change" }],
        is_safeguard: [{ required: true, message: "请选择", trigger: "change" }],
        extra: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  watch: {
    ruleForm: {
      handler: function (value) {
        if (value) {
          this.$nextTick(() => {
            this.checkboxChange(value.terminals,'terminals')
            this.checkboxChange(value.extra,'extra')
          });
        }
      },
      immediate: true
    },
  },
  methods: {
    handleSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.ruleForm.with_granted.value === 2 && !this.ruleForm.granted_area) {
          //   this.$message.warning('请填写定向转授区域')
          //   return
          // }
          const body = {}
          let body_copyright = {}
          // console.log(this.ruleForm)
          body.id = this.ruleForm.id;
          body.index = this.ruleForm.index;
          body.is_white = this.ruleForm.is_white;
          body.buffer_period = this.ruleForm.buffer_period;
          body.editing_remark = this.ruleForm.editing_remark;
          body.granted_area = this.ruleForm.granted_area;
          body.authorized_way = this.ruleForm.authorized_way && this.ruleForm.authorized_way.value;
          body.is_audio = this.ruleForm.is_audio;
          body.is_video = this.ruleForm.is_video;
          body.is_download = this.ruleForm.is_download && this.ruleForm.is_download.value;
          body.is_safeguard = this.ruleForm.is_safeguard && this.ruleForm.is_safeguard.value;
          body.vip_pay = this.ruleForm.vip_pay && this.ruleForm.vip_pay.value;
          body.with_granted = this.ruleForm.with_granted && this.ruleForm.with_granted.value;

          body.editing_program = {}
          this.ruleForm.editing_program.forEach(el => {
            body.editing_program[el.value] = el.label
          })
          body.extra = {}
          this.ruleForm.extra.forEach(el => {
            body.extra[el.value] = el.label
          })
          body.terminals = {}
          this.ruleForm.terminals.forEach(el => {
            body.terminals[el.value] = el.label
          })
          if (this.tab) {
            body_copyright = JSON.parse(JSON.stringify(body))
            body_copyright.buffer_period = this.ruleForm.buffer_period * 1
            body_copyright.editing_program = this.ruleForm.editing_program
            body_copyright.extra = this.ruleForm.extra
            body_copyright.terminals = this.ruleForm.terminals
            this.$emit("getRightForm", body_copyright);
          } else {
          this.$emit("getRightForm", body);
          }
        } else {
          this.$message.warning('请完整填写权利表单')
        }
      });
    },
    checkboxChange(data, type) {
      const values = data.map(el => {
        return el.value
      })
      const options = this.$refs[type] && this.$refs[type].options
      if (options) {
        if (values.length > 0 && values.indexOf(200) > -1) {
          options.forEach(el => {
            if (el.value != 200) this.$set(el, 'disabled', true)
          })
          this.ruleForm[type] = [{value: 200, label: '全部'}]
        } else {
          options.forEach(el => {
            this.$set(el, 'disabled', false)
          })
        }
      }
    },
    renderComplete(type) {
      this.checkboxChange(this.ruleForm[type],type)
    }
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
  .flex-1 {
    flex: 1;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  //.el-form-item__label {
  //  font-weight: 500;
  //}
  .el-checkbox{
    margin-right: 15px;
  }
  .checkboxSet{
    .el-checkbox{
      min-width: 80px;
    }
  }
  .granted_area{
    .el-form-item__label{
      line-height: 16px;
    }
  }

}
</style>
