webpackJsonp([22],{HxWs:function(e,t,a){e.exports={default:a("Q17y"),__esModule:!0}},Q17y:function(e,t,a){var r=a("zKeE"),n=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},t1lf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("aIIw"),n=a.n(r),o=a("HxWs"),i=a.n(o),s=a("kcQR"),c=a.n(s),l=a("gYMV"),u=a("0WlK"),d=a("B1iE"),p=a.n(d),f={data:function(){return{borderShow:!0}},methods:{back:function(){this.$router.goBack()},handleScanResult:function(e){var t=this;return c()(n.a.mark(function a(){var r,o,s,c,d,f;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.borderShow=!1,t.$q.loading.show(),a.next=4,Object(l.c)(e,"get","","json",!1,!0);case 4:r=a.sent,t.$q.loading.hide(),o=r.data.resultMsg,s=null,s=o.code?o.code.id:o.id,c=null,o.project&&(c=o.project),d=null,o.type&&(d=o.type.key),f=[],o.pictures&&(p.a.forEach(o.pictures,function(e){var t=u.b.THUMBNAIL_API+e.filePath;f.push({previewUrl:t,contentUrl:e.filePath})}),localStorage.setItem("qrcode-image",i()(f))),localStorage.setItem("qrCodeId",s),localStorage.setItem("typeKey",d),localStorage.setItem("choose-project",i()(c)),d===u.a.SINGLE||d===u.a.AREA?o.maintainable?t.$router.replace("/project/maintenance?codeId="+s):t.$router.replace("/qcode/detail?id="+s+"&type="+d):d===u.a.EQUIPMENT||d===u.a.OTHER?t.$router.replace("/qcode/detail?id="+s+"&type="+d):o.editable?t.$router.replace("/qcode/edit?id="+s+"&typeKey=null"):t.$router.replace("/qcode/detail?id="+s+"&type="+d);case 19:case"end":return a.stop()}},a,t)}))()},openScan:function(){var e=this;cordova.plugins.barcodeScanner&&cordova.plugins.barcodeScanner.scan(function(t){e.handleScanResult(t.text)},function(e){alert("Scanning failed: "+e)},{preferFrontCamera:!1,showFlipCameraButton:!1,showTorchButton:!1,torchOn:!1,saveHistory:!1,prompt:"在扫描区域内放置一个条形码",resultDisplayDuration:0,formats:"QR_CODE",orientation:"portrait",disableAnimations:!0,disableSuccessBeep:!1})}},mounted:function(){this.openScan()},beforeDestroy:function(){}},h=function(){var e=this.$createElement,t=this._self._c||e;return t("q-layout",{attrs:{id:"scan-page"}},[t("q-toolbar",{staticClass:"header"},[t("q-toolbar",{staticClass:"fix"},[t("a",{staticClass:"back-a",on:{click:this.back}},[t("q-item-side",{staticClass:"back-left",attrs:{left:"",icon:"keyboard arrow left"}}),this._v("\n        返回")],1),this._v(" "),t("q-toolbar-title",{staticClass:"header-title"},[this._v("\n        扫描二维码\n      ")]),this._v(" "),t("q-item-side",{attrs:{right:""}})],1)],1),this._v(" "),t("q-icon",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"fixed-center",staticStyle:{"font-size":"360px",color:"lightskyblue"},attrs:{name:"ion-qr-scanner"}})],1)},y=[];h._withStripped=!0;var b=a("xRi5"),v=Object(b.a)(f,h,y,!1,null,null,null);v.options.__file="src/pages/qcode/scan.vue";t.default=v.exports}});