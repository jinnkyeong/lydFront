import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from '@/router'
import store from '@/store/index'
import format from '@/utillFunction/format'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome 컴포넌트 */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* 
   import specific icons 
   원하는 아이콘을 개별적으로 import
*/
import { faXmark, faChevronLeft, faUser, faLocationDot, 
  faCertificate,faVenusMars,faSignal, faMoneyBill,faCalendarDays, faChevronRight,
   faDog, faArrowUp, faArrowDown, faMagnifyingGlass, faMinus, faCheck, faQuoteLeft, 
   faKey,
   faClock, faTemperatureThreeQuarters, faAddressCard, faMessage, faN, faG, faEnvelope, faEye, faChevronDown,faChevronUp, faTrashCan, faCircleCheck} 
  from '@fortawesome/free-solid-svg-icons'
/* 위에서 import한 아이콘들을 Core library에 등록 */
library.add(faXmark, faChevronLeft, faUser, faLocationDot, 
  faCertificate, faVenusMars,faSignal, faMoneyBill,faCalendarDays, faChevronRight,
  faDog, faArrowUp,faArrowDown, faMagnifyingGlass, faMinus, faCheck, faQuoteLeft,
  faKey, faClock, faTemperatureThreeQuarters, faAddressCard, faMessage, faN, faG, faEnvelope,faEye, faChevronDown, faChevronUp, faTrashCan,faCircleCheck
)


  window.Kakao.init("1531269640c1a1ec1d211656da4aa0ff");  //rest api key


loadFonts()
const vue = createApp(App)



vue.config.productionTip = false // 이게 뭐지?
vue.component('font-awesome-icon', FontAwesomeIcon)  
  .use(router)
  .use(vuetify)
  .use(store)
  .use(format)
  .mount('#app')



