<template >
  <div class="card mb-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ model }}</h5>
        <img class="card-img-top" :src="require(`@/assets/img/${picture}`)">
      <div >
        <ul class="list-group list-group-flush" v-for="(spec, i) in specs" :key="i">
          <li class="list-group-item">
            <p class="text-start">
            {{ spec }}
          </p></li>
        </ul>
      </div>
      <div>
        <p class="text-start"> Stock: {{ stock }}</p>
        <p class="text-start" >Precio: ${{ price }}</p>
        <button class="btn btn-success" @click="SubmitEvent">Comprar</button>
      </div>
  </div>
</div>
</template>
<script>
import InternalProps from './InternalProps.vue'

export default {
    name: "OneCard",
    data(){
      return {
        selectedItems:[]
      }
    },
    mixins:[InternalProps],
            props: {
                  picture: String,
                  price: Number,
                  model:String,
                  stock:Number,
                  specs: Array,
                  selected: Array
            },
            methods:{
              SubmitEvent(){
                console.log(this)
                let item = [
                  {id:this.$attrs.id, model:this.$props.model, price: this.$props.price}]
                this.$emit('getItemsAdded', item)
              }
            }
    }
</script>

<style >
img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  max-width: 150px;
  height: 100%;
  max-height: 200px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */ 
}

</style>