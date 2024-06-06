// src/plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VMain, VBtn, VDialog, VCard, VToolbar, VCardText, VCardActions, VTextField, VCardTitle, VList, VListItem, VIcon, VSpacer } from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VMain,
    VBtn,
    VDialog,
    VCard,
    VToolbar,
    VCardText,
    VCardActions,
    VTextField,
    VCardTitle,
    VList,
    VListItem,
    VIcon,
    VSpacer,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
