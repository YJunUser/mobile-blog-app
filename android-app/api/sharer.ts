import { AxiosResponse } from 'axios'
import { GetSharerParams, SharerConfig } from '../types/sharer'
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

type sharesItem = {
    code: string; //分享码
    expiredAt: string;
    filename: string;
    id: number;
    isAllowComment: boolean;
    isPublic: boolean;
    password: string;
    shareType: 'article' | 'file' | 'folder';
    url: string;
}
interface SharesPageInfo {
    current: number;
    records: sharesItem[]
}
export const getShares = (params: GetSharerParams): Promise<AxiosResponse<ResponseData<SharesPageInfo>>> => {
    return http.request({
        url: '/sharer-api/shares',
        method: 'get',
        params: params
    })
}