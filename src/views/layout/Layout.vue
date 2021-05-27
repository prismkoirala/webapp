<template>
  <div>
    <navbar />
    
    <v-main class="white">
      <search />
      <v-scroll-x-transition  :hide-on-leave="true">
      <router-view :key="$route.fullPath" />
      </v-scroll-x-transition>

        <v-bottom-navigation
          v-if="$mq === 'mobile' || $mq == 'tablet'"
          fixed
          :value="0"
          color="primary"
        >
          <template v-for="(item, index) in navItems">
            <template v-if="item.name == 'Cart'">
               <v-btn
              @click="navigate(item.route_name)"
              icon

              color="primary"
              :key="index"
            >
            <span v-if="$store.state.cartCount != 0">
               <v-badge
                color="green"
                :content="$store.state.cartCount"
              >
               
                <v-icon>mdi-cart</v-icon>
                <span class="v-btn__content">{{ item.name }}</span>

              
              </v-badge>

            </span>
            <span v-else>

              <v-icon>mdi-cart-outline</v-icon>
              <span class="v-btn__content">{{ item.name }}</span>

            </span>

            </v-btn>
            </template>
            <template v-else>
              <v-btn :key='index' @click="navigate(item.route_name)">
                <span>{{ item.name }}</span>
                <v-icon>{{ item.icon_name }}</v-icon>
            </v-btn>
            </template>
            
          </template>
         

        </v-bottom-navigation>

    </v-main>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Search from '@/components/layout/Search.vue'
import { eventHub } from '@/utils/eventHub';
import Section from '@/views/layout/Section.vue'
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Navbar,
    Section,
    Search
  },
})
export default class Layout extends Vue {
    navItems= [
      {
        name: 'Home',
        route_name: 'Home',
        icon_name:'mdi-home'
      },
      {
        name: 'Wishlist',
        route_name: 'Wishlist',
        icon_name:'mdi-heart'
      },
      {
        name: 'Profile',
        route_name: 'Profile',
        icon_name:'mdi-face-profile'

      },
      {
        name: 'Cart',
        route_name: 'OrderSummary',
        icon_name:'mdi-cart'

      },
    ]
    mounted() {
        (this as any).$vs.setColor('primary', '#002134')
      }

    navigate(name: any){
      console.log(name)
      this.$router.push({
        name: name
      })
    }


}
</script>
