<template>
  <div>
    <el-form class="searchBar" :inline="true" :model="formInline"
             @submit.native.prevent>
      <el-form-item label="节目名称">
        <el-input v-model="formInline.media_name" placeholder="请输入节目名称" style="width: 140px"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <SelectItem
          type="rightP_type"
          v-model="formInline.type"
          width="140px"
        />
      </el-form-item>
      <el-form-item label="实体类型">
        <SelectItem
          type="rightP_entity_category"
          v-model="formInline.entity_category"
          width="140px"
          @change="getEntityData"
        />
      </el-form-item>
      <el-form-item label="实体">
        <el-select v-model="formInline.entity" placeholder="请选择"
                   clearable
                   multiple
                   collapse-tags
                   @change="changeEntity($event)"
                   style="width: 150px">
          <el-option
            v-for="item in entityData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权链是否完整">
        <SelectItem
          collapse-tags
          type="rightP_copyright_chain"
          v-model="formInline.copyright_chain"
          width="140px"
        />
      </el-form-item>
      <el-form-item label="转授权">
        <SelectItem
          type="rightP_with_granted"
          v-model="formInline.with_granted"
          width="140px"
        />
      </el-form-item>
      <el-form-item label="附加权">
        <SelectItem
          type="rightP_extra"
          v-model="formInline.extra"
          width="140px"
        />
      </el-form-item>
      <el-form-item label="授权方式">
        <SelectItem
          type="rightP_authorized_way"
          v-model="formInline.authorized_way"
          width="140px"
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
          style="width: 300px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="授权区域">
        <SelectItem
          type="rightP_authorized_area"
          multiple
          collapse-tags
          v-model="formInline.authorized_area"
          width="200px"
        />
      </el-form-item>
      <el-form-item label="状态标签">
        <SelectItem
          multiple
          collapse-tags
          type="rightP_status_label"
          v-model="formInline.status_label"
          width="180px"
        />
      </el-form-item>
      <el-form-item label="终端" prop="term">
        <SelectItem
          type="rightP_terminals"
          multiple
          collapse-tags
          v-model="formInline.terminals"
          width="240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="handleQuery()"
        >查询
        </el-button>
        <el-button type="primary" native-type="submit" :disabled="uploadObj.show" @click="handleUpload()"
                   v-if="$checkPermission(['edit'])"
        >导入
          <i v-if="uploadObj.show" class="el-icon-loading"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <new-template-dialog
      class="uploadDialog"
      v-bind.sync="uploadObj"
      v-if="uploadObj.show"
      title="导入产品版权"
      width="600px"
      @save="saveUpload"
    >
      <div>
        <uploadRight @getUploadResult="getUploadResult"
                     ref="uploadRight"
                     v-if="uploadObj.show"
                     uploadType="draft"
        ></uploadRight>
      </div>
    </new-template-dialog>
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItme";
import SelectItmeRemote from "@/components/SelectItmeRemote";
import uploadRight from "./uploadRight";
import NewTemplateDialog from "@/components/NewTemplateDialog";

const formInline = {
  time: [],
  classify: null,
  solo: null,
  contract: null,
  name: null,
  user: null,
  department: null,
  authorized_area: [],
  adds: null,
  term: null,
};
export default {
  name: 'search-rightDetail',
  components: {
    SelectItem,
    SelectItmeRemote,
    NewTemplateDialog,
    uploadRight
  },
  data() {
    return {
      dialogVisible: false,
      formInline: JSON.parse(
        JSON.stringify(Object.assign({}, formInline))
      ),
      entityData: [],
      uploadObj: {
        show: false,
        loading: false,
      },
    };
  },
  methods: {
    async handleQuery() {
      const body = {};

      body.media_name = this.formInline.media_name;
      body.type = this.formInline.type && this.formInline.type.value;
      body.authorized_way = this.formInline.authorized_way && this.formInline.authorized_way.value;
      body.status_label = this.formInline.status_label && this.formInline.status_label.map((item) => {
        return item.value;
      }).toString();
      body.copyright_chain = this.formInline.copyright_chain && this.formInline.copyright_chain.value;
      if (this.formInline.time && this.formInline.time.length) {
        body.authorize_start_at = this.formInline.time[0];
        body.authorize_end_at = this.formInline.time[1];
      }
      body.entity_category_id = this.formInline.entity_category && this.formInline.entity_category.value;
      // body.entity_id = this.formInline.entity;
      body.entity_id = this.formInline.entity && this.formInline.entity.map((item) => {
        return item;
      }).toString();
      body.with_granted = this.formInline.with_granted && this.formInline.with_granted.value;
      body.extra = this.formInline.extra && this.formInline.extra.value;
      body.terminals = this.formInline.terminals && this.formInline.terminals.map((item) => {
        return item.value;
      }).toString();
      body.authorized_area = this.formInline.authorized_area && this.formInline.authorized_area.map((item) => {
        return item.value;
      }).toString();
      // body.terminals = JSON.stringify(body.terminals)
      this.$emit("getData", body);
      this.dialogVisible = false;
    },
    async getEntityData() {
      this.formInline.entity = null
      const res = await this.$store.dispatch(
        "property/entitySearch",
        {category: this.formInline.entity_category && this.formInline.entity_category.value}
      );
      this.tableLoading = false;
      if (res.code === 0) {
        this.entityData = res.data.map(el => {
          return {
            label: el.name,
            value: el.id,
          }
        })
        this.entityData.unshift({
          label: '全部',
          value: 1
        })
      }
    },
    changeEntity(data) {
      if (data.indexOf(1) > -1) {
        this.formInline.entity = [1]
        this.entityData.forEach(val => {
          if (val.value !== 1) {
            val.disabled = true
          }
        })
      } else {
        this.entityData.forEach(val => {
          val.disabled = false
        })
      }
    },
    handleUpload() {
      this.uploadObj.show = true
    },
    saveUpload() {
      this.$refs.uploadRight.submitForm();
    },
    getUploadResult(flag) {
      this.uploadObj.show = flag
      this.handleQuery()
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
  .el-form-item--small{
    .el-form-item__label{
      min-width: 70px;
    }
  }
  .el-tag.el-tag--info{
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.uploadDialog ::v-deep.el-dialog{
  top: 40%;
  transform: translate(0, -50%);
}
</style>
