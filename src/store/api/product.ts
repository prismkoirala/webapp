import { getApi, postApi, putApi, deleteApi } from "@/store/api/api";
import { Action } from "@/store/api/actionType";

export default new (class ProductListAPI{

    public async getCategoryInfo(): Promise<any> {
        const response = await getApi(Action.GetCategoryInfo)
        return response as any
    }

    public async getPaginatedProductList(params: any): Promise<any>{
        const url = `${Action.GetProductInfo}`
        const response = await getApi(url, params)
        return response as any
    }
    
    public async getProductDetail(params: any): Promise<any>{
        const url  = `${Action.GetProductInfo}`
        const response = await getApi(url, params)
        return response as any 
    }

    public async getProductImageById(params: any): Promise<any>{
        const url = `${Action.GetProductImage}`
        const response = await getApi(url, params)
        return response as any
    }

    public async getProductVariantById(params:any): Promise<any>{
        const url = `${Action.GetProductVariant}`
        const response = await getApi(url, params)
        return response as any
    }
    
})