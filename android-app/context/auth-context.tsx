import React, { ReactNode, useState } from 'react'
import { useMount } from '../utils';

type UserLogin = {
  username: string;
  password: string;
}

interface ContextStore {
  user: {
    username: string;
    password: string;
  } | null; // null代表还没登陆
  login: (UserLogin) => Promise<unknown>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
  isOpen: { open: boolean };
  setOpen: (isOpen: { open: boolean }) => void
}

// create a store 
const AuthContext = React.createContext<ContextStore>(undefined);

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<{ username: string, password: string } | null>(null)

  // drawer open
  const [isOpen, setOpen] = useState({ open: false })

  const login = (values: UserLogin) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        setUser({
          username: 'yaobojun',
          password: '123456'
        })
        res(null)
      }, 1000);
    })
  }
  const logout = () => { return Promise.resolve() }
  const register = () => { return Promise.resolve() }

  useMount(() => {
    //// Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

    }

    bootstrapAsync()
  })

  // if (isError) {

  // }

  // if (isLoading) {

  // }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isOpen, setOpen }} children={children}></AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw Error('useAuth必须在AuthProvider中使用')
  }

  return context
}