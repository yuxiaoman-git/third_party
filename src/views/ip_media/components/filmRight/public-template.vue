<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择">
        <SelectItem
          type="MD"
          :disabled="dialogType !== 'new' && form[is_white][0].value.length > 0"
          v-model="form.md"
          :clearable="false"
          width="60%"
        />
      </el-form-item>
      <el-card
        shadow="never"
        class="box-card"
        v-for="(item, i) in form[is_white]"
        :key="i"
      >
        <el-button
          type="text"
          class="btn-delete"
          v-if="i !== 0"
          @click="handleDel(i)"
          >删除</el-button
        >
        <el-form-item class="mb-0">
          <el-transfer
            v-model="item.value"
            :data="item.data"
            :render-content="renderFunc"
            :titles="['未选中', '已选中']"
            :ref="`myTransfer_${i}`"
            @change="
              (value, direction, movedKeys) =>
                handleChange(value, direction, movedKeys, i)
            "
            @left-check-change="(key1, key2) => leftCheckChange(key1, key2, i)"
          >
            <div slot="right-footer" class="center height-100">
              <el-button
                type="primary"
                size="mini"
                v-if="(form.md.value == 0 && i == 0) || form.md.value == 1"
                @click="handleSetRight(item, i)"
                :disabled="!item.value.length"
                >设置权利</el-button
              >
            </div>
          </el-transfer>
        </el-form-item>
      </el-card>
      <el-button
        type="success"
        size="small"
        class="fl"
        v-show="showAdd && form.md.value"
        @click="add"
      >新增组</el-button
      >
    </el-form>
    <setRight
      v-model="dialogVisible"
      v-if="dialogVisible"
      @getRightForm="getRightForm"
      :formData="ruleForm"
      :platform="platform"
      :tab="tab"
    />
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItme";
import setRight from "./setRight";
const ruleForm = {
  buffer_period: null,
  editing_remark: '',
  granted_area: '',
  authorized_way: 1,
  is_audio: 1,
  is_video: 1,
  is_download: 1,
  is_safeguard: 1,
  vip_pay: 1,
  with_granted: 1,
  editing_program: [],
  extra: [],
  terminals: [],
};
export default {
  components: { SelectItem, setRight },
  props: {
    tab: {
      type: Number,
      default() {
        return 0;
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
    copyright_delete: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dialogType: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: JSON.parse(JSON.stringify(ruleForm)),
      form: this.tempForm,
      showAdd: true,
    };
  },
  watch: {
    "form.md": {
      handler(n) {
        if (n && n.value == 0) {
          this.form.blkdGroup[0].data.forEach((el, index) => {
            if (el.key === this.all) {
              this.form.blkdGroup[0].data.splice(index, 1)
            }
          });
        }
      },
    },
  },
  computed: {
    all() {
      const list = this.listData.filter((el) => el.label === "全部");
      if (list.length) {
        return list[0].id;
      } else {
        return null;
      }
    },
    listData() {
      return this.tempForm.data;
    },
    is_white() {
      return this.form.md.value === 1 ? "group" : "blkdGroup";
    },
  },
  mounted() {
    //  渲染当前实体数据
    const selected = this.getSelectedAll(this.form[this.is_white]);
    let list = JSON.parse(JSON.stringify(this.listData));
    if (selected.length) {
      list = this.listData.filter((el) => {
        return selected.indexOf(el.key) == -1;
      });
    }
    this.form[this.is_white].forEach((el, i) => {
      if (i !== 0) {
        list = list.filter((el) => {
          return el.key != 1
        })
      }
      el.data = el.data.filter((e) => {
        return (
          list.map((ele) => ele.id).includes(e.id) || el.value.includes(e.id)
        );
      });
      el.data = this.disposeData(el, el.data);
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
      const selected = this.getSelectedAll(this.form[this.is_white]);
      let list = JSON.parse(JSON.stringify(this.listData));
      if (selected.length) {
        list = this.listData.filter((el) => {
          return selected.indexOf(el.key) == -1;
        });
      }
      list = list.filter((el) => {
        return el.key != 1
      })
      if (!list.length) {
        return this.$message.warning("未选中列表为空，不能新增组");
      }
      if (this.tab === 35) {
        ruleForm.is_audio = { value: 1 };
      }
      this.form[this.is_white].push({
        value: [],
        data: JSON.parse(JSON.stringify(list)),
        rightForm: JSON.parse(JSON.stringify(ruleForm)),
      });
      // console.log('-------------------------')
      // console.log(this.form)
    },
    handleDel(i) {
      // console.log(this.form[this.is_white][i].groupId)
      if (this.form[this.is_white][i].groupId) {
        this.copyright_delete.push(this.form[this.is_white][i].groupId)
        this.$emit("handleGroupDel", this.copyright_delete)
      }
      const selected = this.form[this.is_white][i].value;
      this.form[this.is_white].splice(i, 1);
      this.form[this.is_white].forEach((el, index) => {
        const list = el.data.filter((ele) => {
          return selected.indexOf(ele.key) > -1;
        });
        if (
          !list.length &&
          (this.form.md.value == 1 || (this.form.md.value == 0 && index !== 0))
        ) {
          const arr = this.listData.filter((element) => {
            return (
              selected.indexOf(element.key) !== -1 ||
              el.data.map((e) => e.key).indexOf(element.key) !== -1
            );
          });
          el.data = this.disposeData(el, arr);
        }
      });
    },
    handleChange(value, direction, movedKeys, n) {
      if (direction === "left") {
        if ( movedKeys.indexOf(1) > -1) {
          this.showAdd = true
        }
        this.form[this.is_white].forEach((el) => {
          const list = el.data.filter((ele) => {
            return movedKeys.indexOf(ele.key) > -1;
          });
          if (!list.length) {
            const arr = this.listData.filter((element) => {
              return (
                movedKeys.indexOf(element.key) !== -1 ||
                el.data.map((e) => e.key).indexOf(element.key) !== -1
              );
            });
            el.data = this.disposeData(el, arr);
          }
        });
        if (this.form[this.is_white][n].value.length == 0) {
          this.form[this.is_white][n].data.forEach((el) => {
            this.$set(el, "disabled", false);
          });
        }
      }
      if (direction === "right") {
        if ( movedKeys.indexOf(1) > -1) {
          this.showAdd = false
          this.form[this.is_white].splice(1)
        }
        this.form[this.is_white].forEach((el, index) => {
          if (index !== n ) {
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
        this.form[this.is_white][i].data.forEach((el) => {
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
        this.form[this.is_white][i].data.forEach((el) => {
          if (el.key !== this.all) {
            this.$set(el, "disabled", true);
          }
        });
      }
      if (k1.length == 0 && k2.length) {
        this.form[this.is_white][i].data.forEach((el) => {
          this.$set(el, "disabled", false);
        });
      }
    },
    //  处理数据
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
    handleSetRight(item, i) {
      // console.log(item)
      this.ruleForm = JSON.parse(JSON.stringify(item.rightForm));
      this.ruleForm.authorized_way = {"value": item.rightForm.authorized_way}
      this.ruleForm.is_download = {"value": item.rightForm.is_download}
      this.ruleForm.is_safeguard = {"value": item.rightForm.is_safeguard}
      this.ruleForm.vip_pay = {"value": item.rightForm.vip_pay}
      this.ruleForm.with_granted = {"value": item.rightForm.with_granted}
      if (item.rightForm.editing_program.length && !item.rightForm.editing_program[0].label) {
        this.ruleForm.editing_program = {}
        this.ruleForm.editing_program =
          item.rightForm.editing_program &&
          item.rightForm.editing_program.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });
        this.ruleForm.extra =
          item.rightForm.extra &&
          item.rightForm.extra.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });
        this.ruleForm.terminals =
          item.rightForm.terminals &&
          item.rightForm.terminals.map((el) => {
            return Object.assign(
              {
                value: el.id,
                label: el.name,
              },
              el
            );
          });
      }
      // console.log(this.ruleForm)
      this.ruleForm.index = i;
      this.dialogVisible = true;
    },
    getRightForm(data) {
      const { index } = data;
      this.form[this.is_white][index].rightForm = data;
      this.dialogVisible = false
    },
    renderFunc(h, option) {
      return <span title={option.label}>{option.label}</span>;
    }
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
