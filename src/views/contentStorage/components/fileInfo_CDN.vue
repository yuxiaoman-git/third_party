<template>
  <div>
    <!--   选择媒体名称，合作商    -->
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="130px"
      size="small"
      :rules="rules"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="媒体名称" prop="mediaObj" v-if="operateType === 'add'">
            <SelectItmeRemote
              width="100%"
              type="checkMovie"
              remote
              v-model="ruleForm.mediaObj"
              @change="onchange"
            />
          </el-form-item>
          <el-form-item label="媒体信息名称" prop="media_name" v-else>
            <el-input
              type="text"
              v-model="ruleForm.media_name"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合作商" prop="partner_id">
            <div class="display-flex">
              <SelectItme
                type="cooperative_cdn"
                v-model="ruleForm.partner_id"
                width="95%"
                :disabled="operateType !== 'add'"
                @change="handleChange"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    <!--    原媒体信息   -->
    <el-divider content-position="left">原媒体信息</el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="媒资名称" prop="name">
            <el-input
              type="text"
              v-model="mediaInfo.media_name"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="集数" prop="episodes">
            <el-input
              type="text"
              v-model="mediaInfo.episodes"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="classify_">
            <el-input
              type="text"
              v-model="mediaInfo.classify && mediaInfo.classify.label "
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简介">
            <el-input
              type="textarea"
              v-model="mediaInfo.storyline"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    <!--    CDN媒体信息   -->
    <el-divider content-position="left">CDN媒体信息</el-divider>

      <el-row>
        <el-col :span="24">
          <el-form-item label="媒体竖图" prop="verpic">
            <el-input
              :disabled="operateType === 'check'"
              v-model="ruleForm.verpic"
              placeholder="媒体竖图"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="媒体横图" prop="horpic">
            <el-input
              :disabled="operateType === 'check'"
              v-model="ruleForm.horpic"
              placeholder="媒体竖图"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注入类型" prop="category">
            <SelectItme
              type="classify"
              :disabled="operateType === 'check'"
              v-model="ruleForm.category"
              :options-list="lspCategoryData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注入清晰度" prop="definition">
            <SelectItme
              :disabled="operateType === 'check'"
              type="definition"
              v-model="ruleForm.definition"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注入是否收费" prop="is_charge">
            <el-radio-group v-model="ruleForm.is_charge">
              <el-radio
                :disabled="operateType === 'check'"
                :label="1">是</el-radio>
              <el-radio
                :disabled="operateType === 'check'"
                :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上下线" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio
                :disabled="operateType === 'check'"
                :label="1">上线</el-radio>
              <el-radio
                :disabled="operateType === 'check'"
                :label="0">下线</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show="operateType != 'check'">
          <el-form-item>
            <el-button
              type="primary"
              @click.native.prevent="submitStep('ruleForm', 'second')"
            >下一步
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
import uploadImage from "@/components/uploadImage";
import {options} from "@/utils/getOptions";

import autocompleteSmart from "@/views/contentManage/components/autocompleteSmart";
import SelectItmeRemote from "@/components/SelectItmeRemote";
import store from "@/store";

