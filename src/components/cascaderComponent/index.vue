<template>
  <div>
    <el-cascader
      :options="options"
      :style="{ width }"
      clearable
      @change="change"
      :value="give"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "cascaderComponent",
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
  },
  data() {
    return {
      options: [],
    };
  },
  mounted() {
    this.getOptions();
  },

  methods: {
    change(val) {
      this.$emit("returnBack", val);
    },
    async getOptions() {
      if (this.type === "category") {
        const res = await this.$store.dispatch(
          "partner/partnerGroupCategory",
          {}
        );
        if (res && res.code === 0) {
          const data = res.data || {};
          this.options = [];
          for (const k in data) {
            const obj = {
              value: k,
              label: k,
              children: [],
            };
            for (const item of data[k]) {
              obj.children.push({ value: item.id, label: item.title });
            }
            this.options.push(obj);
          }
        }
      }
    },
  },
};
</script>

<style>
</style>