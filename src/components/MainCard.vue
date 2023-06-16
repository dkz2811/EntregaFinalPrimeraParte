<template >
    <div class="container">
        <div class="row" >
                <div class="col" v-for="(movil) in this.moviles" :key='movil.id' > 
                                <OneCard
                                :model="movil.model"
                                :price="movil.price"
                                :picture="movil.picture"
                                :id="movil.id"
                                :stock="movil.stock"
                                :specs="movil.specs"
                                :selected="itemsAdded"
                                @getItemsAdded="getItemsAdded"
                                ></OneCard>
                </div>
        </div> 
        </div>
</template>
<script>
import OneCard from './OneCard.vue'
import InternalProps from './InternalProps.vue';

export default {
    name: 'MainCard',
    mixins:[InternalProps],
    components: {
                    OneCard,
                },
    data(){
        return{
                itemsAdded:[]
        }
    },
    methods:{
        getItemsAdded(items){
                this.itemsAdded.push(items);
                const arrayString = JSON.stringify(this.itemsAdded)
                localStorage.setItem('cartItems', arrayString)
        },  
    }
}
</script>
<style>

</style>