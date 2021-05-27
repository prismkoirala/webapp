<template>
    <v-snackbar
      v-model="snackBarVisibility"
      :multi-line="true"
      timeout="3000"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackBarVisibility = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang='ts'>
import { eventHub } from '@/utils/eventHub'
import { Component, Vue } from "vue-property-decorator"

@Component({
})
export default class Notify extends Vue{
    snackBarVisibility = false
    message = ''
    type = ''

    created(){
        eventHub.$on('notify', this.notification)
    }

    notification(message: any, type: any){

        this.snackBarVisibility = true
        this.message = message
        this.type = type
    }
}

</script>
