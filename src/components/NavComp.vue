<template>
    <div class="mb-3">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-for="link in links" :key="link.comp">
                <b-nav-item>
                    <router-link  v-if="link.visible"
                    class="nav-link active" 
                    :to="link.to"><ALabel 
                    :title="link.title " 
                    :value="link.value"/>
                </router-link>
            </b-nav-item>
        </b-navbar-nav>
    </b-collapse>
</b-navbar>
</div>   
</template>
<script>
//https://bootstrap-vue.org/docs/components/navbar
import ALabel from './ALabel.vue';
import store from '../store';

export default {
    name:"NavComp",
    components:{
        ALabel
    },
    data(){
        return{
            links: store.state.navBar,
        }
    }
}
</script>
<style>
</style>