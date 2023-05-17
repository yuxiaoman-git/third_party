<template>
  <div>
    <el-tabs v-model="activeName" :before-leave="beforeLeave">
      <el-tab-pane name="first">
        <span slot="label">媒体信息<i class="el-icon-arrow-right"></i></span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          v-loading="ruleFormLoading"
          ref="ruleForm"
          label-width="120px"
          size="small"
          @submit.native.prevent
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="媒资名称" prop="name">
                <autocomplete
                  v-model="ruleForm.name"
                  syncDetails
                  :on-success="getSucceed"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="导演">
                <SelectItmeRemote
                  type="longhair"
                  v-model="ruleForm.director_list"
                  width="100%"
                  remote
                  multiple
                ></SelectItmeRemote>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编剧">
                <SelectItmeRemote
                  type="longhair"
                  v-model="ruleForm.author_list"
                  width="100%"
                  remote
                  multiple
                ></SelectItmeRemote>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主演">
                <SelectItmeRemote
                  type="longhair"
                  v-model="ruleForm.actor_list"
                  width="100%"
                  remote
                  multiple
                ></SelectItmeRemote>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="又名">
                <el-input
                  v-model.trim="ruleForm.alias"
                  :maxlength="200"
                  show-word-limit
                  placeholder="又名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="题材" prop="genre_list">
                <SelectItme
                  ref="genre"
                  type="genre"
                  multiple
                  v-model="ruleForm.genre_list"
                  width="100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年份" prop="year">
                <el-date-picker
                  v-model="ruleForm.year"
                  type="year"
                  placeholder="选择年"
                  style="width: 100%"
                  value-format="yyyy"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="制片国家/地区" prop="regions">
                <SelectItme
                  ref="region"
                  type="region"
                  multiple
                  v-model="ruleForm.regions"
                  width="100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="语言" prop="languages">
                <el-input
                  v-model="ruleForm.languages"
                  placeholder="语言"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评分" prop="douban_score">
                <el-input
                  v-model="ruleForm.douban_score"
                  v-enter-number="1"
                  placeholder="评分"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="集数" prop="episodes">
                <el-input
                  type="text"
                  v-model="ruleForm.episodes"
                  v-enter-number="0"
                  placeholder="集数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时长" prop="minutes">
                <el-input
                  v-model="ruleForm.minutes"
                  v-enter-number="2"
                  placeholder="时长"
                >
                  <template slot="suffix">分钟</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总时长" prop="total_minutes">
                <el-input
                  v-model="ruleForm.total_minutes"
                  v-enter-number="2"
                  placeholder="总时长"
                >
                  <template slot="suffix">分钟</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上映日期" prop="date_published">
                <el-input
                  v-model="ruleForm.date_published"
                  placeholder="上映日期"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型" prop="classify">
                <SelectItme
                  type="classify"
                  v-model="ruleForm.classify"
                  width="100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="简介">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="简介"
                  v-model="ruleForm.storyline"
                  maxlength="500"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button
                  @click.native.prevent="activeName = 'second'"
                  type="primary"
                  >下一步</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">分集信息<i class="el-icon-arrow-right"></i></span>
        <episodeInfo :on-success="success" ref="episodeInfo"></episodeInfo>
      </el-tab-pane>
      <el-tab-pane label="文件信息" name="third">
        <span slot="label">文件信息<i class="el-icon-arrow-right"></i></span>
        <fileInfo :on-success="success" ref="fileInfo" />
      </el-tab-pane>
      <el-tab-pane label="扩展信息" name="four">
        <file-info-ext-view :on-success="success" ref="fileInfoExtView" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import SelectItmeRemote from "@/components/SelectItmeRemote/index";
