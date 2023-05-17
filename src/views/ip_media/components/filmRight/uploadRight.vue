<template>
  <div>
    <el-alert
      title="温馨提示"
      type="warning"
      :closable="false"
      :show-icon="false"
    >
      <template slot='title'>
        <div v-if="uploadType === 'product'" >
          <div class="iconSize"><i class="el-icon-warning" style="margin-right: 5px"></i>注意: 1.需绑定产品ID，并且自己绑定好对应关系</div>
          <div class="iconSize" style="margin-left: 52px;">2.按照模板进行录入</div>
          <div class="iconSize" style="margin-left: 52px;">3.如不按规定录入，将批量导入失败</div>
        </div>
        <div v-else>
          <div class="iconSize"><i class="el-icon-warning" style="margin-right: 5px"></i>注意: 1.自己维护唯一ID，并做好绑定关系</div>
          <div class="iconSize" style="margin-left: 52px;">2.版权基本信息与权利明细是一对多关系</div>
          <div class="iconSize" style="margin-left: 52px;">3.请按照模板修改上传execl,否则可能导入失败！</div>
        </div>
        <div class="iconSize" style="margin-left: 0;">
          <el-link v-if="uploadType === 'product'" href="/file/产品版权导入模板.xlsx" download="产品版权导入模板.xlsx" type="primary"
          >模板下载</el-link>
          <el-link v-else href="/file/流程中版权导入模板.xlsx" download="流程中版权导入模板.xlsx" type="primary"
          >模板下载</el-link>
        </div>
      </template>
    </el-alert>
    <el-form
      class="app-container"
      ref="uploadForm"
      label-width="80px"
    >
      <el-form-item label="导入文件" prop="">
        <el-upload
          class="upload"
          name="file"
          drag
          accept=".xlsx, .xls"
          action="#"
          :limit="1"
          :multiple="false"
          :on-remove="handleRemove"
          :http-request="uploadSectionFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<!--          <div class="el-upload__tip" slot="tip"></div>-->
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItme";
import SelectItemRemote from "@/components/SelectItmeRemote";
import XLSX from "xlsx";

export default {
  components: {
    SelectItem,
    SelectItemRemote,
  },
  props: {
    uploadType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    async uploadSectionFile(params) {
      this.file = params.file;
      // console.log(params)
    },
    handleRemove() {
      this.file = null
    },
    submitForm() {
      if (this.file) {
        this.uploadData()
      } else {
        this.$message.error('请先选择文件')
      }
    },
    //  导入数据
    async uploadData() {
      const file = this.file
      if (!await this.readerData(this.file)) {
        this.$message.error('文件不匹配，请在模板文件上整理数据后上传。')
        return
      }
      const url = this.uploadType === 'product' ? 'property/importCopyright' : 'property/importDraftCopyright'
      const res = await this.$store.dispatch(
        url,
        {file}
      );
      if (!res.code) {
        this.$message.success(res.desc)
        this.$emit('getUploadResult', false)
      }
    },
    readerData(rawFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          resolve(worksheet.AZ1 && worksheet.AZ1.v && worksheet.AZ1.v === 'verify');
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-top: 0;
}

</style>
