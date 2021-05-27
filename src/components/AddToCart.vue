<template>
   <div class="center">
      <vs-dialog square scroll overflow-hidden not-close auto-width v-model="$parent.$data.activeCart" v-on:close="toggleCart">
        <template #header>
          <h3>
            Cart
          </h3>
        </template>
        <div class="con-content">
         <vs-card v-for="i in 5" :key="i" type="3">
            <template #title>
            <h3>Pot with a plant</h3>
            </template>
            <template #img>
            <img src="../assets/logo.png" alt="">
            </template>
            <template #text>
            <p>
                Price :100Rs.
            </p>
            <p>
                Size :M
            </p>
            </template>
            <template #interactions>
            <vs-button danger icon>
                <i class='bx bx-heart'></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
                <i class='bx bx-chat' ></i>
                <span class="span">
                54
                </span>
            </vs-button>
            </template>
        </vs-card>
        </div>
      </vs-dialog>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {eventHub} from '@/utils/eventHub'
@Component({
  components: {
  },
  props: {
  }
})
export default class AddToCart extends Vue {

    toggleCart(){
        this.$parent.$data.activeCart = false
    }
}
</script>


  <style lang="stylus" scoped>
  

  </style>