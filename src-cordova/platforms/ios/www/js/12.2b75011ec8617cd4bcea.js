webpackJsonp([12],{ESwI:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n#map-page #map_frame {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n#map-page .fix {\n  top: 0;\n  z-index: 100;\n  position: fixed;\n  width: 48px;\n  background: none !important;\n}\n",""])},j8Qd:function(e,t,n){var o=n("ESwI");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,n("rjj0").default)("33fc2db9",o,!1,{})},mvHQ:function(e,t,n){e.exports={default:n("qkKv"),__esModule:!0}},ndF7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("Xxa5"),i=n.n(o),a=n("exGp"),r=n.n(a),s=n("mvHQ"),c=n.n(s),u=n("M4fF"),d=n.n(u),p=n("O6e2"),f={data:function(){return{loading:!1,position:{}}},methods:{getAdressByGeocoder:function(e){var t=this;d.a.isUndefined(e)||new AMap.Geocoder({radius:1e3,extensions:"all"}).getAddress(e,function(e,n){"complete"===e&&"OK"===n.info&&t.handleGeocoder(n)})},handleGeocoder:function(e){var t=d.a.omit(e.regeocode,["pois","roads","crosses","aois"]);if(t.position=this.position,t=c()(t),"OK"===e.info){if(p.a.$emit("user_location",t),localStorage.setItem("user_location",t),"qrCode"===this.$route.query.from)return void this.$router.goBack();this.$route.query.projectId,this.$router.goBack()}},getGeolocation:function(){var e=this;return r()(i.a.mark(function t(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(n=new AMap.Map("iCenter")).plugin("AMap.Geolocation",function(){var e=new AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,maximumAge:0,convert:!0,showButton:!0,buttonPosition:"LB",buttonOffset:new AMap.Pixel(10,20),showMarker:!0,showCircle:!0,panToLocation:!0,zoomToAccuracy:!0});n.addControl(e),e.getCurrentPosition(),AMap.event.addListener(e,"complete",function(e){console.log(e)}),AMap.event.addListener(e,"error",function(e){console.log(e)})});case 2:case"end":return e.stop()}},t,e)}))()},receivedMessage:function(e){if(console.log(e),!d.a.isUndefined(e.data.location)){var t=e.data.location.split(",");t.length>1&&(this.position.lng=t[0],this.position.lat=t[1]),this.getAdressByGeocoder(t)}}},mounted:function(){var e=this;return r()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$nextTick(function(){document.getElementById("map_frame").style.height=document.documentElement.clientHeight+"px";var t=document.getElementById("map_frame").contentWindow;document.getElementById("map_frame").onload=function(){t.postMessage("hello","https://m.amap.com/picker/")},window.addEventListener("message",e.receivedMessage,!1)});case 1:case"end":return t.stop()}},t,e)}))()},beforeDestroy:function(){window.removeEventListener("message",this.receivedMessage)}},l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",{attrs:{id:"map-page"}},[n("a",{on:{click:function(t){e.$router.goBack()}}},[n("q-toolbar",{staticClass:"fix"})],1),e._v(" "),n("iframe",{attrs:{src:"https://m.amap.com/picker/?key=d18fb1ffb12982910e0ab4c6ffd7ee6e",id:"map_frame"}})])},m=[];l._withStripped=!0;var g=n("XyMi"),h=!1;var v=function(e){h||n("j8Qd")},w=Object(g.a)(f,l,m,!1,v,null,null);w.options.__file="src/pages/project/map.vue";t.default=w.exports},qkKv:function(e,t,n){var o=n("FeBl"),i=o.JSON||(o.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}}});