
const StorageKey = 'authControlToken'
import storage from './storage'

export const getToken = () => storage.load({
  key: StorageKey,
  autoSync: false
}).then(ret => {
  console.log(ret)
  return ret
}).catch(err => {
  // 没有找到数据
  console.log(err.message)
  return null
})

export const saveToken = (token: string) => {
  storage.save({
    key: StorageKey,
    data: token,
  })
}

export const removeToken = () => storage.remove({
  key: StorageKey
})

export const removeAll = () => storage.clearMap()