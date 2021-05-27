import store from "@/store"
import { Module, VuexModule, Mutation, MutationAction, Action, getModule } from "vuex-module-decorators";
import API from "@/store/api/user" 
import { PaginatedUsersList, PaginatedWishList, TypeOfUserList, UserBasicInfo, WishList } from "@/store/models/user";

@Module({name: 'UserStore', dynamic: true, store})
class UserModule extends VuexModule{

    public role: any = ""
    public userBasicInfo: UserBasicInfo = {} as UserBasicInfo;
    public paginatedUsersList: PaginatedUsersList = {} as PaginatedUsersList
    public typesOfUsersList: TypeOfUserList = {} as TypeOfUserList
    public address: any = {}
    public wishlist: PaginatedWishList = {} as PaginatedWishList

    @MutationAction
    async getPaginatedUsersList(params: { searchString?: any; filters?: any; page?: any } = { searchString: undefined, filters: undefined, page: 1 }) {
        let query = "";
        if (params.searchString || params.page) {
            query += "?";
        }
        if (params.searchString) {
            query += "&search=" + params.searchString;
        }
        if (params.filters) {
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
            // console.log(`&${key}=${params.filters[key]}`)
        });
        }
        if (params.page) {
            query += "&page=" + params.page;
        }
        const paginatedUsers = await API.getPaginatedUsersList(query);

        return { paginatedUsersList: paginatedUsers as PaginatedUsersList };
    }

    @MutationAction 
    async getPaginatedWishList(params:{ filters?: any; page?: any } = {page: 1}){
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

        const response = await API.getPaginatedWishList(query)
        return { wishlist: response as PaginatedWishList }
    }
    
    @MutationAction
    async getUserBasicInfo(){
        const obj = await API.getUserBasicInfo()
        localStorage.setItem('role', obj.user_type)
        return { userBasicInfo: obj, role: obj.user_type }
    }

    @MutationAction
    async getTypesOfUsersList(){
        const response = await API.getTypesOfUsersList()

        return { typesOfUsersList: response }
    }

    @Action 
    async getTypeOfUserByName(params:{ filters: any} ){
        let query = ""

        if(params.filters){
            query +="?"
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
              });
        }
        const response = await API.getTypeOfUserByName(query)
        return response
    }

    @Action
    async registerUser(params: { user?: any; user_types? : any } = {}){
        let query_params = ""

        if(params.user_types){
            query_params += `?user_type=${params.user_types}`
        }

        const response = await API.registerUser(params.user, query_params)
        return response
    }

    @Action
    async registerAddressBook(params: { user?: any; } = {}){

        const response = await API.registerUser(params.user)
        return response
    }

    @MutationAction 
    async getAddressByUserId(params:{ filters: any} ){
        let query = ""

        if(params.filters){
            query +="?"
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
              });
        }
        const response = await API.getAddressBookById(query)
        return { address: response }
    }

    @Action 
    async createOrder(params: any){
        const response = await API.createOrder(params)
        return response
    }

    @MutationAction
    async createWishList(params: { product: any , user: any }){
        const response = await API.createWishList(params)
        return response
    }

    @Action
    async deleteWishList(productId: any){
        const response = await API.deleteWishList(productId)
        return response as any
    }

    @Action 
    async deleteUserById(id: any){
        const response = API.deleteUserById(id)
        return response as any
    }
}

export default getModule(UserModule)