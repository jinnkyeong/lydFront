// Styles
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.green.lighten3,
          secondary: colors.cyan.accent4, 
          grey: colors.grey.lighten1,
          grey_light: colors.grey.lighten2,
          grey_lighter: colors.grey.lighten5,
          // grey_dark: colors.grey,
          yellow_kakao: colors.yellow.darken1,
          green_naver:  colors.green.accent3,
          // green_naver:  colors.light_green.darken4
          blue_light: colors.blue.lighten5
          
        }
      },
    },
  },
  icons: { 
		iconfont: 'md', 
	}, 
})
