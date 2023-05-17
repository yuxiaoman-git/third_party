<template>
  <div>
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
      @change="handleChange"
    >
      <div class="alpIndex">
        <div class="alpWrap">
          <span
            @click="jumpTo(item)"
            v-for="(item, index) in alphabet"
            :key="index"
            :href="'#' + item"
            >{{ item }}</span
          >
        </div>
      </div>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <a :id="item.letter" :name="item.letter">{{ item.label }}</a>
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
import { actions } from "@/components/SelectItme/js/actions";

export default {
  name: "alphabetSelect",
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
      alphabet: [],
    };
  },
  watch: {
    optionsList: {
      handler() {
        debugger;
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
      let optionsOri = [];
      optionsOri = (await action({ type, platform })) || [];
      this.options = optionsOri.sort((a, b) => {
        return a.letter.charCodeAt(0) - b.letter.charCodeAt(0);
      });
      const alphabetOri = [];
      this.options.forEach(function (item) {
        alphabetOri.push(item.letter);
      });
      this.alphabet = this.unique(alphabetOri);
      this.loading = false;
    },
    unique(arr) {
      if (!Array.isArray(arr)) {
        console.log("type error!");
        return;
      }
      arr = arr.sort();
      const array = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
          array.push(arr[i]);
        }
      }
      return array;
    },
    handleChange(data) {
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
    jumpTo(data) {
      document.querySelector("#" + data).scrollIntoView(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-scrollbar {
  padding-top: 40px;
}
.el-select-dropdown__wrap {
  margin-bottom: 0;
}
.alpIndex {
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  position: fixed;
  //z-index: 10;
  margin-top: -40px;
  background: #fff;
  border: solid 1px #dfe4ed;
  border-bottom: none;
  width: 620px;
  margin-left: -1px;
  border-radius: 4px;
  padding: 0 5px;
  .alpWrap {
    position: absolute;
    z-index: 999;
    height: 30px;
  }
  span {
    line-height: 30px;
    height: 20px;
    font-size: 18px;
    color: #5cb6ff;
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
