<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          @submit.native.prevent
          label-width="80px"
        >
          <el-form-item label="名称">
            <el-input placeholder="名称" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" @click="handelSearch"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="right">
        <el-dropdown @command="handleCommand" v-if="$checkPermission(['edit'])">
          <el-button type="primary">
            批量导入<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" style="width: 140px">
            <el-dropdown-item command="title"
              >批量导入分集文本</el-dropdown-item
            >
            <el-dropdown-item command="img">批量导入分集海报</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: max-content"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
    >
      <el-table-column prop="id" label="ID" width="70"> </el-table-column>
      <el-table-column prop="media.id" label="媒体ID" width="60">
      </el-table-column>
      <el-table-column label="海报">
        <template slot-scope="{ row }">
          <uploadImage
            @returnBack="returnBack(row)"
            v-model="row.episode_horpic"
            width="50px"
            height="40px"
            img-type="horizontal"
          ></uploadImage>
        </template>
      </el-table-column>
      <el-table-column prop="horpic_size" width="100" label="海报尺寸"> </el-table-column>
      <el-table-column label="名称" width="160" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.media.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="分集标题"
        show-overflow-tooltip
        width="280"
      >
        <template slot-scope="{ row }">
          <el-input
            v-if="row.titleEdit"
            type="textarea"
            :rows="4"
            v-focus="'textarea'"
            placeholder="请输入"
            @blur.stop="handelSubmit(row, 'title')"
            v-model="row.title"
          >
          </el-input>
          <span v-else>
            <span>{{ row.title }}</span>
            <i
              @click.stop="handelEdit(row, 'title')"
              v-if="row.titleEditIcon"
              class="el-icon-edit"
            ></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="简介"
        width="380"
        prop="storyline"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input
              type="textarea"
              :rows="4"
              v-focus="'textarea'"
              placeholder="请输入"
              @blur.stop="handelSubmit(row, 'storyline')"
              v-model="row.storyline"
            >
            </el-input>
          </template>
          <template v-else>
            <span>
              {{ row.storyline }}
            </span>
            <i
              @click.stop="handelEdit(row, 'storyline')"
              class="el-icon-edit"
              v-if="row.storylineEditIcon"
            ></i>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="80" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ filterItems(row.media.category).label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="第几集" width="70" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.serial_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="languages"
        label="语言"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.media.languages }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="year" label="年份" width="60">
        <template slot-scope="{ row }">
          <span>{{ row.media.year }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="{ row }">
          <div class="operate-btn" v-if="$checkPermission(['edit'])">
            <span @click="imdbEpisodeDetail(row)">修改</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <new-template-dialog
      v-bind.sync="importTitleObj"
      v-if="importTitleObj.show"
      title="导入分集文本"
      width="700px"
      @save="saveTitle"
    >
      <div>
        <el-alert
          title="温馨提示：导入excel，第一列标题：分集序号，第二列标题：分集标题，第三列标题：分集简介，只需导入下方表格前三列数据。"
          type="warning"
          :closable="false"
          show-icon
        >
        </el-alert>
        <el-form
          :model="elForm"
          :rules="elRule"
          class="app-container"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="媒体名称" prop="mediaObj">
            <SelectItmeRemote
              width="100%"
              type="checkMovie"
              remote
              v-model="elForm.mediaObj"
              @change="onchange"
            />
          </el-form-item>
          <el-form-item label="文件" prop="">
            <upload-excel-component
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            />
          </el-form-item>
          <el-form-item label="更新方式" prop="is_charge">
            <el-radio-group v-model="elForm.mode">
              <el-radio
                label="soft">软更</el-radio>
              <el-radio
                label="hard">硬更</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-table
            :data="results"
            border
            highlight-current-row
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              v-for="(item, i) of tableHeader"
              :key="item"
              :prop="item"
              :label="item"
              :width="i == 0 ? '80' : undefined"
            />
            <el-table-column prop="episode_id" width="80" label="分集ID" />
            <el-table-column label="匹配分集" width="130">
              <template slot-scope="{ row }">
                <span v-if="!row.episode_id">
                  <el-link :underline="false" type="danger"
                    >未匹配到分集ID</el-link
                  >
                </span>
                <i v-else class="el-icon-check el-icon-success light"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </new-template-dialog>
    <new-template-dialog
      v-bind.sync="importImgObj"
      v-if="importImgObj.show"
      title="导入分集海报"
      width="800px"
      @save="saveImg"
    >
      <div>
        <batch-img-dialog
          @on-success="onSuccess"
          @on-loading="onLoading"
          ref="batchImg"
        ></batch-img-dialog>
      </div>
    </new-template-dialog>
    <el-dialog
      :title="dialogType === 'new' ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="600px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="85px"
      >
        <el-form-item label="媒体" prop="name">
          <SelectItmeRemote
            width="100%"
            type="checkMovie"
            remote
            v-model="ruleForm.name"
            disabled
          />
        </el-form-item>
        <el-form-item label="第几集">
          <el-input
            type="text"
            v-model="ruleForm.serial_num"
            v-enter-number="0"
            disabled
            placeholder="第几集"
          ></el-input>
        </el-form-item>
        <el-form-item label="分集标题" prop="title">
          <el-input
            type="textarea"
            maxlength="128"
            show-word-limit
            v-model="ruleForm.title"
            placeholder="分集标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="海报" prop="episode_horpic">
          <span slot="label">
            <span>海报</span>
            <div style="line-height: 1" v-show="ver_size">{{ ver_size }}</div>
          </span>
          <uploadImage
            @getSize="getSize"
            v-model="ruleForm.episode_horpic"
            img-type="horizontal"
          ></uploadImage>
        </el-form-item>
        <div>
          <ImgList
            v-model="ruleForm.episode_horpic"
            :mediaId="ruleForm.name && ruleForm.name.value"
          />
        </div>

        <el-form-item label="简介" prop="storyline">
          <el-input
            type="textarea"
            placeholder="简介"
            v-model.trim="ruleForm.storyline"
            maxlength="128"
            :autosize="{ minRows: 4, maxRows: 8 }"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NewTemplateDialog from "@/components/NewTemplateDialog";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import batchImgDialog from "./components/batchImgDialog.vue";
import Pagination from "@/components/Pagination";
import uploadImage from "@/components/uploadImage";
import ImgPreview from "@/components/ImgPreview";
import ImgList from "@/components/imgList";
import SelectItmeRemote from "@/components/SelectItmeRemote";
import { options } from "@/utils/getOptions";
import { getImageSize } from "@/utils/myPublic";
const ruleForm = {
  name: null,
  title: "",
  storyline: "",
  id: "",
  serial_num: "",
  episode_horpic: "",
};
export default {
  name: "diversityManage",
  components: {
    Pagination,
    uploadImage,
    ImgPreview,
    SelectItmeRemote,
    ImgList,
    NewTemplateDialog,
    UploadExcelComponent,
    batchImgDialog,
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: "new",
      listQuery: { page: 1, limit: 20 },
      total: 0,
      tableData: [],
      ruleForm: Object.assign({}, ruleForm),
      rules: {},
      ver_size: "",
      form: {
        name: "",
      },
      importTitleObj: {
        show: false,
        loading: false,
      },
      importImgObj: {
        show: false,
        loading: false,
      },
      elForm: {
        mode: 'soft'
      },
      elRule: {
        mediaObj: [{ required: true, message: "请选择", trigger: "change" }],
      },
      results: [],
      tableHeader: ["分集序号", "分集标题", "分集简介"],
      episodeList: [],
    };
  },
  watch: {
    "importTitleObj.show": {
      handler(n) {
        if (!n) {
          this.elForm.mediaObj = null;
          this.results = [];
        }
      },
    },
  },
  mounted() {
    this.handelSearch();
  },
  methods: {
    onSuccess() {
      this.importImgObj.show = false;
      this.handelSearch();
    },
    onLoading(flag) {
      this.importImgObj.loading = flag;
    },
    async onchange() {
      if (!(this.elForm.mediaObj && this.elForm.mediaObj.id)) {
        return;
      }
      const res = await this.$store.dispatch("injector/imdbSearchEpisode", {
        serial_num: "",
        media_id: this.elForm.mediaObj.id,
      });
      if (res.code === 0) {
        this.episodeList = res.data || [];
        this.getResults();
      }
    },
    handleCommand(command) {
      if (command == "title") {
        this.importTitleObj.show = true;
      }
      if (command == "img") {
        this.importImgObj.show = true;
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableHeader = header;
      this.results = results;
      this.getResults();
    },
    getResults() {
      const [serial] = this.tableHeader;
      this.results.forEach((e) => {
        const serial_num = e[serial];
        this.$set(e, "episode_id", undefined);
        this.episodeList.forEach((el) => {
          if (serial_num == el.serial_num) {
            this.$set(e, "episode_id", el.id);
          }
        });
      });
    },
    saveTitle() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const flag = this.results.some((e) => !e.episode_id);
          if (flag) {
            return this.$message.error("存在未匹配到分集ID，请检查");
          }
          if (this.results.length == 0) {
            return this.$message.error("请导入文件");
          }
          const [, serial_title, serial_brief] = this.tableHeader;
          const episodes = [];
          this.results.forEach((e) => {
            const episode_id = e["episode_id"]; //分集ID
            const title = e[serial_title];
            const brief = e[serial_brief];
            episodes.push({
              id: episode_id,
              title: title || "",
              storyline: brief || ""
            });
          });
          this.imdb_bulk_episode({
            episodes,
            mode: this.elForm.mode,
          });
        }
      });
    },
    saveImg() {
      this.$refs.batchImg.submitForm();
    },
    async imdb_bulk_episode(body) {
      this.importTitleObj.loading = true;
      const res = await this.$store.dispatch(
        "injector/imdb_bulk_episode",
        body
      );
      this.importTitleObj.loading = false;
      if (res.code === 0) {
        this.$message.success("操作成功");
        this.importTitleObj.show = false;
        this.handelSearch();
      }
    },
    cellMouseEnter(row, column) {
      if (column.property === "storyline") {
        this.$set(row, "storylineEditIcon", true);
      }
      if (column.property === "title") {
        this.$set(row, "titleEditIcon", true);
      }
    },
    cellMouseLeave(row, column) {
      if (column.property === "storyline") {
        this.$set(row, "storylineEditIcon", false);
      }
      if (column.property === "title") {
        this.$set(row, "titleEditIcon", false);
      }
    },
    async returnBack(row) {
      const res = await getImageSize(row.episode_horpic);
      const horpic_size = res && res.size;
      const body = {
        episode_id: row.id,
        storyline: row.storyline,
        serial_num: row.serial_num,
        episode_horpic: row.episode_horpic,
        title: row.title,
        media_id: row.media.id,
        horpic_size: horpic_size,
      };
      this.imdbEditEpisode(body);
    },
    handelEdit(row, type) {
      if (type == "storyline") {
        this.$set(row, "edit", true);
        this.$set(row, "originalStoryline", row.storyline);
      }
      if (type == "title") {
        this.$set(row, "titleEdit", true);
        this.$set(row, "originalTitle", row.title);
      }
    },
    handelSubmit(row, type) {
      if (row.storyline === row.originalStoryline && type == "storyline") {
        this.$set(row, "edit", false);
        return;
      }
      if (type === "title" && row.title === row.originalTitle) {
        this.$set(row, "titleEdit", false);

        return;
      }
      this.imdbEditEpisode({
        episode_id: row.id,
        storyline: row.storyline,
        serial_num: row.serial_num,
        episode_horpic: row.episode_horpic,
        title: row.title,
        media_id: row.media.id,
        horpic_size: row.horpic_size,
      });
    },
    getSize(data) {
      this.ver_size = data;
    },
    filterItems(category) {
      const list = options.filter((el) => el.value === category);
      if (list.length) {
        return list[0];
      } else {
        return {};
      }
    },
    async handelSearch() {
      const body = {
        media_name: this.form.name,
        page: this.listQuery.page,
        page_size: this.listQuery.limit,
      };
      const res = await this.$store.dispatch(
        "media/imdbEpisode_searchByMedia",
        body
      );
      if (res && res.code === 0) {
        const data = res.data || {};
        this.total = data.total_page * this.listQuery.limit;
        this.tableData = data.data_list;
      }
    },
    getList() {
      this.handelSearch();
    },
    async imdbEpisodeDetail(row) {
      this.dialogVisible = true;
      this.dialogType = "edit";
      this.ruleForm = Object.assign({}, ruleForm);
      const body = {
        episode_id: row.id,
      };
      const res = await this.$store.dispatch(
        "injector/imdbEpisodeDetail",
        body
      );
      if (res && res.code === 0) {
        const data = res.data || {};
        this.ruleForm.id = data.id;
        this.ruleForm.name = {
          value: data.media.id,
          label: data.media.name,
        };
        this.ruleForm.serial_num = data.serial_num;
        this.ruleForm.episode_horpic = data.episode_horpic;
        this.ruleForm.storyline = data.storyline;
        this.ruleForm.title = data.title;
      }
    },
    async imdbEpisodeList() {
      const body = {
        page: this.listQuery.page,
        page_size: this.listQuery.limit,
      };
      const res = await this.$store.dispatch("injector/imdbEpisodeList", body);
      if (res && res.code === 0) {
        const data = res.data || {};
        this.total = data.total_page * this.listQuery.limit;
        this.tableData = data.data_list;
      }
    },
    addDiversity() {
      this.dialogVisible = true;
      this.dialogType = "new";
      this.ruleForm = Object.assign({}, ruleForm);
    },
    async imdbAddEpisode(body) {
      const res = await this.$store.dispatch("injector/imdbAddEpisode", body);
      if (res && res.code === 0) {
        this.dialogVisible = false;
        this.$message.success("操作成功");
        this.handelSearch();
      }
    },
    async imdbEditEpisode(body, isBatch) {
      const res = await this.$store.dispatch("injector/imdbEditEpisode", body);
      if (res && res.code === 0) {
        if (!isBatch) {
          this.dialogVisible = false;
          this.$message.success("操作成功");
          this.handelSearch();
        }
      }
    },
    submitEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.ruleForm.name || !this.ruleForm.name.value) {
            return this.$message.error("媒资不存在");
          }
          const body = {
            media_id: this.ruleForm.name && this.ruleForm.name.value,
            serial_num: this.ruleForm.serial_num,
            episode_horpic: this.ruleForm.episode_horpic,
            storyline: this.ruleForm.storyline,
            title: this.ruleForm.title,
            horpic_size: this.ver_size,
          };
          if (this.dialogType === "new") {
            this.imdbAddEpisode(body);
          } else if (this.dialogType === "edit") {
            body.episode_id = this.ruleForm.id;
            this.imdbEditEpisode(body);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  text-align: right;
}
.pb-16 {
  padding-bottom: 16px;
}
.span-style {
  cursor: pointer;
  color: #409eff;
}
.color {
  color: #c0c4cc;
}
.ml-7 {
  margin-left: 7px;
}
.mb-7 {
  margin-bottom: 7px;
}
.el-icon-edit {
  position: absolute;
  top: 7px;
  right: 11px;
  font-size: 16px;
  color: #409eff;
  cursor: pointer;
}
::v-deep .el-tooltip__popper {
  font-size: 12px;
  display: none;
}
.light {
  background-color: #f0f9eb;
  color: #67c23a;
}
</style>