const ruleForm = {
  cid: "",
  verpic: "",
  horpic: "",
  definition: "",
  is_charge: "",
  category: "",
  exist: "",
  mediaObj: null,
  media_name: "",
  media_id: "",
  status: "",
};
export default {
  name: "fileInfo",
  components: {
    uploadImage,
    SelectItme,
    autocompleteSmart,
    SelectItmeRemote
  },
  props: {
    onSuccess: {
      type: Function,
    },
    mediaInfoData: {
      type: [Array, Object]
    },
    infoObj: {
      type: [Array, Object]
    },
    operateType: {
      type: [String],
    }
  },
  computed: {
    rules() {
      if (this.operateType == 'add') {
        const rules = this.rules_static
        rules.mediaObj = [{ required: true, message: "请输入名称", trigger: "change" },]
        rules.partner_id = [{required: true, message: "请选择合作商", trigger: "change"},]
        return rules
      } else {
        return this.rules_static
      }
    },
  },
  watch: {
    'ruleForm.partner_id': {
      handler(val) {
        this.$nextTick(() => {
          const alias = this.alias ? this.alias : (this.infoObj ? this.infoObj.partner_alias : "" )
          if (alias) {
            this.lspCategory(alias)
          }
          if (this.operateType === 'add') {
            if (val && this.ruleForm.mediaObj && this.ruleForm.mediaObj.id) {
              this.getCdnInfo()
            }
          }
        })
      }
    },
    'ruleForm.mediaObj': {
      handler(val) {
        this.$nextTick(() => {
          if (this.operateType === 'add') {
            if (val && this.ruleForm.partner_id) {
              this.getCdnInfo()
            }
          }
        })
      }
    },
  },
  data() {
    return {
      ruleForm: Object.assign({}, ruleForm),
      mediaInfo: {},
      loading: false,
      rules_static: {
        verpic: [{required: true, message: "请输入媒体竖图", trigger: "blur"}],
        horpic: [
          {required: true, message: "请输入媒体横图", trigger: "blur"},
        ],
        definition: [
          {required: true, message: "请选择清晰度", trigger: "change"},
        ],
        category: [
          {required: true, message: "请选择媒体注入类型", trigger: "change"},
        ],
        storage_definition: [
          {required: true, message: "请选择清晰度", trigger: "change"},
        ],
        is_charge: [
          {required: true, message: "请选择注入是否收费", trigger: "change"},
        ],
        status: [
          {required: true, message: "请选择上下线", trigger: "change"},
        ],
        alias: "",
      },
      mediaSelect: {
        media_name: "",
        partner_id: "",
      },
      initBody: null,
      save_loading: false,
      episodeList: [],
      lspCategoryData:[],
      partnerName: ''
    };
  },
  methods: {
    getSize(data) {
      this.ver_size = data;
    },
    //详情
    async getMediaInfo() {
      const mediaInfoData = this.mediaInfoData || {};
      if (mediaInfoData.episodes) {
        this.ruleForm = Object.assign({}, ruleForm);
        this.mediaInfo.name = mediaInfoData.name || "";
        this.mediaInfo.episodes = mediaInfoData.episodes;
        this.mediaInfo.storyline = mediaInfoData.storyline;
        this.mediaInfo.classify = options.filter(
          (el) => el.value === mediaInfoData.category
        )[0];
        this.mediaInfo.media_name = mediaInfoData.name;
        this.ruleForm.media_name = mediaInfoData.name;
      }
      const data = this.infoObj || {};
      if (data.cid) {
        this.ruleForm.cid = data.cid;
        this.ruleForm.partner_id = data.partner_id;
        this.ruleForm.verpic = data.verpic;
        this.ruleForm.horpic = data.horpic;
        this.ruleForm.definition = data.definition || "";
        this.ruleForm.is_charge = data.is_charge;
        this.ruleForm.exist = data.exist;
        this.ruleForm.category = data.category;
        this.ruleForm.status = data.status;
      }
    },
    getBody() {
      return {
        cid: this.ruleForm.cid,
        media_name: this.ruleForm.media_name ? this.ruleForm.media_name : this.ruleForm.mediaObj.name,
        partner_id: this.ruleForm.partner_id,
        verpic: this.ruleForm.verpic,
        horpic: this.ruleForm.horpic,
        definition: this.ruleForm.definition,
        is_charge: this.ruleForm.is_charge,
        exist: this.ruleForm.exist,
        category: this.ruleForm.category,
        media_id: this.ruleForm.mediaObj ? this.ruleForm.mediaObj.id : "",
        status: this.ruleForm.status,
        partnerName: this.partnerName
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
    submitStep(formName, step) {
      return new Promise((resolve) => {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (step) {
              this.onSuccess &&
              this.onSuccess({
                next: step,
              });
            }
            const body = this.getBody();
            this.$emit('getFormData', body, 'fileInfo')
            resolve(true);
          }
        });
      });
    },
    async onchange() {
      if (!(this.ruleForm.mediaObj && this.ruleForm.mediaObj.id)) {
        return;
      }
      this.episodeList = []
      this.mediaInfo = this.ruleForm.mediaObj;
      this.mediaInfo.media_name = this.ruleForm.mediaObj.name;
      this.mediaInfo.classify = options.filter(
        (el) => el.value === this.ruleForm.mediaObj.category
      )[0];
      this.save_loading = true;
      const res = await this.$store.dispatch("injector/imdbSearchEpisode", {
        serial_num: "",
        media_id: this.ruleForm.mediaObj.id,
      });
      if (res.code === 0) {
        this.save_loading = false;
        this.episodeList = res.data || [];
        this.$emit('getEpisodeList', this.episodeList)
      } else {
        this.$emit('getEpisodeList', [])
      }
    },

    //  获取注入类型
    async lspCategory(alias) {
      const body = {
        alias,
      };
      const res = await this.$store.dispatch(
        "injector/lspCategory",
        body
      );
      if (res && res.code === 0) {
        this.lspCategoryData = res.data.channel || [];
      }
    },
    async getCdnInfo() {
      const res = await store.dispatch(
        "injector/cdnMedia",
        {
          media_id: this.ruleForm.mediaObj.id,
          partner_id: this.ruleForm.partner_id,
        }
      )
      if (res.code === 0) {
        const data = res.data || [];
        this.ruleForm = Object.assign(this.ruleForm, data.cdn_media)
      }
    },
    handleChange(data) {
      if (data) {
        this.alias = data.alias
        this.partnerName = data.name
      } else {
        this.alias = ""
        this.partnerName = ""
      }
    },

  },
};
</script>

<style>
</style>
