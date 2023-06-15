<template>
  <div id="app">
    <HeaderComp titulo="Entrega Vue Cli"/>
    <NavComp :links="this.navBar" :states="this.visible"/>
    <RegisterComp v-if="this.visible.RegisterComp" :states="this.visible"/>
    <LogInComp v-if="this.visible.LogInComp" :states="this.visible"/>
    <MainCard v-if="this.visible.MainCard" :states="this.visible"/>
    <CartComp v-if="this.visible.CartComp" :states="this.visible"/>
  </div>
</template>

<script>

import HeaderComp from './components/HeaderComp.vue'
import NavComp from './components/NavComp.vue'
import MainCard from './components/MainCard.vue'
import LogInComp from './components/LogInComp.vue'
import RegisterComp from './components/RegisterComp.vue'
import InternalProps from './components/InternalProps.vue'
import CartComp from './components/CartComp.vue'

export default {
  name: 'App',
  mixins:[InternalProps],
    components: {
    HeaderComp,
    NavComp,
    MainCard,
    LogInComp,
    RegisterComp,
    CartComp
  },
  created(){
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
