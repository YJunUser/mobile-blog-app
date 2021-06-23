import { useCallback, useEffect, useRef, useState } from "react"


export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const checkEmail = (email: string) => {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const Reg: RegExp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!Reg.test(email)) {
    return false
  } else {
    return true
  }
}

export const useCountDown = () => {
  const intervalRef = useRef<any>(null)

  const [count, changeCount] = useState<number>(0)

  const clear = useCallback(() => {
    clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (count === 59) {
    intervalRef.current = setInterval(() => {
        changeCount(preCount => preCount - 1)
      }, 1000)
    } else if (count === 0) {
      clearInterval(intervalRef.current)
    }
  }, [count])

  const onGetCaptcha = useCallback(() => {
    changeCount(59);
  }, [])

  return { onGetCaptcha, count, clear }
}