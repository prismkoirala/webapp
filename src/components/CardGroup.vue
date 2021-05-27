<template>
<div>
          <div class="center">
            <h3> Top Picks </h3>
              <v-sheet
                class="mx-auto"
                elevation="0"
                max-width="800"

              >
                <v-slide-group
                  :show-arrows="false"
                  v-model="model"
                  center-active
                >
                  <v-slide-item
                    v-for="n in 15"
                    :key="n"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      class="ma-4"
                      height="300"
                      max-width="300"
                      width="400"
                      @click="toggle"
                    >
                      
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
        </div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

@Component({
  components: {
    VueperSlides,
    VueperSlide
  },
  props: {
  }
})
export default class CardGroup extends Vue {
    active= false

    toggleCart(){
        this.$parent.$data.activeCart = false
        this.active = this.$parent.$data.activeCart
    }
}
</script>

<style scoped >
.center{
    margin-top: 30px;
}
.card{
  border-radius: 0px !important;
}
.v-slide-group__wrapper {
  touch-action: auto !important;
}

</style>