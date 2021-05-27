<template>
<v-app>
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

        <!-- title bar for Mobile and tablets -->
      <v-row v-if="$mq === 'mobile' || $mq === 'tablet' " >

        <v-col class="removePadding">
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
      </v-row>

      <!-- Product list for desktop -->

      <v-row class="mp" no-gutters v-if="$mq === 'desktop'" >

                <v-row no-gutters>
                  <v-col
                    v-for="(item, index) in productItems.results" 
                    :key="index" 
                    cols="12"
                    sm="4"
                  >

                    <vs-card class="card" type="1">
                      <template #title>
                        <h1>{{ item.name }}</h1>
                        <p>{{ item.variant_name }} - {{ item.variant_value }}</p>
                        <p class="price">Rs. {{ item.price }}</p>
                      </template>
                      <template #img>
                        <img :src="item.image" alt="">
                      </template>
                      <template #text>
                        <v-btn class="addToCartButton" color='primary' tile elevation="0" @click="goToDetail(item.category_name, item.id)"  square size="large" block>View Detail</v-btn>
                      </template>
                      <template #interactions>
                        <vs-button square danger icon>
                          <i class='bx bx-heart'></i>
                        </vs-button>
                        <vs-button square class="btn-chat" shadow primary>
                          <i class='bx bx-chat' ></i>
                          <span class="span">
                            54
                          </span>
                        </vs-button>
                      </template>
                    </vs-card>
                    

                  </v-col>
                </v-row>

                <v-pagination
                  v-model="page"
                  :length="4"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                ></v-pagination>
      
      </v-row>

      <!-- Product List For Mobile -->
      <v-row class="mp bottomMargin" v-if="$mq === 'mobile' || $mq === 'tablet' " >

              <v-col class="mt-2" v-for="(item, index) in products.results" :key="index" cols='12'>
                

                <v-card
                  @click="goToDetail(item.category_name, item.id)"
                  class="mx-auto"
                  max-width="544"
                  tile
                  outlined
                  elevation="0"
                >
                  <v-img
                    :src="item.image"
                    height="300px"
                  >
                  <span v-if="item.wishlisted == false">
                      <v-btn
                      :loading="loadingWishList"
                      @click.stop="onHeartClick(item)"
                      color="error"
                      tile
                      square
                      shaped
                      elevation="0"
                    >
                      <v-icon>
                        mdi-heart
                      </v-icon>
                    </v-btn>
                  </span>

                  <span v-else>
                      <v-btn
                      :loading="loadingCheck"
                      @click.stop="onCheckClick(item)"
                      color="success"
                      tile
                      square
                      shaped
                      elevation="0"
                    >
                      <v-icon>
                        mdi-check-bold
                      </v-icon>
                    </v-btn>
                  </span>
                  

                  </v-img>

                  <v-card-title>
                    {{item.name}}
                  </v-card-title>

                  <v-card-subtitle>
                    {{item.variant_name}} - {{  item.variant_value }}
                    <p> Rs. {{ item.price }} </p>
                  </v-card-subtitle>

                
                </v-card>

              </v-col>

            </v-row>
    </v-container>
</v-app>
</template>

<script lang="ts">
import product from "@/store/api/product";
import { ProductModule, UserStore } from "@/store/modules";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class ProductList extends Vue {
    titleBarName: any 
    loadingWishList = false
    loadingCheck = false
    page = 1
    productItems: any 

    async created(){
        this.titleBarName = this.$route.params.category
        await UserStore.getUserBasicInfo()
        this.filterProduct()
    }

    get user(){
      return UserStore.userBasicInfo
    }


    get products(){
      let products = ProductModule.productsInfo
      return products
    }

    async filterProduct(){
      const category = this.$route.params.category
      let product__in = category

      let filters: any = {}
      filters["product__in"] = product__in

      await ProductModule.getPaginatedProductList({
        filters: filters
      })

      this.productItems = ProductModule.productsInfo
      
    }

    goToDetail(category: any, id: any){
      this.$router.push({
        name: 'ProductDetail',
        params: {
          category: category,
          id: id
        }
      })
    }

    async onHeartClick(item: any){
      this.loadingWishList = true
      const userId = this.user.id
      await UserStore.createWishList({
        product: item.id,
        user: userId
      })

      item.wishlisted = true
      this.loadingWishList = false

    }

    async onCheckClick(item:any){
      this.loadingCheck = true

      const userId = this.user.id

      await UserStore.deleteWishList(item.id)
      item.wishlisted = false
      this.loadingCheck = false


    } 

    goBack(){
        this.$router.push({
            name: 'Home'
        })
    }
}
</script>

<style lang="css" >
.inline{
      display: inline-block !important;
      padding: 20px ;
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
.price{
  font-size: 20px !important;
  font-weight: 900;
}
h1{
  margin-bottom: 5px !important;
}
.vs-card__img{
  border-radius: 0px !important;
}
p{
  margin-bottom: 5px !important;
}
.v-pagination__item{
  border-radius: 0px !important;
  box-shadow: none !important;
}
.removePadding{
  padding: 0px !important;
}
.bottomMargin{
  margin-bottom: 50px;
}
</style>