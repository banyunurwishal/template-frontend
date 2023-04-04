import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from '~/lang/en-US'
import id from '~/lang/id-ID'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    id,
  },
})

export default ({ app, store }, inject) => {
  inject('i18n', i18n)
  app.i18n = i18n
}
