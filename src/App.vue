<template>
  <div id="app">
    <HeaderComp titulo="Entrega Vue Cli Ecomerce"/>
    <NavComp/>
    <router-view/>
  </div>
</template>

<script>

import HeaderComp from './components/HeaderComp.vue'
import NavComp from './components/NavComp.vue'
import store from './store'

export default {
  name: 'App',
    components: {
    HeaderComp,
    NavComp,
  },
  created(){
    store.getDevices(); 
  }
}  
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
