<template>
<v-app>
    <div>

        <!-- titlebar for desktop -->
    <v-row v-if="$mq === 'desktop'" >
        <v-col  offset="2" >
            <div  >
                  <v-btn
                    tile
                    class="inline"
                    @click="goBack()"
                    elevation="0"
                    large
                >
                <v-icon
                  >
                    mdi-keyboard-backspace
                 </v-icon>
                </v-btn>

                  
                  <h2 class="inline">{{ titleBarName }}</h2>

            </div>
        </v-col>
      </v-row>

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

      <!-- Order Summary for desktop -->
      <v-container >

        <v-row class="mp" v-if="$mq === 'desktop'" >
            <span style="padding:0px" v-if="$store.state.cart.length !=0">
              <v-col cols="8">
                    <v-card
                      class="mt-2"
                      outlined
                      v-for="(item, index) in $store.state.cart"
                      :key="index"
                    >
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="overline mb-4">
                            Order #{{index+1}}
                          </div>
                          <v-list-item-title class="headline mb-1">
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>{{item.variant_attrib_name}} - {{ item.variant_attrib_value }}</v-list-item-subtitle>
                          <v-list-item-subtitle>Price - {{ item.price }}</v-list-item-subtitle>
                          <v-list-item-subtitle>Quantity - {{ item.quantity }}</v-list-item-subtitle>

                        </v-list-item-content>

                        <v-list-item-avatar
                          tile
                          size="100"
                          color="grey"
                        >
                        <img :src="item.image"/>
                        </v-list-item-avatar>
                      </v-list-item>

                      <v-card-actions>
                        <v-btn
                          outlined
                          rounded
                          text
                          tile
                          color="error"
                          @click="deleteItem(item.id)"
                        >
                        <v-icon left>
                          mdi-delete-empty-outline
                        </v-icon>
                          Remove
                        </v-btn>
                        
                      </v-card-actions>
                    </v-card>
              </v-col>
            </span>
            <span v-else>
              <v-col cols="8">
                  <v-sheet
                    color="white"
                    height="500"
                    width="700"
                    max-width="900"
                  >
                  <div class="verticallyAlign">
                    <v-icon class="emptyCart" left>
                      mdi-cart-remove
                    </v-icon>        
                    <p class="verticallyAlign">
                      Such Empty
                    </p>
                    <v-btn
                      tile
                      dense
                      elevation="0"
                      text
                      color="primary"
                      @click="onStartShoppingClick()"
                    >
                    <v-icon left>
                      mdi-shopping-outline
                    </v-icon>
                      Start Shopping
                    </v-btn>
                  </div>
                  
                  </v-sheet>
              </v-col>
            </span>

              <v-col cols="4">
                  <v-card
                    class="mx-auto"
                    max-width="400"
                    tile
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Order Summary</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Total Price: {{ grandTotal}} </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item three-line>
                      <v-list-item-content>
                          <v-row no-gutters>
                            <v-col class="marginCoupon" cols="10">
                              <v-text-field
                                label="Enter Coupon Code"
                                outlined
                                clearable
                                dense
                              ></v-text-field>
                            </v-col>
                            <v-col class="marginCoupon btnTop" cols="2">
                              <v-btn tile icon color="primary" >
                                <v-icon > mdi-send </v-icon>
                              </v-btn>
                            </v-col>
                            
                          </v-row>
                          
                          <v-btn
                          color="primary"
                          tile
                          elevation="0"
                          large
                          @click="goToCheckout()"
                          > 
                            Proceed to Checkout
                          </v-btn>

                    
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
            </v-col>
          
          

         </v-row>
      </v-container>
     
    <!-- Product detail for mobile -->
      <v-container fluid>
        <v-row class="mp" v-if="$mq === 'mobile' || $mq === 'tablet' " >

        <v-col cols="12" v-if="$store.state.cart.length != 0">
          <v-card
              tile
              class="mt-2"
              outlined
              v-for="(item, index) in $store.state.cart"
              :key="index"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">
                    Order #{{index+1}}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{item.variant_attrib_name}} - {{ item.variant_attrib_value }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Price - {{ item.price }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Quantity - {{ item.quantity }}</v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="100"
                  color="grey"
                >
                <img :src="item.image"/>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  outlined
                  rounded
                  text
                  tile
                  color="error"
                  @click="deleteItem(item.id)"
                >
                <v-icon left>
                  mdi-delete-empty-outline
                </v-icon>
                  Remove
                </v-btn>
                
              </v-card-actions>
            </v-card>

        </v-col>

         <v-col cols="12" v-if="$store.state.cart.length == 0">
                  <v-sheet
                    height="500"
                    max-width="900"
                  >
                  <div class="verticallyAlign">
                    <v-icon class="emptyCart" left>
                      mdi-cart-remove
                    </v-icon>        
                    <p class="verticallyAlign">
                      Such Empty
                    </p>
                    <v-btn
                      tile
                      dense
                      elevation="0"
                      text
                      color="primary"
                      @click="onStartShoppingClick()"
                    >
                    <v-icon left>
                      mdi-shopping-outline
                    </v-icon>
                      Start Shopping
                    </v-btn>
                  </div>
                  
                  </v-sheet>
              </v-col>

        <v-col  class="mb-10" cols="12" v-if="$store.state.cart.length != 0">
        <v-card
            class="mx-auto"
            max-width="400"
            tile
            elevation="0"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Order Summary</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Total Price: {{ grandTotal}} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item three-line>
              <v-list-item-content>
                  <v-row no-gutters>
                    <v-col class="marginCoupon" cols="10">
                      <v-text-field
                        label="Enter Coupon Code"
                        outlined
                        clearable
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col class="marginCoupon btnTop" cols="2">
                      <v-btn tile icon color="primary" >
                        <v-icon > mdi-send </v-icon>
                      </v-btn>
                    </v-col>
                    
                  </v-row>
                  
                  <v-btn
                  color="primary"
                  tile
                  elevation="0"
                  large
                  @click="goToCheckout()"
                  > 
                    Proceed to Checkout
                  </v-btn>

            
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
      

    </div>
    </v-app>

