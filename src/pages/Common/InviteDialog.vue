<template>
  <q-modal v-model="visible" :content-css="{minWidth: '100vw', minHeight: '253px'}" position="bottom" id="add_member">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-item-side v-close-overlay class="font-14 text-main-color">取消</q-item-side>
        <q-toolbar-title class="header-title">
          添加成员
        </q-toolbar-title>
        <q-item-side v-close-overlay class="font-14 text-main-color"></q-item-side>
      </q-toolbar>
      <div class="row justify-center m-8">
        <q-field  class="col-6"
                  @blur="$v.form.phone.$touch"
                  @keyup.enter="invite"
                  :error="$v.form.phone.$error"
                  error-label="请填写正确的手机号">
          <q-search v-model="form.phone" icon="search" @input="resetResult" type="text" class="col-6" clearable placeholder="手机号"/>
        </q-field>
        <q-btn class="ml-15" @click.prevent="invite">搜索</q-btn>
      </div>
      <div class="row justify-center m-8" v-if="show">
        <q-input v-model="user.fullname" readonly type="text" class="col-6"  />
        <q-btn class="ml-15" @click.prevent="confirm">确认</q-btn>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import eventBus from '../../eventBus'
  import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
  import { requestAdmin } from '../../common'

  export default {
    data () {
      return {
        visible: false,
        show: false,
        user: {},
        form: {}
      }
    },
    validations: {
      form: {
        phone: { required, numeric, minLength: minLength(11), maxLength: maxLength(11) }
      }
    },
    methods: {
      resetResult () {
        this.show = false
        this.user = {}
      },
      async invite () {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          return false
        }
        this.$q.loading.show()
        const resp = await requestAdmin('user/findByPhone/' + this.form.phone, 'get')
        this.$q.loading.hide()
        if (resp) {
          this.show = true
          this.user = resp.data.resultMsg
        }
      },
      async confirm () {
        const user = await requestAdmin('user/invite/' + this.user.id, 'put')
        if (user) {
          this.visible = false
          this.$q.notify({
            timeout: 2000,
            type: 'positive',
            message: '添加成功！'
          })
          eventBus.$emit('refresh-user-tab')
        }
      }
    },
    mounted () {
      eventBus.$on('open-invite-dialog', () => {
        this.form = {}
        this.user = {}
        this.visible = true
        this.show = false
      })
    }
  }
</script>

<style lang='scss'>
  @import "../../assets/css/_variable.scss";
  #add_member {
    .q-btn {
      height: 36px;
      background: $primary;
      color: white;
    }
    .q-input {
      border: 1px solid;
      border-radius: 5px;
      padding: 5px 5px !important;
      color: black;
      font-size: 14px;
    }
  }
</style>
