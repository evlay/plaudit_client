import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import http from '../utils/http-common'
import { TokenService } from '../services/token.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: '' || localStorage.getItem('currentPlauditUser'),
    posts: []
  },
  mutations: {
    setUser(state, plauditUser){
      state.currentUser = plauditUser
      localStorage.setItem('currentPlauditUser', plauditUser)
    },
    logout(state){
      state.currentUser = ''
      http.post('/auth/blacklist-refreshtoken', {
        username: localStorage.getItem('currentPlauditUser'),
        refreshToken: localStorage.getItem('plauditRefreshToken')
      })
        .then(results => console.log(results))
        .catch(error => console.error(error))
      router.push('/login')
    }
  },
  actions: {
    setUser(context, plauditUser){
      context.commit('setUser', plauditUser)
    },
    logout(context){
      context.commit('logout')
    }
  },
  modules: {
  }
})