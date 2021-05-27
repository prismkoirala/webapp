<template>
    <v-app>
        <!-- title bar for Mobile and tablets -->
        <span v-if="isAuthenticated">
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
        </span>
        
        <v-container v-if="$mq == 'mobile' || $mq == 'tablet'">          
          <div v-if="isAuthenticated">
            Profile Page
          </div>
          <div v-else>
            <login />
          </div>
        </v-container>

        

    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/auth/Login.vue"
import JWTStore from "@/store/modules/jwt"
@Component({
  components: {
    Login
  },
})
export default class Profile extends Vue {

    titleBarName = ''

    created() {
        this.titleBarName = 'Profile'
    }
    
    get isAuthenticated(){
        return JWTStore.isAuthenticated
    } 

    goBack(){
        this.$router.go(-1)
    }

}

</script>
