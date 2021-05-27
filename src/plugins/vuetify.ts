import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
const opts = {
    theme: {
        themes: {
          light: {
            primary: '#007c7d', // #E53935
            secondary: colors.red.lighten4, // #FFCDD2
            accent: '#fff', // #3F51B5
          },
          dark:{
            primary: '#40E0D0', // #E53935
            secondary: colors.red.lighten4, // #FFCDD2
            accent: (colors as any).green.darken5, // #3F51B5
            background: colors.red.base
          }
        },
        dark: false
      },
}

export default new Vuetify(opts)