<template>
  <div class="fixed-center text-center">
     <i aria-hidden="true" class="q-icon q-if-control material-icons">visibility_off</i>
    <q-btn color="secondary" style="width:200px;" @click="$router.push('/')">注册</q-btn>
  </div>
</template>

<script>
export default {
   data () {
    return {
      text: '',
      model: 'Some input',
      select: 'fb',
      selectOptions: [
        {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        },
        {
          label: 'Twitter',
          value: 'twtr'
        },
        {
          label: 'Apple Inc.',
          value: 'appl'
        },
        {
          label: 'Oracle',
          value: 'ora'
        }
      ]
    }
  },
  methods:{
    onChange (val) {
      console.log('@change', JSON.stringify(val))
    },
    onInput (val) {
      console.log('@input', JSON.stringify(val))
    }
  }
}
</script>

