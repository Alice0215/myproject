<template id="qr_detail">
  <QrCodeEmpty v-if="!qrCode.type" :qrCode="qrCode"></QrCodeEmpty>
  <QrCodeSingle v-else-if="qrCode.type.key === plantType.SINGLE" :qrCode="qrCode" :detail="detail" :thumbnails="thumbnails" :previews="previews"></QrCodeSingle>
  <QrCodeArea v-else-if="qrCode.type.key === plantType.AREA" :qrCode="qrCode" :detail="detail" :thumbnails="thumbnails" :previews="previews"></QrCodeArea>
  <QrCodeDevice v-else-if="qrCode.type.key === plantType.DEVICE" :qrCode="qrCode" :thumbnails="thumbnails" :previews="previews"></QrCodeDevice>
  <QrCodeOther v-else-if="qrCode.type.key === plantType.OTHER" :qrCode="qrCode" :thumbnails="thumbnails" :previews="previews"></QrCodeOther>
</template>

<script>
import QrCodeSingle from './QrCodeType/QrCodeSingleDetail'
import QrCodeArea from './QrCodeType/QrCodeAreaDetail'
import QrCodeDevice from './QrCodeType/QrCodeDeviceDetail'
import QrCodeOther from './QrCodeType/QrCodeOtherDetail'
import QrCodeEmpty from './QrCodeType/QrCodeEmptyDetail'
import QrCodeMixin from '../../mixin/QrCodeMixin'

import { plantType } from '../../const'

export default {
  components: {
    QrCodeSingle,
    QrCodeArea,
    QrCodeDevice,
    QrCodeOther,
    QrCodeEmpty
  },
  mixins: [
    QrCodeMixin
  ],
  data () {
    return {
      plantType: plantType
    }
  },
  methods: {
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
.q-popover {
  width: 100% !important;
}
.time-btn {
  width: 120px;
  border: 1px solid #e8e8e8;
  color: #666;
  padding-top: 3px;
}
#qr_detail {
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