import autocomplete from "@/views/contentManage/components/autocomplete";
import SelectItme from "@/components/SelectItme";
import episodeInfo from "./episodeInfo";
import fileInfoExtView from "./fileInfoExtView.vue";
import fileInfo from "./fileInfo";
import { options } from "@/utils/getOptions";
import { getIds } from "@/utils/index";

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
  name: "editPageComponent",
  components: {
    SelectItmeRemote,
    autocomplete,
    SelectItme,
    episodeInfo,
    fileInfoExtView,
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
    storage_id: {
      type: [String, Number],
      default: () => {
        return "";
      },
    },
    onSuccess: {
      type: Function,
    },
  },
  data() {
    return {
      initBody: null,
      activeName: "first",
      ruleFormLoading: false,
      ruleForm: Object.assign({}, defaultRuleForm),
      rules: {
        name: [{ required: true, message: "请输入媒资名称", trigger: "blur" }],
        genre_list: [
          { required: true, message: "请选择题材", trigger: "change" },
        ],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        regions: [
          { required: true, message: "请选择制片国家/地区", trigger: "change" },
        ],
        languages: [{ required: true, message: "请输入语言", trigger: "blur" }],
        episodes: [{ required: true, message: "请输入集数", trigger: "blur" }],
        minutes: [{ required: true, message: "请输入时长", trigger: "blur" }],
        total_minutes: [
          { required: true, message: "请输入总时长", trigger: "blur" },
        ],
        date_published: [
          { required: true, message: "请输入上映日期", trigger: "blur" },
        ],
        classify: [
          { required: true, message: "请选择内容类型", trigger: "change" },
        ],
      },
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
        if (n === "first" && this.media_id) {
          this.imdbDetail(this.media_id);
        } else if (n === "second" && this.episode_id) {
          this.$refs.episodeInfo &&
            this.$refs.episodeInfo.imdbEpisodeDetail(this.episode_id);
        } else if (n === "third" && this.media_id) {
          this.$refs.fileInfo &&
            this.$refs.fileInfo.injectorStorageDetail(this.storage_id);
        } else if (n === "four" && this.media_id) {
          this.$refs.fileInfoExtView &&
            this.$refs.fileInfoExtView.injectorMediaExtDetail(this.media_id);
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
    async imdbDetail(media_id) {
      this.ruleFormLoading = true;
      const body = { media_id };
      const res = await this.$store.dispatch("media/imdbDetail", body);
      this.ruleFormLoading = false;
      if (res && res.code === 0) {
        this.getRuleForm(res.data || []);
        this.ruleForm.id = res.data && res.data.id;
        this.initBody = this.getBody();
      }
    },
    beforeLeave(activeName, oldActiveName) {
      return new Promise(async (resolve) => {
        if (oldActiveName === "first") {
          await this.submitForm("ruleForm");
        }
        if (oldActiveName === "second") {
          await this.$refs.episodeInfo.submitEdit("ruleForm");
        }
        if (oldActiveName === "third") {
          await this.$refs.fileInfo.injectorStorageEdit("ruleForm");
        }
        // if (oldActiveName === "four") {
          // await this.$refs.fileInfoExtView.submitEdit("ruleForm");
        // }
        resolve(true);
      });
    },
    getSucceed(data) {
      this.getRuleForm(data);
      this.$refs.genre && this.$refs.genre.getOptions();
      this.$refs.region && this.$refs.region.getOptions();
    },
    getRuleForm(data) {
      this.ruleForm.img = data.img;
      this.ruleForm.name = data.name || "";
      this.ruleForm.director_list =
        data.director_list &&
        data.director_list.map((el) => {
          return Object.assign(
            {
              value: el.id,
              label: el.name,
            },
            el
          );
        });
      this.ruleForm.author_list =
        data.author_list &&
        data.author_list.map((el) => {
          return Object.assign(
            {
              value: el.id,
              label: el.name,
            },
            el
          );
        });
      this.ruleForm.actor_list =
        data.actor_list &&
        data.actor_list.map((el) => {
          return Object.assign(
            {
              value: el.id,
              label: el.name,
            },
            el
          );
        });
      if (data.genre_list && data.genre_list.length) {
        this.ruleForm.genre_list = data.genre_list.map((el) => {
          return {
            value: el.id,
            label: el.name,
          };
        });
      }
      if (data.region_list && data.region_list.length) {
        this.ruleForm.regions = data.region_list.map((el) => {
          return {
            value: el.id,
            label: el.name,
          };
        });
      }
      this.ruleForm.languages = data.languages;
      this.ruleForm.alias = data.alias;
      this.ruleForm.year = data.year + "";
      this.ruleForm.douban_score = data.douban_score;
      this.ruleForm.episodes = data.episodes;
      this.ruleForm.minutes = data.minutes;
      this.ruleForm.total_minutes = data.total_minutes;
      this.ruleForm.date_published = data.date_published;
      this.ruleForm.imdb_id = data.imdb_id;
      this.ruleForm.storyline = data.storyline;
      this.ruleForm.classify = options.filter(
        (el) => el.value === data.category
      )[0];
    },
    getBody() {
      return {
        category: this.ruleForm.classify && this.ruleForm.classify.value, // 媒体类型，movie：电影；tvseries：电视剧 【必传】
        year: this.ruleForm.year, // 年份    【必传】
        name: this.ruleForm.name, // 电影电视剧名    【必传】
        director_ids: getIds(this.ruleForm.director_list),
        // json 导演  【必传】
        author_ids: getIds(this.ruleForm.author_list),
        actor_ids: getIds(this.ruleForm.actor_list),
        // json 演员  【必传】
        genre_ids: getIds(this.ruleForm.genre_list), //题材id,多个以,分割  【必传】
        douban_score: this.ruleForm.douban_score || "", // 豆瓣评分     【必传】
        episodes: this.ruleForm.episodes * 1, //集数，//电视剧有   【必传】
        minutes: this.ruleForm.minutes * 1, //片长/单集片长       【必传】
        total_minutes: this.ruleForm.total_minutes * 1, //总时长      【必传】
        date_published: this.ruleForm.date_published, // 发行时间和发行地区   【必传】
        region_ids: getIds(this.ruleForm.regions), // 制片国家/地区        【必传】
        languages: this.ruleForm.languages, // 语言               【必传】
        alias: this.ruleForm.alias, //又名                   【非必传】
        imdb_id: this.ruleForm.imdb_id, // imdb id      //          【非必传】
        storyline: this.ruleForm.storyline, // 简介，大文本          【非必传】
        media_id: this.ruleForm.id,
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
    submitForm(formName, step) {
      return new Promise((resolve) => {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const body = this.getBody();
            if (!this.isEqually(this.initBody, body)) {
              await this.$store.dispatch("media/imdbEdit", body);
            }
            resolve(true);
            if (step) {
              this.activeName = step;
            }
          }
        });
      });
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       const body = this.getBody();
    //       if (this.isEqually(this.initBody, body)) {
    //         this.activeName = "second";
    //         return;
    //       }
    //       this.imdbEdit(body);
    //     }
    //   });
    // },
    async imdbEdit(body) {
      const res = await this.$store.dispatch("media/imdbEdit", body);
      if (res && res.code === 0) {
        // this.$message.success("修改成功");
        this.activeName = "second";
        this.onSuccess && this.onSuccess(true);
      }
    },
  },
};
</script>

<style>
</style>
