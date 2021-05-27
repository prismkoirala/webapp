import { postApi, getApi } from '@/store/api/api' 
import { Action } from '@/store/api/actionType'
import { LoginInfo } from '@/store/models/jwt'

export default new (class JWTAPI{
    
    public async getJWT(payload: LoginInfo): Promise<any> {
        const response = await postApi(Action.ObtainToken, payload)
        return response as LoginInfo
    }

    public async getAccessToken(refreshToken: any): Promise<any>{
        const response = await postApi(Action.RefreshToken, refreshToken)
        return response as any
    }

    public async verifyAccessToken(accessToken: any): Promise<any> {
        const response  = await postApi(Action.VerifyToken, accessToken)
        return response as any
    }
})