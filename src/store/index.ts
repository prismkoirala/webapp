import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    cartCount: 0,

    // for Search bar state
    toggleSearch: false,
    isDark: false,

  },
  mutations: {
    addToCart(state: any, item: any) {
      const found = state.cart.find((p: any) => String(p.variant_attrib_value) == String(item.variant_attrib_value) && Number(p.id) == Number(item.id))

      if(found){
        found.quantity = Number(found.quantity) + Number(item.quantity)
        console.log(found.quantity)
        found.total_price = Number(item.price * found.quantity)
        console.log(state.cart, state.cartCount)

      }else{
        state.cart.push(item)
        state.cartCount++
        console.log(state.cart, state.cartCount)
      }
      
    }
  },
  actions: {},
  modules: {},
});
