webpackJsonp([8],{btu2:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"",""])},mvHQ:function(n,e,t){n.exports={default:t("qkKv"),__esModule:!0}},pkzq:function(n,e,t){var o=t("btu2");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t("rjj0").default)("7fd4f4a8",o,!1,{})},qkKv:function(n,e,t){var o=t("FeBl"),a=o.JSON||(o.JSON={stringify:JSON.stringify});n.exports=function(n){return a.stringify.apply(a,arguments)}},tk9p:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("Xxa5"),a=t.n(o),c=t("mvHQ"),i=t.n(c),r=t("exGp"),s=t.n(r),l=t("MvGc"),u=t("P8Aw"),d=t("M4fF"),f=t.n(d),h={data:function(){return{borderShow:!0}},methods:{back:function(){window.QRScanner&&(window.QRScanner.cancelScan(function(n){console.log(n)}),window.QRScanner.hide()),this.$router.goBack()},handleScanResult:function(n){var e=this;return s()(a.a.mark(function t(){var o,c,r,s,d;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.borderShow=!1,e.$q.loading.show(),t.next=4,Object(l.c)(n,"get","","json",!1,!0);case 4:o=t.sent,e.$q.loading.hide(),c=o.data.resultMsg,console.log(c),r=c.id,s=null,c.type&&(s=c.type.key),d=[],c.pictures&&(f.a.forEach(c.pictures,function(n){var e=u.b.THUMBNAIL_API+n.filePath;d.push({previewUrl:e,contentUrl:n.filePath})}),localStorage.setItem("qrcode-image",i()(d))),f.a.isNull(c.location)&&localStorage.setItem("user_location",c.location),e.$router.push("/qcode/edit?id="+r+"&typeKey="+s);case 15:case"end":return t.stop()}},t,e)}))()},cancelScan:function(){window.QRScanner&&(window.QRScanner.cancelScan(function(n){console.log(n)}),window.QRScanner.hide())},openScan:function(){var n=this;window.QRScanner&&window.QRScanner.prepare(function(e,t){e&&console.error(e),t.authorized?(console.log("authorized"),window.QRScanner.scan(function(e,t){e?console.log(e):(console.log(t),n.handleScanResult(t),n.cancelScan())}),window.QRScanner.show(function(n){console.log(n)})):t.denied?(console.log(t),window.QRScanner.openSettings()):console.log(t)})}},mounted:function(){this.openScan()},beforeDestroy:function(){this.cancelScan()}},p=function(){var n=this.$createElement,e=this._self._c||n;return e("q-layout",{attrs:{id:"scan-page"}},[e("q-toolbar",{staticClass:"header"},[e("q-toolbar",{staticClass:"fix"},[e("a",{on:{click:this.back}},[e("q-item-side",{staticClass:"reback",attrs:{left:"",icon:"keyboard arrow left"}}),this._v("\n        返回")],1),this._v(" "),e("q-toolbar-title",{staticClass:"header-title"},[this._v("\n        扫描二维码\n      ")]),this._v(" "),e("q-item-side",{attrs:{right:""}})],1)],1),this._v(" "),e("q-icon",{directives:[{name:"show",rawName:"v-show",value:this.borderShow,expression:"borderShow"}],staticClass:"fixed-center",staticStyle:{"font-size":"360px",color:"lightskyblue"},attrs:{name:"ion-qr-scanner"}})],1)},w=[];p._withStripped=!0;var S=t("XyMi"),v=!1;var g=function(n){v||t("pkzq")},b=Object(S.a)(h,p,w,!1,g,null,null);b.options.__file="src/pages/qcode/scan.vue";e.default=b.exports}});