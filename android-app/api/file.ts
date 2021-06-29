import { AxiosResponse } from 'axios'
import { fileData, fileParams, NewFolderParams, RecoveryFiles, RecycleFiles, RenameConfig } from '../types/file'
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


interface UrlConfig {
    uploadCode: string;
    url: string;
}
export const getUploadUrl = (params: { filename: string; folderId: number }): Promise<AxiosResponse<ResponseData<UrlConfig>>> => {
    return http.request({
        url: '/sharer-api/upload-url',
        method: 'get',
        params: params
    })
}


export const saveFile = (uploadCode: string) => {
    return http.request({
        url: `/sharer-api/saveFile/${uploadCode}`,
        method: 'post'
    })
}

export const getFileDownLoadUrl = (fileId: number): Promise<AxiosResponse<ResponseData<{ url: string }>>> => {
    return http.request({
        url: `/sharer-api/download-url/${fileId}`,
        method: 'get'
    })
}

export const renameFile = (renameParam: RenameConfig) => {
    return http.request({
        url: `/sharer-api/files/${renameParam.id}`,
        method: 'put',
        data: {
            isDirectory: renameParam.renameParam.isDirectory,
            newName: renameParam.renameParam.newName
        }
    })
}