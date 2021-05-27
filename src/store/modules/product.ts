import store from "@/store"
import { Module, VuexModule, Mutation, MutationAction, Action, getModule } from "vuex-module-decorators";
import API from "@/store/api/product" 
import { CategoryInfo, ProductInfo } from "@/store/models/product";

@Module({name: 'ProductStore', dynamic: true, store})
class ProductModule extends VuexModule{

    public role: any = ""
    public categoryInfo: CategoryInfo = {} as CategoryInfo;
    public productsInfo: ProductInfo = {} as ProductInfo;

    @MutationAction
    async getCategoryBasicInfo(){
        const obj = await API.getCategoryInfo()
        return { categoryInfo: obj as CategoryInfo }
    }

    @MutationAction 
    async getPaginatedProductList(params:{ filters?: any; page?: any } = {page: 1}){
        let query = ""
        if(params.filters || params.page){
            query += "?"

            if(params.filters){
                Object.keys(params.filters).forEach((key) => {
                    query += `&${key}=${params.filters[key]}`;
                  });
            }
            if(params.page){
                query += "&page=" + params.page
            }
        }

        const response = await API.getPaginatedProductList(query)
        return { productsInfo: response as ProductInfo }
    }

    @Action
    async getProductDetail(id: number ){
        const response = await API.getProductDetail(id)
        return response as any
    }

    @Action 
    async getProductVariantById(params:{ filters: any} ){
        let query = ""

        if(params.filters){
            query +="?"
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
              });
        }
        const response = await API.getProductVariantById(query)
        return response as any
    }

}

export default getModule(ProductModule)