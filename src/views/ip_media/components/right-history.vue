<template>
  <div>
    <el-dialog
      title="权利历史"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      top="20px"
      width="90%"
    >
      <div class="badge-box">
        <el-badge :value="getNum">
          <el-button
            type="primary"
            :disabled="getNum !== 2"
            size="small"
            @click="dialogVisibleCompare = true"
            >对比</el-button
          >
        </el-badge>
      </div>
      <el-row :gutter="16">
        <el-col :span="12">
          <card-component v-model="purchase_selected" title="采购历史" />
        </el-col>
        <el-col :span="12">
          <card-component v-model="sale_selected" title="发行历史" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false"
          >取 消</el-button
        >
        <!-- <el-button type="primary" size="small" @click="dialogVisible = false"
          >保 存</el-button
        > -->
      </span>
    </el-dialog>
    <compare-component
      v-if="dialogVisibleCompare"
      v-model="dialogVisibleCompare"
    />
  </div>
</template>

<script>
import cardComponent from "./card-component";
import compareComponent from "./compare-component";
export default {
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  components: { cardComponent, compareComponent },
  data() {
    return {
      purchase_selected: null,
      sale_selected: null,
      dialogVisibleCompare: false,
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.give;
      },
      set(val) {
        this.$emit("returnBack", val);
      },
    },
    getNum: {
      get() {
        const num1 = this.purchase_selected ? 1 : 0;
        const num2 = this.sale_selected ? 1 : 0;
        return num1 + num2 || "";
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.badge-box {
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
}
::v-deep .el-dialog__body {
  padding-top: 0;
}
</style>
