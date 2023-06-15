import Vue from 'vue'
import App from './App.vue'
import VueForm from 'vue-form' 
import 'bootstrap/dist/css/bootstrap.min.css' 


Vue.config.productionTip = false
Vue.use(VueForm);

new Vue({
  render: h => h(App),
}).$mount('#app')
