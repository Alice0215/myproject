<template>
<q-pageContainer>
  <q-page padding class="row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">
        Toolbars are mainly used in Layout headers and footers, but they can be used
        in your Page view too.
      </p>

      <q-toolbar>
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>

      <br>

      <q-toolbar inverted>
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>

      <p class="caption">
        They come in all colors.
      </p>

      <q-toolbar color="secondary">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="sim_card" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar>
      <q-toolbar color="yellow" text-color="dark">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          Toolbar
          <span slot="subtitle">Subtitle</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="sim_card" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar>
      <q-toolbar color="orange">
        <q-btn flat round dense icon="mail">
          <q-chip floating color="red">2</q-chip>
        </q-btn>
        <q-toolbar-title>
          Long title for Toolbar. Very very very very very very long title.
        </q-toolbar-title>
        <q-btn flat round dense icon="alarm" />
        <q-btn flat round dense icon="router" />
        <q-btn flat round dense icon="keyboard" />
      </q-toolbar>
      <q-toolbar color="dark">
        <q-btn flat round dense icon="menu" />
        <q-btn flat round dense icon="security" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="headset" />
        <q-btn flat round dense icon="tv" />
      </q-toolbar>

      <p class="caption">
        And inverted:
      </p>

      <q-toolbar inverted color="secondary">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="sim_card" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar>
      <q-toolbar inverted color="purple">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          Toolbar
          <span slot="subtitle">Subtitle</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="sim_card" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar>
      <q-toolbar inverted color="orange">
        <q-btn flat round dense icon="mail" />
        <q-toolbar-title>
          Long title for Toolbar. Very very very very very very long title.
        </q-toolbar-title>
        <q-btn flat round dense icon="alarm" />
        <q-btn flat round dense icon="router" />
        <q-btn flat round dense icon="keyboard" />
      </q-toolbar>
      <q-toolbar inverted color="dark">
        <q-btn flat round dense icon="menu" />
        <q-btn flat round dense icon="security" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="headset" />
        <q-btn flat round dense icon="tv" />
      </q-toolbar>
    </div>
  </q-page>
</q-pageContainer>
</template>

<script>
export default {
  methods: {
    openSpecialPosition (position) {
      this.$q.dialog({
        title: 'Positioned',
        message: `This dialog appears from ${position}.`,
        position
      })
    },
    onOk () {
      console.log('ok')
    },
    onCancel () {
      console.log('cancel')
    },
    onShow () {
      console.log('show')
    },
    onHide () {
      console.log('hide')
    },
    async choose (okFn, hero) {
      if (this.name.length === 0) {
        this.error = true
        this.$q.dialog({
          title: 'Please specify your name!',
          message: `Can't buy tickets without knowing your name.`
        })
      }
      else {
        await okFn()
        this.$q.notify(`Ok ${this.name}, going with ${hero}`)
      }
    }
  },
  watch: {
    name (val) {
      const err = val.length === 0
      if (this.nameError !== err) {
        this.nameError = err
      }
    }
  },
  data () {
    return {
      customDialogModel: false,
      name: '',
      nameError: false,
      positionalIcon: {
        top: 'arrow_upward',
        right: 'arrow_forward',
        bottom: 'arrow_downward',
        left: 'arrow_back'
      },
      types: [
        {
          label: 'Alert',
          icon: 'warning',
          handler: () => {
            this.$q.dialog({
              title: 'Alert',
              message: 'Modern HTML5 front-end framework on steroids.'
            })
          }
        },
        {
          label: 'Confirm',
          icon: 'done_all',
          handler: () => {
            this.$q.dialog({
              title: 'Confirm',
              message: 'Modern HTML5 front-end framework on steroids.',
              ok: 'Agree',
              cancel: 'Disagree'
            }).then(() => {
              this.$q.notify('Agreed!')
            }).catch(() => {
              this.$q.notify('Disagreed...')
            })
          }
        },
        {
          label: 'Prompt',
          icon: 'help',
          handler: () => {
            this.$q.dialog({
              title: 'Prompt',
              message: 'Modern front-end framework on steroids.',
              prompt: {
                model: '',
                type: 'text' // optional
              },
              cancel: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify(`You typed: "${data}"`)
            }).catch(() => {
              this.$q.notify('Ok, no mood for talking, right?')
            })
          }
        },
        {
          label: 'Single Choice Selection',
          icon: 'radio_button_checked',
          handler: () => {
            this.$q.dialog({
              title: 'Options',
              message: 'Modern front-end framework on steroids.',
              options: {
                type: 'radio',
                model: 'opt2',
                items: [
                  {label: 'Option 1', value: 'opt1', color: 'secondary'},
                  {label: 'Option 2', value: 'opt2'},
                  {label: 'Option 3', value: 'opt3'}
                ]
              },
              cancel: true,
              preventClose: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify(`You selected: ${data}`)
            })
          }
        },
        {
          label: 'Multiple Choice Selection',
          icon: 'check_box',
          handler: () => {
            this.$q.dialog({
              title: 'Options',
              message: 'Modern front-end framework on steroids.',
              options: {
                type: 'checkbox',
                model: [],
                items: [
                  {label: 'Option 1', value: 'opt1', color: 'secondary'},
                  {label: 'Option 2', value: 'opt2'},
                  {label: 'Option 3', value: 'opt3'}
                ]
              },
              cancel: true,
              preventClose: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify(`You selected: ${JSON.stringify(data)}`)
            })
          }
        }
      ],
      options: [
        {
          label: 'Stacked Buttons',
          icon: 'dns',
          handler: () => {
            this.$q.dialog({
              title: 'Stacked buttons',
              message: 'Go to a movie.',
              ok: 'Yes, please!',
              cancel: 'Uhm, nope',
              stackButtons: true
            }).then(() => {
              this.$q.notify('Agreed!')
            }).catch(() => {
              this.$q.notify('Disagreed...')
            })
          }
        },
        {
          label: 'Prevent accidental close',
          icon: 'power_settings_new',
          handler: () => {
            this.$q.dialog({
              title: 'Prevent close',
              message: 'This dialog cannot be dismissed by clicking/tapping on the background overlay.',
              ok: true,
              cancel: true,
              preventClose: true
            }).then(() => {
              this.$q.notify('You said OK!')
            }).catch(() => {
              this.$q.notify(`You didn't agree`)
            })
          }
        }
      ]
    }
  }
}
</script>