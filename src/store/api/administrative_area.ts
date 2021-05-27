import { getApi, postApi, putApi, deleteApi } from "@/store/api/api";
import { Action } from "@/store/api/actionType";

export default new (class AdministrativeAreaAPI{

    public async getProvince(): Promise<any> {
        const response = await getApi(Action.Province)
        return response as any
    }

    public async getDistrict(): Promise<any> {
        const response = await getApi(Action.District)
        return response as any
    }

    public async getMunicipality(): Promise<any> {
        const response = await getApi(Action.Municipality)
        return response as any
    }

    public async getWard(): Promise<any> {
        const response = await getApi(Action.Ward)
        return response as any
    }
    public async getDistrictByScode(params: any): Promise<any> {
        const url = `${Action.District}`
        const response = await getApi(url, params)
        return response
    }

    public async getMunicipalityByDcode(params: any): Promise<any> {
        const url = `${Action.Municipality}`
        const response = await getApi(url, params)
        return response
    }
    public async getWardByMcode(params: any): Promise<any> {
        const url = `${Action.Ward}`
        const response = await getApi(url, params)
        return response
    }
    
})