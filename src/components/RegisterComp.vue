<template>
    <div>
        <vue-form :state="formstate" @submit.prevent="onSubmit">
            <div class="login-container">
                <div class="form-group">
                    <validate tag="label">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                            <span class="input-group-text" >Name</span>
                            </div>
                            <input type="text" class="form-control" v-model="user.name" placeholder="enter name" required name="name">
                                <field-messages name="name" show="$touched">
                                    <div slot="required"> Name required </div>
                                </field-messages>
                        </div>
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <span class="input-group-text" >Email</span>
                            </div>
                        <input type="text" class="form-control" v-model="user.email" placeholder="enter email" required name="email">
                        <field-messages name="email" show="$touched">
                                <div slot="required">Email required</div>
                        </field-messages>
                    </div>
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label" :custom="{'check-password' : checkPassword}">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <span class="input-group-text" >Enter password</span>
                        </div> 
                        <input type="password" class="form-control" v-model="user.password1" placeholder="enter password" required name="password1">
                        <field-messages name="password1" show="$touched">
                            <div slot="check-password">Password must have 8 or more characters, one or more uppercase, one or more lowercase one or more numbers</div>
                        </field-messages>
                    </div> 
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label" :custom="{'password-coincide': passwordCoincide}">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <span class="input-group-text" >Enter password</span>
                            </div>          
                        <input type="password" class="form-control" v-model="user.password2" placeholder="re-enter password" required name="password2">
                        <field-messages name="password2" show="$touched" >
                                <div slot="check-password">Password required</div>
                                <div slot="password-coincide">Passwords must be identical</div>
                        </field-messages>
                    </div> 
                    </validate>
                </div>  
                <div v-if="alreadyRegistered"><span>This email is already registered</span></div>
                <div v-if="successRegister"><span>Success!</span></div>
                <button class="btn btn-success mt-3" type="submit">Send</button>
            </div>
        </vue-form>
    </div>
</template>
<script>
import InternalProps from './InternalProps.vue';

export default {
    name:"RegisterComp",
    mixins:[InternalProps],
    props:{
        users:{},
        states:Object
    },
    data(){
        return{
            nstate:[{}],
            alreadyRegistered:false,
            successRegister:false,
            formstate:{},
            registeredUsers:[{}],
            user:
                {   
                    name:"",
                    email:"",
                    password1:"",
                },
            password2 :"",
        };
    },
    created(){
        this.registeredUsers = this.registerd
    },
    methods: {
    setState(){
        this.nstate = this.states;
        for (let n in this.nstate){
            this.nstate[n] = false;
        }
        this.nstate['MainCard'] = true;
        console.log(this.nstate)
    },
    onSubmit() {
      if (this.formstate.$valid) {
            return this.registerUser(this.user);
      }
    },
    checkPassword(value) {
      return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        value
      );
    },
    passwordCoincide(value) {
      return this.user.password1 === value;
    },
    userExists(anUser){
        const newUserEmail = anUser.email 
        let foundUser = this.registeredUsers.some(user => user.email === newUserEmail)
        return foundUser
    },
    registerUser(anUser){
       if(!this.userExists(anUser)){
        this.registeredUsers.push({name: anUser.name, email : anUser.email, password: anUser.password1})
        this.alreadyRegistered = false
        this.successRegister = true
        this.setState()
       }else{
        this.alreadyRegistered = true; 
        this.successRegister = false; 
       }
    }
  }
}
</script>
<style>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
</style>