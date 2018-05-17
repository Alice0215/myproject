<template>
  <q-layout view="lHh Lpr lFf" id="admin">
    <q-layout-header>
      <q-toolbar class='header bg-white'>
        <q-item-side @click.native="$router.goBack()" left icon="keyboard arrow left" class="back-left">
          <label>返回</label>
        </q-item-side>
        <q-toolbar-title class='header-title text-center'>
          成员管理
        </q-toolbar-title>
        <q-item-side class="white-right" right/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-page>
        <q-table
          hide-bottom
          :data="items"
          :columns="columns"
          :pagination.sync="serverPagination"
          @request="load"
          row-key="name">
          <div slot="top" slot-scope="props" class="row flex-center fit">
            <div class="row full-width">
              <q-search v-model="input" icon="search" type="text" class="col-6" clearable placeholder="搜索"/>
              <div class="col-6">
                <q-btn class="right" @click="add">添加新成员</q-btn>
              </div>
            </div>
          </div>
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="fullname" :props="props" class="fullname-text">
              <i class="iconfont font-18" v-if="props.row.admin">&#xe612;</i> {{ props.row.user.fullname }}
            </q-td>
            <q-td key="phone" :props="props">
              {{ props.row.user.phone }}
            </q-td>
            <q-td key="operate" :props="props">
              <a href="javascript:" @click="isResetOrNot(props.row.user)">
                <i class="material-icons">sync</i>
              </a>
              <a href="javascript:" @click="isDisableOrNot(props.row.user)">
                <i class="material-icons ml-5">do_not_disturb_on</i>
              </a>
              <a v-if="props.row.admin" href="javascript:" @click="isSetAdminOrNot(props.row)">
                <i class="material-icons ml-5">error</i>
              </a>
              <a v-else href="javascript:" @click="isSetAdminOrNot(props.row)">
                <i class="material-icons ml-5">error_outline</i>
              </a>
            </q-td>
          </q-tr>
        </q-table>
      </q-page>
    </q-page-container>
    <InviteDialog></InviteDialog>
  </q-layout>
</template>

<script>
import { requestAdmin } from '../../common'
import eventBus from '../../eventBus'
import InviteDialog from '../Common/InviteDialog'

export default {
  components: {
    InviteDialog
  },
  data () {
    return {
      loading: false,
      all: [],
      input: '',
      serverPagination: {
        rowsNumber: 20
      },
      columns: [
        {
          name: 'fullname',
          label: '姓名',
          required: true,
          field: row => row.user.fullname,
          align: 'left'
        },
        {
          name: 'phone',
          label: '电话',
          field: row => row.user.phone,
          align: 'left'
        },
        {
          name: 'operate',
          label: '操作',
          field: 'fullname',
          align: 'left'
        }
      ],
    }
  },
  computed: {
    items: {
      get: function () {
        return this.input ? this.all.filter(this.createStateFilter(this.input)) : this.all
      },
      set: function (newValue) { }
    }
  },
  methods: {
    async load () {
      this.$q.loading.show()
      const resp = await requestAdmin('user/all')
      if (resp) {
        this.$q.loading.hide()
        this.all = resp.data.resultMsg
        this.items = this.all
        this.serverPagination.rowsNumber = this.items.length
      }
    },
    createStateFilter (queryString) {
      return (state) => {
        return ((state.user.fullname && state.user.fullname.toLowerCase().indexOf(queryString.toLowerCase()) === 0) || (state.user.phone && state.user.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0))
      }
    },
    add () {
      eventBus.$emit('open-invite-dialog')
    },
    isResetOrNot (user) {
       this.$q.dialog({
        title: '提示',
        message: '确定要重置' + user.fullname + '的密码吗？',
        ok: '确认',
        cancel: '取消'
      }).then(() => {
         this.resetPassword(user)
      }).catch(() => {})
    },
    isDisableOrNot (user) {
      this.$q.dialog({
        title: '提示',
        message: '确定要禁用' + user.fullname + '吗？',
        ok: '确认',
        cancel: '取消'
      }).then(() => {
        this.disableUser(user)
      }).catch(() => {})
    },
    isSetAdminOrNot (row) {
      let user = row.user
      let hint = row.admin ? '确定要取消' + user.fullname + '的管理员身份吗？' : '确定要设置' + user.fullname + '的管理员身份吗？'
      this.$q.dialog({
        title: '提示',
        message: hint,
        ok: '确认',
        cancel: '取消'
      }).then(() => {
        this.setAdmin(user)
      }).catch(() => {})
    },
    async resetPassword (user) {
      const resp = await requestAdmin(`user/resetPassword/${user.id}`, 'put')
      if (resp) {
        this.$q.notify({
          timeout: 2000,
          type: 'positive',
          message: '重置成功！'
        })
        this.load()
      }
    },
    async disableUser (user) {
      const resp = await requestAdmin(`user/disable/${user.id}`, 'put')
      if (resp) {
        this.$q.notify({
          timeout: 2000,
          type: 'positive',
          message: '禁用成功！'
        })
        if (Number.parseInt(user.id) === this.$store.getters['User/userId']) {
          this.$store.commit('User/setAdmin', false)
          this.$router.goBack()
        } else {
          this.load()
        }
      }
    },
    async setAdmin (user) {
      const resp = await requestAdmin(`user/admin/${user.id}`, 'put')
      if (resp) {
        this.$q.notify({
          timeout: 2000,
          type: 'positive',
          message: '重置成功！'
        })
        this.load()
      }
    }
  },
  mounted () {
    eventBus.$on('refresh-user-tab', () => {
      this.load()
    })
    this.load()
  }
}
</script>

<style lang='scss'>
@import "../../assets/css/_variable.scss";
#admin {
  .q-table-container {
    margin: 10px;
    box-shadow: none;
  }
  .q-table {
    color: $text-highlight;
    thead th {
      font-size: 15px;
    }
    tbody td {
      font-size: 16px;
    }
  }
  td {
    &.fullname-text {
      color: $primary;
    }
  }
  a {
    color: $primary;
    i {
      font-size: 25px;
    }
  }
  .q-search {
    border: 1px solid;
    border-radius: 5px;
  }
  .q-btn {
    float: right;
    background: $primary;
    color: white;
  }
  .q-input {
    padding: 5px 0 !important;
    color: black;
    font-size: 14px;
  }
}
</style>
