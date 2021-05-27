<template>
    <v-app>

    <v-container fill-height v-if="$mq == 'mobile' || $mq == 'tablet'">          
    <v-layout fill-height align-center justify-center>
        <v-flex class="mb">
           
            <v-card
                class="mx-auto pa-2"
                max-width="500"
                outlined
                tile
                :loading="loading"
            >
                <v-card-title class="title font-weight-regular justify-space-between">
                <span>{{ currentTitle }}</span>
                <v-avatar
                    color="primary lighten-2"
                    class="subheading white--text"
                    size="24"
                    v-text="step"
                ></v-avatar>
                </v-card-title>

                <v-window v-model="step">
                <v-window-item :value="1">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.first_name"
                                outlined
                                dense
                                label="First Name"
                                placeholder="eg: Ram"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.last_name"
                                outlined
                                dense
                                label="Last Name"
                                placeholder="eg: Karki"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-text-field
                        v-model="user.phone_number"
                        outlined
                        dense
                        label="Phone Number"
                        placeholder="eg: 98XXXXXXXX"
                    ></v-text-field>
                    <span class="caption grey--text text--darken-1">
                        This is the Phone Number you will use to login to your Shopping Mall
                    </span>

                    <v-text-field
                        v-model="user.email"
                        outlined
                        dense
                        label="Email"
                        placeholder="eg: 98XXXXXXXX"
                    ></v-text-field>
                    <span class="caption grey--text text--darken-1">
                        This is the email we will use to send you mail about your orders.
                    </span>
                    
                    
                </v-window-item>

                <!-- Address Window -->
                <v-window-item :value="2">
                    <v-card-text>

                    <v-select
                        v-model="user.province"
                        @change="getDistrict()"
                        :items="province"
                        item-text="name"
                        item-value="scode"
                        label="Province"
                        outlined
                        dense
                    ></v-select>
                    <v-select
                        v-model="user.district"
                        :items="district"
                        item-text="name"
                        item-value="dcode"
                        :disabled="disableDistrict"
                        :loading="loadingDistrict"
                        label="District"
                        @change="getMunicipality()"
                        outlined
                        dense
                    ></v-select>
                    <v-select
                        v-model="user.municipality"
                        :disabled="disableMunicipality"
                        :items="municipality"
                        item-text="name"
                        item-value="name"
                        :loading="loadingMunicipality"
                        label="Municipality"
                        @change="getWard()"
                        outlined
                        dense
                    ></v-select>
                    <v-select
                        v-model="user.ward"
                        :items="ward"
                        item-text="ward_number"
                        item-value="id"
                        :disabled="disableWard"
                        :loading="loadingWard"
                        label="Ward"
                        @change="print()"
                        outlined
                        dense
                    ></v-select>
                    <span class="caption grey--text text--darken-1">
                        Please Provide your address, we want this address for billing.
                    </span>
                    </v-card-text>

                </v-window-item>

                <v-window-item :value="3">
                    <v-card-text>
                    <v-file-input
                        v-model="profile_picture"
                        counter
                        show-size
                        truncate-length="20"
                        ></v-file-input>
                    <span class="caption grey--text text--darken-1">
                        Please Pick a profile picture.
                    </span>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="4">
                    <v-card-text>
                    <v-text-field
                        outlined
                        dense
                        v-model="user.password"
                        label="Password"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        v-model="user.confirm_password"
                        outlined
                        dense
                        :rules="confirmPasswordRule"
                        label="Confirm Password"
                        type="password"
                    ></v-text-field>
                    <span class="caption grey--text text--darken-1">
                        Please enter a password for your account
                    </span>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="5">
                    <div class="pa-4 text-center">
                    <v-img
                        class="mb-4"
                        contain
                        height="128"
                        src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                    ></v-img>
                    <h3 class="title font-weight-light mb-2">
                        Welcome to Shopping Mall
                    </h3>
                    <span class="caption grey--text">Thanks for signing up!</span>
                    </div>
                </v-window-item>
                </v-window>

                <v-divider></v-divider>

                <v-card-actions>
                <v-btn
                    tile
                    large
                    elevation="0"
                    :disabled="step === 1"
                    text
                    @click="step--"
                >
                    Back
                </v-btn>
                <v-spacer></v-spacer>

                    <span v-if="step < 5">
                        <v-btn
                            color="primary"
                            tile
                            large
                            @click=" step == 4 ? submitRegisterForm() : step++"
                            elevation="0"
                        >
                            Next
                        </v-btn>
                    </span>

                    <span v-else>
                        <v-btn
                            tile
                            large
                            elevation="0"
                            color="primary"
                            depressed
                            @click="goToLogin()"
                        >
                            Login
                        </v-btn>
                    

                    </span>

                </v-card-actions>
            </v-card>
            
        </v-flex>
    </v-layout>
    </v-container>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/store/models/user"
