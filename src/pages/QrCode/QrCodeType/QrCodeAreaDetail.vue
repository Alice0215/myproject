<template>
</template>

<script>
export default {

  data () {
    return {
    }
  },
  methods: {
  }
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
