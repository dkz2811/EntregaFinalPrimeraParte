<template >
    <div>
        <ul v-for="(item, i) in this.addedItems" :key="item">
            <li>{{ item }}  - {{ i }}</li>
        </ul>
        <span>alala</span>
    </div>
</template>
<script>
import InternalProps from './InternalProps.vue';
export default {
    name:"CartComp",
    mixins:[InternalProps],
    data(){
        return{
            nstate:[]
        }
    },
    props:{
        states: Object,
        cartItems:Array
    },
    methods:{
        setState(){
        this.nstate = this.states;
        for (let n in this.nstate){
            this.nstate[n] = false;
        }
        this.nstate['MainCard'] = true;
        console.log(this.nstate)
    },
    },created(){
    }

}
</script>
<style >
    
</style>