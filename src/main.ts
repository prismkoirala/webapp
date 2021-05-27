import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from '@/plugins/vuetify' // path to vuetify export

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Vuesax from 'vuesax'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMq from 'vue-mq'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'boxicons/css/boxicons.min.css'

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    desktop: Infinity,
  }
})

Vue.use(Vuesax, {
  // options here
})



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
