<template >
    <div class="container">
        <div class="row" >
                <div class="col" v-for="(movil) in this.moviles" :key='movil.id' > 
                                <OneCard
                                :modelo="movil.modelo"
                                :costo="movil.costo"
                                :portada="movil.portada"
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
                console.log(items)
                this.itemsAdded = items;
                this.addedItems = this.itemsAdded;
                //console.log(this.addedItems)
        }
    }
}
</script>
<style>

</style>