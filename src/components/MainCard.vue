<template >
    <div class="container">
        <div class="row">
            <div class="col" v-for="(dev) in this.devices" :key='dev.id'> 
                <OneCard
                button="Add to Cart"
                :model="dev.model"
                :price="dev.price"
                :picture="dev.picture"
                :id="dev.id"
                :stock="dev.stock"
                :specs="dev.specs"
                @getSelectedItem="getSelectedItem"
                ></OneCard>
            </div>
        </div> 
    </div>
</template>
<script>
import OneCard from './OneCard.vue'
import store from '../store'

export default {
    name: 'MainCard',
    components: {
        OneCard,
    },
    data(){
        return{
            devices:[],
            BASE_URL: process.env.VUE_APP_MOCKAPI_SERVICE_URL,
        }
    },
    created(){
        this.getDevices()
    },
    mounted(){
    this.BASE_URL = process.env.VUE_APP_MOCKAPI_SERVICE_URL;
    },
    methods:{
        getSelectedItem(item){
            store.addProductToShoppingList(item)
        },
        getDevices(){
            fetch("https://64996d0079fbe9bcf83f3a84.mockapi.io/products")
            .then(res => res.json())
            .then(devices => {
                
                let stockedDevices = devices.slice();
                let shoppingList = store.getShoppingList();
                for ( let device in stockedDevices){
                    for ( let item in shoppingList){
                        if (stockedDevices[device].id === shoppingList[item].id){
                            stockedDevices[device].stock -= 1;
                        }
                    }
                }
                this.devices = stockedDevices.slice();
            })
        },  
    }
}
</script>
<style>

</style>