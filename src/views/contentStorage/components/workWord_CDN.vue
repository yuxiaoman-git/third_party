<template>
  <div>
    <div class="type" v-if="operateType === 'add'" style="padding-bottom: 30px;">
      <el-form
        :model="injectRuleForm"
        :rules="injectRules"
        ref="injectRuleForm"
        label-width="100px"
      >
        <div class="space-between" style="padding-bottom: 10px;">
          <div>
            <el-form-item label="等级" prop="level">
              <SelectItme
                type="batchTaskLevel"
                v-model="injectRuleForm.level"
                width="100%"
              />
            </el-form-item>
          </div>
          <div>
            <el-button
              type="success"
              @click.native.prevent="handleAdd('one')"
            >新增
            </el-button>
            <el-button
              type="primary"
              @click.native.prevent="handleAdd('excel')"
            >EXCEL导入
            </el-button>
            <el-link href="/file/CDN分集信息.xls" download="CDN分集信息.xls"
                     type="primary"
                     style="margin-left: 10px"
            >下载模板</el-link>
<!--            <a href="/file/CDN分集信息.xls" download="CDN分集信息.xls">下载模板</a>-->
          </div>
        </div>
        <p style="color: #F56C6C;font-size: 15px;margin-top: 0">请提前检查好需注入媒体信息、媒体扩展信息及分集信息的缺失字段</p>
        <p style="color: #42b983;">“复制”功能可创建下一集信息，且内容与当集前相同</p>
        <el-table
          :data="tableData"
          border
          size="mini"
          max-height="500px"
          ref="multipleTable"
        >
          <el-table-column prop="episode_id" label="ID" width="60"></el-table-column>
          <el-table-column prop="serial_num" label="分集序号" width="70"></el-table-column>
          <el-table-column prop="play_url" label="介质播放地址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="episode_verpic" label="分集变更竖图" show-overflow-tooltip></el-table-column>
          <el-table-column prop="episode_horpic" label="分集变更横图" show-overflow-tooltip></el-table-column>
          <el-table-column prop="storage_type" label="介质文件格式">
            <template slot-scope="{ row }">
              <span>{{ cdn_work_order.storage_type[row.storage_type] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="storage_definition" label="清晰度">
            <template slot-scope="{ row }">
              <span>{{ cdn_work_order.definition[row.storage_definition] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="上下线">
            <template slot-scope="{ row }">
              <span>{{ cdn_work_order.status[row.status] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="is_charge" label="是否收费">
            <template slot-scope="{ row }">
              <span>{{ cdn_work_order.is_charge[row.is_charge] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="{ row }">
              <div class="operate-btn">
                <span @click="handleEdit(row, 'edit')" v-if="$checkPermission(['edit'])">修改</span>
                <span @click="handleCopy(row)" v-if="$checkPermission(['edit'])">复制</span>
                <span @click="handleDel(row, 'del')" v-if="$checkPermission(['edit'])">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="margin-top: 20px">
          <el-col :span="24">
            <el-button
              type="primary"
              @click.native.prevent="submitAdd('injectRuleForm', 'submit')"
            >完 成
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="type" v-else>
      <el-divider content-position="left">分集信息</el-divider>
      <el-form
        :model="episodeInfo"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="分集序号">
              <el-input
                type="text"
                v-model="episodeInfo.serial_num"
                disabled
                style="width: 60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介" prop="storyline">
              <el-input
                type="textarea"
                disabled
                v-model.trim="episodeInfo.storyline"
                maxlength="128"
                show-word-limit
                style="width: 60%"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider content-position="left">CDN分集信息</el-divider>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        v-loading="loading"
        @submit.native.prevent="submitEdit('ruleForm', 'done')"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="介质播放地址" prop="play_url">
              <el-input
                :disabled="operateType === 'check'"
                v-model="ruleForm.play_url"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分集变更竖图" prop="episode_verpic">
              <el-input
                :disabled="operateType === 'check'"
                v-model="ruleForm.episode_verpic"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分集变更横图" prop="episode_horpic">
              <el-input
                :disabled="operateType === 'check'"
                v-model="ruleForm.episode_horpic"
              ></el-input>
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
          <el-col :span="12">
            <el-form-item label="是否收费" prop="is_charge">
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
            <el-form-item label="分集清晰度" prop="storage_definition">
              <SelectItme
                :disabled="operateType === 'check'"
                type="definition"
                v-model="ruleForm.storage_definition"
                width="60%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="介质文件格式" prop="storage_type">
              <SelectItme
                :disabled="operateType === 'check'"
                type="storage_type"
                v-model="ruleForm.storage_type"
                width="60%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="operateType != 'check'">
            <el-form-item>
              <el-button
                type="primary"
                @click.native.prevent="submitEdit('ruleForm', 'done')"
              >完 成
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      :title="dialogTitle"
      v-if="dialogAddVisible && operateType === 'add'"
      :visible.sync="dialogAddVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      custom-class="custom-dialog"
      width="650px"
      top="20px"
    >
      <cdnAdd
        :episodeList="episodeList"
        :fileInfoData="fileInfoData"
        :episode_id_arr="episode_id_arr"
        :currentData="currentData"
        v-on:getTableData="getTableData"
      ></cdnAdd>
    </el-dialog>

    <el-dialog
      title="EXCEL导入"
      v-if="importTitleObj.show"
      :visible.sync="importTitleObj.show"
      :close-on-click-modal="false"
      :append-to-body="true"
      custom-class="custom-dialog"
      width="650px"
      top="20px"
    >
      <div>
        <el-form
          :model="elForm"
          :rules="elRule"
          class="app-container"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="文件" prop="">
            <upload-excel-component
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
import cdnAdd from "./cdnAdd";
import store from "@/store";
import NewTemplateDialog from "@/components/NewTemplateDialog";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

const ruleForm = {
  id: "",
  play_url: '',
  episode_verpic: "",
  episode_horpic: "",
  storage_type: "",
  storage_definition: "",
  status: "",
  is_charge: "",
  storage_id: ""
};
const episodeInfo = {
  serial_num: '',
  storyline: ''
}
const injectRuleForm = {
  storage_id: "",
  cooperative: "",
  media_id: "",
  level: 1
};

export default {
  name: "workWord",
  components: {
    SelectItme,
    cdnAdd,
    UploadExcelComponent,
    NewTemplateDialog
  },
  props: {
    onSuccess: {
      type: Function,
    },
    infoObj: {
      type: [Array, Object]
    },
    episodeData: {
      type: [Array, Object]
    },
    operateType: {
      type: [String],
    },
    episodeList: {
      type: [Array, Object]
    },
    fileInfoData: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      ruleForm: Object.assign({}, ruleForm),
      episodeInfo: Object.assign({}, episodeInfo),
      loading: false,
      rules: {
        play_url: [{required: true, message: "请输入介质播放地址", trigger: "blur"}],
        episode_verpic: [
          {required: true, message: "请输入媒体竖图", trigger: "blur"},
        ],
        episode_horpic: [
          {required: true, message: "请输入媒体横图", trigger: "blur"},
        ],
        status: [
          {required: true, message: "请选择上下线", trigger: "change"},
        ],
        storage_definition: [
          {required: true, message: "请选择清晰度", trigger: "change"},
        ],
        is_charge: [
          {required: true, message: "请选择是否收费", trigger: "change"},
        ],
        storage_type: [
          {required: true, message: "请选择介质文件格式", trigger: "change"},
        ],
      },
      ver_size: "",
      hor_size: "",
      tableData: [],
      dialogAddVisible: false,
      dialogMulVisible: false,
      cdnConfig: [],
      cdn_work_order: [],
      tableHeader: ["分集序号", "介质播放地址", "分集变更竖图", "分集变更横图", "介质文件格式", "清晰度", "上下线", "是否收费"],
      multData: [],
      episode_id_arr: [],
      currentData: [],
      dialogTitle: '新增',
      injectRuleForm: Object.assign({}, injectRuleForm),
      injectRules: {
        level: [
          { required: true, message: "请选择等级", trigger: "change" },
        ],
      },

      importTitleObj: {
        show: false,
        loading: false,
      },
      elForm: {},
      elRule: {
      },
      results: [],
    };
  },
  mounted() {
    this.getCdnConfig()
  },
  methods: {
    //详情
    async getEpisodeInfo() {
      const episodeInfoData = this.episodeData || {};
      if (episodeInfoData.serial_num) {
        this.episodeInfo.serial_num = episodeInfoData.serial_num;
        this.episodeInfo.storyline = episodeInfoData.storyline;
        this.ruleForm.episode_id = episodeInfoData.id;
      }
      const data = this.infoObj || {};
      if (data.id) {
        this.ruleForm.work_id = data.id;
        this.ruleForm.play_url = data.play_url;
        this.ruleForm.episode_verpic = data.episode_verpic;
        this.ruleForm.episode_horpic = data.episode_horpic;
        this.ruleForm.storage_type = data.storage_type.toString();
        this.ruleForm.storage_id = data.storage_id;
        this.ruleForm.storage_definition = Number(data.storage_definition) || "";
        this.ruleForm.status = data.status;
        this.ruleForm.is_charge = data.is_charge;
      }
    },
    handleAdd(type) {
      if (type == 'one') {
        this.currentData = []
        this.dialogTitle = '新增'
        this.dialogAddVisible = true
      } else if (type == 'excel') {
        this.tableData = [];
        this.results = [];
        this.importTitleObj.show = true
      }
    },
    getTableData(data, type) {
      const index = this.tableData.findIndex(item => {
        return item.episode_id == data.episode_id
      })
      if (type === 'change') {
        this.tableData.splice(index, 1, data)
      } else {
        if (index >= 0) {
          this.$message.error('该分集已在当前表格')
        } else {
          this.tableData.push(data)
          this.episode_id_arr.push(data.episode_id)
        }
      }
      this.dialogAddVisible = false
    },
    async getCdnConfig() {
      const res = await store.dispatch("injector/cdnConfig", {});
      if (res.code === 0) {
        const data = res.data || {};
        this.cdnConfig = data
        this.cdn_work_order = data.cdn_work_order
      }
    },
    getBody(data, type) {
      if (type === 'edit') {
        return [{
          work_id: data.work_id,
          play_url: data.play_url,
          episode_verpic: data.episode_verpic,
          episode_horpic: data.episode_horpic,
          storage_type: data.storage_type,
          storage_definition: data.storage_definition,
          status: data.status,
          is_charge: data.is_charge,
          storage_id: data.storage_id,
          episode_id: data.episode_id
        }];
      } else {
        const array = []
        for (const i in data) {
          array.push({
            work_id: data[i].work_id,
            play_url: data[i].play_url,
            episode_verpic: data[i].episode_verpic,
            episode_horpic: data[i].episode_horpic,
            storage_type: data[i].storage_type,
            storage_definition: data[i].storage_definition,
            status: data[i].status,
            is_charge: data[i].is_charge,
            // storage_id: data[i].storage_id,
            episode_id: data[i].episode_id
          })
        }
        return array
      }
    },
    submitEdit(formName) {
      return new Promise((resolve) => {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const body = this.getBody(this.ruleForm, 'edit');
            this.$emit('getFormData', body, 'workWord')
            resolve(true);
          }
        });
      });
    },
    submitAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.tableData.length > 0) {
            const body = this.getBody(this.tableData, 'add');
            const level = this.injectRuleForm.level
            this.$emit('getFormData', body, 'workWord', level)
          } else {
            this.$message.error('请新增分集信息')
          }
        }
      });
    },
    handleEdit(data) {
      this.dialogTitle = '修改'
      this.currentData = data
      this.dialogAddVisible = true
    },
    handleDel(data) {
      const index = this.tableData.findIndex(item => {
        return item.episode_id == data.episode_id
      })
      this.tableData.splice(index, 1)
      this.episode_id_arr.splice(this.episode_id_arr.indexOf(data.episode_id), 1)
    },
    async handleCopy(data) {
      const data_ = JSON.parse(JSON.stringify(data))
      const serial_num = Number(data.serial_num) + 1;
      const episode = this.episodeList.filter(
        (el) => el.serial_num == serial_num
      )[0];
      if (episode) {
        if (this.episode_id_arr.indexOf(episode.id) > -1) {
          this.$message.error(serial_num + '分集已在当前表格')
          return
        } else if (await this.cdnExists(episode.id)) {
          this.$message.error('已创建过' + serial_num + '分集')
          return
        }
        data_.episode_id = episode.id
        data_.serial_num = serial_num
        this.tableData.push(data_)
        this.episode_id_arr.push(episode.id)
      } else {
        this.$message.error('不存在' + serial_num + '分集，请先去媒体管理处创建')
      }
    },
    async cdnExists(episode_id) {
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
        return data.is_created
      } else {
        return false
      }
    },

    saveTitle(serialNumArr) {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const flag = this.results.some((e) => !e.episode_id);
          if (flag) {
            return this.$message.error("存在未匹配到分集ID，请检查以下分集" + serialNumArr.join(',') );
          }
          if (this.results.length == 0) {
            return this.$message.error("请导入文件");
          }
          const [, serial_title] = this.tableHeader;
          const episodes = [];
          const that = this
          let goon = true
          this.results.forEach((e) => {
            const episode_id = e["episode_id"]; //分集ID
            const title = e[serial_title];
            const type = e['介质文件格式'];
            let storage_type = '';
            const definition = e['清晰度'];
            let storage_definition = '';
            const cdn_type = that.cdn_work_order.storage_type
            const cdn_definition = that.cdn_work_order.definition
            for (const i in cdn_type) {
              if (type == cdn_type[i]) {
                storage_type = i
                break
              }
            }
            for (const i in cdn_definition) {
              if (definition == cdn_definition[i]) {
                storage_definition = i
                break
              }
            }

            if (e['分集序号'].toString().trim() == '' || e['介质播放地址'].toString().trim() == '' ||
              e['分集变更竖图'].toString().trim() == '' || e['分集变更横图'].toString().trim() == '' ||
              e['分集序号'].toString().trim() == '' || storage_type.toString().trim() == '' ||
              storage_definition.toString().trim() == '' || e['上下线'].toString().trim() == '' ||
              e['是否收费'].toString().trim() == '' ) {
              goon = false
              this.$message.error("存在为空的必填字段，请检查excel表格！" );
            } else {
              episodes.push({
                episode_id: episode_id,
                title: title || "",
                serial_num: e['分集序号'],
                play_url: e['介质播放地址'],
                episode_verpic: e['分集变更竖图'],
                episode_horpic: e['分集变更横图'],
                storage_type,
                storage_definition,
                status: e['上下线'] == '上线' ? 1 : 0,
                is_charge: e['是否收费'] == '是' ? 1 : 0,
              });
            }
          });
          console.log(episodes)
          if (goon) {
            this.importTitleObj.show = false
            this.tableData = episodes
          }
        }
      });
    },

    handleSuccess({ results, header }) {
      this.tableHeader = header;
      this.results = results;
      this.getResults();
    },
    getResults() {
      const [serial] = this.tableHeader;
      const serialNumArr = []
      this.results.forEach((e) => {
        const serial_num = e[serial];
        this.$set(e, "episode_id", undefined);
        this.episodeList.forEach((el) => {
          if (serial_num == el.serial_num) {
            this.$set(e, "episode_id", el.id);
          }
        });
        if (!e.episode_id) {
          serialNumArr.push(serial_num)
        }
      });
      this.saveTitle(serialNumArr)
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

  },
};
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
