<template>
  <div>
    <el-form :inline="true" :model="formInline" @submit.native.prevent>
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
      <el-form-item label="类型">
        <SelectItme
          type="classify"
          v-model="formInline.classify"
          width="150px"
        />
      </el-form-item>
      <el-form-item label="授权性质">
        <SelectItme type="solo" v-model="formInline.solo" width="150px" />
      </el-form-item>
      <el-form-item>
        <el-dropdown
          size="small"
          split-button
          type="primary"
          native-type="submit"
          @click="handleQuery()"
          @command="handleQueryCommand"
        >
          查询
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">高级查询</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <el-dialog
      title="高级查询"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="500px"
    >
      <el-form :model="formInline" label-width="100px">
        <el-form-item label="授权时间">
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <SelectItme
            type="classify"
            v-model="formInline.classify"
            width="100%"
          />
        </el-form-item>
        <el-form-item label="排他">
          <SelectItme type="solo" v-model="formInline.solo" width="100%" />
        </el-form-item>
        <el-form-item label="区域">
          <SelectItme
            type="REGION"
            multiple
            v-model="formInline.area"
            width="100%"
          />
        </el-form-item>
        <el-form-item label="渠道类型">
          <SelectItme
            type="entity_exclude_area"
            v-model="formInline.entityType"
            width="100%"
          />
        </el-form-item>
        <el-form-item label="渠道选择">
          <el-select
            v-model="formInline.entity"
            multiple
            collapse-tags
            placeholder="请选择"
            style="width: 100%"
            @change="change"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排除定点采购">
          <SelectItme type="radio" v-model="formInline.desig" width="100%" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="handleQuery('more')"
          >查询</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme";
const formInline = {
  time: [],
  classify: null,
  solo: null,
};
const moreForm = {
  area: null,
  entityType: null,
  entity: null,
  desig: null,
};
export default {
  components: {
    SelectItme,
  },
  data() {
    return {
      dialogVisible: false,
      formInline: JSON.parse(
        JSON.stringify(Object.assign({}, formInline, moreForm))
      ),
      options: [],
    };
  },
  watch: {
    "formInline.entityType": {
      handler(obj) {
        this.formInline.entity = null;
        if (obj) {
          this.propertyEntityList(obj);
        }
      },
    },
  },
  methods: {
    async handleQuery(type) {
      if (!type) {
        this.formInline = Object.assign(
          this.formInline,
          JSON.parse(JSON.stringify(moreForm))
        );
      }

      const body = {};
      if (this.formInline.time && this.formInline.time.length) {
        body.start = this.formInline.time[0];
        body.end = this.formInline.time[1];
      }
      body.solo = this.formInline.solo && this.formInline.solo.value;
      body.classify =
        this.formInline.classify && this.formInline.classify.value;
      if (type === "more") {
        if (this.formInline.area) {
          body.area = this.formInline.area.map((e) => e.id);
        }
        body.entityType =
          this.formInline.entityType && this.formInline.entityType.value;
        if (this.formInline.entity) {
          body.entity = this.formInline.entity;
        }
        body.desig = this.formInline.desig && this.formInline.desig.value;
      }
      this.$emit("getData", body);
      this.dialogVisible = false;
    },
    handleQueryCommand() {
      this.dialogVisible = true;
    },
    async propertyEntityList(obj) {
      const res = await this.$store.dispatch("property/propertyEntityList", {});
      if (res && res.code === 0) {
        const list = res.data || [];
        this.options = list.filter((e) => {
          e.value = e.id;
          e.label = e.abbr;
          return e.type === (obj && obj.value) || e.is_all;
        });
      }
    },
    isSelectAll(selectList) {
      const all = 1;
      return selectList.some((e) => e == all);
    },
    change(data) {
      const all = 1;
      for (const item of this.options) {
        this.$set(item, "disabled", false);
        if (this.isSelectAll(data)) {
          item.disabled = item.value != all;
        } else if (data.length != 0 && !this.isSelectAll(data)) {
          item.disabled = item.value == all;
        }
      }
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
</style>
