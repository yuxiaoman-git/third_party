<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择">
        <SelectItme
          type="MD"
          v-model="form.md"
          :clearable="false"
          width="60%"
        />
      </el-form-item>
      <el-card
        shadow="never"
        class="box-card"
        v-for="(item, i) in form[this.blkd_]"
        :key="i"
      >
        <el-button
          type="text"
          class="btn-delete"
          v-if="i !== 0"
          @click="handelDel(i)"
          >删除</el-button
        >
        <el-form-item class="mb-0">
          <el-transfer
            v-model="item.value"
            :data="item.data"
            :titles="['未选中', '已选中']"
            :ref="`myTransfer_${i}`"
            @change="
              (value, direction, movedKeys) =>
                handelChange(value, direction, movedKeys, i)
            "
            @left-check-change="(key1, key2) => leftCheckChange(key1, key2, i)"
          >
            <div slot="right-footer" class="center height-100">
              <el-button
                type="primary"
                size="mini"
                v-if="(form.md.value == 0 && i == 0) || form.md.value == 1"
                @click="handelSetRight(item, i)"
                :disabled="!item.value.length"
                >设置权利</el-button
              >
            </div>
          </el-transfer>
        </el-form-item>
      </el-card>
    </el-form>
    <setRight
      v-model="dialogVisible"
      v-if="dialogVisible"
      @getRightForm="getRightForm"
      :form="ruleForm"
      :platform="platform"
      :tab="tab"
    />
  </div>
</template>

