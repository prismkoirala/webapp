<template>
<v-app>
    
    <!-- title bar for Mobile and tablets -->
        <v-col cols='12' class="pa-0" v-if="$mq == 'mobile' || $mq == 'tablet'" >
            <v-toolbar  elevation="0" color="primary" dark>
            <v-btn
              @click="goBack()"
              icon
            >
              <v-icon>mdi-arrow-left</v-icon>

            </v-btn>

            <v-toolbar-title>{{ titleBarName }}</v-toolbar-title>

          </v-toolbar>
        </v-col>

    <v-container>

           <!-- titlebar for desktop -->
            <v-row v-if="$mq === 'desktop'" >
                <v-col >
                    <div class="titleBar" >
                        <v-btn
                            square
                            tile
                            class="inline"
                            large
                            elevation="0"
                            @click="goBack()"
                        >
                        <v-icon
                            dark
                        >
                            mdi-keyboard-backspace
                        </v-icon>
                        </v-btn>

                        <h2 class="inline">{{ titleBarName }}</h2>
                    </div>
                </v-col>
            </v-row>

        

        <!-- stepper for desktop -->

        <v-stepper
            
            v-model="e6"
            vertical
            elevation="0"
            outlined
            tile
        >
            <v-stepper-step
            v-if="!isAuthenticated"
            :complete="e6 > 1"
            step="1"
            >
            Basic Detail
            <small>Please Provide Your Basic Information for delivery</small>
            </v-stepper-step>

            <v-stepper-content v-if="!isAuthenticated" step="1">
            <v-form v-model='basicDetailValid'>
                <v-text-field
                    class="pt-2"
                    label="Full Name"
                    v-model='fullName'
                    :rules="[() => !!fullName || 'Please Enter Your Full Name']"
                    placeholder="eg. Ram Karki"
                    outlined
                    dense
                    required
                ></v-text-field>
                <v-text-field
                    label="Phone Number"
                    v-model="phoneNumber"
                    :rules="[() => !!phoneNumber || 'Please Enter your Phone Number']"                
                    placeholder="eg. 98XXXXXXXX"
                    outlined
                    dense
                    prefix="+977"
                ></v-text-field>
                <v-text-field
                    label="Email"
                    placeholder="eg. ram_karki@gmail.com"
                    outlined
                    dense
                ></v-text-field>
            </v-form>

            <v-btn
                :disabled="!basicDetailValid"
                tile
                color="primary"
                @click="e6 = 2"
            >
                Next
            </v-btn>
            
            </v-stepper-content>

            <v-stepper-step
                :complete="e6 > 2"
                :step="isAuthenticated ? '1' : '2'"
            >
            Shipping Address
            <small>Provide Your Shipping address for Delivery</small>

            </v-stepper-step>

            <v-stepper-content :step="isAuthenticated ? '1' : '2'">
                
                 <v-radio-group class="pa-2" v-model="addressIdFromSelect" v-if="isAuthenticated">
                    <template v-slot:label>
                        <div>Choose your<strong class="primary--text"> Address</strong></div>
                    </template>
                    <v-radio v-for="(item, index) in userAddress" :key="index" :value="item.id">
                        <template v-slot:label>
                        <div>{{ item.address }}</div>
                        </template>
                    </v-radio>

                </v-radio-group>

                Nepal 
                <v-form v-model='shippingAddressValid'>

                    <v-col cols="12" class="pa-0 pt-1">
                        <v-autocomplete
                            :rules="[() => !!address.province || 'Choose Pradesh/Province']"
                            v-model="address.province"
                            :items="province"
                            item-text="name"
                            item-value="scode"
                            @change="getDistrict()"
                            dense
                            outlined
                            label="Province/ Pradesh"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-1">
                        <v-autocomplete
                            :rules="[() => !!address.district || 'Choose District']"
                            v-model="address.district"
                            :items="district"
                            item-text="name"
                            item-value="dcode"
                            @change="getMunicipality()"
                            :disabled="districtDisabled"
                            dense
                            outlined
                            label="District"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-1">
                        <v-autocomplete
                            :rules="[() => !!address.municipality || 'Choose Municipality']"
                            v-model="address.municipality"
                            :items="municipality"
                            item-text="name"
                            item-value="name"
                            :disabled="municipalityDisabled"
                            @change="getWard()"
                            dense
                            outlined
                            label="Municipality"
                        ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" class="pa-0 pt-1">
                        <v-autocomplete
                            :rules="[() => !!address.ward || 'Choose Ward']"
                            v-model="address.ward"
                            :items="ward"
                            item-text="ward_number"
                            item-value="id"
                            :disabled="wardDisabled"
                            dense
                            outlined
                            label="Ward"
                        ></v-autocomplete>
                    </v-col>
                </v-form>

                <v-btn
                    :disabled="!shippingAddressValid"
                    tile
                    elevation="0"
                    color="primary"
                    @click="handleStepClick"
                >
                    Next
                </v-btn>

                <v-btn @click="e6=1" text>
                    Back
                </v-btn>
            </v-stepper-content>

            <v-stepper-step
            :complete="e6 > 3"
            :step="isAuthenticated ? '2' : '3'"
            >
            Choose Payment Method
            </v-stepper-step>

            <v-stepper-content :step="isAuthenticated ? '2' : '3'">
            <v-radio-group
                class="pl-2"
                v-model="radioSelect"
                column
            >
              <v-radio

                label="Cash on delivery"
                color="primary"
                value="COD"
              ></v-radio>
              <v-radio
                label="eSewa"
                color="primary"
                value="ES"
              ></v-radio>
            </v-radio-group>
            <v-btn
                tile
                color="primary"
                @click="handleClickPayment()"
                elevation="0"
            >
                Continue
            </v-btn>
            <v-btn @click="e6 = 2" text>
                Cancel
            </v-btn>
            </v-stepper-content>

            <v-stepper-step :step="isAuthenticated? '3': '4'">
            Confirm Order
            </v-stepper-step>
            <v-stepper-content :step="isAuthenticated? '3': '4'">
            <h2> Confirm Your Order? </h2>
            <v-btn
                elevation="0"
                color="primary"
                @click="submitOrder()"
            >
                Confirm Order
            </v-btn>
            <v-btn @click="e6 = 3" text>
                Back
            </v-btn>
            </v-stepper-content>
        </v-stepper>

    </v-container>
