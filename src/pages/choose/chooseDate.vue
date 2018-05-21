<template>
<q-layout>
  <q-modal v-model="selectYear" >
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-item-side v-close-overlay class="font-14 text-main-color"  @click.native="$router.goBack()">取消</q-item-side>
        <q-item-side class="font-14 text-main-color" @click.native="toToday">今天</q-item-side>
        <q-toolbar-title class="header-title">
          选择时间
        </q-toolbar-title>
        <q-item-side v-close-overlay class="font-14 text-main-color"></q-item-side>
        <q-item-side v-close-overlay class="font-14 text-main-color" @click.native="chooseDate">完成</q-item-side>
      </q-toolbar>
      <q-datetime-picker class="datetime-custom" v-model="dateTime" type="date" format="YYYY-MM-DD" />
    </q-modal-layout>
  </q-modal>
</q-layout>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      selectYear: true,
      dateTime: null
    }
  },
  computed: {
  },
  methods: {
    toToday () {
      this.dateTime = new Date()
    },
    chooseDate () {
      console.log(this.dateTime)
      this.$store.commit('DatetimePicker/setCurrent', this.dateTime)
      this.$router.goBack()
    }
  },
  mounted () {
    let dateTime = this.$store.getters['DatetimePicker/getCurrent']
    console.log(dateTime)
    if (!_.isUndefined(dateTime) && !_.isNull(dateTime)) {
      this.dateTime = dateTime
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/common";
  @import "../../assets/css/_variable.scss";
  .datetime-custom {
    .q-datetime-col-month {
      width: 30%;
      text-align: center !important;
    }
    .q-datetime-col-day {
      width: 30%;
      text-align: center !important;
    }
    .q-datetime-col-year {
      width: 40%;
      text-align: center !important;
    }
  }
  .year-datetime {
    border-left: none;
    border-right: none ;
    border-bottom: none;
    .q-datetime-col-month {
      display: none;
    }
    .q-datetime-col-day {
      display: none;
    }
  }
  .q-datetime.type-date {
    width: 100%;
  }
  .month-datetime {
    border-left: none;
    border-right: none;
    border-bottom: none;
    .q-datetime-col-day {
      display: none;
    }
  }
</style>
