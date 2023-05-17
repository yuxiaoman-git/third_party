<template>
  <div>
    <el-select
      v-model="value"
      filterable
      clearable
      :multiple="multiple"
      :disabled="disabled"
      :loading="loading"
      reserve-keyword
      :remote="remote"
      :remote-method="remoteMethod"
      :placeholder="placeholder"
      :style="{ width }"
      :collapse-tags="multiple && value && value.length > 3"
      @change="valChange"
      @focus="handelFocus"
    >
      <el-option
        class="option-box"
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <component :is="component" :item="item"></component>
      </el-option>
      <div style="bottom: -10px">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :auto-scroll="false"
          :pager-count="5"
          small
          layout="prev, pager, next"
          @pagination="getList"
        />
      </div>
    </el-select>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import artistComponent from "./components/artist-component.vue";
import checkMovieComponent from "./components/check-movie-component.vue";
import staffComponent from "./components/staff-component.vue";
import { actions } from "./js/actions";

export default {
  name: "SelectItmeRemote",
  components: {
    Pagination,
    artistComponent,
    checkMovieComponent,
    staffComponent,
  },
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
    media_id: {
      type: [Number, String],
      default: () => {
        return "";
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
    remote: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    focusClearOptions: {
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
    immediate: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "请输入";
      },
    },
  },
  data() {
    return {
      map: {
        checkMovie: "checkMovieComponent",
        staff: "staffComponent",
        longhair: "artistComponent",
      },
      options: [],
      loading: false,
      total: 0,
      listQuery: { page: 1, limit: 20 },
      query: "",
    };
  },
  computed: {
    component: {
      get() {
        return this.map[this.type];
      },
    },
    value: {
      get: function () {
        if (!this.multiple) {
          if (this.give) {
            const index = this.options.findIndex((ele) => {
              return this.give.value === ele.value;
            });
            if (index === -1) {
              this.options.push(this.give);
            }
          }
          return (this.give && this.give.value) || "";
        } else {
          if (this.give && this.give.length) {
            this.give.forEach((el) => {
              const index = this.options.findIndex((ele) => {
                return el.value === ele.value;
              });
              if (index === -1) {
                this.options.push(el);
              }
            });
          }
          return (this.give && this.give.map((el) => el.value)) || [];
        }
      },
      set: function (newValue) {
        if (!this.multiple) {
          const val = this.options.filter((el) => {
            return el.value == newValue;
          });
          this.$emit("returnBack", ...val);
        } else {
          const multipleVal = [];
          newValue.forEach((el) => {
            this.options.forEach((ele) => {
              if (ele.value == el) {
                multipleVal.push(ele);
              }
            });
          });
          this.$emit("returnBack", multipleVal);
        }
      },
    },
  },
  mounted() {
    if (this.immediate) {
      this.requestData();
    }
    // if (this.type === "staff" || this.type === "buyer") {
    //   this.requestData();
    // }
  },
  methods: {
    getList() {
      this.requestData();
    },
    async requestData() {
      const {
        type,
        media_id,
        listQuery: { page, limit },
        query,
      } = this;
      const action = actions[type];
      this.loading = true;
      const res = await action({
        query,
        media_id,
        page,
        limit,
      });
      const { options = [], total = 0 } = res || {};
      this.options = options;
      this.total = total;
      this.loading = false;
    },
    async remoteMethod(query) {
      this.query = query;
      this.listQuery.page = 1;
      this.requestData();
    },
    valChange(val) {
      this.$emit("change", val);
    },
    handelFocus() {
      if (!this.multiple) {
        if (!this.value && this.focusClearOptions) {
          this.options = [];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.option-box.el-select-dropdown__item {
  height: inherit;
  line-height: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
}
.el-select-dropdown.is-multiple {
  .el-select-dropdown__item.selected::after {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>