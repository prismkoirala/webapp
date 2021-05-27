<template>
    <div>
          <login/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

@Component({
  components: {
    Login,
    Register
  },
})
export default class Auth extends Vue {

}
</script>
