import { AxiosResponse } from 'axios'
import { fileData, fileParams, NewFolderParams } from '../types/file'
import http, { ResponseData } from './index'

export const getFile = (params: fileParams): Promise<AxiosResponse<ResponseData<fileData[]>>> => {
    return http.request({
        url: '/sharer-api/files',
        method: 'get',
        params
    })
}

export const newFolder = (param: NewFolderParams): Promise<AxiosResponse<ResponseData<boolean>>> => {
    return http.request({
        url: '/sharer-api/folders',
        method: 'post',
        data: param
    })
}