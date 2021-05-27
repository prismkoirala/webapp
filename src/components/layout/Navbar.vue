<template>
<div>

    <!-- App bar for desktop -->
   <v-app-bar
      app
      color="white"
      v-if="$mq === 'desktop'"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <span v-for="(item, index) in categories" :key="index"  >

          <span v-if="item.sub_categories.length == 0">
            <v-btn
              text
              tile
              @click="goToProductList(item.name)"
             >
              <v-icon
                    left
                    dark
                  >
                    {{item.icon}}
                  </v-icon>
              {{ item.name }}
              
            </v-btn>
          </span>

          <span v-else>
            <v-menu rounded="0"  open-on-hover bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  tile
                  color="black lighten-1"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                 <v-icon
                    left
                    dark
                  >
                    {{item.icon}}
                  </v-icon>
                  {{ item.name }}
                  <v-icon
                    right
                    dark
                  >
                    mdi-arrow-down-drop-circle-outline
                  </v-icon>

                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  tile
                  v-for="(sub, i) in item.sub_categories"
                  :key="i"
                  link
                  >
                   <v-icon
                    left
                    light
                  >
                    {{sub.icon}}
                  </v-icon>
                  <v-list-item-title @click="goToProductList(sub.name)">{{ sub.name }}</v-list-item-title>
                </v-list-item>
              </v-list>

            </v-menu>
          </span>

         
        </span>

        

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>

         <v-btn
              @click="goToOrder()"
              icon
              color="primary"
            >
            <span v-if="$store.state.cartCount != 0">
               <v-badge
                color="green"
                :content="$store.state.cartCount"
              >
               
              <v-icon>mdi-cart</v-icon>
              
              </v-badge>

            </span>
            <span v-else>
              <v-icon>mdi-cart-outline</v-icon>
            </span>
            
             
            </v-btn>

      </v-container>
    </v-app-bar>

  <!-- NavBar for mobile -->

  <div v-if="$mq == 'mobile' || $mq == 'tablet' ">
    
     <v-app-bar
      app
      color="accent"
      flat
    >

     <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Shopping Mall</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="toggleSearch()" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

 
          <v-btn
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <span v-if="$vuetify.theme.dark == false">
              <v-icon>mdi-weather-night</v-icon>
            </span>
            <span v-else>
              <v-icon color="orange lighten-3">mdi-white-balance-sunny</v-icon>
            </span>
          </v-btn>

     
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >

    <v-list :disabled="false" flat>
    <v-subheader>Categories</v-subheader>
    <span v-for="(item, index) in categories" :key="index"  >
      
      <span v-if="item.sub_categories.length != 0">
         <v-list-group
          :value="true"
          :prepend-icon="item.icon"
          no-action
          :key="item.name"
          v-model="selectGroup"
        >
        <template v-slot:activator>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </template>

       <v-list-item
            v-for="(sub, i) in item.sub_categories"
            :key="i"
            link
          >
            <v-list-item-title @click="goToProductList(sub.name)" v-text="sub.name"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="sub.icon"></v-icon>
            </v-list-item-icon>

          </v-list-item>

        
      </v-list-group>
      </span>
    </span>

    <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
      <span v-for="(item, index) in categories" :key="index">
        <span v-if="item.sub_categories == 0">
          <v-list-item
            :key="index"
          >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="goToProductList(item.name)" v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        </span>
      </span>
       
      </v-list-item-group>

    </v-list>

    </v-navigation-drawer>


  </div>


</div>


</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddToCart from '@/components/AddToCart.vue'
import LoginModal from '@/components/LoginModal.vue'
import { CategoryInfo } from '@/store/models/product'
import ProductStore from '@/store/modules/product'
import {eventHub} from '@/utils/eventHub'

@Component({
  components: {
    AddToCart,
    LoginModal,
  },
})
export default class Navbar extends Vue {
  active= 'home'
  activeSidebar= false
  activeCart = false
  activeLogin = false
  categories: any = []
  drawer= false
  selectedItem = null
  selectedGroup = 0


  async created(){
    await ProductStore.getCategoryBasicInfo() 
    this.assignCategories()
  }

  get categoryList(){
    let category = ProductStore.categoryInfo
    return category
  }

  assignCategories(){
    let initialList: any = this.categoryList
    for(const item of initialList){

      if(item.parent == null){
        let cat: any = {}
        cat.name = item.name
        cat.id = item.id
        cat.icon = item.boxicon
        cat.desc = item.description
        cat.sub_categories = []

        this.categories.push(cat)
      }else{
        for(let category of this.categories){
          if (Number(item.parent) == Number(category.id)){

            category.sub_categories.push({
              name: item.name,
              id : item.id,
              icon: item.boxicon,
              desc: item.description
            })

            
          }
        }
      }

    }
  }

  goToProductList(name: any){
    this.$router.push({
      name: 'Category',
      params: { category: name }
    })
    this.drawer = false
  }

  toggleCart(){
    let activeCart = this.activeCart
    this.activeCart = !activeCart
  }

  toggleLogin(){
    let activeLogin = this.activeLogin
    this.activeLogin = !activeLogin
  }
  toggleSearch(){
    this.$store.state.toggleSearch = true
    console.log(this.$store.state.toggleSearch)
  }
  goToOrder(){
    this.$router.push({
      name: 'OrderSummary'
    })
  }
  
}
</script>

<style lang='sass'>
.iconSize
  font-size: 30px !important
.vs-input
  width: 500px !important
.pt 
  padding-top: 65px
.btnPadding
  padding: 7px !important
  font-weight: 800 !important
.vs-input
  padding: 14px 26px !important
</style>
