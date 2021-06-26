import React, { ReactNode, useState } from 'react'
import { useEffect } from 'react';
import { userLogin, userLogout, userRegister } from '../api/auth';
import { getUserInfo } from '../api/user';
import FullPageError from '../components/FullPageActive/FullpageError';
import FullPageLoading from '../components/FullPageActive/FullPageLoading';
import { UserLogin, UserRegister } from '../types/auth';
import { UserInfo } from '../types/user';
import { useMount } from '../utils';
import * as auth from '../utils/auth-control'

interface ContextStore {
  user: UserInfo | null; // null代表还没登陆
  setUser: (user: UserInfo) => void;
  login: (params: UserLogin) => Promise<unknown>;
  logout: () => Promise<unknown>;
  register: (params: UserRegister) => Promise<unknown>;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  token: string | null; // null代表还没登陆
  isEdit: boolean,
  setEdit: (isEdit: boolean) => void
}

// create a store 
const AuthContext = React.createContext<ContextStore>(undefined);

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<UserInfo| null>(null)
  const [token, setToken] = useState<string>(null)
  const [fullLoading, setLoading] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)
  const [isEdit, setEdit] = useState<boolean>(false)

  // drawer open
  // const [isOpen, setOpen] = useState({ open: false })
  const [isOpen, setOpen] = useState<boolean>(false)

  const login = (params: UserLogin) => {
    return userLogin(params).then(res => {
      const token: string = res.data.data.token
      // 存入token
      auth.saveToken(token)
      setToken(token)
      return res
    }).catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  }

  const logout = () => {
    return userLogout().then(res => {
      const isLogout = res.data.data
      if (isLogout) {
        auth.removeToken()
        setToken(null)
      } else {
        // 登出失败
      }
    }).catch(error => {
      // 请求失败
      console.log(error)
      return Promise.reject(error)
    })
  }

  const register = (params: UserRegister) => {
    return userRegister(params).then(res => {
      const token: string = res.data.data.token
      // 存入token
      auth.saveToken(token)
      setToken(token)
      return res
    }).catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  }

  useMount(() => {
    const bootstrapAsync = async () => {
      setLoading(true)
      try {
        //// Fetch the token from storage then navigate to our appropriate place
        const storageToken = await auth.getToken()
        setToken(storageToken)
        console.log(storageToken)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    bootstrapAsync()
  })

  // token变化后去拉取用户信息
  useEffect(() => {
    const bootstrapUser = async () => {
      const response = await getUserInfo()
      const UserInfo = response.data.data
      setUser(UserInfo)
    }
    bootstrapUser()
    
  },[token])

  if (isError) {
    return <FullPageError></FullPageError>
  }

  if (fullLoading) {
    return <FullPageLoading></FullPageLoading>
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isOpen, setOpen, token, isEdit, setEdit, setUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw Error('useAuth必须在AuthProvider中使用')
  }

  return context
}