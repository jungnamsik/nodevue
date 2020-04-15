import Vue from 'vue'
import axios from 'axios'

import lodash from 'lodash'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios ;
Vue.prototype._ = lodash ;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app') ;


const obj = require.context('./components/.', false) ;
console.log('==>>', obj);
