<template>
  <div class="login-container">
    <div class="LoginBox">
      <div class="container">
        <div class="right">
          <div class="img-box"></div>
          <div class="form">
            <el-form ref="form_" autocomplete="off" @submit.native.prevent>
              <!-- <p>登录</p> -->
              <el-form-item class="mb-30">
                <el-autocomplete
                  ref="phone"
                  v-model="loginForm.phone"
                  popper-class="my-autocomplete"
                  :fetch-suggestions="querySearch"
                  placeholder="账号"
                  style="width: 100%"
                  class="phone"
                  readonly
                  @select="handleSelect"
                  @blur="blur('phone')"
                  @focus="focus('phone')"
                >
                  <template slot-scope="{ item }">
                    <div>{{ item.phone }}</div>
                  </template>

                  <i slot="prefix">
                    <img
                      :src="
                        phoneImg
                          ? require('@/assets/images/phone.png')
                          : require('@/assets/images/focue_phone.png')
                      "
                    />
                  </i>
                </el-autocomplete>
              </el-form-item>
              <el-form-item class="mb-22">
                <el-input
                  v-model="loginForm.password"
                  class="pwd"
                  placeholder="密码"
                  :type="showPwd_ ? 'text' : 'password'"
                  @blur="blur('pwd')"
                  @focus="focus('pwd')"
                >
                  <i slot="prefix">
                    <img
                      :src="
                        cutPwdImg
                          ? require('@/assets/images/icon_pwd.png')
                          : require('@/assets/images/focue_pwd.png')
                      "
                    />
                  </i>
                </el-input>
                <img
                  :src="
                    showPwd_
                      ? require('@/assets/images/show_pwd.png')
                      : require('@/assets/images/pwd.png')
                  "
                  @click="showPwd_ = !showPwd_"
                />
              </el-form-item>
              <el-form-item class="mb-40 checked">
                <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
              </el-form-item>
              <el-button
                type="primary"
                :loading="loading"
                native-type="submit"
                :disabled="!full"
                @click.native.prevent="handleLogin"
                >登录</el-button
              >
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <a class="footer" href="http://www.sh-senyu.com" target="_blank">
      <strong class="line_left" />
      <strong class="line_right" />
      上海森宇文化传媒股份有限公司 版权所有 电话：0574-87235568/87235570
    </a>
  </div>
</template>

<script>
import { setStorage, getStorage } from "@/utils/auth";
import { menuGetList } from "@/utils/getMenuList";

