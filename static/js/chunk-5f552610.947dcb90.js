(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f552610"],{"07ac":function(e,a,t){var l=t("23e7"),n=t("6f53").values;l({target:"Object",stat:!0},{values:function(e){return n(e)}})},"09f4":function(e,a,t){"use strict";t.d(a,"a",(function(){return i})),Math.easeInOutQuad=function(e,a,t,l){return e/=l/2,e<1?t/2*e*e+a:(e--,-t/2*(e*(e-2)-1)+a)};var l=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function n(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function i(e,a,t){var i=r(),u=e-i,o=20,c=0;a="undefined"===typeof a?500:a;var s=function e(){c+=o;var r=Math.easeInOutQuad(c,i,u,a);n(r),c<a?l(e):t&&"function"===typeof t&&t()};s()}},"6f53":function(e,a,t){var l=t("83ab"),n=t("df75"),r=t("fc6a"),i=t("d1e7").f,u=function(e){return function(a){var t,u=r(a),o=n(u),c=o.length,s=0,b=[];while(c>s)t=o[s++],l&&!i.call(u,t)||b.push(e?[t,u[t]]:u[t]);return b}};e.exports={entries:u(!0),values:u(!1)}},"75e9":function(e,a,t){"use strict";t.d(a,"a",(function(){return l})),t.d(a,"b",(function(){return n}));t("fb6a");var l=[{value:"REGION",label:"区域"},{value:"PCWEB",label:"平台"},{value:"IPTV",label:"IPTV"},{value:"OTT",label:"OTT"},{value:"SOTT",label:"专网OTT"},{value:"DTV",label:"数字电视"},{value:"TV",label:"电视台"},{value:"AUDIO",label:"音频平台"}],n=l.slice(1)},e471:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("filter-pane",{attrs:{"filter-data":e.filterData},on:{filterMsg:e.filterMsg}}),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{attrs:{prop:"id",label:"ID",width:"80"}}),t("el-table-column",{attrs:{prop:"lsp_name",label:"合作商"}}),t("el-table-column",{attrs:{prop:"action",label:"对接行为",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){var l=a.row;return[t("div",[t("el-tag",{attrs:{type:"DELETE"==l.action?"warning":"REGIST"==l.action?"":"success"}},[e._v(e._s(l.action))])],1)]}}])}),t("el-table-column",{attrs:{prop:"media_id",label:"媒体ID"}}),t("el-table-column",{attrs:{prop:"media_name",label:"媒体名称"}}),t("el-table-column",{attrs:{prop:"state",label:"任务状态"}}),t("el-table-column",{attrs:{prop:"remark",label:"备注"}}),t("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}}),t("el-table-column",{attrs:{prop:"update_time",label:"更新时间"}}),t("el-table-column",{attrs:{label:"操作",fixed:"right",width:"160px"},scopedSlots:e._u([{key:"default",fn:function(a){var l=a.row;return[t("div",{staticClass:"operate-btn"},[l.is_show&&e.$checkPermission(["edit"])?t("span",{on:{click:function(a){return e.handleUpdate(l)}}},[e._v("更新")]):e._e(),"失败"===l.state&&"REGIST"===l.action&&e.$checkPermission(["edit"])?t("span",{on:{click:function(a){return e.handleInject(l)}}},[e._v("重新注入")]):e._e(),l.is_show&&e.$checkPermission(["edit"])?t("span",{on:{click:function(a){return e.handleDel(l)}}},[e._v("删除")]):e._e()])]}}])})],1),t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(a){return e.$set(e.listQuery,"page",a)},"update:limit":function(a){return e.$set(e.listQuery,"limit",a)},pagination:e.getList}})],1)},n=[],r=t("c7eb"),i=t("1da1"),u=t("333d"),o=t("33a7"),c={name:"injectSeries",components:{Pagination:u["a"],filterPane:o["a"]},data:function(){return{tableData:[],total:0,loading:!1,listQuery:{page:1,limit:20},form:{lsp_id:""},filterData:{elselect:[{name:"合作商",key:"lsp_id",type:"cooperative"},{name:"任务状态",key:"status",type:"seriesStatus"}],elinput:[{name:"媒体名称",key:"media_name"}]}}},mounted:function(){this.injectorSeries()},methods:{getList:function(){this.injectorSeries()},filterMsg:function(e){this.form=e,this.injectorSeries()},injectorSeries:function(){var e=this;return Object(i["a"])(Object(r["a"])().mark((function a(){var t,l,n,i,u,o,c,s;return Object(r["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t=e.listQuery,l=t.page,n=t.limit,i=e.form,u=i.lsp_id,o=i.status,c=i.media_name,e.loading=!0,a.next=5,e.$store.dispatch("injector/injectorSeries",{page:l,page_size:n,lsp_id:u,status:o,media_name:c});case 5:s=a.sent,e.loading=!1,0===s.code&&(e.tableData=s.data||[],e.total=s.total_pages*e.listQuery.limit);case 8:case"end":return a.stop()}}),a)})))()},handleDel:function(e){var a=this;this.$confirm("确认发起工单删除操作?","提示",{confirmButtonText:"确 定",cancelButtonText:"取 消",type:"warning"}).then(Object(i["a"])(Object(r["a"])().mark((function t(){var l;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("injector/series_remove",{task_id:e.id});case 2:l=t.sent,l&&0===l.code&&(a.$message.success("删除成功"),a.injectorSeries());case 4:case"end":return t.stop()}}),t)})))).catch((function(){}))},handleUpdate:function(e){var a=this;this.$confirm("确认发起工单更新操作?","提示",{confirmButtonText:"确 定",cancelButtonText:"取 消",type:"warning"}).then(Object(i["a"])(Object(r["a"])().mark((function t(){var l;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("injector/series_update",{task_id:e.id});case 2:l=t.sent,l&&0===l.code&&(a.$message.success("更新成功"),a.injectorSeries());case 4:case"end":return t.stop()}}),t)})))).catch((function(){}))},handleInject:function(e){var a=this;this.$confirm("确认发起重新注入?","提示",{confirmButtonText:"确 定",cancelButtonText:"取 消",type:"warning"}).then(Object(i["a"])(Object(r["a"])().mark((function t(){var l;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("injector/seriesReAdd",{sync_id:e.id});case 2:l=t.sent,l&&0===l.code&&(a.$message.success("剧头重注已发起"),a.injectorSeries());case 4:case"end":return t.stop()}}),t)})))).catch((function(){}))}}},s=c,b=t("2877"),v=Object(b["a"])(s,l,n,!1,null,null,null);a["default"]=v.exports},efeca:function(e,a,t){"use strict";t.d(a,"i",(function(){return l})),t.d(a,"k",(function(){return n})),t.d(a,"b",(function(){return r})),t.d(a,"a",(function(){return i})),t.d(a,"e",(function(){return u})),t.d(a,"f",(function(){return o})),t.d(a,"c",(function(){return c})),t.d(a,"d",(function(){return s})),t.d(a,"g",(function(){return b})),t.d(a,"j",(function(){return v})),t.d(a,"h",(function(){return m})),t.d(a,"l",(function(){return h}));var l=[{value:"movie",label:"电影"},{value:"tvseries",label:"电视剧"},{value:"animation",label:"动漫"},{value:"animation_movie",label:"动漫电影"},{value:"web_movie",label:"网络电影"},{value:"sport",label:"体育"},{value:"travel",label:"旅游"},{value:"web_tv",label:"网剧"},{value:"variety",label:"综艺"},{value:"education",label:"教育"},{value:"mother_baby",label:"母婴"},{value:"game",label:"游戏"},{value:"short_film",label:"短片"},{value:"documentary",label:"纪录片"},{value:"square_dance",label:"广场舞"},{value:"SPECIAL_COLUMN",label:"专栏题目"},{value:"children",label:"儿童"},{value:"opera",label:"戏曲"},{value:"LIFE",label:"生活"},{value:"FILM",label:"影视"}],n=[{value:"剧场版",label:"剧场版"},{value:"TV版",label:"TV版"},{value:"真人版",label:"真人版"},{value:"DVD版",label:"DVD版"}],r=[{value:"Ⅰ",label:"适合任何年龄的人观看"},{value:"Ⅱ",label:"13岁以下不宜观看"},{value:"ⅡA",label:"13岁以下，建议有家长陪同观看"},{value:"ⅡB",label:"18岁以下，建议有家长陪同观看"},{value:"Ⅲ",label:"18岁以上"}],i=[{value:1,label:"仅包含H.264"},{value:2,label:"仅包含H.265"},{value:3,label:"包含H.264和H.265"}],u=[{value:"1",label:"正片"},{value:"2",label:"片花"},{value:"3",label:"预告片"},{value:"4",label:"其他"}],o=[{value:2,label:"流畅 320P"},{value:3,label:"标清 480P"},{value:4,label:"高清 720P"},{value:5,label:"全高清 1080P"},{value:10,label:"蓝光 4K"}],c=[{value:1,label:"转码已发起"},{value:2,label:"转码中"},{value:3,label:"转码完成"},{value:4,label:"转码失败",refill:!0},{value:11,label:"介质注入已发起"},{value:12,label:"介质注入中"},{value:13,label:"介质注入完成"},{value:14,label:"介质注入失败",refill:!0},{value:21,label:"信息注入已发起"},{value:22,label:"信息注入中"},{value:23,label:"信息注入完成"},{value:24,label:"信息注入失败",refill:!0}],s=[{value:"Provider",label:"卖方"},{value:"Customer",label:"买方"}],b=[{value:"Provider",label:"上游"},{value:"Customer",label:"下游"},{value:"Both",label:"上下游"}],v=[{value:1,label:"重要"},{value:3,label:"正常"},{value:4,label:"暂缓"}],d={only:[{label:"第几集",key:"start",prop:"start",value:""},{label:"总集数",key:"total",value:"1",hidden:!0}],double:[{label:"开始集数",key:"start",prop:"start",value:""},{label:"总集数",key:"total",prop:"total",value:""}],pattern:[{label:"多集创建",key:"double"},{label:"单集创建",key:"only"}]},p={only:[{label:"开始集数",key:"start",value:"1",disabled:!0},{label:"总集数",key:"total",value:"1",disabled:!0}],pattern:[{label:"单集创建",key:"only"}]},f={only:[{label:"第几期",key:"start",prop:"start",value:""},{label:"总期数",key:"total",value:"1",hidden:!0}],pattern:[{label:"单集创建",key:"only"}]},m={tvseries:d,animation:d,web_tv:d,movie:p,animation_movie:p,web_movie:p,variety:f,sport:d,travel:d,education:d,mother_baby:d,game:d,short_film:d,documentary:d,square_dance:d,SPECIAL_COLUMN:d,children:d},h=[{value:1,label:"是"},{value:0,label:"否"},{value:2,label:"未知"}]}}]);