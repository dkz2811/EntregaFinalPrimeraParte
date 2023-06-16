<template >
    <div>
        <ul v-for="(item,i) in this.moviles" :key="item.id">
            <li>
                <span> {{ i }} - {{ item.price }} {{ item.model }}  </span>
            </li>
        </ul>
        <span>Cart - No hecho</span>
    </div>
</template>
<script>
import InternalProps from './InternalProps.vue';
export default {
    name:"CartComp",
    mixins:[InternalProps],
    data(){
        return{
            nstate:[],
            list:[]
        }
    },
    props:{
        cartItems:Array,
    },
    created(){
        this.showList()
    },
    methods:{
        showList(){
            const arrayString = localStorage.getItem('cartItems');
            let array = JSON.parse(arrayString)
            this.list = array;
            console.log(this.list)
        }
    }

}
</script>
<style >
    
</style>