import store from "@/store"
import { Module, VuexModule, Mutation, MutationAction, Action, getModule } from "vuex-module-decorators";
import API from "@/store/api/administrative_area" 
import { Province, District, Ward, Municipality } from "@/store/models/administrative_area";

@Module({name: 'AdministrativeAreaStore', dynamic: true, store})
class AdministrativeAreaModule extends VuexModule{
    public province: Province = {} as Province
    public district: District = {} as District
    public municipality: Municipality = {} as Municipality
    public ward: Ward = {} as Ward

    @MutationAction
    async getProvince(){
        const obj = await API.getProvince()
        return { province: obj }
    }

    @MutationAction 
    async getDistrictByScode(params:{ filters: any} ){
        let query = ""

        if(params.filters){
            query +="?"
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
              });
        }
        const response = await API.getDistrictByScode(query)
        return {district: response}
    }

    @MutationAction 
    async getMunicipalityByDcode(params:{ filters: any} ){
        let query = ""

        if(params.filters){
            query +="?"
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
              });
        }
        const response = await API.getMunicipalityByDcode(query)
        return { municipality: response }
    }

    @MutationAction 
    async getWardByMcode(params:{ filters: any} ){
        let query = ""

        if(params.filters){
            query +="?"
            Object.keys(params.filters).forEach((key) => {
                query += `&${key}=${params.filters[key]}`;
              });
        }
        const response = await API.getWardByMcode(query)
        return { ward: response }
    }

}

export default getModule(AdministrativeAreaModule)