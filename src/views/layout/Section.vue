<template>
    <v-app>
        <carousel />
        <v-container>
        <v-row color="primary">
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <card-group />
              <categories />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

    </v-app>
</template>

<script lang="ts">
import Carousel from '@/components/Carousel.vue'
import CardGroup from '@/components/CardGroup.vue'
import Categories from '@/components/Categories.vue'

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Carousel,
    CardGroup,
    Categories
  },
})
export default class Section extends Vue {

}
</script>
