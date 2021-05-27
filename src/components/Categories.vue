<template>
<div>
    <!-- <vs-row v-if="$mq === 'desktop'" > -->
        <!-- <vs-col offset="2" w="8"> -->

          <div class="center">
            <h3> Categories </h3>
                <div>
                <vs-row :w="12" class="row" >
                    <template v-for="(item, index) in categories">

                        <vs-col w="3" v-if="item.parent != null" :key="index">
                                <div class="catCard" @click="goToProductList(item.name)">
                                    <img height="70" width="70" src="../assets/sofa.svg"/>
                                    <p>{{ item.name }}</p>
                                </div>    
                        </vs-col> 
                    </template>
                                           
                </vs-row>
                </div>
                </div>
                <!-- </vs-col> -->
            <!-- </vs-row> -->

    <!-- <vs-row v-if="$mq === 'mobile' || $mq === 'tablet'" > -->
        <!-- <vs-col w="12"> -->

          
                <!-- </vs-col> -->
            <!-- </vs-row> -->
</div>
</template>
       

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {eventHub} from '@/utils/eventHub'
import ProductStore from '@/store/modules/product'

@Component({
  components: {
  },
  props: {
  }
})
export default class Categories extends Vue {
    async created(){
        await ProductStore.getCategoryBasicInfo()
    }

    get categories(){
        return ProductStore.categoryInfo
    }

    goToProductList(name: any){
        this.$router.push({
            name: 'Category',
            params: { category: name }
        })
    }

}
</script>

<style  scoped>
.row{
  text-align: center;
}
.catCard{
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin: 10px;
    cursor: pointer;
    font-weight: bolder;
    padding: 10px;
}

.catCard:hover{
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.hide{
    display: none;
}
</style>