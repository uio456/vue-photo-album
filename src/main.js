// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$bus = new Vue();
// 需在此定義 bus ，之後別的 vue 實例都能發送($bus.$emit)監聽($bus.$on)事件 
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
