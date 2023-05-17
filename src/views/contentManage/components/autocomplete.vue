<template>
  <div>
    <el-autocomplete
      v-model.trim="state"
      :fetch-suggestions="querySearchAsync"
      :trigger-on-focus="false"
      popper-class="my-autocomplete"
      placeholder="请输入内容"
      style="width: 100%"
      clearable
      type="text"
      :maxlength="100"
      show-word-limit
      @select="handleSelect"
    >
      <template slot-scope="{ item }">
        <div class="flex-box">
          <div class="left">
            <el-image style="width: 40px" :src="item.img"></el-image>
          </div>
          <div class="right">
            <div class="name">
              <span>{{ item.title }}</span>
              <span class="ml-7 gray">{{ item.year }}</span>
            </div>
            <span class="addr">{{ item.sub_title }}</span>
          </div>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "autocomplete",
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
      const res = await this.$store.dispatch("media/imdbSearchDouban", {
        wd: queryString,
      });
      if (res && res.code === 0) {
        cb(res.data || []);
      }
    },
    async handleSelect(item) {
      this.state = item.title;
      if (this.syncDetails) {
        const res = await this.$store.dispatch("media/imdbDetailDouban", {
          douban_id: item.id,
        });
        if (res && res.code === 0) {
          this.onSuccess && this.onSuccess(res.data || {});
        }
      }
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