</v-app>
</template>

<script lang="ts">
import { AddressBook } from "@/store/models/user";
import { AdministrativeAreaStore, JWTStore, UserStore } from "@/store/modules";
import { Component, Vue } from "vue-property-decorator";
import { filter } from "vue/types/umd";

@Component({
  components: {
  },
})
export default class Checkout extends Vue {
    titleBarName = ''
    loading = false
    submitLoading = false
    e6 = 1

    // for validity of form
    basicDetailValid = false
    shippingAddressValid = false
    

    // User Detail 
    fullName = null
    phone = null
    radioSelect = 'COD'
    addressIdFromSelect = 0
    // address book
    address: AddressBook = {} as AddressBook

    districtDisabled = true
    municipalityDisabled = true
    wardDisabled = true
    districtLoading = false
    municipalityLoading = false
    wardLoading = false
    
    async created() {
        this.loading = true
        this.titleBarName = 'Checkout'
        await AdministrativeAreaStore.getProvince()
        
        await UserStore.getUserBasicInfo()
        // getting list of addressbook by filtering user ID
        let filters: any = {}
        filters['user'] = (this as any).user.id
        await UserStore.getAddressByUserId({
            filters: filters
        })

        this.loading = true

    }

    get userAddress() {
        return UserStore.address
    }

    get user() {
        console.log(UserStore.userBasicInfo)
        return UserStore.userBasicInfo
    }

    get province() {
        return AdministrativeAreaStore.province
    }

    get district(){
        return AdministrativeAreaStore.district
    }

    get municipality() {
        return AdministrativeAreaStore.municipality
    }

    get ward() {
        return AdministrativeAreaStore.ward
    }


    async getDistrict(){
        this.districtDisabled = false
        this.districtLoading = true

        let filters: any = {}
        filters["scode"] = this.address.province

        await AdministrativeAreaStore.getDistrictByScode({
            filters: filters
        })

        this.districtLoading = false
    }

    async getMunicipality() {
        this.municipalityDisabled = false
        this.municipalityLoading = true

        let filters: any = {}
        filters["dcode"] = this.address.district

        await AdministrativeAreaStore.getMunicipalityByDcode({
            filters: filters
        })

        this.municipalityLoading = false
    }

    async getWard() {
        this.wardDisabled = false
        this.wardLoading = true

        let filters: any ={} 
        filters["gapa_napa"] = this.address.municipality

        await AdministrativeAreaStore.getWardByMcode({
            filters: filters
        })

        this.wardLoading = false
    }


    async submitOrder(){
        this.submitLoading = true

        let orderFormData = new FormData()
        console.log(this.addressIdFromSelect, this.user.id, this.$store.state.cart)
        orderFormData.append('address', String(this.addressIdFromSelect))
        orderFormData.append('user', String(this.user.id))

        for (let item of this.$store.state.cart) {
            orderFormData.append("product", item.id);
        }
        
        orderFormData.append('payment', 'COD')
        
        let order = await UserStore.createOrder(orderFormData)

        console.log(order)

        this.submitLoading = false

    }

    get isAuthenticated(){
        return JWTStore.isAuthenticated
    } 

    handleStepClick(){
        if(this.isAuthenticated){
            this.e6=2
        }else{
            this.e6 = 3
        }
    }

    handleClickPayment(){
        if(this.isAuthenticated){
            this.e6 = 3
        }else{
            this.e6 = 4
        }
    }

    goBack(){
        this.$router.push({
            name:'OrderSummary'
        })
    }
}
</script>
