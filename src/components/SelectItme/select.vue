<template>
  <div>
    <!-- radio单选 -->
    <el-radio-group
      v-model="value"
      :disabled="disabled"
      size="mini"
      v-if="el === 'radio'"
    >
      <el-radio
        v-for="item in options"
        :key="item.value"
        :disabled="item.disabled"
        :label="item.value"
        >{{ item.label }}</el-radio
      >
    </el-radio-group>
    <!-- checkbox单选 -->
    <el-checkbox-group size="mini" v-model="value" v-if="el === 'checkbox'">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item.value"
        :disabled="item.disabled"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
    <!-- 单选 -->
    <el-select
      v-if="el === 'select'"
      v-model="value"
      filterable
      :clearable="clearable"
      :disabled="disabled"
      placeholder="请选择"
      :loading="loading"
      :style="{ width }"
      :multiple="multiple"
      :collapse-tags="multiple && value && value.length > 3"
      @change="handelChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.hint"
          placement="right"
          v-if="item.hint"
        >
          <div>{{ item.label }}</div>
        </el-tooltip>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { actions } from "./js/actions";

export default {
  name: "SelectItme",
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: [String, Array, Boolean, Number],
      default: () => {
        return null;
      },
    },
    width: {
      type: String,
      default: () => {
        return "60%";
      },
    },
    type: {
      type: String,
      default: () => {
        return "";
      },
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    platform: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    el: {
      type: String,
      default() {
        return "select";
      },
    },
    optionsList: {
      type: Array,
    },
  },
  data() {
    return {
      options: [
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
      loading: false,
    };
  },
  watch: {
    optionsList: {
      handler() {
        this.options = this.optionsList || [];
      },
      deep: true,
    },
  },
  computed: {
    value: {
      get: function () {
        return this.give;
      },
      set: function (newValue) {
        this.$emit("returnBack", newValue);
      },
    },
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    async getOptions() {
      this.options = [];
      if (this.optionsList) {
        return;
      }
      const { type, platform } = this;
      const action = actions[type] || actions["default"];
      this.loading = true;
      this.options = (await action({ type, platform })) || [];
      this.loading = false;
    },
    handelChange(data) {
      const selectedOptions = this.options.filter((e) => {
        if (Array.isArray(data)) {
          return data.includes(e.value);
        } else {
          return e.value == data;
        }
      });
      if (this.multiple) {
        this.$emit("change", selectedOptions);
      } else {
        this.$emit("change", ...selectedOptions);
      }
    },
  },
};
</script>

<style>
</style>
