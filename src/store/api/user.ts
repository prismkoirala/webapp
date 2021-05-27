import { getApi, postApi, putApi, deleteApi } from "@/store/api/api";
import { Action } from "@/store/api/actionType";

export default new (class UserListAPI{

    public async getPaginatedUsersList(params: any = "/"): Promise<any> {
        const url = Action.User
        const response  = await getApi(url, params)
        return response as any
    }

    public async getPaginatedWishList(params: any = "/"): Promise<any> {
        const url = Action.WishList
        const response  = await getApi(url, params)
        return response as any
    }

    public async getUserBasicInfo(): Promise<any> {
        const response = await getApi(Action.GetUserBasicInfo)
        return response as any
    }

    public async getTypesOfUsersList(): Promise<any> {
        const url = `${Action.GetTypesOfUsers}`
        const response = await getApi(url)
        return response as any
    }

    public async registerUser(params: any, query_params: any = ""): Promise<any> {
        const url = `${Action.User}`
        const response = await postApi(
            url,
            params,
            {
                headers:{
                    "Content-Type": "multi-part/form-data"
                }
            },
            query_params
        )
        return response as any
    }

    public async deleteUserById(id: any): Promise<any> {
        const url = `${Action.User}`
        const response = await deleteApi(url, id)
        return response
    }

    public async getTypeOfUserByName(params: any): Promise<any> {
        const url = `${Action.GetTypesOfUsers}`
        const response = await getApi(url, params)
        return response
    }

    public async registerAddressBook(params: any): Promise<any> {
        const url = `${Action.Address}`
        const response = await postApi(url, params)
        return response
    }

    public async getAddressBookById(id: any): Promise<any> {
        const url = `${Action.Address}`
        const response = await getApi(url, id)
        return response
    }

    public async createOrder(params: any): Promise<any> {
        const url = `${Action.Order}`
        const response = await postApi(url, params)
        return response

    }

    public async createWishList(params: any): Promise<any> {
        const url = `${Action.WishList}`
        const response = await postApi(url, params)
        return response

    }

    public async deleteWishList(params: any): Promise<any> {
        const url = `${Action.WishList}`
        const response = await deleteApi(url, params)
        return response
    }
    

})