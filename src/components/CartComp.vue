<template >
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="cart-container">
                    <div class="card mb-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Your Cart</h5>
                            <div>
                                <ul class="list-group list-group-flush" v-for="(item,i) in this.list" :key="i">
                                    <div>
                                        <li class="list-group-item">
                                            <div class="d-flex">
                                                <span class="mr-2"> Item:{{ i+1 }} {{ item.model }}  ${{ item.price }} </span>
                                                <button class="btn btn btn-outline-danger float-right" @click="delSelectedItem(i)"> Remove</button> 
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                                <div class="list-group-item"><span>Your total: ${{ total }}</span></div>
                            </div>
                            <div>
                                <button type="button"
                                class="btn btn-success mt-3"
                                data-toggle="modal"
                                data-target=".bd-example-modal-lg"
                                @click="checkOut()">
                                Check Out!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
        <div class="col-md-6">
            <div class="table">
                <div><h3>Your previous purchases</h3></div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">recipt</th>
                            <th scope="col">date</th>
                            <th scope="col">total</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody v-for="(item,i) in this.user.purchases" :key="i">
                        <tr >
                            <th scope="row">{{ item.id }}</th>
                            <td>{{ item.date }}</td>
                            <td>{{ item.total }}</td>
                            <td><button class="btn btn-secondary">Buy Again</button> </td>
                        </tr>
                        <tr  v-for="(detail, n) in item.detail" :key="n">
                            <td>detail</td>
                            <td>product id: {{ detail.product_id }}</td>
                            <td>model: {{ detail.product_name }} </td>
                            <td>price: {{ detail.price }}</td>
                        </tr>
                    </tbody>   
                </table>
            </div>
        </div>
    </div>
</div>  
</template>
<script>

import store from '../store';

export default {
    name:"CartComp",
    data(){
        return{
            list:[],
            total: 0,
            user: {
                isLogged: false,
                purchases: []
            },
        }
    },
    created(){
        this.getShoppingCart()
        this.getTotal()
        this.user.isLogged = store.state.user.isLogged
        this.user.purchases = store.state.user.purchases
        console.log(this.user.purchases)
    },
    methods:{
        getShoppingCart(){
            this.list = store.getShoppingList();
        },
        getTotal(){
            this.total = store.getShoppingListTotal();
        },
        delSelectedItem(pos){
            store.removeProductFromShoppingList(pos);
            this.getTotal();
        },
        checkOut(){
            if(store.getShoppingListTotal() > 0){
                store.checkOut()
                this.getTotal();
                this.getShoppingCart();
                store.state.user.isLogged ? this.$router.push('/') : this.$router.push('/log-in')
            }
        }
    }
}
</script>
<style scoped>
.cart-container {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 1.3rem;
}
.container {
    padding: 20px;
}

.cart-container {
    margin-bottom: 20px;
    /* Estilos adicionales para el contenedor de la cesta */
}
</style>
