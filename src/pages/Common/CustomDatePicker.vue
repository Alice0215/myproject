<template>
  <q-modal v-model="selectYear" :content-css="{minWidth: '100vw', minHeight: '253px'}" position="bottom">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-item-side v-close-overlay class="font-14 text-main-color">取消</q-item-side>
        <q-item-side class="font-14 text-main-color" @click.native="toToday">本月</q-item-side>
        <q-toolbar-title class="header-title">
          选择日期
        </q-toolbar-title>
        <q-item-side v-close-overlay class="font-14 text-main-color" @click.native="chooseDate">完成</q-item-side>
      </q-toolbar>
      <q-datetime-picker class="datetime-custom" v-model="dateTime" type="date" format="YYYY-MM" default-view="month"/>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import eventBus from '../../eventBus'
// import { date } from 'quasar'
export default {
  data () {
    return {
      selectYear: false,
      dateTime: null,
      items: []
    }
  },
  computed: {
  },
  methods: {
    toToday () {
      this.dateTime = new Date()
    },
    chooseDate () {
      eventBus.$emit('close-date-picker', this.dateTime)
    }
  },
  mounted () {
    eventBus.$on('open-date-picker', arg => {
      this.dateTime = arg
      this.selectYear = true
    })
  }
}
</script>

<style lang="scss">
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
