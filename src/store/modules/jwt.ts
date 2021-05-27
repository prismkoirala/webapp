import store from '@/store'
import {Module, VuexModule, Mutation, MutationAction, Action, getModule } from "vuex-module-decorators"
import API from '@/store/api/jwt'
import  { LoginInfo} from "@/store/models/jwt"

//importing vue framework
import Vue from "vue"
import { clearJWT } from '../api/api'
import router from '@/router'
import { eventHub } from '@/utils/eventHub'

const vm = new Vue()

@Module({ name: "JWTStore", dynamic: true, store})
class JWTModule extends VuexModule {
    isAuthenticated: any = localStorage.getItem("access_token") || null
    acc: any = null
    role: any = localStorage.getItem("role") || null
    UserExists = false

    @MutationAction
    async getJWT(payload: LoginInfo){
        const obj = await API.getJWT(payload)
        localStorage.setItem('refresh_token', obj.refresh)
        localStorage.setItem('access_token', obj.access)
        return { isAuthenticated: true as boolean}
    }

    async verifyAccessToken(){
        await API.verifyAccessToken({
            accessToken: localStorage.getItem("access_token")
        })
            .then((res) => {
                return true
            })
            .catch((err) => {
                return false
            })
        return false
    }

    @Action
    async validateJWT(){
        let verifyAccessToken = false

        await API.verifyAccessToken({
            token: localStorage.getItem("access_token"),
        })
            .then((res) => {
                verifyAccessToken = true
            })
            .catch((err) => {
                verifyAccessToken = false
            } )
        
            return verifyAccessToken
    }

    @Action
    async getAccessToken(){
        const acc = await API.getAccessToken({
            refresh: localStorage.getItem('refresh_token'),
        })
        localStorage.removeItem("access_token")
        localStorage.setItem("access_token", acc.access)
    }
    
    get loggedIn(){
        return this.isAuthenticated
    }

    @Mutation
    logOut(){
        this.role = null
        this.isAuthenticated = false
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('role')
        clearJWT()
        // router.replace('/') 
        // location.replace('/')
        // eventHub.$emit('reloadPage')        
        router.push({ name: "Login" }).catch((error) => console.log(error))
        eventHub.$emit('notify', 'Logout successfull', 'success')
    }
}

export default getModule(JWTModule)