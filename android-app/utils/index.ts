import { useEffect } from "react"


export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const checkEmail = (email: string) => {
  const Reg: RegExp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!Reg.test(email)) {
    return false
  } else {
    return true
  }
}