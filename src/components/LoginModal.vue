<template>
   <div class="center">
       <vs-dialog v-model="$parent.$data.activeLogin" @close="toggleLogin">
        <template #header>
          <h4 class="not-margin">
            Login to Shopping Mall
          </h4>
        </template>

        <div class="con-form">
          <vs-input v-model="payload.phone_number" placeholder="Phone Number">
            <template #icon>
              <i class='bx bxs-phone'></i>
            </template>
          </vs-input>
          <vs-input type="password" v-model="payload.password" placeholder="Password">
            <template #icon>
              <i class='bx bxs-lock'></i>
            </template>
          </vs-input>
          <div class="flex">
            <vs-checkbox>Remember me</vs-checkbox>
            <a href="#">Forgot Password?</a>
          </div>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button @click="login" square color="#66c2d5" block>
              Sign In
            </vs-button>

            <div class="new">
              New Here? <a href="#">Create New Account</a>
            </div>
          </div>
        </template>
      </vs-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {eventHub} from '@/utils/eventHub'
import {LoginInfo} from '@/store/models/jwt'
import { JWTStore, UserStore } from "@/store/modules"

@Component({
  components: {
  },
  props: {
  }
})
export default class AddToCart extends Vue {
    logging = false
    valid = true 
    payload: LoginInfo = {
        phone_number: '',
        password: ''
    }
    toggleLogin(){
        this.$parent.$data.activeLogin = false
    }

    async login(e: any){
        this.logging = true
        // let isValid = await this.$validator.validateAll()
        if(this.valid){
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
                    eventHub.$emit('notify','Login Success', "Successfully Logged in!", 'success')
                }

            }else{
                eventHub.$emit('notify', 'Error', "Incorrect Phone Number or Password", 'danger')
            }
        }else{
            eventHub.$emit('notify', 'Invalid Form', '', 'warning')
        }

        this.logging = false
    }

    get isAuthenticated(){
        return JWTStore.isAuthenticated
    } 
    
}
</script>
