import React, { ReactNode, useState } from 'react'
import { userLogin, userLogout, userRegister } from '../api/auth';
import { tokenResponse, UserLogin, UserRegister } from '../types/auth';
import { useMount } from '../utils';
import * as auth from '../utils/auth-control'

interface ContextStore {
  user: {
    username: string;
    password: string;
  } | null; // null代表还没登陆
  login: (params: UserLogin) => Promise<unknown>;
  logout: () => Promise<unknown>;
  register: (params: UserRegister) => Promise<unknown>;
  isOpen: { open: boolean };
  setOpen: (isOpen: { open: boolean }) => void,
  token: string | null;
}

// create a store 
const AuthContext = React.createContext<ContextStore>(undefined);

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<{ username: string, password: string } | null>(null)
  const [token, setToken] = useState<string>(null)

  // drawer open
  const [isOpen, setOpen] = useState({ open: false })

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
      // 情趣失败
      console.log(error)
      return error
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
    //// Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
        const storageToken = await auth.getToken()
        setToken(storageToken)
    }

    bootstrapAsync()
  })

  // if (isError) {

  // }

  // if (isLoading) {

  // }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isOpen, setOpen, token }} children={children}></AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw Error('useAuth必须在AuthProvider中使用')
  }

  return context
}