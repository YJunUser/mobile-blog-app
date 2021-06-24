import { AxiosResponse } from 'axios'
import { fileData, fileParams } from '../types/file'
import http, { ResponseData } from './index'

export const getFile = (params: fileParams): Promise<AxiosResponse<ResponseData<fileData[]>>> => {
    return http.request({
        url: '/sharer-api/files',
        method: 'get',
        params
    })
}