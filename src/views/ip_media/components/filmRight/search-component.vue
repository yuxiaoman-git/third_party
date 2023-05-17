<template>
  <div>
    <el-form :inline="true" :model="formInline" @submit.native.prevent
             style="display: flex;justify-content: space-between;width: 100%"
             class="searchBar"
    >
      <div>
        <el-form-item label="节目名称">
          <el-input v-model="formInline.media_name" placeholder="请输入节目名称" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="授权链是否完整">
          <SelectItme
            collapse-tags
            type="rightP_copyright_chain"
            v-model="formInline.copyright_chain"
            width="90px"
          />
        </el-form-item>
        <el-form-item label="类型">
          <SelectItme
            collapse-tags
            type="rightP_type"
            v-model="formInline.type"
            width="120px"
          />
        </el-form-item>
        <el-form-item label="授权时间">
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 230px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态标签">
          <SelectItme
            multiple
            collapse-tags
            type="rightP_status_label"
            v-model="formInline.status_label"
            width="150px"
          />
        </el-form-item>
        <el-form-item label="授权区域">
          <SelectItme
            type="rightP_authorized_area"
            multiple
            collapse-tags
            v-model="formInline.authorized_area_"
            width="200px"
            style="overflow: hidden"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="handleQuery()"
          >查询
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme";
import SelectItmeRemote from "@/components/SelectItmeRemote";

const formInline = {
  time: [],
  type: null,
  status_label: null,
  authorized_area_: null,
  copyrightP_chain: null,
  media_name: '',
};
export default {
  components: {
    SelectItme,
    SelectItmeRemote,
  },
  data() {
    return {
      dialogVisible: false,
      formInline: JSON.parse(
        JSON.stringify(Object.assign({}, formInline))
      ),
    };
  },
  methods: {
    async handleQuery() {
      const body = {};
      body.media_name = this.formInline.media_name;
      body.type = this.formInline.type && this.formInline.type.value;
      body.copyright_chain = this.formInline.copyright_chain && this.formInline.copyright_chain.value;

      body.status_label = this.formInline.status_label && this.formInline.status_label.map((item) => {
        return item.value;
      }).toString();
      body.authorized_area = this.formInline.authorized_area_ && this.formInline.authorized_area_.map((item) => {
        return item.value;
      }).toString();
      if (this.formInline.time && this.formInline.time.length) {
        body.authorize_start_at = this.formInline.time[0];
        body.authorize_end_at = this.formInline.time[1];
      }
      this.$emit("getData", body);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-top: 0;
}

::v-deep .el-dropdown .el-dropdown__caret-button {
  height: 32px;
}
::v-deep .searchBar{
  .el-tag.el-tag--info{
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>
