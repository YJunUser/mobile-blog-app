import { AxiosResponse } from 'axios'
import { UserInfo } from '../types/user'
import http, { ResponseData } from './index'

export const getUserInfo = (): Promise<AxiosResponse<ResponseData<UserInfo>>> => {
    return http.request({
        url: '/sharer-api/userInfo',
        method: 'get'
    })
}

export const updateAvatar = (file: FormData): Promise<AxiosResponse<ResponseData<{ avatar: string }>>> => {
    return http.request({
        url: '/sharer-api/upload/avatar',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}