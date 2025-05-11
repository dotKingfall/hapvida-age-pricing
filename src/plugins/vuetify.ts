import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          'primary': '#981482',
          'accent': '#C51AA9',
          'bg': '#F3E7F3',
          'bg_accent': '#C172B4',
        },
      },
      
      dark: {
        dark: false,
        colors: {
          'primary': '#221B27',
          'accent': '#281A3D',
          'bg': '#221B27',
          'bg_accent': '#981482',
        },
      },
    },
  },
})