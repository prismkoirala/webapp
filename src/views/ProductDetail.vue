<template>
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

                  <h2 class="inline" v-if="loading">
                        <v-progress-circular
                          indeterminate
                          color="black lighten-2"
                        ></v-progress-circular>
                  </h2>
                  <h2 class="inline" v-else>{{ titleBarName }}</h2>

            </div>
        </v-col>
      </v-row>

        <!-- title bar for Mobile and tablets -->
      <v-col class="removePadding" v-if="$mq == 'mobile' || $mq == 'tablet'">
          <v-toolbar elevation="0" color="primary" dark>
            <v-btn
              @click="goBack()"
              icon
            >
              <v-icon>mdi-arrow-left</v-icon>

            </v-btn>

            <v-toolbar-title>{{ titleBarName }}</v-toolbar-title>

          </v-toolbar>
            
        </v-col>

      <!-- Product Detail for desktop -->
      <v-container v-if="$mq === 'desktop'" >
        <v-row class="mp">
        <v-col cols="6">
               <slides :slides="sliderImages" :count="sliderImages.length" />
        </v-col>
        <v-col cols="6">
                <h3 class="titleBar">{{ titleBarName }}</h3>
                <p class="priceBar">
                  Rs. {{ price }}
                </p>

                <v-select
                  :items="productVariantDetail"
                  item-text="attribute_value.name"
                  item-value="id"
                  v-model="selectedVariant"
                  :label="productVariantDetail[0].attribute.name"
                  outlined
                  @change="changeProductPrice()"
                ></v-select>

                 <v-text-field
                  type="number"
                  label="Quantity"
                  :rules="numberRule"
                  v-model="quantity"
                  outlined
                ></v-text-field>

                <v-btn
                  block
                  color="primary"
                  tile
                  elevation="0"
                  large
                  @click="addToCart()"
                >
                  Add to basket
                </v-btn>

                <v-tabs class="mainTab">
                  <v-tab>Description</v-tab>
                  <v-tab>Reviews</v-tab>
                  
                  <v-tab-item>
                    <p class="desc">{{ productDetail.description }}</p>
                  </v-tab-item>

                  <v-tab-item class="desc" >

                    <div class="overflowReview">
                      <v-card
                      class="mx-auto"
                      color="white"
                      max-width="700"
                      v-for="item in 6"
                      :key="item"
                    >

                      <v-card-text class="font-weight-bold">
                        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                      </v-card-text>

                      <v-card-actions>
                        <v-list-item class="grow">
                          <v-list-item-avatar color="grey darken-3">
                            <v-img
                              class="elevation-6"
                              alt=""
                              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                          </v-list-item-content>

                        </v-list-item>
                      </v-card-actions>
                    </v-card>

                    </div>
                    
                  </v-tab-item>
                  
                </v-tabs>

        </v-col>
      </v-row>
      </v-container>
     

    <!-- Product detail for mobile -->
    <v-app>
      <v-container>
        <v-row class="mp" v-if="$mq === 'mobile' || $mq === 'tablet' " >
          <v-col cols="12">
            <slides :slides="sliderImages" :count="sliderImages.length" />
          </v-col>
          <v-col class="mb-10" cols="12">
            
             <h3 class="titleBar">{{ titleBarName }}</h3>
                <p class="priceBar">
                  Rs. {{ price }}
                </p>

                <v-select
                  :items="productVariantDetail"
                  item-text="attribute_value.name"
                  item-value="id"
                  v-model="selectedVariant"
                  :label="productVariantDetail[0].attribute.name"
                  outlined
                  @change="changeProductPrice()"
                ></v-select>

                 <v-text-field
                  type="number"
                  label="Quantity"
                  :rules="numberRule"
                  v-model="quantity"
                  outlined
                ></v-text-field>

                <v-btn
                  block
                  color="primary"
                  tile
                  elevation="0"
                  large
                  @click="addToCart()"
                >
                  Add to basket
                </v-btn>

                 <v-tabs class="mainTab">
                  <v-tab>Description</v-tab>
                  <v-tab>Reviews</v-tab>
                  
                  <v-tab-item>
                    <p class="desc">{{ productDetail.description }}</p>
                  </v-tab-item>

                  <v-tab-item class="desc" >

                    <div class="overflowReview">
                      <v-card
                      class="mx-auto"
                      color="white"
                      max-width="700"
                      v-for="item in 6"
                      :key="item"
                    >

                      <v-card-text class="font-weight-bold">
                        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                      </v-card-text>

                      <v-card-actions>
                        <v-list-item class="grow">
                          <v-list-item-avatar color="grey darken-3">
                            <v-img
                              class="elevation-6"
                              alt=""
                              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                          </v-list-item-content>

                        </v-list-item>
                      </v-card-actions>
                    </v-card>

                    </div>
                    
                  </v-tab-item>
                  
                </v-tabs>


          </v-col>
        </v-row>
      </v-container>
    </v-app>
    </div>

