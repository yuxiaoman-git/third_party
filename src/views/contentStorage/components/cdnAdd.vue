<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      v-loading="loading"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="分集序号" prop="serial_num">
            <el-input
              type="text"
              v-model="ruleForm.serial_num"
              style="width: 40%"
            ></el-input>
            <i v-if="loading_serial" class="el-icon-loading"></i>
            <span style="margin-left: 20px;font-size: 12px;color: #ff4949">{{serial_num_err}}</span>
          </el-form-item>
        </el-col>
        <template v-if="showMore">
          <el-col :span="24">
            <el-form-item label="介质播放地址" prop="play_url">
              <el-input
                v-model="ruleForm.play_url"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分集变更竖图" prop="episode_verpic">
              <el-input
                v-model="ruleForm.episode_verpic"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分集变更横图" prop="episode_horpic">
              <el-input
                v-model="ruleForm.episode_horpic"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上下线" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">上线</el-radio>
                <el-radio :label="0">下线</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否收费" prop="is_charge">
              <el-radio-group v-model="ruleForm.is_charge">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分集清晰度" prop="storage_definition">
              <SelectItme
                type="definition"
                v-model="ruleForm.storage_definition"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="介质文件格式" prop="storage_type">
              <SelectItme
                type="storage_type"
                v-model="ruleForm.storage_type"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button
                type="primary"
                @click.native.prevent="submitAdd('ruleForm')"
              >确 定</el-button
              >
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
import store from "@/store";
// import {options} from "@/utils/getOptions";

const ruleForm = {
  serial_num: '',
  id: "",
  play_url: '',
  episode_verpic: "",
  episode_horpic: "",
  storage_type: "",
  storage_definition: "",
  status: "",
  is_charge: "",
  storage_id: "",
  episode_id: ""
};

export default {
  name: "adbAdd",
  components: {
    SelectItme,
  },
  props: {
    onSuccess: {
      type: Function,
    },
    episodeList: {
      type: [Array, Object]
    },
    fileInfoData: {
      type: [Array, Object]
    },
    episode_id_arr: {
      type: [Array]
    },
    currentData: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      ruleForm: Object.assign({}, ruleForm),
      loading: false,
      rules: {
        serial_num: [{required: true, message: "请输入分集", trigger: "blur"}],
        play_url: [{required: true, message: "请输入介质播放地址", trigger: "blur"}],
        episode_verpic: [
          {required: true, message: "请输入媒体竖图", trigger: "blur"},
        ],
        episode_horpic: [
          {required: true, message: "请输入媒体横图", trigger: "blur"},
        ],
        storage_definition: [
          {required: true, message: "请选择清晰度", trigger: "change"},
        ],
        status: [
          {required: true, message: "请选择上下线", trigger: "change"},
        ],
        is_charge: [
          {required: true, message: "请选择是否收费", trigger: "change"},
        ],
        storage_type: [
          {required: true, message: "请选择介质文件格式", trigger: "change"},
        ],
      },
      tableData: [],
      showMore: false,
      serial_num_err: '',
      loading_serial: false,
      timeout: null
    };
  },
  watch: {
    'ruleForm.serial_num': {
      handler(val) {
        if (val) {
          this.loading_serial = true
          this.debounce(this.cdnExists, 400)
        } else {
          this.showMore = false
        }
      }
    },
    currentData: {
      handler(val) {
        if (val && val.episode_id) {
          this.showMore = true
          this.ruleForm = Object.assign(this.ruleForm, val)
        }
      },
      immediate: true,
    }
  },
  methods: {
    //详情
    async getEpisodeInfo() {
      const data = this.infoObj || {};
      if (data.id) {
        this.ruleForm.id = data.id;
        this.ruleForm.play_url = data.play_url;
        this.ruleForm.episode_verpic = data.episode_verpic;
        this.ruleForm.episode_horpic = data.episode_horpic;
        this.ruleForm.storage_type = data.storage_type;
        this.ruleForm.storage_definition = Number(data.storage_definition) || "";
        this.ruleForm.status = data.status;
        this.ruleForm.is_charge = data.is_charge;
      }
    },
    submitAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let type = 'add'
          if (this.currentData.episode_id) {
            type = 'change'
          } else {
            type = 'add'
          }
          this.$emit('getTableData',this.ruleForm, type)
        }
      });
    },
    async cdnExists() {
      const episode = this.episodeList.filter(
        (el) => el.serial_num == this.ruleForm.serial_num
      )[0];
      if (episode) {
        const episode_id = episode.id
        this.ruleForm.episode_id = episode_id
        const res = await store.dispatch(
          "injector/cdnExists",
          {
            media_id: this.fileInfoData.media_id,
            partner_id: this.fileInfoData.partner_id,
            episode_id: episode_id
          }
        )
        if (res.code === 0) {
          const data = res.data || [];
          if (data.is_created) {
            this.serial_num_err = '已创建过该分集'
            this.showMore = false
          // } else if ( this.episode_id_arr.indexOf(episode_id) > -1 ) {
          //   this.serial_num_err = '该分集已填写未提交'
          //   this.showMore = false
          } else {
            this.serial_num_err = ''
            this.showMore = true
          }
          this.loading_serial = false
        }
      } else {
        this.showMore = false
        this.serial_num_err = '不存在该分集，请先创建'
        this.loading_serial = false
      }
    },
    debounce(fn, delay) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.cdnExists()
      }, delay);
    }

  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {  z-index: -1;}
.v-modal{
  z-index: 2000;
}
</style>
