<template>
  <q-layout view="hHh lpr fFf" id="device_detail">
    <q-layout-header>
      <q-toolbar class='nav-header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
          {{ qrCode.alias }}
        </q-toolbar-title>
        <q-item-side class="white-right" right @click.native="openQrCode(qrCode)">
          <i class="iconfont text-black font-20">&#xe701;</i>
        </q-item-side>
      </q-toolbar>
      <q-tabs inverted align="justify" no-pane-border class="tab-class">
        <q-tab default name="other-info" slot="title" label="其他信息" />
        <q-tab name="patrol-records" slot="title" label="巡查记录" />

        <q-tab-pane name="other-info" class="tab-pane-class">
          <common-info :qrCode="qrCode" :thumbnails="thumbnails" :previews="previews"></common-info>
        </q-tab-pane>
        <q-tab-pane name="patrol-records"></q-tab-pane>
      </q-tabs>
    </q-layout-header>
  </q-layout>
</template>

<script>
import CommonInfo from '../Information/CommonInfo'
import QrCodeDetailMixin from '../../../mixin/QrCodeDetailMixin'

export default {
  components: {
    CommonInfo
  },
  mixins: [
    QrCodeDetailMixin
  ],
  props: [
    "qrCode",
    "previews",
    "thumbnails"
  ]
}
</script>

<style lang='scss'>
@import "../../../assets/css/common";
.q-popover {
  width: 100% !important;
}
.time-btn {
  width: 120px;
  border: 1px solid #e8e8e8;
  color: #666;
  padding-top: 3px;
}
#qr-detail {
  .auto-width {
    min-width: auto !important;
  }
  .q-tab-label {
    padding-bottom: 5px;
    color: #666;
    opacity: 1;
    width: 100%;
  }
  .active .q-tab-label {
    border-bottom: 2px solid;
    color: #239f5b;
  }
  .q-tab {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .qr-info {
    p {
      margin-bottom: 5px;
      font-size: 14px;
      color: #333333;
      line-height: 23px;
    }
  }
  .pic-field img {
    width: 23%;
    margin-right: 1%;
  }
  #maintenance {
    .q-item-main {
      .content {
        .work-content-title {
          width: 75px;
        }
        .work-content {
          width: calc(100% - 90px);
        }
        div {
          display: flex;
          div {
            font-size: 15px;
          }
        }
      }
    }
    .title {
      font-size: 18px !important;
      color: $text-highlight;
    }
    .type-title {
      color: $type-title;
    }
    .btn-light {
      color: $light-text;
      font-size: 15px;
    }
  }
}
</style>