import { AdministrativeAreaStore, UserStore } from "@/store/modules";
import { use } from "vue/types/umd";
import { eventHub } from "@/utils/eventHub";


@Component({
  components: {
  },
})
export default class Register extends Vue {
    loading = false
    registering = false
    error = false
    step = 1
    user: User = {} as User
    typeOfUser = 0

    loadingDistrict = false
    loadingMunicipality = false
    loadingWard = false
    disableDistrict = true
    disableMunicipality = true
    disableWard = true

    profile_picture : File[] = [] as File[]


    // Rules for registration form
    confirmPasswordRule =[
        (v: any) => !!v || 'Please enter your Password again',
        (v: any) => v == this.user.password || 'Password do not match',
    ]


    async created(){
        this.loading = true
        this.currentTitle
        
        await AdministrativeAreaStore.getProvince()

        this.loading = false
    }

    get currentTitle(){
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Choose Your Address'
          case 3: return 'Choose a Profile Picture'
          case 4: return 'Create a password'
          case 5: return 'Account Created'

          default: return 'Account created'
        }
    }

    get province(){
        var province = AdministrativeAreaStore.province
        return province
    }
    get district(){
        let district = AdministrativeAreaStore.district
        return district
    }

    get municipality(){
        let municipality = AdministrativeAreaStore.municipality
        console.log('municipality ->', municipality)
        return municipality
    }

    get ward() {
        let ward = AdministrativeAreaStore.ward
        return ward
    }

    async getDistrict(){
        this.disableDistrict = false
        
        this.user.district = ''
        this.user.municipality = ''
        this.user.ward = ''

        


        this.loadingDistrict = true   
        var scode = this.user.province
        let filters: any = {}

        filters["scode"] = scode

        await AdministrativeAreaStore.getDistrictByScode({
            filters: filters
        })

        this.loadingDistrict = false
    }

    async getMunicipality(){
        this.disableMunicipality = false
        
        this.loadingMunicipality = true

        const dcode = this.user.district
        let filters: any = {}
        filters["dcode"] = dcode

        await AdministrativeAreaStore.getMunicipalityByDcode({
            filters: filters
        })

        this.loadingMunicipality = false
    }

    async getWard(){
        this.disableWard = false
        
        this.loadingWard = true

        const municipality_name = this.user.municipality
        let filters: any = {}
        filters["gapa_napa"] = municipality_name

        await AdministrativeAreaStore.getWardByMcode({
            filters: filters
        })

        this.loadingWard = false
    }


    async submitRegisterForm(){
        this.registering = true
        
        let userFormData = new FormData()

        console.log('userForm ->', this.user)

        userFormData.append('user.first_name', this.user.first_name)
        userFormData.append('user.last_name', this.user.last_name)
        userFormData.append('user.phone_number', this.user.phone_number)
        userFormData.append('user.email', this.user.email)
        userFormData.append('province', this.user.province)
        userFormData.append('district', this.user.district)
        userFormData.append('address', 'empty')
        userFormData.append('ward', this.user.ward)

        // get types of user's PK 
        let filtersUser: any = {}
        filtersUser['user_type'] = 'GENERAL'

        this.typeOfUser = await UserStore.getTypeOfUserByName({
            filters: filtersUser
        })
        console.log(this.typeOfUser)

        userFormData.append("user_types.user_type", String((this as any).typeOfUser[0].id));


        //get municipality's pk
        let filters: any = {}
        filters["name"] = this.user.municipality

        await AdministrativeAreaStore.getMunicipalityByDcode({
            filters: filters
        })

        console.log('muni...', this.municipality.id)
        const muni = (this as any).municipality[0].id

        userFormData.append('municipality', String(muni))
        
        
        userFormData.append('user.password', this.user.password)
        userFormData.append('user.confirm_password', this.user.confirm_password)
        userFormData.append('images', (this as any).profile_picture)

        this.error = false
        let user_id = this.$route.query.org_id

        if(user_id){
            console.log('user updating here...')
        }else{
            await UserStore.registerUser({
                user: userFormData,
                user_types: 'general'
            })
            .catch((err) => {
                this.error = true
            })
        }

        if(!this.error){            
            eventHub.$emit('notify', 'User Registered Successfully!', 'success')
        }else{
            eventHub.$emit('notify', 'Error Registering User', 'error')

        }
        
        // userFormData.append('user.confirm_password', this.user.username)

        this.registering = false
        this.step++
    }
    

    goToLogin(){
        this.$router.push({
            name: 'Profile'
        })
    }
}
</script>