</template>

<script lang="ts">
import Slides from '@/components/Slides.vue'
import { ProductModule } from "@/store/modules";
import { Component, Vue } from "vue-property-decorator";
import { eventHub } from "@/utils/eventHub"
import Home from './Home.vue';



@Component({
  components: {
  },
})
export default class OrderSummary extends Vue {
    titleBarName =  ''
    grandTotal = 0

    created(){

        this.titleBarName = "Your Orders"
        console.log("CRETEEE")
        for(let item of (this as any).$store.state.cart){
          console.log("iuuu", item)
          this.grandTotal = Number(this.grandTotal) + Number((item as any).total_price) 
        }
    }

    onStartShoppingClick(){
      this.$router.push({
        name: 'Home'
      })
    }

    deleteItem(id: any){
      const cartItems = this.$store.state.cart
      for(let item of cartItems){
        if(id == item.id){
          cartItems.splice(item,1)
        }
      }
      this.$store.state.cartCount--
    }

    goToCheckout(){
      this.$router.push({
        name: 'Checkout'
      })
    }

    goBack(){
        this.$router.go(-1)
    }
}
</script>

<style lang="css" >
.inline{
      display: inline-block !important;
      padding: 10px;
}

.center-text {
  text-align: center !important;
}

.mp{
  padding: 10px !important;
}

.vs-card{
  border-radius: 0px !important;
}
.col-8{
  max-width: 1000px !important;
}
.verticallyAlign{
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  font-size: 20px;
}
.emptyCart{
  font-size: 150px !important;
}
.btnTop{
  margin-top: 7px  !important;
}
.marginCoupon{
  margin-top:5px;
  padding: 5px !important;
}

</style>