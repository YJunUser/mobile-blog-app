import { AxiosResponse } from 'axios'
import { tokenResponse, UserLogin, UserRegister } from '../types/auth'
import http, { ResponseData } from './index'


export const userLogin = (params: UserLogin): Promise<AxiosResponse<ResponseData<tokenResponse>>> => {
  return http.request({
    url: '/sharer-api/login',
    method: 'post',
    data: params
  })
}

export const userLogout = (): Promise<AxiosResponse<ResponseData<boolean>>> => {
  return http.request({
    url: '/sharer-api/logout',
    method: 'get'
  })
}

export const userRegister = (params: UserRegister): Promise<AxiosResponse<ResponseData<tokenResponse>>> => {
  return http.request({
    url: '/sharer-api/sign-up',
    method: 'post',
    data: params
  })
}

export const getEmailCode = (email: string): Promise<AxiosResponse<ResponseData<boolean>>> => {
  return http.request({
    url: '/sharer-api/sign-up-code',
    method: 'get',
    params: { email }
  })
}