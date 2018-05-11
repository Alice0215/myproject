<template>
    <q-layout view="Hhh lpr Fff" id="records">
      <q-layout-header>
        <q-toolbar class='header bg-white'>
          <q-item-side @click="$router.push('/')" left icon="keyboard arrow left" class="back-left">
            <label>返回</label>
          </q-item-side>
          <q-toolbar-title class='header-title text-center'>
            养护记录
          </q-toolbar-title>
          <q-item-side class="white-right" right/>
        </q-toolbar>
        <q-tabs inverted color="secondary" text-color="black" align="justify">
          <q-tab default name="maintenance-records" slot="title" label="养护记录" />
          <q-tab name="patrol-records" slot="title" label="巡查记录" />
          <q-tab name="equipment-records" slot="title" label="设备领用记录" />
          <q-tab name="seedlings-records" slot="title" label="苗木到场" />

          <q-tab-pane name="maintenance-records">
            <maintenance-records></maintenance-records>
          </q-tab-pane>
          <q-tab-pane name="patrol-records"></q-tab-pane>
          <q-tab-pane name="equipment-records"></q-tab-pane>
          <q-tab-pane name="seedlings-records"></q-tab-pane>
        </q-tabs>
      </q-layout-header>
    </q-layout>
</template>

<script>
import  MaintenanceRecords from './MaintenanceRecords'

export default {
  data () {
    return {
      projectId: '1',
      tabClass: ['hover', '']
    }
  },
  components: {
    MaintenanceRecords
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/_variable.scss";
#records {
  .q-toolbar {
    background: white !important;
  }
  .q-tab-label {
    padding-bottom: 8px;
    color: $text;
    opacity: 1;
  }
  .active {
    .q-tab-label {
      border-bottom: 2px solid;
      color: $primary;
    }
  }
  .q-tabs {
    background: $bgcolor;
    .q-tabs-head {
      background: white;
    }
    .q-tabs-panes {
      .q-tab-pane {
        padding: 12px 0 0 0;
      }
    }
  }
}
</style>
