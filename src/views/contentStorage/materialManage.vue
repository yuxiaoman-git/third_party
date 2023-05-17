<template>
  <div class="app-container">
    <div class="space-between">
      <el-form
        ref="form"
        :model="form"
        label-width="50px"
        size="small"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item label="名称">
          <autocompleteSmart v-model="form.name" />
        </el-form-item>
        <el-form-item label="年代">
          <SelectItme type="years" v-model="form.years" width="110px" />
        </el-form-item>
        <el-form-item label="国家">
          <SelectItme type="region" v-model="form.region" width="110px" />
        </el-form-item>
        <el-form-item label="类型">
          <SelectItme type="classify" v-model="form.classify" width="110px" />
        </el-form-item>
        <el-form-item label="排序">
          <SelectItme type="sort" v-model="form.sort" width="110px" />
        </el-form-item>
        <el-form-item label-width="10px">
          <div class="space-between">
            <el-button
              type="primary"
              native-type="submit"
              @click.native.prevent="handelSearch"
              >查询</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <div v-if="$checkPermission(['edit'])">
        <el-button
          :disabled="!multipleSelection.length"
          type="primary"
          @click="handelInject(multipleSelection[0], 'batch')"
          >批量注入（已选{{ multipleSelection.length }}条）</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: max-content"
      size="mini"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" fixed="left" :selectable="checkboxT">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="70"> </el-table-column>
      <el-table-column prop="media_id" label="媒体ID" width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="media"
        label="媒体名"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.media.name }}</span>
        </template></el-table-column
      >
      <el-table-column
        prop="v_codec"
        label="视频编码"
        width="80"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="episode"
        label="分集序号"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.episode.serial_num }}</span>
        </template></el-table-column
      >

      <el-table-column
        prop="content_type"
        label="内容类型"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{
            filterItems(contentType, row.content_type + "").label
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pro_type"
        label="版本"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ filterItems(pro_type, row.pro_type).label }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="definition"
        label="清晰度"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ filterItems(definition, row.definition).label }}</span>
        </template></el-table-column
      >
      <el-table-column
        prop="a_codec"
        label="音频编码"
        show-overflow-tooltip
        width="80"
      ></el-table-column>
      <el-table-column
        prop="bit_rate"
        label="总码率"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.bit_rate | getKbps(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="v_bit_rate"
        label="视频码率"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.v_bit_rate | getKbps(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="height"
        label="宽高"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ `${row.width}*${row.height}` }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="display_aspect_ratio"
        label="比例"
        width="80"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="seconds"
        label="片长"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ formatSeconds(row.seconds) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="size"
        label="大小"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.size | getfilesize(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="160">
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="{ row }">
          <div class="operate-btn">
            <span @click="handelPreview(row)">预览</span>

            <span @click="handelEdit(row)" v-if="$checkPermission(['edit'])"
              >修改</span
            >
            <span @click="handelInject(row)" v-if="$checkPermission(['edit'])"
              >发起注入</span
            >
            <span @click="handelDel(row)" v-if="$checkPermission(['delete'])"
              >删除</span
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
      :page-sizes="[10, 20, 30, 50, 100]"
      @pagination="getList"
    />
    <el-dialog
      title="信息"
      :visible.sync="dialogInfoVisible"
      :close-on-click-modal="false"
      v-if="dialogInfoVisible"
      top="20px"
      custom-class="custom-dialog"
      width="800px"
    >
      <editPageComponent
        :media_id="media_id"
        :episode_id="episode_id"
        :storage_id="storage_id"
        :on-success="onSuccess"
      />
    </el-dialog>
    <video-component :visible.sync="dialogVisible" :url="videoUrl" />
    <el-dialog
      :title="injectType"
      :visible.sync="dialogInjectVisible"
      v-if="dialogInjectVisible"
      :close-on-click-modal="false"
      custom-class="custom-dialog"
      width="650px"
      top="20px"
    >
      <el-alert
        v-show="tip"
        :title="tip"
        type="warning"
        :closable="false"
        class="mb-16"
        show-icon
      >
      </el-alert>
      <el-form
        :model="injectRuleForm"
        :rules="injectRules"
        ref="injectRuleForm"
        label-width="100px"
      >
        <el-form-item label="合作商" prop="cooperative">
          <div class="display-flex">
            <div class="flex-1">
              <SelectItme
                type="cooperative"
                v-model="injectRuleForm.cooperative"
                width="95%"
                @change="handelChange"
              />
            </div>
            <el-button
              :disabled="disabled"
              type="primary"
              @click="handelInjectHead"
              >注入剧头</el-button
            >
          </div>
        </el-form-item>

        <!--        <el-form-item label="定时任务" prop="isTiming">-->
        <!--          <SelectItme-->
        <!--            type="radio"-->
        <!--            el="radio"-->
        <!--            v-model="injectRuleForm.isTiming"-->
        <!--            width="100%"-->
        <!--          />-->
        <!--        </el-form-item>-->
        <el-form-item label="等级" prop="taskLevel">
          <SelectItme
            :type="getType"
            v-model="injectRuleForm.taskLevel"
            width="100%"
            @change="taskLevelChange"
          />
        </el-form-item>
        <el-form-item label="定时时间" prop="timing" v-if="isTiming">
          <el-date-picker
            v-model="injectRuleForm.timing"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <div v-if="injectRuleForm.cooperative">
          <el-form-item label="变更媒体类型">
            <div class="box">
              <SelectItme
                type="classify"
                v-model="injectRuleForm.originalCategory"
                width="100%"
                disabled
              />
              <i class="el-icon-right"></i>
              <SelectItme
                type="classify"
                v-model="injectRuleForm.classify"
                width="100%"
                :options-list="channelOptions"
                :disabled="!saveFlag"
              />
            </div>
          </el-form-item>
          <el-form-item label="是否付费">
            <SelectItme
              type="charge"
              el="radio"
              v-model="injectRuleForm.is_charge"
              width="100%"
              :disabled="!saveFlag"
            />
          </el-form-item>
        </div>

        <el-form-item label="有效时间" prop="date" v-if="is_set_effective_time">
          <el-date-picker
            v-model="injectRuleForm.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            style="width: 60%"
          >
          </el-date-picker>
          <el-button class="fr" type="text" @click="show3 = !show3">{{
            show3 ? "收起" : "设置"
          }}</el-button>
          <el-collapse-transition>
            <el-card
              shadow="never"
              v-show="show3"
              style="margin-top: 10px; padding: 10px"
            >
              <div
                class="transition-box space-between"
                v-for="(item, i) in episodeList"
                :key="i"
              >
                <div style="width: 45%">
                  <span>从第</span>
                  <el-input
                    type="text"
                    v-model="item.start_serial_num"
                    v-enter-number="0"
                    size="mini"
                    style="width: 60px; margin: 0 4px"
                  ></el-input>
                  <span>集到第</span>
                  <el-input
                    type="text"
                    v-model="item.end_serial_num"
                    v-enter-number="0"
                    size="mini"
                    style="width: 60px; margin: 0 4px"
                  ></el-input>
                  <span>集</span>
                </div>
                <div style="width: 55%">
                  <el-date-picker
                    v-model="item.times"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 85%"
                  >
                  </el-date-picker>
                  <el-button
                    style="margin-left: 10px"
                    type="text"
                    @click="delectEntry(i)"
                    size="mini"
                    >删除</el-button
                  >
                </div>
              </div>
              <div class="transition-box" style="text-align: right">
                <el-button type="success" size="mini" plain @click="handlePush"
                  >新增条目</el-button
                >
                <el-button type="primary" size="mini" @click="postSet" plain
                  >提交</el-button
                >
              </div>
            </el-card>
          </el-collapse-transition>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInjectVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!flag"
          :loading="saveLoading"
          @click="submitInject('injectRuleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <batchInject ref="batchInject" :data-list="multipleSelection" />
  </div>
</template>

<script>
import videoComponent from "./components/video-component";
import Pagination from "@/components/Pagination";
import SelectItmeRemote from "@/components/SelectItmeRemote/index";
import SelectItme from "@/components/SelectItme/select.vue";
import uploadImage from "@/components/uploadImage";
import autocompleteSmart from "../contentManage/components/autocompleteSmart";
import editPageComponent from "./components/editPageComponent";
import batchInject from "./components/batchInject";
import { getStorage } from "@/utils/auth";

import {
  options,
  pro_type,
  MediaRating,
  contentType,
  definition,
} from "@/utils/getOptions";
import { filterItems, formatSeconds } from "@/utils/myPublic";

const ruleForm = {
  id: "",
  name: null,
  media_verpic: "",
  media_horpic: "",
  pro_type: null,
  MediaRating: null,
  focus: "",
};
const injectRuleForm = {
  storage_id: "",
  cooperative: "",
  taskLevel: "",
  serial_num: null,
  media_id: null,
  classify: "",
  originalCategory: "",
  is_charge: "",
  date: [],
  timing: "",
};

export default {
  name: "materialManage",
  components: {
    Pagination,
    SelectItmeRemote,
    SelectItme,
    uploadImage,
    autocompleteSmart,
    editPageComponent,
    batchInject,
    videoComponent,
  },
  data() {
    return {
      saveLoading: false,
      flag: false,
      header_flag: false,
      tip: "",
      show3: false,
      dialogInjectVisible: false,
      injectRuleForm: Object.assign({}, injectRuleForm),
      injectRules: {
        cooperative: [
          { required: true, message: "请选择合作商", trigger: "change" },
        ],
        timing: [{ required: true, message: "请选择", trigger: "change" }],
        date: [{ required: true, message: "请选择", trigger: "change" }],
        taskLevel: [
          { required: true, message: "请选择等级", trigger: "change" },
        ],
      },
      media_id: "",
      episode_id: "",
      MediaRating,
      contentType,
      options,
      pro_type,
      definition,
      dialogInfoVisible: false,
      form: {
        name: "",
        region: "",
        years: "",
        classify: "",
        sort: "",
      },

      dialogVisibleEdit: false,
      total: 0,
      listQuery: { page: 1, limit: 20 },
      tableData: [],
      ruleForm: Object.assign({}, ruleForm),
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        media_verpic: [
          { required: true, message: "请选择图片", trigger: "blur" },
        ],
        media_horpic: [
          { required: true, message: "请选择图片", trigger: "blur" },
        ],
        pro_type: [{ required: true, message: "请选择版本", trigger: "blur" }],
        MediaRating: [
          { required: true, message: "请选择影片等级", trigger: "blur" },
        ],
        focus: [{ required: true, message: "请输入看点", trigger: "blur" }],
      },
      dialogVisible: false,
      videoUrl: "",
      episodeList: [
        {
          start_serial_num: null,
          end_serial_num: null,
          times: [],
        },
      ],
      multipleSelection: [],
      injectType: "发起注入",
      partner_title: "",
      alias: "",
      mediaTypeErrMsg: "所选合作商不支持该媒体类型，请选择变更媒体类型",
      channelOptions: [],
      saveFlag: false,
      is_set_effective_time: false,
      isTiming: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
    };
  },
  computed: {
    disabled() {
      if (this.flag || this.header_flag || !this.injectRuleForm.cooperative) {
        return true;
      } else {
        return false;
      }
    },
    fristItem() {
      return this.multipleSelection[0];
    },
    getType() {
      return this.injectType == "发起注入" ? "taskLevel" : "batchTaskLevel";
    },
  },
  mounted() {
    this.injectorMediaExtList();
  },
  methods: {
    handelChange(data) {
      this.is_set_effective_time = data && data.is_set_effective_time;
      this.partner_title = data && data.label;
      this.alias = data && data.alias;
      if (data) {
        this.injectorTaskCanAdd();
        this.injected();
      } else {
        this.flag = false;
        this.tip = "";
      }
      if (data && data.is_set_effective_time) {
        this.imdbGetEpisodeEffectiveTime();
      }
    },
    async injected() {
      const { cooperative: partner_id, media_id } = this.injectRuleForm;
      const res = await this.$store.dispatch("injector/injected", {
        media_id,
        partner_id,
        alias: this.alias,
      });
      if (res.code == 0) {
        const { value } = res.category || {};
        const { value: chargeVal } = res.is_charge || {};
        this.channelOptions = (res && res.channel) || [];
        this.saveFlag = res.save;
        this.injectRuleForm.classify = value;
        this.injectRuleForm.is_charge = chargeVal;
      }
    },
    checkMediaType() {
      const {
        classify, //媒体类型新值
        originalCategory, //媒体类型原始值
      } = this.injectRuleForm;
      if (!classify) {
        const flag = this.channelOptions.some(
          (e) => e.value == originalCategory
        );
        return !flag;
      }
    },
    check() {
      return this.saveFlag;
    },
    async injected_post() {
      const {
        cooperative: partner_id, //合作商ID
        is_charge, //是否付费新值
        classify, //媒体类型新值
        media_id, //媒体ID
        originalCategory, //媒体类型原始值
      } = this.injectRuleForm;
      const category = classify || originalCategory;
      const res = await this.$store.dispatch("injector/injected_post", {
        media_id,
        partner_id,
        category,
        is_charge,
      });
      return new Promise((resolve, reject) => {
        if (res.code == 0) {
          resolve({
            status: "succeed",
          });
        } else {
          reject({
            status: "failing",
          });
        }
      });
    },
    filterItems,
    formatSeconds,
    checkboxT(row) {
      return row.isChecked !== false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelect(list, row) {
      if (list.length) {
        for (const item of this.tableData) {
          if (item.media_id !== row.media_id) {
            item.isChecked = false;
          }
        }
      } else {
        for (const item of this.tableData) {
          item.isChecked = true;
        }
      }
    },
    handleSelectAll(val) {
      if (val.length) {
        const [fristItem] = val;
        for (const item of this.tableData) {
          if (item.media_id !== fristItem.media_id) {
            item.isChecked = false;
            this.$refs.multipleTable.toggleRowSelection(item, false);
          }
        }
      } else {
        for (const item of this.tableData) {
          item.isChecked = true;
        }
      }
    },
    async changeDate() {
      if (!this.injectRuleForm.date) {
        return this.$message.warning("日期不能为空");
      }
      const body = [
        {
          media_id: this.injectRuleForm.media_id,
          partner_id: this.injectRuleForm.cooperative,
          start_date: this.injectRuleForm.date && this.injectRuleForm.date[0],
          end_date: this.injectRuleForm.date && this.injectRuleForm.date[1],
          start_serial_num: this.injectRuleForm.serial_num * 1,
          end_serial_num: this.injectRuleForm.serial_num * 1,
        },
      ];
      const res = await this.$store.dispatch(
        "injector/imdbSetEpisodeEffectiveTime",
        body
      );
      if (!(res && res.code === 0)) {
        this.$message.error("设置有效时间失败");
      } else {
        this.$message.success("设置成功");
      }
    },
    handlePush() {
      this.episodeList.push({
        start_serial_num: null,
        end_serial_num: null,
        times: [],
      });
    },
    delectEntry(i) {
      this.episodeList.splice(i, 1);
    },
    async postSet() {
      const body = [];
      if (!this.injectRuleForm.media_id) {
        return this.$message.warning("媒体ID不存在");
      }
      if (!this.injectRuleForm.cooperative) {
        return this.$message.warning("合作商不存在");
      }
      if (!this.episodeList.length) {
        return;
      }
      for (const item of this.episodeList) {
        if (!item.start_serial_num) {
          return this.$message.warning("开始集数不能为空");
        }
        if (!item.end_serial_num) {
          return this.$message.warning("结束集数不能为空");
        }
        if (item.start_serial_num * 1 > item.end_serial_num * 1) {
          return this.$message.warning("开始集数不能大于结束集数");
        }
        if (!item.times || !item.times.length) {
          return this.$message.warning("日期不能为空");
        }
        body.push({
          media_id: this.injectRuleForm.media_id,
          partner_id: this.injectRuleForm.cooperative,
          start_date: item.times[0],
          end_date: item.times[1],
          start_serial_num: item.start_serial_num,
          end_serial_num: item.end_serial_num,
        });
      }
      const res = await this.$store.dispatch(
        "injector/imdbSetEpisodeEffectiveTime",
        body
      );
      if (res && res.code === 0) {
        this.imdbGetEpisodeEffectiveTime();
        this.$message.success("设置成功");
        this.show3 = false;
      }
    },
    async imdbGetEpisodeEffectiveTime() {
      const body = {
        media_id: this.injectRuleForm.media_id,
        serial_num: this.injectRuleForm.serial_num,
        partner_id: this.injectRuleForm.cooperative,
      };
      if (!body.media_id) {
        return this.$message.warning("媒体ID不存在");
      }
      if (!body.serial_num) {
        return this.$message.warning("分集不存在");
      }
      if (!body.partner_id) {
        return this.$message.warning("合作商不能为空");
      }
      const res = await this.$store.dispatch(
        "injector/imdbGetEpisodeEffectiveTime",
        body
      );
      this.injectRuleForm.date = [];
      if (res && res.code === 0) {
        const data = res.data || {};
        if (data.start_date && data.end_date) {
          this.injectRuleForm.date = [data.start_date, data.end_date];
        }
      }
    },
    onSuccess(data) {
      if (data.next === "done") {
        this.dialogInfoVisible = false;
        this.injectorMediaExtList();
      }
    },
    async handelInject(row, type) {
      if (type) {
        this.injectType = "批量注入";
      } else {
        this.injectType = "发起注入";
      }
      this.injectRuleForm = JSON.parse(JSON.stringify(injectRuleForm));
      this.dialogInjectVisible = true;
      this.isTiming = false;
      this.show3 = false;
      this.episodeList = [
        {
          start_serial_num: null,
          end_serial_num: null,
          times: [],
        },
      ];
      this.injectRuleForm.storage_id = row.id;
      this.injectRuleForm.media_name = row.media && row.media.name;
      this.injectRuleForm.serial_num = row.episode && row.episode.serial_num;
      this.injectRuleForm.media_id = row.media_id;
      this.injectRuleForm.originalCategory = row.media && row.media.category;
    },

    async injectorTaskCanAdd() {
      this.flag = false;
      const res = await this.$store.dispatch("injector/injectorTaskCanAdd", {
        media_id: this.injectRuleForm.media_id,
        partner_id: this.injectRuleForm.cooperative,
      });
      if (res.code === 0) {
        const data = res.data || {};
        this.flag = data.flag;
        this.header_flag = data.header_flag;
        if (this.header_flag) {
          this.tip = data.tip;
        } else {
          this.tip = "";
        }
      }
    },
    async handelInjectHead() {
      if (this.is_set_effective_time) {
        const { date } = this.injectRuleForm;
        if ((Array.isArray(date) && date.length == 0) || date === null) {
          return this.$message.warning("日期不能为空");
        }
      }
      const { taskLevel: level } = this.injectRuleForm;
      if (!level) {
        return this.$message.error("请选择等级");
      }
      if (this.checkMediaType()) {
        return this.$message.error(this.mediaTypeErrMsg);
      }
      if (this.check()) {
        const r = await this.injected_post();
        if (r.status == "failing") {
          return;
        }
      }
      const { media_id, is_charge } = this.injectRuleForm;
      const category = this.injectRuleForm.classify;
      const { cooperative: partner_id } = this.injectRuleForm;
      const res = await this.$store.dispatch("injector/injectorSeriesPost", {
        media_id,
        partner_id,
        level,
        is_charge,
        category: category || undefined,
      });
      if (res.code === 0) {
        this.injectorTaskCanAdd();
      }
    },
    submitInject(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.checkMediaType()) {
            return this.$message.error(this.mediaTypeErrMsg);
          }
          if (this.check()) {
            const r = await this.injected_post();
            if (r.status == "failing") {
              return;
            }
          }
          const {
            storage_id,
            cooperative: partner_id,
            taskLevel: level,
            timing: datetime,
          } = this.injectRuleForm;
          const { partner_title } = this;
          const { uid } = getStorage("userInfo") || {};

          if (this.injectType === "批量注入") {
            for (const item of this.multipleSelection) {
              item.partner_id = partner_id;
              item.partner_title = partner_title;
              item.level = level;
              // item.level_title = level_title;
              item.uid = uid;
              item.storage_id = item.id;
            }
            this.$refs.batchInject.getList();
            this.dialogInjectVisible = false;
            return;
          }

          const body = {
            storage_id,
            partner_id,
            level,
            uid,
            datetime,
          };
          this.saveLoading = true;
          const res = await this.$store.dispatch(
            "injector/injectorTaskAdd",
            body
          );
          this.saveLoading = false;
          if (res && res.code === 0) {
            this.$message.success("注入已发起");
            this.dialogInjectVisible = false;
          } else {
            this.$message.error(res.desc);
          }
        }
      });
    },
    handelPreview(row) {
      this.videoUrl = row.url;
      this.dialogVisible = true;
    },
    handelSearch() {
      this.listQuery.page = 1;
      this.injectorMediaExtList();
    },
    async injectorMediaSearchExt() {
      const [start_year, end_year] = this.form.years.split("-") || [];
      const {
        form: { name, region: region_id, classify: category, sort },
        listQuery: { page, limit: page_size },
      } = this;
      const body = {
        name, //名称                    【非必传】
        start_year,
        end_year,
        region_id: region_id || undefined, //int 国家或地区id          【非必传】
        category: category || undefined,
        sort: sort || undefined,
        page, //当前页，默认1           【非必传】
        page_size, //每页条数，默认20     【非必传】
      };
      const res = await this.$store.dispatch(
        "injector/injectorMediaSearchExt",
        body
      );
      if (res && res.code === 0) {
        const data = res.data || {};
        this.tableData = data.data_list || [];
        this.total = data.total_page * page_size || 0;
      }
    },
    //列表
    async injectorMediaExtList() {
      for (const item of Object.values(this.form)) {
        if (item) {
          return this.injectorMediaSearchExt();
        }
      }
      const { page, limit: page_size } = this.listQuery;
      const body = {
        page,
        page_size,
        is_show_all: 1,
      };
      const res = await this.$store.dispatch(
        "injector/injectorStorageList",
        body
      );
      if (res.code === 0) {
        const data = res.data || {};
        this.tableData = data.data_list || [];
        this.total = data.total_page * page_size;
      }
    },
    async injectorMediaExtField(body) {
      const res = await this.$store.dispatch(
        "injector/injectorMediaExtField",
        body
      );
      if (res.code === 0) {
        this.dialogVisibleEdit = false;
        this.$message.success("操作成功");
        this.injectorMediaExtList();
      }
    },
    async injectorMediaEditMediaExtField(body) {
      const res = await this.$store.dispatch(
        "injector/injectorMediaEditMediaExtField",
        body
      );
      if (res.code === 0) {
        this.dialogVisibleEdit = false;
        this.$message.success("操作成功");
        this.injectorMediaExtList();
      }
    },
    getList() {
      this.injectorMediaExtList();
    },
    handelEdit(row) {
      this.dialogInfoVisible = true;
      this.media_id = row.media_id;
      this.episode_id = row.episode_id;
      this.storage_id = row.id;
    },
    handelDel(row) {
      // console.log(row.id)
      this.$confirm("确认删除该媒体库文件?", "提示", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$store.dispatch("injector/storage_delete", {
            storage_ids: [row.id],
          });
          if (res && res.code === 0) {
            this.$message.success("删除成功");
            this.injectorMediaExtList();
          }
        })
        .catch(() => {});
    },
    taskLevelChange(val) {
      this.isTiming = val.value === 7;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-16 {
  padding-bottom: 16px;
}
.mb-16 {
  margin-bottom: 16px;
}
.display-flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
::v-deep .custom-dialog {
  .el-dialog__body {
    padding: 0 20px;
  }
}
::v-deep .el-card__body {
  padding: 0px;
}
.transition-box {
  margin-bottom: 10px;
}
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-right {
    font-size: 24px;
  }
}
</style>
