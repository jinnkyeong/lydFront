import { createStore } from 'vuex'
import api from '@/api'
import router from '@/router/index'
import createPersistedState from "vuex-persistedstate";
import login from './modules/login';
import just_state from './modules/justState';
import item from './modules/item';





const store = createStore({
   
  modules: {
    login,
    just_state,
    item,
  },
  plugins: [
    //주목! : 여기에 쓴 모듈만 저장됩니다.
    createPersistedState({
      paths: [
        'login',
        'item',
      ],
    })
  ]
})

export default store;