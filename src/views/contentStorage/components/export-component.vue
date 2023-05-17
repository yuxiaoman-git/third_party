<template>
  <el-dialog
    title="导出"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="400px"
    top="20px"
  >
    <div>
      <el-form :model="form" label-width="80px">
        <el-form-item label="合作商">
          <SelectItme type="cooperative" v-model="form.cooperative" />
        </el-form-item>
        <el-form-item label="导出时间">
          <SelectItme type="mediaExportDays" v-model="form.days" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handelExport">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SelectItme from "@/components/SelectItme/select.vue";
import { getStorage } from "@/utils/auth";

export default {
  components: { SelectItme },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      form: {
        days: 30
      },
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
    handelExport() {
      const { sid = "", uid = 0 } = getStorage("userInfo") || {};
      const lsp_id = this.form.cooperative;
      const days = this.form.days || 0;
      if (!lsp_id) {
        return this.$message.error("请选择合作商");
      }
      window.location.href = `/injector/history/export/?lsp_id=${lsp_id}&days=${days}&sid=${sid}&uid=${uid}`;
    },
  },
};
</script>

<style>
</style>
