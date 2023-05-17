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
    <!-- checkbox -->
    <el-checkbox-group size="mini" v-model="value" v-if="el === 'checkbox'" @change="handelChange">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item.value"
        :disabled="item.disabled"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
    <!-- select -->
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
      :collapse-tags="collapseTags"
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
      type: [Object, Array],
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
    collapseTags: {
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
    tab: {
      type: String,
      default() {
        return "";
      },
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
  computed: {
    value: {
      get: function () {
        if (!this.multiple) {
          return this.give && this.give.value;
        } else {
          return (this.give && this.give.map((el) => el.value)) || [];
        }
      },
      set: function (newValue) {
        if (!this.multiple) {
          for (const item of this.options) {
            if (item.value === newValue) {
              return this.$emit("returnBack", item);
            }
          }
          return this.$emit("returnBack", null);
        } else {
          const multiple_list = this.options.filter((e) => {
            return newValue.find((el) => e.value === el);
          });
          this.$emit("returnBack", multiple_list);
        }
      },
    },
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    async getOptions() {
      this.options = [];
      const { type, platform } = this;
      const action = actions[type] || actions["default"];
      this.loading = true;
      this.options = (await action({ type, platform })) || [];
      if (this.el === 'checkbox') {
        this.$emit('renderComplete')
      }
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
