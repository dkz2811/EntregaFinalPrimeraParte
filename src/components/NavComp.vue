<template>
    <div>
        <ul class="nav justify-content-end" 
          v-for="link in links" :key="link.comp">
            <li class="nav-item">
                  <a class="nav-link" :id="link.comp" @click.capture="handClick(link.comp)" href="#" >{{ link.title }}</a>
            </li>
        </ul>
    </div>
</template>
<script>

import InternalProps from './InternalProps.vue';

export default {
    name:"NavComp",
    mixins:[InternalProps],
    data(){
        return{
            nstate:[{}]
        }
    },
    created(){
    },
    props:{
        links:Array,
        states:Object
    },
    methods:{
        handClick(clicked){
            this.setState(clicked)
        },
        setState(component){
           this.nstate = this.states;
            for (let n in this.nstate){
                this.nstate[n] = false;
            }
            this.nstate[component] = true;
        }
    }
}
</script>
<style>
    
</style>