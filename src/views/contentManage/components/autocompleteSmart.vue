<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      :trigger-on-focus="false"
      popper-class="my-autocomplete"
      placeholder="请输入内容"
      :style="{ width }"
      clearable
      @select="handleSelect"
    >
      <template slot-scope="{ item }">
        <span>{{ item }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "autocompleteSmart",
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: String,
      default: () => {
        return "";
      },
    },
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    syncDetails: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    onSuccess: {
      type: Function,
    },
  },
  data() {
    return {
      state: "",
    };
  },
  watch: {
    state: {
      handler(n) {
        this.$emit("returnBack", n);
      },
    },
    give: {
      handler(n) {
        this.state = n;
      },
    },
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      if (!queryString.trim()) {
        cb([]);
        return;
      }
      const res = await this.$store.dispatch("media/imdbSearchNameList", {
        wd: queryString,
      });
      if (res && res.code === 0) {
        cb((res.data && res.data) || []);
      }
    },
    async handleSelect(item) {
      this.state = item;
    },
  },
};
</script>

<style lang="scss">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
<style lang="scss" scoped>
.ml-7 {
  margin-left: 7px;
}
.gray {
  color: #b4b4b4;
}
.flex-box {
  display: flex;
  .left {
    margin-right: 7px;
  }
  .right {
    flex: 1;
    min-width: 0;
  }
}
</style>