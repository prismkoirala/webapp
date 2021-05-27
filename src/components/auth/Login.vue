<template>
<v-app>



<v-layout align-center justify-center>
    <v-flex class="mb">
        <h2>Login</h2>
        <p> Login to Shopping Mall to get additional features. </p>
    <v-card class="pa-2" outlined tile>
      <v-form  v-model="loginValid">
      
        
          <v-text-field
            outlined
            v-model="payload.phone_number"
            :rules="phoneRules"
            :counter="10"
            label="Phone Number"
            required
        ></v-text-field>
  
        <v-text-field
            outlined
            v-model="payload.password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            ></v-text-field>
        
        <v-btn
            large
            block
            @click="login()"
            :disabled="!loginValid"
            :loading="logging"
            tile
            color="primary"
            elevation="0"
        >   

        Login

        </v-btn>
        <v-card-actions class="ma-2">
            <v-row
                align="center"
                justify="end"
            >
                <v-btn class="mb-2" @click="goToRegister()" color="primary" text> Create an account</v-btn>
            </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
          
    </v-flex>
  </v-layout>


</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {eventHub} from '@/utils/eventHub'
import {LoginInfo} from '@/store/models/jwt'
import { JWTStore, UserStore } from "@/store/modules"

@Component({
  components: {
  },
})
export default class Login extends Vue {
    loginValid= false
    logging = false
    payload: LoginInfo ={
        phone_number: '',
        password: ''
    }

    

    // Rules for form validation
    phoneRules= [
        (v: any) => !!v || 'Please enter your Phone Number',
        (v: any) => v.length <= 10 || 'Name must be less than 10 characters',
      ]
    passwordRules= [
        (v: any) => !!v || 'Password is required',
        (v: any) => v.length >= 6 || 'Name must be more than 6 characters',
      ]
    
    async login(e: any){
        this.logging = true
        // let isValid = await this.$validator.validateAll()
        if(this.loginValid){
            let error = false
            await JWTStore.getJWT(this.payload)
                .then((result: any)=> console.log('res -> ', result))
                .catch((reason: any) => {
                    eventHub.$emit('notify','Error', reason, 'danger')
                    error = true
                })
            
            if(!error){
                if( this.isAuthenticated) {
                    let result  = await UserStore.getUserBasicInfo()
                        .catch((err: any) => console.log(err))
                    this.$router.push({
                        name: 'Home'
                    })
                    this.$parent.$data.activeLogin = false
                    eventHub.$emit('notify',"Successfully Logged in!", 'success')
                }

            }else{
                eventHub.$emit('notify', 'Error Logging  in', 'danger')
            }
        }else{
            eventHub.$emit('notify', 'Invalid Form', 'warning')
        }

        this.logging = false
    }

    goToRegister(){
        this.$router.push({
            name: 'Register'
        })
    }

    get isAuthenticated(){
        return JWTStore.isAuthenticated
    } 

}
</script>
<style lang="sass">
.mb
    margin-bottom: 200px !important
</style>