</template>

<script lang="ts">
import Slides from '@/components/Slides.vue'
import { ProductModule } from "@/store/modules";
import { Component, Vue } from "vue-property-decorator";
import { eventHub } from "@/utils/eventHub"

import { 
  
  ProductVariantDetail,
  ProductDetail,
  ImageSliderModel 
  
  } from '@/store/models/product'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Circle8} from 'vue-loading-spinner'


@Component({
  components: {
    Slides,
    Circle8
  },
})
export default class ProductList extends Vue {
    titleBarName =  ''
    productDetail: ProductDetail = {} as ProductDetail
    productVariantDetail: ProductVariantDetail ={} as ProductVariantDetail
    sliderImages: ImageSliderModel[] = []
    loading = false
    selectedVariant = 1
    price = 0
    quantity = 1

    //rules
    numberRule= [(v: any) => (!isNaN(parseFloat(v)) && v >= 1 && v <= 999) || 'Number has to be greater than 0']

    async created(){

      this.loading = true
     
      const productId = this.$route.params.id
      this.productDetail = await ProductModule.getProductDetail(Number(productId) )
      this.titleBarName  = this.productDetail.name as string
      this.sliderImages = this.productDetail.images
      // Get variant detail of the particular product
      this.getProductVariantDetail(Number(productId))
      
      this.loading = false
    
    } 

    async getProductVariantDetail(productId: number){
      let filters: any = {}
      filters['product__in'] = productId
      this.productVariantDetail = await ProductModule.getProductVariantById(
        {
          filters: filters
        }
      )
      this.selectedVariant = (this as any).productVariantDetail[0].id
      this.price = (this as any).productVariantDetail[0].price

      console.log('variantDETAIL', this.productVariantDetail )
    }

    changeProductPrice(){
      for( let item of (this as any).productVariantDetail){
        if(Number(item.id) == Number(this.selectedVariant)){
            this.price = item.price
            console.log(item.id ,this.selectedVariant)
        }
      }
    }

    addToCart(){
      var cartObj: any = {}

      cartObj.id = this.productDetail.id
      cartObj.name = this.productDetail.name
      cartObj.variant = this.selectedVariant
      cartObj.quantity = this.quantity
      cartObj.image = this.productDetail.images[0].image
      
      for(let item of (this as any).productVariantDetail){
        if(Number(item.id) == Number(this.selectedVariant)){
          cartObj.variant_attrib_name = item.attribute.name
          cartObj.variant_attrib_value = item.attribute_value.name
          cartObj.price = item.price
        }
      }

      cartObj.total_price = Number(this.price * this.quantity)
      console.log('add .. ', cartObj)
      this.$store.commit('addToCart', (cartObj as any))
      eventHub.$emit('notify', 'SuccessFully Added to Cart!', 'success')

    }



    goBack(){
        this.$router.push({
            name: 'Category',
            params:{
                category: this.$route.params.category
            }
        })
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
  padding: 10px
}

.vs-card{
  border-radius: 0px !important;
}
.card{
  margin:10px;
  padding: 5px;
}
.addToCartButton{
  margin: 0px !important;
  padding: 5px;
}
/* .v-input__slot{
} */
.titleBar{
  padding:5px;
  margin-bottom: 5px;
}
.priceBar{
  margin-bottom: 10px !important;
  padding:5px;
  font-size: 25px;
  font-weight: 800;
  opacity: 80%;
}
.mainTab{
  margin-top: 10px;
}

.desc{
  margin-top: 10px;

}
.overflowReview{
  height: 400px;
  overflow: auto;
}
.removePadding{
  padding: 0px !important;
}
</style>