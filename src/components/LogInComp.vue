<template>
  <div class="login-container">
    <vue-form :state="formstate" @submit.prevent="onSubmit">
      <validate tag="label">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email"
          id="email"
          v-model="login.email"
          autocomplete="admin@coder.com"
          required name="email">
        </div>
      </validate>
      <validate tag="label">
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" 
          id="password" 
          v-model="login.password"
          autocomplete="Admin123"
          required
          name="password">
        </div>
      </validate>
      <div>
        <span v-if="loginSuccess"> Success! </span>
        <span v-if="loginError"> User or password are incorrect</span>
        <span v-if="notRegistered"> User is not registered </span>
      </div>
      <button class="btn btn-success" type="submit" :disabled="this.isLoading">Login</button>
    </vue-form>
  </div>  
</template>

<script>
import store from '../store';

export default {
  name: "LogInComp",
  props:{ 
    states:Object
  },
  data() {
    return {
      BASE_URL: process.env.VUE_APP_MOCKAPI_SERVICE_URL,
      isLoading:false,
      loginSuccess:false,
      loginError: false,
      notRegistered: false,
      login:{ 
        name: "",
        email: "",
        password: "",
        isAdmin: false
      },
      formstate:{}
    }
  },
  mounted(){
    this.BASE_URL = process.env.VUE_APP_MOCKAPI_SERVICE_URL;
  },
  methods: {
    onSubmit(){
      if(this.formstate.$valid){
        
        this.checkLogin();
      }
    },
    checkLogin(){
      this.isLoading = true;
      //fetch("https://64996d0079fbe9bcf83f3a84.mockapi.io/users")
      fetch(`${this.BASE_URL}/users`)
      .then(res => res.json())
      .then(users => {
        let user = users.find(user => user.email === this.login.email);
        if(user){ 
          if(user.password === this.login.password){
            this.loginSuccess = true;
            this.loginError = false;
            this.notRegistered = false;
            store.setUser(user)
            this.$router.push(user.isAdmin ? "/product-mgm" : "/")
          }else{
            this.notRegistered = false;
            this.loginError = true;
            this.loginSuccess = false;
          }
        }else{
          this.notRegistered = true;
        }
        })
        .catch(err => console.log(err)) 
        .finally(() => this.isLoading = false)
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
</style>