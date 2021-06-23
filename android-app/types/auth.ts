type TYPE = 'username' | 'wechat'

// 请求参数
export interface UserLogin {
  code?: string;
  password?: string;
  type: TYPE,
  username?: string;
}

export interface UserRegister {
  email: string;
  nickname?: string;
  password: string;
  signUpCode: string;
}

// 返回数据
export interface tokenResponse {
  token: string
}