export default {
  name: "Login",
  // components: { Img },
  data() {
    return {
      showPwd_: false,
      phoneImg: true,
      cutPwdImg: true,
      loginForm: {
        phone: "",
        password: "",
        checked: false,
      },
      verifyPhone: false,
      verifyPwd: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      accountList: [],
      // restaurants: []
    };
  },
  computed: {
    full() {
      if (this.verifyPhone && this.verifyPwd) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
    "loginForm.phone": {
      handler(n) {
        this.verifyPhone = n && n.length >= 1 && n.length <= 12;
        const Item = this.accountList.filter((item) => {
          return item.phone === n;
        });
        if (Item.length > 0) {
          this.loginForm.phone = Item[0].phone;
          this.loginForm.password = Item[0].pwd;
          this.loginForm.checked = true;
          this.$nextTick(() => {
            this.$refs.phone.focus();
          });
        }
      },
    },
    "loginForm.password": {
      handler(n) {
        this.verifyPwd = n && n.length >= 6 && n.length <= 20;
      },
    },
  },
  created() {},
  mounted() {
    if (getStorage("accountInfo")) {
      this.accountList = getStorage("accountInfo").accountInfo || [];
      const len = this.accountList.length;
      if (this.accountList.length > 0) {
        this.loginForm.phone = this.accountList[len - 1].phone;
        this.loginForm.password = this.accountList[len - 1].pwd;
        this.loginForm.checked = true;
      }
    }
  },
  destroyed() {},
  methods: {
    blur(type) {
      if (type === "phone") {
        this.phoneImg = true;
      }
      if (type === "pwd") {
        this.cutPwdImg = true;
      }
    },
    focus(type) {
      if (type === "phone") {
        this.phoneImg = false;
        this.$refs.phone.$el.children[0].children[0].removeAttribute(
          "readonly"
        );
      }
      if (type === "pwd") {
        this.cutPwdImg = false;
        this.$refs.phone.$el.children[0].children[0].removeAttribute(
          "readonly"
        );
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.accountList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      results = this.verifyPhone ? [] : results;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.phone.indexOf(queryString) === 0;
      };
    },
    handleSelect(item) {
      this.loginForm.phone = item.phone;
    },

    handleLogin() {
      this.loginForm.username = this.loginForm.phone;
      this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(async (res) => {
          this.loading = false;
          if (res.code !== 0) {
            return;
          }
          if (res.data && res.data.is_third_party != 1) {
            // 1是第三方，0不是第三方
            this.$message({
              message: "此账户属于运营系统，不可登录此系统",
              type: "error",
            });
            return;
          }
          if (this.loginForm.checked) {
            this.accountList = this.accountList.filter((item) => {
              return item.phone !== this.loginForm.phone;
            });
            this.accountList.push({
              phone: this.loginForm.phone,
              pwd: this.loginForm.password,
            });
          } else {
            this.accountList = this.accountList.filter((item) => {
              return item.phone !== this.loginForm.phone;
            });
          }
          const { uid, real_name, name, email, is_admin } = res.data || {};
          window.gio && window.gio("setUserId", uid);
          //设置登录用户
          window.gio &&
            window.gio("people.set", { real_name, name, email, is_admin });
          setStorage("accountInfo", { accountInfo: this.accountList });
          setStorage("userInfo", (res && res.data) || {});
          await menuGetList();
          this.$router.push({
            path: "/",
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },

    gotoRegistered() {
      this.$router.push("/registered");
    },
    gotofindpws() {
      this.$router.push("/findPwd");
    },
  },
};
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
</style>
<style lang="scss" scoped>
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.mb-30 {
  margin-bottom: 30px !important;
}
.mt-25 {
  margin-top: 25px !important;
}
.mb-22 {
  margin-bottom: 22px !important;
}
.mb-40 {
  margin-bottom: 40px !important;
}
.login-container {
  height: 100vh;
  min-width: 1000px;
  position: relative;
  // background: linear-gradient(
  //   158deg,
  //   rgba(33, 69, 142, 1) 0%,
  //   rgba(26, 42, 75, 1) 100%
  // );
  background: url("../../assets/images/demo.jpg") left top no-repeat;
  background-size: 100% 100%;
  user-select: none;
  .LoginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    // box-shadow: 0px 20px 70px 0px rgba(15, 28, 54, 1);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    .container {
      display: flex;
      height: 500px;
      .left {
        width: 440px;
        background: #fff;
        border-right: 1px solid #eee;
        text-align: center;

        // padding: 20px;
        // img {
        //   width: 100%;
        //   height: 100%;
        //   object-fit: contain;
        // }
      }
      .right {
        width: 560px;
        background: #fff;
        .img-box {
          height: 80px;
          margin: 40px 0 40px 0;
          background: url("../../assets/images/senyu.png") center center
            no-repeat;
          background-size: 197px;
        }
        .form {
          display: flex;
          justify-content: center;
          ::v-deep .el-form {
            width: 65%;
            p {
              font-weight: bold;
              font-size: 24px;
              color: #111a34;
              margin: 40px 0 60px 0;
            }
            .checked {
              > div {
                line-height: 1;
                .el-checkbox {
                  font-size: 14px;
                }
              }
            }
            .el-form-item {
              .el-form-item__content {
                position: relative;
                cursor: pointer;
                .el-input--small .el-input__inner,
                .el-input--medium .el-input__inner {
                  font-family: "PINGFANG-B";
                  font-size: 17px;
                  color: #111a34;
                  height: 60px;
                  line-height: 60px;
                  border-radius: 0;
                  padding-left: 35px !important;
                }
                .el-input__inner:focus {
                  box-shadow: 2px 2px 5px 2px rgba(15, 28, 54, 0.2);
                }

                img:first-child {
                  position: absolute;
                  left: 5px;
                  top: 50%;
                  transform: translateY(-50%);
                  z-index: 1;
                }
                img:last-child {
                  position: absolute;
                  right: 5px;
                  top: 50%;
                  transform: translateY(-50%);
                  z-index: 1;
                }
              }
            }
            .el-checkbox {
              font-family: "PINGFANG-B";
              font-size: 17px;
              color: #0d0d0d;
            }
            .el-button {
              font-family: "PINGFANG-H";
              font-size: 18px;
              width: 100%;
              margin-bottom: 20px;
              border-radius: 0;
              height: 54px;
            }
            .reg_forget_pwd_box {
              font-family: "PINGFANG-H";
              font-size: 15px;
              display: flex;
              justify-content: space-between;
              // margin-bottom: 92px;
              .reg_box {
                cursor: pointer;
                span:last-child {
                  color: #1890ff;
                }
              }
              .forget_pwd_box {
                cursor: pointer;
                color: #111a34;
              }
            }
          }
        }

        .protocol {
          font-family: "PINGFANG-B";
          font-size: 15px;
          font-weight: 400;
          text-align: center;
          height: 60px;
          line-height: 60px;
          span:first-child {
            color: #0f1c36;
          }
          span:last-child {
            color: #1890ff;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    z-index: 1;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;

    .line_left {
      width: 80px;
      height: 20px;
      position: absolute;
      left: -86px;
      top: 0;
      background: url(../../assets/images/dot_l.png) left center no-repeat;
    }
    .line_right {
      width: 80px;
      height: 20px;
      position: absolute;
      right: -86px;
      top: 0;
      background: url(../../assets/images/dot_r.png) right center no-repeat;
    }
  }

  ::v-deep input {
    caret-color: #1890ff;
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #b0b6c1;
    font-family: "PINGFANG-B";
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #b0b6c1;
    font-family: "PINGFANG-B";
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: #b0b6c1;
    font-family: "PINGFANG-B";
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: #b0b6c1;
    font-family: "PINGFANG-B";
  }
}
</style>