<script>
import SelectItme from "@/components/SelectItme";
import setRight from "./setRight";
const ruleForm = {
  solo: null,
  subs: null,
  gard: null,
  term: [],
  opes: [],
  power: [
    {
      value: 1,
    },
    {
      value: 2,
    },
  ],
  usge: null,
  vip: null,
  adds: null,
};
export default {
  components: { SelectItme, setRight },
  props: {
    tab: {
      type: String,
      default() {
        return "";
      },
    },
    tempForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    platform: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: JSON.parse(JSON.stringify(ruleForm)),
      form: this.tempForm,
    };
  },
  watch: {
    "form.md": {
      handler(n) {
        if (n && n.value == 0) {
          this.form.blkdGroup[0].value = [this.all];
          this.form.blkdGroup[0].data.forEach((el) => {
            el.disabled = true;
          });
        }
      },
    },
  },
  computed: {
    all() {
      const list = this.data.filter((el) => el.title === "all");
      if (list.length) {
        return list[0].id;
      } else {
        return null;
      }
    },
    data() {
      return this.tempForm.data;
    },
    blkd_() {
      return this.form.md.value === 1 ? "group" : "blkdGroup";
    },
  },
  mounted() {
    const selected = this.getSelectedAll(this.form[this.blkd_]);
    let list = JSON.parse(JSON.stringify(this.data));
    if (selected.length) {
      list = this.data.filter((el) => {
        return selected.indexOf(el.key) == -1;
      });
    }
    this.form[this.blkd_].forEach((el, i) => {
      el.data = el.data.filter((e) => {
        if (this.form.md.value === 0 && i === 0) {
          return Object.assign(e, { disabled: true });
        }
        return (
          list.map((ele) => ele.id).includes(e.id) || el.value.includes(e.id)
        );
      });
      el.data = this.disposeData(el, el.data);
    });
    //黑名单第一组禁选
    this.form.blkdGroup[0].data.forEach((el) => {
      el.disabled = true;
    });
  },

  methods: {
    getSelectedAll(arr) {
      const selected = [];
      for (const item of arr) {
        selected.push(...item.value);
      }
      return selected;
    },
    add() {
      const selected = this.getSelectedAll(this.form[this.blkd_]);
      let list = JSON.parse(JSON.stringify(this.data));
      if (selected.length) {
        list = this.data.filter((el) => {
          return selected.indexOf(el.key) == -1;
        });
      }
      if (!list.length) {
        return this.$message.warning("未选中列表为空，不能新增组");
      }
      if (this.tab === "AUDIO") {
        ruleForm.power = [{ value: 2 }];
      }
      this.form[this.blkd_].push({
        value: [],
        data: JSON.parse(JSON.stringify(list)),
        rightForm: JSON.parse(JSON.stringify(ruleForm)),
      });
    },
    handelDel(i) {
      const selected = this.form[this.blkd_][i].value;
      this.form[this.blkd_].splice(i, 1);
      this.form[this.blkd_].forEach((el, index) => {
        const list = el.data.filter((ele) => {
          return selected.indexOf(ele.key) > -1;
        });
        if (
          !list.length &&
          (this.form.md.value == 1 || (this.form.md.value == 0 && index !== 0))
        ) {
          const arr = this.data.filter((element) => {
            return (
              selected.indexOf(element.key) !== -1 ||
              el.data.map((e) => e.key).indexOf(element.key) !== -1
            );
          });
          el.data = this.disposeData(el, arr);
        }
      });
    },
    handelChange(value, direction, movedKeys, n) {
      if (direction === "left") {
        this.form[this.blkd_].forEach((el) => {
          const list = el.data.filter((ele) => {
            return movedKeys.indexOf(ele.key) > -1;
          });
          if (!list.length) {
            const arr = this.data.filter((element) => {
              return (
                movedKeys.indexOf(element.key) !== -1 ||
                el.data.map((e) => e.key).indexOf(element.key) !== -1
              );
            });
            el.data = this.disposeData(el, arr);
          }
        });
        if (this.form[this.blkd_][n].value.length == 0) {
          this.form[this.blkd_][n].data.forEach((el) => {
            this.$set(el, "disabled", false);
          });
        }
      }
      if (direction === "right") {
        this.form[this.blkd_].forEach((el, index) => {
          if (
            index !== n &&
            ((this.form.md.value === 0 && index !== 0) ||
              this.form.md.value === 1)
          ) {
            for (let i = 0; i < el.data.length; i++) {
              if (movedKeys.indexOf(el.data[i].key) > -1) {
                el.data.splice(i, 1);
                i--;
              }
            }
          }
          el.data = this.disposeData(el, el.data);
        });
      }
    },
    leftCheckChange(k1, k2, i) {
      const isTrue = k1.some((el) => el !== this.all);
      if (isTrue) {
        this.form[this.blkd_][i].data.forEach((el) => {
          if (el.key === this.all) {
            this.$set(el, "disabled", true);
            if (k1.includes(this.all)) {
              const checked =
                (this.$refs[`myTransfer_${i}`] &&
                  this.$refs[`myTransfer_${i}`][0].$children["0"].checked) ||
                [];
              const index = checked.indexOf(this.all);
              if (index > -1) {
                checked.splice(index, 1);
              }
            }
          }
        });
      }
      if (k1.length === 1 && k1.includes(this.all)) {
        this.form[this.blkd_][i].data.forEach((el) => {
          if (el.key !== this.all) {
            this.$set(el, "disabled", true);
          }
        });
      }
      if (k1.length == 0 && k2.length) {
        this.form[this.blkd_][i].data.forEach((el) => {
          this.$set(el, "disabled", false);
        });
      }
    },
    disposeData(el, arr) {
      if (el.value.length == 0) {
        return JSON.parse(JSON.stringify(arr)).map((e) =>
          Object.assign(e, { disabled: false })
        );
      } else if (el.value.length && el.value.includes(this.all)) {
        return JSON.parse(JSON.stringify(arr)).map((e) => {
          if (e.key !== this.all || this.form.md.value === 0) {
            return Object.assign(e, { disabled: true });
          }
          return Object.assign(e, { disabled: false });
        });
      } else if (el.value.length && !el.value.includes(this.all)) {
        return JSON.parse(JSON.stringify(arr)).map((e) => {
          if (e.key == this.all) {
            return Object.assign(e, { disabled: true });
          }
          return Object.assign(e, { disabled: false });
        });
      }
    },
    handelSetRight(item, i) {
      this.ruleForm = JSON.parse(JSON.stringify(item.rightForm));
      this.ruleForm.index = i;
      this.dialogVisible = true;
    },
    getRightForm(data) {
      const { index } = data;
      this.form[this.blkd_][index].rightForm = data;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep
  .el-transfer-panel
  .el-transfer-panel__header
  .el-checkbox
  .el-checkbox__label {
  font-size: 14px;
}
::v-deep .el-transfer-panel__body.is-with-footer {
  margin-bottom: 40px;
}
.box-card:not(:last-child) {
  margin-bottom: 10px;
}
.height-100 {
  height: 100%;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  position: relative;
}
.btn-delete {
  position: absolute;
  top: 0;
  right: 5px;
  color: #f56c6c;
}
</style>