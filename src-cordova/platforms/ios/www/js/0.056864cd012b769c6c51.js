webpackJsonp([0],{Ebzf:function(t,e,a){var i=a("UyLU");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a("rjj0").default)("40300716",i,!1,{})},UyLU:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n#choose-type {\n  background-color: #f5f5f5;\n}\n#choose-type .q-card {\n    background-color: white;\n    text-align: center;\n    width: 80%;\n    margin-left: 10%;\n}\n#choose-type .q-card label {\n      font-size: 18px;\n      font-weight: bold;\n      color: #727272;\n}\n#choose-type .q-card i {\n      color: #a0da96;\n      font-size: 20px;\n}\n",""])},x9qO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("FMXW"),n=a("P8Aw"),c={mixins:[i.a],data:function(){return{title:this.$store.state.qrCodeInfo.qrCodeMsg.identifier}},methods:{back:function(){this.$router.goBack()},singleCardClicked:function(){this.type=n.c.SINGLE,this.$router.push("/qrcode/stepper")},areaCardClicked:function(){this.type=n.c.AREA,this.$router.push("/qrcode/stepper")},deviceCardClicked:function(){this.type=n.c.DEVICE,this.$router.push("/qrcode/stepper")},otherCardClicked:function(){this.type=n.c.OTHER,this.$router.push("/qrcode/stepper")}}},s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{id:"choose-type"}},[a("q-layout-header",[a("q-toolbar",{staticClass:"nav-header"},[a("q-item-side",{staticClass:"back-left",attrs:{left:"",icon:"keyboard arrow left"},nativeOn:{click:function(e){return t.back(e)}}},[a("label",[t._v("返回")])]),t._v(" "),a("q-toolbar-title",{staticClass:"header-title"},[t._v("\n        "+t._s(t.title)+"\n      ")]),t._v(" "),a("q-item-side",{staticClass:"no-info",attrs:{right:""}})],1)],1),t._v(" "),a("q-page-container",[a("div",{staticClass:"mt-40 text-center font-16"},[t._v("请选择需要录入的类型")]),t._v(" "),a("q-card",{staticClass:"mt-20 shadow-1",nativeOn:{click:function(e){return t.singleCardClicked(e)}}},[a("q-card-main",[a("i",{staticClass:"iconfont"},[t._v("")]),t._v(" "),a("label",[t._v("单株植物")])])],1),t._v(" "),a("q-card",{staticClass:"mt-16 shadow-1",nativeOn:{click:function(e){return t.areaCardClicked(e)}}},[a("q-card-main",[a("i",{staticClass:"iconfont"},[t._v("")]),t._v(" "),a("label",[t._v("片区植物")])])],1),t._v(" "),a("q-card",{staticClass:"mt-16 shadow-1",nativeOn:{click:function(e){return t.deviceCardClicked(e)}}},[a("q-card-main",[a("i",{staticClass:"iconfont"},[t._v("")]),t._v(" "),a("label",[t._v("设备")])])],1),t._v(" "),a("q-card",{staticClass:"mt-16 shadow-1",nativeOn:{click:function(e){return t.otherCardClicked(e)}}},[a("q-card-main",[a("i",{staticClass:"iconfont"},[t._v("")]),t._v(" "),a("label",[t._v("其他")])])],1)],1)],1)},o=[];s._withStripped=!0;var r=a("XyMi"),l=!1;var d=function(t){l||a("Ebzf")},u=Object(r.a)(c,s,o,!1,d,null,null);u.options.__file="src/pages/choose/chooseQRType.vue";e.default=u.exports}});