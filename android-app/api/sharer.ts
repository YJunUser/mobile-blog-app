import { AxiosResponse } from 'axios'
import { SharerConfig } from '../types/sharer'
import http, { ResponseData } from './index'

interface SharesResponse {
    code: string;
    expiredAt: string;
    password: string;
    url: string;
}
export const createShares = (data: SharerConfig): Promise<AxiosResponse<ResponseData<SharesResponse>>> => {
    return http.request({
        url: '/sharer-api/shares',
        method: 'post',
        data: data
    })
}