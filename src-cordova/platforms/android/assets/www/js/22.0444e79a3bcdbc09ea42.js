webpackJsonp([22],{HxWs:function(e,n,t){e.exports={default:t("Q17y"),__esModule:!0}},Q17y:function(e,n,t){var o=t("zKeE"),a=o.JSON||(o.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},t1lf:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("aIIw"),a=t.n(o),c=t("HxWs"),r=t.n(c),i=t("kcQR"),s=t.n(i),l=t("gYMV"),d=t("0WlK"),u=t("B1iE"),h=t.n(u),p={data:function(){return{borderShow:!0}},methods:{back:function(){window.QRScanner&&(window.QRScanner.cancelScan(function(e){console.log(e)}),window.QRScanner.hide()),this.$router.goBack()},handleScanResult:function(e){var n=this;return s()(a.a.mark(function t(){var o,c,i,s,u,p;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.cancelScan(),n.borderShow=!1,n.$q.loading.show(),t.next=5,Object(l.c)(e,"get","","json",!1,!0);case 5:o=t.sent,n.$q.loading.hide(),c=o.data.resultMsg,i=null,i=c.code?c.code.id:c.id,s=null,c.project&&(s=c.project),u=null,c.type&&(u=c.type.key),p=[],c.pictures&&(h.a.forEach(c.pictures,function(e){var n=d.b.THUMBNAIL_API+e.filePath;p.push({previewUrl:n,contentUrl:e.filePath})}),localStorage.setItem("qrcode-image",r()(p))),localStorage.setItem("qrCodeId",i),localStorage.setItem("typeKey",u),localStorage.setItem("choose-project",r()(s)),u===d.a.SINGLE||u===d.a.AREA?c.maintainable?n.$router.push("/project/maintenance?codeId="+i):n.$router.push("/qcode/detail?id="+i+"&type="+u):u===d.a.EQUIPMENT||u===d.a.OTHER?n.$router.push("/qcode/detail?id="+i+"&type="+u):c.editable?n.$router.push("/qcode/edit?id="+i+"&typeKey=null"):n.$router.push("/qcode/detail?id="+i+"&type="+u);case 20:case"end":return t.stop()}},t,n)}))()},cancelScan:function(){window.QRScanner&&(window.QRScanner.cancelScan(function(e){console.log(e)}),window.QRScanner.hide(),window.QRScanner.destroy(function(e){console.log(e)}))},openScan:function(){var e=this;window.QRScanner&&window.QRScanner.prepare(function(n,t){n&&console.error(n),t.authorized?(console.log("authorized"),window.QRScanner.scan(function(n,t){n?console.log(n):(console.log(t),e.handleScanResult(t),e.cancelScan())}),window.QRScanner.show(function(e){console.log(e)})):t.denied?(console.log(t),window.QRScanner.openSettings()):console.log(t)})}},created:function(){this.openScan()},beforeDestroy:function(){this.cancelScan()}},f=function(){var e=this.$createElement,n=this._self._c||e;return n("q-layout",{attrs:{id:"scan-page"}},[n("q-toolbar",{staticClass:"header"},[n("q-toolbar",{staticClass:"fix"},[n("a",{staticClass:"back-a",on:{click:this.back}},[n("q-item-side",{staticClass:"back-left",attrs:{left:"",icon:"keyboard arrow left"}}),this._v("\n        返回")],1),this._v(" "),n("q-toolbar-title",{staticClass:"header-title"},[this._v("\n        扫描二维码\n      ")]),this._v(" "),n("q-item-side",{attrs:{right:""}})],1)],1),this._v(" "),n("q-icon",{directives:[{name:"show",rawName:"v-show",value:this.borderShow,expression:"borderShow"}],staticClass:"fixed-center",staticStyle:{"font-size":"360px",color:"lightskyblue"},attrs:{name:"ion-qr-scanner"}})],1)},w=[];f._withStripped=!0;var S=t("xRi5"),g=Object(S.a)(p,f,w,!1,null,null,null);g.options.__file="src/pages/qcode/scan.vue";n.default=g.exports}});