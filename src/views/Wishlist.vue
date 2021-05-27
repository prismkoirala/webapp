<template>
    <div>
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

      <!-- WishList list for desktop -->

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

              <v-col class="mt-2" v-for="(item, index) in wishList.results" :key="index" cols='12'>
                

                <v-card
                  @click="goToDetail(item.product.category_name, item.product.id)"
                  class="mx-auto"
                  max-width="544"
                  tile
                  outlined
                  elevation="0"
                >
                  <v-img
                    :src="item.product.image"
                    height="300px"
                  >
                  
                  <v-btn
                    :loading="loadingCheck"
                    @click.stop="onCheckClick(item.product)"
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
                
                  </v-img>

                  <v-card-title>
                    {{item.product.name}}
                  </v-card-title>

                  <v-card-subtitle>
                    {{item.product.variant_name}} - {{  item.product.variant_value }}
                    <p> Rs. {{ item.product.price }} </p>
                  </v-card-subtitle>

                
                </v-card>

              </v-col>

            </v-row>


    </div>

</template>

<script lang="ts">
import { UserStore } from "@/store/modules";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class Wishlist extends Vue {
    titleBarName = ''
    loadingCheck = false

    async created() {
        this.titleBarName = 'Your Wishlist'

        await UserStore.getUserBasicInfo()
        let userId  = this.user.id
        let filters: any = {}
        filters["user"] = userId
        console.log(filters)
        await UserStore.getPaginatedWishList({
          filters: filters
        })
    }

    get user(){
      return UserStore.userBasicInfo
    }

    get wishList(){
      const wishList = UserStore.wishlist
      console.log('wish ->', wishList)
      return wishList
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

    async onCheckClick(item:any){
      this.loadingCheck = true
      await UserStore.deleteWishList(item.id)

      let wish: any = this.wishList.results
      wish.splice(item.id, 1)
      console.log('aster delete -> ', this.wishList)

      this.loadingCheck = false



    } 

    goBack(){
        this.$router.go(-1)
    }

}
</script>
