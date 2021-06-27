import { AxiosResponse } from 'axios'
import { fileData, fileParams, NewFolderParams, RecycleFiles } from '../types/file'
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

export const recycleFiles = (params: RecycleFiles) => {
    return http.request({
        url: `/sharer-api/recycle/${params.id}`,
        method: 'put',
        params: {
            isDirectory: params.isDirectory
        }
    })
}