<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <autocompleteSmart v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="年代">
            <SelectItme type="years" v-model="form.years" width="100%" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="国家">
            <SelectItme type="region" v-model="form.region" width="100%" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="类型">
            <SelectItme type="classify" v-model="form.classify" width="100%" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="" label-width="10px">
            <div class="space-between">
              <el-button
                type="primary"
                native-type="submit"
                @click.native.prevent="handelSearch"
                >查询</el-button
              >
              <el-button
                class="fr3"
                type="success"
                @click="handelAdd"
                v-if="$checkPermission(['add'])"
                >新增</el-button
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      @row-click="rowClick"
      ref="tableData"
      style="width: max-content"
      border
      size="mini"
      class="table-data"
    >
      <el-table-column prop="id" label="ID" width="70" fixed></el-table-column>
      <el-table-column label="图片" width="50" fixed>
        <template slot-scope="{ row }">
          <ImgPreview
            v-if="row.img"
            :src="row && row.img"
            fit="scale-down"
            width="18px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180"
        fixed
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="media_ext.format"
        label="介质编码"
        width="130"
        fixed
      >
        <template slot-scope="{ row }">
          {{ filterFormat(row.media_ext.format).label || "" }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="类型" width="80">
        <template slot-scope="{ row }">
          {{ filterItems(row.category).label || "" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="douban_score"
        label="评分"
        width="50"
      ></el-table-column>
      <el-table-column label="题材" width="120" show-overflow-tooltip>
        <template slot-scope="{ row }">
          {{ getTitle(row.genre_list) }}
        </template>
      </el-table-column>
      <el-table-column label="国家" width="120" show-overflow-tooltip>
        <template slot-scope="{ row }">
          {{ getTitle(row.region_list) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="languages"
        label="语言"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="年份" prop="year" width="60"></el-table-column>
      <el-table-column
        label="上映时间"
        prop="date_published"
        width="120"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="episodes"
        label="集数"
        width="50"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="minutes"
        label="时长"
        width="50"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="total_minutes"
        label="总时长"
        width="60"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="140"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.create_time | formatDate("all") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="媒体横图" width="70">
        <template slot-scope="{ row }">
          <ImgPreview
            v-if="row.media_ext.media_horpic"
            :src="row.media_ext && row.media_ext.media_horpic"
            fit="scale-down"
            width="30px"
          />
        </template>
      </el-table-column>
      <el-table-column label="媒体竖图" width="70">
        <template slot-scope="{ row }">
          <ImgPreview
            v-if="row.media_ext.media_verpic"
            :src="row.media_ext && row.media_ext.media_verpic"
            fit="scale-down"
            width="18px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="{ row }">
          <div class="operate-btn">
            <span
              @click.stop="handelEdit(row)"
              v-if="$checkPermission(['edit'])"
              >修改</span
            >
            <span
              @click.stop="handelAddDiversity(row)"
              v-if="$checkPermission(['edit'])"
              >新增分集</span
            >
            <span
              v-if="$checkPermission(['edit'])"
              @click.stop="handelInfoExtend(row)"
              >扩展信息</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :style="{ marginBottom: marginBottom + 'px' }"
      @pagination="getList"
    />
    <el-card
      v-show="isShowDetailsInfo"
      ref="detailsInfo"
      class="details-info"
      shadow="never"
      v-loading="loading"
      :style="{ left: getSidebar() }"
    >
      <div slot="header" class="clearfix">
        <span style="font-size: 14px">更多信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="isShowDetailsInfo = false"
          >关闭</el-button
        >
      </div>
      <div class="content-box">
        <div style="min-width: 137px">
          <el-image
            v-if="rowData && rowData.img"
            style="width: 137px"
            :src="rowData && rowData.img"
          ></el-image>
        </div>
        <ul>
          <li>
            <span class="label">又名:</span>
            <span class="line-height-num">{{ rowData && rowData.alias }}</span>
          </li>
          <li>
            <span class="label">导演:</span>
            <span class="line-height-num">{{
              getTitle(rowData && rowData.director_list)
            }}</span>
          </li>
          <li>
            <span class="label">编剧:</span>
            <span class="line-height-num">{{
              getTitle(rowData && rowData.author_list)
            }}</span>
          </li>
          <li>
            <span class="label">主演:</span>
            <span class="line-height-num">{{
              getTitle(rowData && rowData.actor_list)
            }}</span>
          </li>
          <li>
            <span class="label">简介:</span>
            <span class="line-height-num">{{
              rowData && rowData.storyline
            }}</span>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 修改媒资 -->
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="800px"
      :title="
        dialogType === 'new'
          ? '新增媒资'
          : dialogType === 'edit'
          ? '修改媒资'
          : ''
      "
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        v-loading="ruleFormLoading"
        ref="ruleForm"
        label-width="140px"
        size="small"
      >
        <el-form-item style="margin-left: -70px" prop="is_divided">
          <el-checkbox v-model="ruleForm.is_divided" disabled class="spliter">拆条节目</el-checkbox>
        </el-form-item>
        <el-form-item label="媒资名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="媒资名称"></el-input>
<!--          <autocomplete-->
<!--            v-model="ruleForm.name"-->
<!--            syncDetails-->
<!--            :on-success="getSucceed"-->
<!--          />-->
        </el-form-item>
        <el-form-item label="关联节目" prop="program">
          <SelectItmeRemote
            width="100%"
            type="searchMedia"
            remote
            multiple
            v-model="ruleForm.program"
          />
        </el-form-item>
        <el-form-item label="导演" prop="director_list">
          <div slot="label">
            <i
              @click="figuredialog = true"
              class="el-icon-circle-plus-outline icon"
            ></i
            ><span>导演</span>
          </div>
          <SelectItmeRemote
            type="longhair"
            v-model="ruleForm.director_list"
            width="100%"
            remote
            multiple
          ></SelectItmeRemote>
        </el-form-item>
        <el-form-item label="编剧" prop="author_list">
          <div slot="label">
            <i
              @click="figuredialog = true"
              class="el-icon-circle-plus-outline icon"
            ></i
            ><span>编剧</span>
          </div>
          <SelectItmeRemote
            type="longhair"
            v-model="ruleForm.author_list"
            width="100%"
            remote
            multiple
          ></SelectItmeRemote>
        </el-form-item>
        <el-form-item label="主演" prop="actor_list">
          <div slot="label">
            <i
              @click="figuredialog = true"
              class="el-icon-circle-plus-outline icon"
            ></i
            ><span>主演</span>
          </div>
          <SelectItmeRemote
            type="longhair"
            v-model="ruleForm.actor_list"
            width="100%"
            remote
            multiple
          ></SelectItmeRemote>
        </el-form-item>
        <el-form-item label="又名">
          <el-input
            v-model.trim="ruleForm.alias"
            :maxlength="200"
            show-word-limit
            placeholder="又名"
          ></el-input>
        </el-form-item>
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
        <el-form-item label="制片国家/地区" prop="regions">
          <SelectItme
            ref="region"
            type="region"
            multiple
            v-model="ruleForm.regions"
            width="100%"
          />
        </el-form-item>
        <el-form-item label="语言" prop="languages">
          <el-input v-model="ruleForm.languages" placeholder="语言"></el-input>
        </el-form-item>
        <el-form-item label="评分" prop="douban_score">
          <el-input
            v-model="ruleForm.douban_score"
            v-enter-number="1"
            placeholder="评分"
          ></el-input>
        </el-form-item>
        <el-form-item label="集数" prop="episodes">
          <el-input
            type="text"
            v-model="ruleForm.episodes"
            v-enter-number="0"
            placeholder="集数"
          ></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="minutes">
          <el-input
            v-model="ruleForm.minutes"
            v-enter-number="2"
            placeholder="时长"
          >
            <template slot="suffix">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="总时长" prop="total_minutes">
          <el-input
            v-model="ruleForm.total_minutes"
            v-enter-number="2"
            placeholder="总时长"
          >
            <template slot="suffix">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="上映日期" prop="date_published">
          <el-date-picker
            v-model="ruleForm.date_published"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="上映日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="classify">
          <SelectItme
            type="classify"
            v-model="ruleForm.classify"
            width="100%"
          />
        </el-form-item>
        <el-form-item label="题材" prop="genre_list">
          <alphabetSelect
            ref="genre"
            type="genre"
            multiple
            v-model="ruleForm.genre_list"
            width="100%"
          />
        </el-form-item>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增分集 -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisibleDiv"
      v-if="dialogVisibleDiv"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form
        :model="ruleFormDiv"
        :rules="rulesDiv"
        ref="ruleFormDiv"
        label-width="80px"
      >
        <el-form-item label="创建模式" prop="pattern">
          <el-radio-group v-model="ruleFormDiv.pattern">
            <el-radio
              v-for="(item, index) in patternList"
              :key="index"
              :label="item.key"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <div v-for="(item, index) in list" :key="index">
          <el-form-item
            :label="item.label"
            v-if="!item.hidden"
            :prop="item.prop"
          >
            <el-input
              v-model="item.value"
              :placeholder="item.label"
              :readonly="item.disabled"
              v-enter-number="0"
              @blur="handelBlur"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            :rows="4"
            maxlength="128"
            show-word-limit
            placeholder="请输入"
            v-model="ruleFormDiv.storyline"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="海报" prop="episode_horpic">
          <span slot="label">
            <span>海报</span>
            <div
              style="line-height: 1"
              v-show="ver_size && ruleFormDiv.episode_horpic"
            >
              {{ ver_size }}
            </div>
          </span>
          <uploadImage
            @getSize="getSize"
            v-model="ruleFormDiv.episode_horpic"
            img-type="horizontal"
          ></uploadImage>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDiv = false">取 消</el-button>
        <el-button type="primary" @click="submitDiv('ruleFormDiv')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <figure-dialog
      dialog-type="add"
      :visible.sync="figuredialog"
      v-if="figuredialog"
    />
    <new-template-dialog
      v-bind.sync="infoExtendObj"
      v-if="infoExtendObj.show"
      title="扩展信息"
      width="700px"
      @save="submitInfoExtend"
    >
      <div class="app-container">
        <fileInfoExtend
          :media-id="media_id"
          :on-success="onSuccess"
          @on-loading="onLoading"
          ref="fileInfoExtend"
        />
      </div>
    </new-template-dialog>
  </div>
</template>

<script>
import NewTemplateDialog from "@/components/NewTemplateDialog";
import fileInfoExtend from "@/views/contentStorage/components/fileInfoExtend.vue";
import figureDialog from "../components/figure-dialog";
import ImgPreview from "@/components/ImgPreview";
import SelectItme from "@/components/SelectItme/select.vue";
import SelectItmeRemote from "@/components/SelectItmeRemote";
import Pagination from "@/components/Pagination";
import autocomplete from "./autocomplete";
import autocompleteSmart from "./autocompleteSmart";
import uploadImage from "@/components/uploadImage";
import alphabetSelect from "./alphabetSelect";

import { options, objJson, MediaCodingFormat } from "@/utils/getOptions";
import { getIds } from "@/utils/index";
import { getSidebar } from "@/utils/myPublic";
import { accMul } from "@/filters";
import { getStorage } from "@/utils/auth";

const defaultRuleForm = {
  classify: null,
  program: [], //关联节目
  author_list: [], //编剧
  actor_list: [], //主演
  director_list: [], //导演
  genre_list: [],
  regions: [],
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
  is_divided: true,
};
const ruleFormDiv = {
  pattern: "",
  media_id: "",
  start: "",
  total: "",
  series: "",
  interval_days: "",
  storyline: "",
  episode_horpic: "",
};

export default {
  name: "mRComponent",
  components: {
    SelectItme,
    Pagination,
    autocomplete,
    autocompleteSmart,
    ImgPreview,
    SelectItmeRemote,
    figureDialog,
    uploadImage,
    NewTemplateDialog,
    fileInfoExtend,
    alphabetSelect,
  },
  data() {
    return {
      ver_size: "",
      figuredialog: false,
      marginBottom: 0,
      loading: false,
      dialogVisibleDiv: false,
      dialogType: "new",
      isShowDetailsInfo: false,
      rowData: null,
      typeInfo: {},
      infoList: [],
      form: {
        name: "",
        region: null,
        years: null,
        classify: null,
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      dialogVisible: false,
      ruleForm: Object.assign({}, defaultRuleForm),
      rules: {
        name: [{ required: true, message: "请输入媒资名称", trigger: "blur" }],
        program: [{ required: true, message: "请输入关联节目", trigger: "blur" }],
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
      ruleFormLoading: false,
      tableData: [],
      ruleFormDiv: Object.assign({}, ruleFormDiv),
      rulesDiv: {
        start: [
          { required: true, message: "请输入大于0的开始集数", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (parseFloat(value) === 0) {
                callback(new Error("请输入大于0的开始集数"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        total: [
          { required: true, message: "请输入大于0的总集数", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (parseFloat(value) === 0) {
                callback(new Error("请输入大于0的总集数"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        interval_days: [
          { required: true, message: "请输入大于0的间隔天数", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (parseFloat(value) === 0) {
                callback(new Error("请输入大于0的间隔天数"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      type: "",
      list: [],
      patternList: [],
      episodes: 0,
      infoExtendObj: {
        show: false,
        loading: false,
      },
      media_id: 0,
    };
  },
  watch: {
    total_minutes: {
      handler(newVal) {
        if (this.dialogType === "new") {
          this.ruleForm.total_minutes = newVal || "";
        }
      },
    },
    "ruleFormDiv.pattern": {
      handler(n) {
        this.getEpisodesList();
        if (n === "double") {
          for (const item of this.list) {
            if (item.prop === "start") {
              item.value = 1;
            }
            if (item.prop === "total") {
              item.value = this.episodes;
            }
          }
        }
        this.$refs.ruleFormDiv && this.$refs.ruleFormDiv.clearValidate("start");
      },
    },
    dialogVisibleDiv: {
      handler(n) {
        if (!n) {
          this.ruleFormDiv = Object.assign({}, ruleFormDiv);
        }
      },
    },
    isShowDetailsInfo: {
      handler(flag) {
        if (!flag) {
          this.marginBottom = 0;
        }
      },
    },
  },
  computed: {
    total_minutes: {
      get() {
        return accMul(this.ruleForm.episodes || 0, this.ruleForm.minutes || 0);
      },
    },
  },

  mounted() {
    this.imdbSearch();
  },
  deactivated() {
    this.isShowDetailsInfo = false;
  },
  methods: {
    getSidebar,
    getSize(data) {
      this.ver_size = data;
    },
    handelInfoExtend(row) {
      this.media_id = row.id;
      this.infoExtendObj.show = true;
    },
    submitInfoExtend() {
      this.$refs.fileInfoExtend.submitEdit();
    },
    onSuccess() {
      this.imdbSearch();
      this.infoExtendObj.show = false;
    },
    onLoading(flag) {
      this.infoExtendObj.loading = flag;
    },
    getHeight() {
      this.$nextTick(() => {
        const h =
          this.$refs.detailsInfo && this.$refs.detailsInfo.$el.offsetHeight;
        this.marginBottom = h || 0;
      });
    },
    getEpisodesList() {
      if (objJson[this.type] && objJson[this.type][this.ruleFormDiv.pattern]) {
        this.list = JSON.parse(
          JSON.stringify(objJson[this.type][this.ruleFormDiv.pattern])
        );
      }
    },
    handelAddDiversity(row) {
      this.dialogVisibleDiv = true;
      this.ruleFormDiv = Object.assign({}, ruleFormDiv);
      this.ruleFormDiv.media_id = row.id;
      this.type = row.category;
      this.getEpisodesList();
      this.episodes = row.episodes;
      this.patternList = objJson[this.type].pattern;
      this.ruleFormDiv.pattern = this.patternList[0].key;
    },
    filterItems(category) {
      const list = options.filter((el) => el.value === category);
      if (list.length) {
        return list[0];
      } else {
        return {};
      }
    },
    filterFormat(category) {
      const list = MediaCodingFormat.filter((el) => el.value === category);
      if (list.length) {
        return list[0];
      } else {
        return {};
      }
    },
    async rowClick(row) {
      this.isShowDetailsInfo = true;
      await this.imdbDetail(row.id);
      this.getHeight();
    },
    getList() {
      this.imdbSearch();
    },
    handelAdd() {
      this.ruleForm = Object.assign({}, defaultRuleForm);
      this.dialogVisible = true;
      this.dialogType = "new";
    },
    handelEdit(row) {
      this.ruleForm = Object.assign({}, defaultRuleForm);
      this.dialogVisible = true;
      this.dialogType = "edit";
      this.imdbDetail(row.id);
    },
    async imdbDetail(media_id) {
      this.ruleFormLoading = true;
      this.loading = true;
      const body = { media_id };
      const res = await this.$store.dispatch("media/imdbDetail", body);
      this.ruleFormLoading = false;
      this.loading = false;
      if (res && res.code === 0) {
        this.getRuleForm(res.data || []);
        this.rowData = res.data || [];
        this.ruleForm.id = res.data && res.data.id;
      }
    },
    handelSearch() {
      this.listQuery.page = 1;
      this.imdbSearch(this.listQuery);
    },
    async imdbSearch() {
      const [start_year, end_year] =
        (this.form.years && this.form.years.split("-")) || [];
      const {
        form: { name },
        listQuery: { page, limit: page_size },
      } = this;
      const region_id = this.form.region || undefined;
      const category = this.form.classify || undefined;
      const res = await this.$store.dispatch("media/imdbSearch", {
        start_year,
        end_year,
        name,
        region_id,
        category,
        page,
        page_size,
      });
      if (res.code === 0) {
        const data = res.data || {};
        this.tableData = data.media_list || [];
        this.total = data.total_page * page_size || 0;
      }
    },
    getRuleForm(data) {
      this.ruleForm.img = data.img;
      this.ruleForm.name = data.name || "";
      this.ruleForm.program =
        data.related_medias &&
        data.related_medias.map((el) => {
          return Object.assign(
            {
              value: el.id,
              label:  '(' + el.id + ')' + el.name,
            },
            el
          );
        });
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
          return el.id;
        });
      }
      if (data.region_list && data.region_list.length) {
        this.ruleForm.regions = data.region_list.map((el) => {
          return el.id;
        });
      }
      this.ruleForm.languages = data.languages;
      this.ruleForm.alias = data.alias;
      this.ruleForm.year = data.year + "";
      this.ruleForm.douban_score = data.douban_score;
      this.ruleForm.episodes = data.episodes;
      this.ruleForm.minutes = data.minutes;
      this.ruleForm.total_minutes = data.total_minutes;
      // this.ruleForm.date_published = data.date_published;
      this.ruleForm.date_published = this.formatDate(data.date_published);
      this.ruleForm.imdb_id = data.imdb_id;
      this.ruleForm.storyline = data.storyline;
      this.ruleForm.classify = data.category;
      this.ruleForm.is_divided = data.is_divided;
    },
    formatDate(date) {
      const time = new Date(date);
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      if (y) {
        return `${y}-${m > 9 ? m : "0" + m}-${d > 9 ? d : "0" + d}`;
      } else {
        return "2021-01-01";
      }
    },
    getSucceed(data) {
      this.getRuleForm(data);
      this.$refs.genre && this.$refs.genre.getOptions();
      this.$refs.region && this.$refs.region.getOptions();
    },
    getTitle(list) {
      if (!list || list.length === 0) return "";
      let str = "";
      if (Array.isArray(list)) {
        list.forEach((el, index) => {
          if (index === list.length - 1) {
            str += el.name;
          } else {
            str += el.name + "/";
          }
        });
      }
      return str;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { uid: user_id } = getStorage("userInfo") || {};
          const body = {
            category: this.ruleForm.classify, // 媒体类型，movie：电影；tvseries：电视剧 【必传】
            year: this.ruleForm.year, // 年份    【必传】
            name: this.ruleForm.name, // 电影电视剧名    【必传】
            director_ids: getIds(this.ruleForm.director_list),
            program_id: getIds(this.ruleForm.program),
            // json 导演  【必传】
            author_ids: getIds(this.ruleForm.author_list),
            actor_ids: getIds(this.ruleForm.actor_list),
            // json 演员  【必传】
            genre_ids: this.ruleForm.genre_list, //题材id,多个以,分割  【必传】
            douban_score: this.ruleForm.douban_score || "", // 豆瓣评分     【必传】
            episodes: this.ruleForm.episodes * 1, //集数，//电视剧有   【必传】
            minutes: this.ruleForm.minutes * 1, //片长/单集片长       【必传】
            total_minutes: this.ruleForm.total_minutes * 1, //总时长      【必传】
            date_published: this.ruleForm.date_published, // 发行时间和发行地区   【必传】
            region_ids: this.ruleForm.regions, // 制片国家/地区        【必传】
            languages: this.ruleForm.languages, // 语言               【必传】
            alias: this.ruleForm.alias, //又名                   【非必传】
            imdb_id: this.ruleForm.imdb_id, // imdb id      //          【非必传】
            storyline: this.ruleForm.storyline, // 简介，大文本          【非必传】
            user_id,
            is_divided: this.ruleForm.is_divided,
          };
          if (this.dialogType === "new") {
            body.img = this.ruleForm.img;
            this.imdbAdd(body);
          } else if (this.dialogType === "edit") {
            body.media_id = this.ruleForm.id;
            this.imdbEdit(body);
          }
        } else {
          return false;
        }
      });
    },
    async imdbEdit(body) {
      const res = await this.$store.dispatch("media/imdbEdit", body);
      if (res && res.code === 0) {
        this.dialogVisible = false;
        this.$message.success("修改成功");
        this.imdbSearch();
      }
    },
    async imdbAdd(body) {
      const res = await this.$store.dispatch("media/imdbAdd", body);
      if (res && res.code === 0) {
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.imdbSearch();
      }
    },
    handelBlur() {
      this.getFormDiv();
    },
    getFormDiv() {
      for (const item of this.list) {
        this.ruleFormDiv[item.key] = item.value;
      }
    },
    submitDiv(formName) {
      this.getFormDiv();
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$store.dispatch(
            "injector/imdbGenerateEpisode",
            {
              media_id: this.ruleFormDiv.media_id,
              start: this.ruleFormDiv.start,
              total: this.ruleFormDiv.total,
              storyline: this.ruleFormDiv.storyline,
              episode_horpic: this.ruleFormDiv.episode_horpic,
              horpic_size: this.ver_size,
            }
          );
          if (res && res.code === 0) {
            this.dialogVisibleDiv = false;
            this.$message.success("操作成功");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 20px;
  font-weight: bold;
  margin-right: 7px;
  cursor: pointer;
  &:hover {
    color: #5cb6ff;
  }
}
.height-180 {
  height: 180px;
}
::v-deep .el-table__fixed-body-wrapper {
  z-index: auto !important;
}
.mr-7 {
  margin: 7px;
}
.flex-warp {
  flex-wrap: wrap;
}
.details-info {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 20;
  border: 0;
  background-color: #fff;
  border-radius: 0;
  box-shadow: 3px 0 10px #ccc;
  ::v-deep .el-card__header {
    padding: 8px 16px;
  }
  ::v-deep .el-card__body {
    padding: 8px 16px;
  }
}

.my-autocomplete {
  ::v-deep {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
}
.demo-table-expand {
  font-size: 0;
}
::v-deep .demo-table-expand label {
  // width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
::v-deep .table-data {
  tbody {
    tr {
      cursor: pointer;
    }
  }
}
.content-box {
  display: flex;
  max-height: 140px;
  overflow: auto;
  ul {
    margin: 0;
    padding-left: 10px;
    font-size: 14px;
    color: #606266;
    li {
      .label {
        color: #333;
        font-weight: 800;
        margin-right: 3px;
      }
      .line-height-num {
        line-height: 1.5;
      }
    }
  }
}
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label{
  color: #606266!important;
  font-weight: 700;
}

</style>
