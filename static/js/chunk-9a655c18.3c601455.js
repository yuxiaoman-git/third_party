(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9a655c18"],{"0bcd":function(e,r,t){"use strict";t("8e4b")},"8e4b":function(e,r,t){},cd62:function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"app-container"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px",size:"small"}},[t("el-form-item",{attrs:{label:"新密码",prop:"newPwd"}},[t("el-input",{staticClass:"w-60per",attrs:{type:"password"},model:{value:e.ruleForm.newPwd,callback:function(r){e.$set(e.ruleForm,"newPwd",r)},expression:"ruleForm.newPwd"}})],1),t("el-form-item",{attrs:{label:"确认新密码",prop:"affirmNewPwd"}},[t("el-input",{staticClass:"w-60per",attrs:{type:"password"},model:{value:e.ruleForm.affirmNewPwd,callback:function(r){e.$set(e.ruleForm,"affirmNewPwd",r)},expression:"ruleForm.affirmNewPwd"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("立即提交")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)},s=[],o=t("c7eb"),a=t("1da1"),i=t("5f87"),u={name:"ChangePassword",data:function(){var e=this,r=function(r,t,n){""===t?n(new Error("请输入新密码")):t.length<6||t.length>12?n(new Error("密码长度6到12个字符")):(""!==e.ruleForm.affirmNewPwd&&e.$refs.ruleForm.validateField("affirmNewPwd"),n())},t=function(r,t,n){""===t?n(new Error("请输入确认新密码")):t.length<6||t.length>12?n(new Error("密码长度6到12个字符")):t!==e.ruleForm.newPwd?n(new Error("输入密码不一致!")):n()};return{ruleForm:{oldPwd:"",newPwd:"",affirmNewPwd:""},rules:{newPwd:[{required:!0,validator:r,trigger:"blur"}],affirmNewPwd:[{required:!0,validator:t,trigger:"blur"}]}}},methods:{changePassword:function(){var e=this;return Object(a["a"])(Object(o["a"])().mark((function r(){var t,n,s,a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t=Object(i["a"])("userInfo")||{},n=t.uid,s={customer_uid:n,password:e.ruleForm.newPwd},r.next=4,e.$store.dispatch("role/userModifyPassword",s);case 4:if(a=r.sent,!a||0!==a.code){r.next=9;break}return e.$message.success("修改成功，请重新登录！"),r.next=9,e.$store.dispatch("user/resetLogout");case 9:case"end":return r.stop()}}),r)})))()},submitForm:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return!1;r.changePassword()}))},resetForm:function(e){this.$refs[e].resetFields()}}},l=u,c=(t("0bcd"),t("2877")),w=Object(c["a"])(l,n,s,!1,null,"02c14516",null);r["default"]=w.exports}}]);