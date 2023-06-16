<template >
    
    <div class="cart-container">
        <div class="card mb-2" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Your Cart</h5>
        <div class="card">
            <ul class="list-group list-group-flush" v-for="(item,i) in this.list" :key="item.id">
                <li class="list-group-item">
                    <span> {{ i }} - {{ item.model }}: ${{ item.price }}  </span>
                </li>
            </ul>
            <div class="list-group-item"><span>Your total: ${{ total }}</span></div>
        </div>
        <div><button class="btn btn-success mt-3"> Check Out!</button></div>
        <div v-if="added"><span>Added to Cart!</span></div>
    </div>
    </div>
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
            list:[],
            total: 0,
            added: false
        }
    },
    props:{
        cartItems:Array,
    },
    created(){
        this.showList(),
        this.getTotal()
    },
    methods:{
        showList(){
            const arrayString = localStorage.getItem('cartItems');
            let array = JSON.parse(arrayString)
            this.list = array;
        },
        getTotal(){
            let tot = 0;
            
            for( let item in this.list){
                tot += this.list[item].price;
            }
            this.total = tot;
        }
    }

}
</script>
<style scoped>
  .cart-container {
    max-width: 330px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
</style>
