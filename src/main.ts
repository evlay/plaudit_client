import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSync, faWindowClose, faThumbsUp, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import interceptorSetup from './utils/interceptor'


library.add(faSync, faWindowClose, faThumbsUp, faBars, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Register a global custom directive called v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

Vue.config.productionTip = false

// interceptorSetup()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
