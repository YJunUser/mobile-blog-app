import * as RootNavigation from '../RootNavigation'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse
} from 'axios'
import * as auth from '../utils/auth-control'

// 返回的数据格式 AxiosResponse.data
export interface ResponseData<T = unknown> {
  data: T,
  errorMessage: string;
}

export const apiBaseUrl = 'http://sharer.violetfreesia.com:666'

class HttpRequest {
  constructor(
    public baseUrl: string | undefined = apiBaseUrl,
    public timeout: number = 5000
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout
  }

  public request(options: AxiosRequestConfig): AxiosPromise {
    const instance: AxiosInstance = axios.create()
    options = this.mergeConfig(options)
    this.interceptors(instance, options.url);
    return instance(options);
  }

  private interceptors(instance: AxiosInstance, url?: string) {
    instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
      let userToken: string;
      try {
        // Fetch the token from storage, it is a async way
        userToken = await auth.getToken()
      } catch (error) {
        userToken = null
      }

      if (userToken) {
        config.headers["Authorization"] = userToken
      }
      return config
    },
      (error: any) => {
        return Promise.reject(error)
      })

    instance.interceptors.response.use(
      async (res: AxiosResponse<ResponseData>) => {
        return res
      },
      async (error: any) => {
        // 有response表示请求成功了,但是返回了一个错误
        if (error.response) {
          // Unauthorized
          if (error.response.status === 401) {
            await auth.removeToken()
            RootNavigation.navigate('LoginScreen')
          }
          return Promise.reject(error.response.data.errorMessage.userPromptMsg)
        } else {
          // 服务器繁忙
          return Promise.reject('超时')
        }
      }
    )
  }

  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    return { ...options, baseURL: this.baseUrl, timeout: this.timeout }
  }
}

export default HttpRequest;