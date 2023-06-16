<template>
<div class="login-container">
  <vue-form :state="formstate" @submit.prevent="onSubmit">
        <validate tag="label">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required name="email">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required name="password">
        </div>
        </validate>
        <div>
          <span v-if="loginSuccess"> Success! </span>
          <span v-if="loginError"> User or password are incorrect</span>
        </div>
        <button class="btn btn-success" type="submit">Login</button>
      </vue-form>
    </div>  
  </template>
  
  <script>
import InternalProps from './InternalProps.vue';

  export default {
    name: "LogInComp",
    mixins:[InternalProps],
    props:{ 
            states:Object
          },
    data() {
        return {
            nstate:[],
            loginSuccess:false,
            loginError: false,
            formstate:{},
            registeredUsers:[],
            email: "",
            password: "",
        }
    },
    created(){
      this.registeredUsers = this.registerd;
    },
    methods: {
      onSubmit(){
        if (this.formstate.$valid) {
            return this.userExists({email:this.email, password:this.password})
        }
      },
      userExists(anUser){
        const userEmail = anUser.email 
        const userPassword = anUser.password 
        
        let foundUser = this.registeredUsers.some(user => user.email === userEmail)
        let foundPassword = this.registeredUsers.some(user => user.password == userPassword)
        if(foundUser && foundPassword){
          this.loginSuccess = true;
          this.loginError = false;
          this.setState()
          return true
        }else{
          this.loginSuccess = false;
          this.loginError = true;
        }
        return false;
      },
      setState(){
            this.nstate = this.states
            for (let n in this.nstate){
                this.nstate[n] = false;
            }
            this.nstate['MainCard'] = true;
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