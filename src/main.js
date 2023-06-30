import Vue from 'vue'
import App from './App.vue'
import VueForm from 'vue-form' 
import 'bootstrap/dist/css/bootstrap.min.css' 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'


Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



Vue.config.productionTip = false
Vue.use(VueForm);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
