(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f37706c2"],{1256:function(e,t,a){"use strict";a("4ed39")},"4ed39":function(e,t,a){},"8a81":function(e,t,a){},a62c:function(e,t,a){},d91f:function(e,t,a){"use strict";a("a62c")},ecac:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[e.user?a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24,xs:24}},[a("user-card",{attrs:{user:e.user}})],1)],1)],1):e._e()])},i=[],n=a("5530"),l=(a("b0c0"),a("a15b"),a("2f62")),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticStyle:{"margin-bottom":"20px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("关于我")])]),a("div",{staticClass:"user-profile"},[a("div",{staticClass:"box-center"},[a("pan-thumb",{attrs:{image:e.user.avatar,height:"100px",width:"100px",hoverable:!1}},[a("div",[e._v("Hello")]),e._v(" "+e._s(e.userInfo.real_name)+" ")])],1),a("div",{staticClass:"box-center"},[a("div",{staticClass:"user-name text-center"},[e._v(e._s(e.userInfo.name))]),a("div",{staticClass:"user-role text-center text-muted"},[e._v(" "+e._s(e.userInfo.real_name)+" ")])])])])},c=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pan-item",style:{zIndex:e.zIndex,height:e.height,width:e.width}},[a("div",{staticClass:"pan-info"},[a("div",{staticClass:"pan-info-roles-container"},[e._t("default")],2)]),a("div",{staticClass:"pan-thumb",style:{backgroundImage:"url("+e.image+")"}})])},m=[],u=(a("a9e3"),{name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:1},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}}),p=u,d=(a("1256"),a("2877")),f=Object(d["a"])(p,o,m,!1,null,"799537af",null),h=f.exports,v=a("5f87"),b={components:{PanThumb:h},props:{user:{type:Object,default:function(){return{name:"",email:"",avatar:"",role:""}}}},computed:{userInfo:function(){return Object(v["a"])("userInfo")||{}}}},g=b,_=(a("d91f"),Object(d["a"])(g,r,c,!1,null,"7d90e41e",null)),C=_.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user-activity"},[a("div",{staticClass:"post"},[a("div",{staticClass:"user-block"},[a("img",{staticClass:"img-circle",attrs:{src:"https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg"+e.avatarPrefix}}),a("span",{staticClass:"username text-muted"},[e._v("Iron Man")]),a("span",{staticClass:"description"},[e._v("Shared publicly - 7:30 PM today")])]),a("p",[e._v(" Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans. ")]),a("ul",{staticClass:"list-inline"},[e._m(0),a("li",[a("span",{staticClass:"link-black text-sm"},[a("svg-icon",{attrs:{"icon-class":"like"}}),e._v(" Like ")],1)])])]),a("div",{staticClass:"post"},[a("div",{staticClass:"user-block"},[a("img",{staticClass:"img-circle",attrs:{src:"https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg"+e.avatarPrefix}}),a("span",{staticClass:"username text-muted"},[e._v("Captain American")]),a("span",{staticClass:"description"},[e._v("Sent you a message - yesterday")])]),a("p",[e._v(" Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans. ")]),a("ul",{staticClass:"list-inline"},[e._m(1),a("li",[a("span",{staticClass:"link-black text-sm"},[a("svg-icon",{attrs:{"icon-class":"like"}}),e._v(" Like ")],1)])])]),a("div",{staticClass:"post"},[a("div",{staticClass:"user-block"},[a("img",{staticClass:"img-circle",attrs:{src:"https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg"+e.avatarPrefix}}),a("span",{staticClass:"username"},[e._v("Spider Man")]),a("span",{staticClass:"description"},[e._v("Posted 4 photos - 2 days ago")])]),a("div",{staticClass:"user-images"},[a("el-carousel",{attrs:{interval:6e3,type:"card",height:"220px"}},e._l(e.carouselImages,(function(t){return a("el-carousel-item",{key:t},[a("img",{staticClass:"image",attrs:{src:t+e.carouselPrefix}})])})),1)],1),a("ul",{staticClass:"list-inline"},[e._m(2),a("li",[a("span",{staticClass:"link-black text-sm"},[a("svg-icon",{attrs:{"icon-class":"like"}}),e._v(" Like")],1)])])])])},k=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",{staticClass:"link-black text-sm"},[a("i",{staticClass:"el-icon-share"}),e._v(" Share ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",{staticClass:"link-black text-sm"},[a("i",{staticClass:"el-icon-share"}),e._v(" Share ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",{staticClass:"link-black text-sm"},[a("i",{staticClass:"el-icon-share"}),e._v(" Share")])])}],y="?imageView2/1/w/80/h/80",w="?imageView2/2/h/440",j={data:function(){return{carouselImages:["https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg","https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg","https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg","https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg"],avatarPrefix:y,carouselPrefix:w}}},P=j,S=(a("fe22"),Object(d["a"])(P,x,k,!1,null,"1066d76c",null)),I=S.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block"},[a("el-timeline",e._l(e.timeline,(function(t,s){return a("el-timeline-item",{key:s,attrs:{timestamp:t.timestamp,placement:"top"}},[a("el-card",[a("h4",[e._v(e._s(t.title))]),a("p",[e._v(e._s(t.content))])])],1)})),1)],1)},O=[],E={data:function(){return{timeline:[{timestamp:"2019/4/20",title:"Update Github template",content:"PanJiaChen committed 2019/4/20 20:46"},{timestamp:"2019/4/21",title:"Update Github template",content:"PanJiaChen committed 2019/4/21 20:46"},{timestamp:"2019/4/22",title:"Build Template",content:"PanJiaChen committed 2019/4/22 20:46"},{timestamp:"2019/4/23",title:"Release New Version",content:"PanJiaChen committed 2019/4/23 20:46"}]}}},U=E,J=Object(d["a"])(U,$,O,!1,null,null,null),L=J.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",[a("el-form-item",{attrs:{label:"Name"}},[a("el-input",{model:{value:e.user.name,callback:function(t){e.$set(e.user,"name","string"===typeof t?t.trim():t)},expression:"user.name"}})],1),a("el-form-item",{attrs:{label:"Email"}},[a("el-input",{model:{value:e.user.email,callback:function(t){e.$set(e.user,"email","string"===typeof t?t.trim():t)},expression:"user.email"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("Update")])],1)],1)},z=[],A={props:{user:{type:Object,default:function(){return{name:"",email:""}}}},methods:{submit:function(){this.$message({message:"User information has been updated successfully",type:"success",duration:5e3})}}},M=A,N=Object(d["a"])(M,T,z,!1,null,null,null),V=N.exports,G={name:"Profile",components:{UserCard:C,Activity:I,Timeline:L,Account:V},data:function(){return{user:{},activeTab:"activity"}},computed:Object(n["a"])({},Object(l["b"])(["name","avatar","roles"])),created:function(){this.getUser()},methods:{getUser:function(){this.user={name:this.name,role:this.roles.join(" | "),email:"admin@test.com",avatar:this.avatar}}}},q=G,B=Object(d["a"])(q,s,i,!1,null,null,null);t["default"]=B.exports},fe22:function(e,t,a){"use strict";a("8a81")}}]);