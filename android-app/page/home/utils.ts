import { useQueryClient } from "react-query"

export const useReloadFile = () => {
    const queryClient = useQueryClient()
    const reloadData = () => {
      return queryClient.invalidateQueries('fileData')
    }
    return reloadData
}