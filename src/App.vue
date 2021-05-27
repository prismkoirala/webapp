<template>
    <v-app id="inspire">

      <notify/>
      <router-view />
      
    </v-app> 
</template>

<script>
import Notify from "@/utils/notifications/notify.vue"

export default {
  name: "App",
  components:{
    Notify
  }
};
</script>
