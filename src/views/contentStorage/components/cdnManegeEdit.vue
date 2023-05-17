<template>
  <div>
    <el-tabs v-model="activeName" :before-leave="beforeLeave">
      <el-tab-pane name="first" v-if="mediaInfo">
        <span slot="label">CDN媒体信息<i class="el-icon-arrow-right"></i></span>
        <fileInfo :mediaInfoData="info.media" :infoObj="info.cdn_media"
                  :on-success="success" :operateType="operateType"
                  v-on:getFormData="getFormData"
                  v-on:getEpisodeList="getEpisodeList"
                  ref="fileInfo" />
      </el-tab-pane>
      <el-tab-pane label="分集信息" name="second">
        <span slot="label">CDN分集信息<i class="el-icon-arrow-right"></i></span>
        <workWord  :infoObj="info.work_order" :episodeData="info.episode"
                   :on-success="success" :operateType="operateType"
                   :episodeList="episodeList"
                   :fileInfoData="fileInfoData"
                   v-on:getFormData="getFormData"
                   ref="fileInfoExtView" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SelectItmeRemote from "@/components/SelectItmeRemote/index";
import autocomplete from "@/views/contentManage/components/autocomplete";
import SelectItme from "@/components/SelectItme";
import workWord from "./workWord_CDN";
import fileInfo from "./fileInfo_CDN";

const defaultRuleForm = {
  classify: null,
  author_list: [], //编剧
  actor_list: [], //主演
  director_list: [], //导演
  genre_list: null,
  regions: null,
  languages: "",
  alias: "",
  year: "",
  douban_score: "",
  episodes: "",
  minutes: "",
  total_minutes: "",
  date_published: "",
  imdb_id: "",
  storyline: "",
  name: "",
};
export default {
  name: "cdnManageEdit",
  components: {
    SelectItmeRemote,
    autocomplete,
    SelectItme,
    workWord,
    fileInfo,
  },
  props: {
    media_id: {
      type: [String, Number],
      default: () => {
        return "";
      },
    },
    episode_id: {
      type: [String, Number],
      default: () => {
        return "";
      },
    },
    onSuccess: {
      type: Function,
    },
    info: {
      type:[Array, Object],
      default: () => {
        return "";
      },
    },
    operateType: {
      type: [String],
    }
  },
  data() {
    return {
      initBody: null,
      activeName: "first",
      ruleFormLoading: false,
      mediaInfo: Object.assign({}, defaultRuleForm),
      fileInfoData: {},
      workWordData: [],
      episodeList: [],
      injectLevel: null
    };
  },
  computed: {
    getQueryId() {
      return this.$route.query.id;
    },
  },
  watch: {
    activeName: {
      handler(n) {
        if (n === "first" ) {
          this.$nextTick(() => {
            this.$refs.fileInfo &&
            this.$refs.fileInfo.getMediaInfo();
          })
        } else if (n === "second") {
          this.$nextTick(() => {
            this.$refs.fileInfoExtView &&
            this.$refs.fileInfoExtView.getEpisodeInfo();
          })
        }
      },
      immediate: true,
    },
  },
  methods: {
    success(data) {
      this.activeName = data.next;
      this.onSuccess && this.onSuccess(data);
    },
    // imdbDetail() {
    //   this.getMediaInfo(this.info.media || []);
    //   this.initBody = this.getBody();
    // },
    isEqually(obj1, obj2) {
      for (const k in obj1) {
        if (obj1[k] !== obj2[k]) {
          return false;
        }
      }
      return true;
    },
    beforeLeave(activeName, oldActiveName) {
      return new Promise( (resolve) => {
        const that = this;
        (async function () {
          if (oldActiveName === "first" && that.operateType !== 'check') {
            await that.$refs.fileInfo.submitStep("ruleForm");
          }
          resolve(true);
        })()
      });
    },
    getFormData(data, type, level) {
      if (type === 'fileInfo') {
        this.fileInfoData = data
      } else if (type === 'workWord') {
        this.workWordData = data
        this.editCdn()
        if (level) {
          this.injectLevel = level
        }
      }
    },
    getEpisodeList(data) {
      this.episodeList = data
    },
    async editCdn() {
      const body = {
        "media_id": this.info.media ? this.info.media.id : this.fileInfoData.media_id,
        "cdn_media": this.fileInfoData,
        "cdn_work_order": this.workWordData
      };
      const res = await this.$store.dispatch(
        "injector/work_order_change",
        body,
      );
      if (res && res.code === 0) {
        if (this.operateType !== 'add') {
          this.$message.success('成功')
          this.$emit('editSuccess')
        } else {
          const injectList = []
          for (const i in res.data) {
            injectList.push({
              ...res.data[i],
              code: 0,
              desc: '',
              partner_id: this.fileInfoData.partner_id,
              media_name: this.fileInfoData.media_name,
              level: this.injectLevel,
              partner_name: this.fileInfoData.partnerName
            })
          }
          this.$emit('editSuccess', injectList)
        }
      }
    },
  },
};
</script>

<style>
</style>
