// export const state = () => ({
//     counter: 0
// })
//
// export const mutations = {
//     increment(state) {
//         state.counter++
//     }
// }
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  locales: ['en', 'es'],
  locale: 'en',
  forget_email: ''
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  setEmail(state){
    return state.forget_email
  }
}


export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
      console.log(state.locale)
    }
  }
}
