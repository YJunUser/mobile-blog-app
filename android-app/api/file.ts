import { AxiosResponse } from 'axios'
import { fileData, fileParams, NewFolderParams, RecoveryFiles, RecycleFiles } from '../types/file'
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

export const recoveryFiles = (params: RecoveryFiles) => {
    return http.request({
        url: `/sharer-api/recovery/${params.id}`,
        method: 'put',
        params: {
            isDirectory: params.isDirectory
        }
    })
}

export const deleteFiles = (params: RecoveryFiles) => {
    return http.request({
        url: `/sharer-api/files/${params.id}`,
        method: 'delete',
        params: {
            isDirectory: params.isDirectory
        }
    })
}

export const getUploadUrl = () => {
    return http.request({
        url: '/sharer-api/upload-url',
        method: 'get',
        
    })
}