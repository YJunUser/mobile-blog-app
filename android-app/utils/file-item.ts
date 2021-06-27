import { useMutation, useQuery, useQueryClient } from "react-query"
import { getFile, newFolder, recycleFiles } from "../api/file"
import { fileParams, NewFolderParams, RecycleFiles } from "../types/file"


export const useFileItem = (params: fileParams) => {
    return useQuery(['fileData', params], async () => {
        const res = await getFile(params)
        return res.data.data
    })
}

export const useNewFolder = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (params: NewFolderParams) => {
            const res = await newFolder(params);
            console.log(res)
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}

export const useRecycleFiles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (params: RecycleFiles) => {
            const res = await recycleFiles(params);
            console.log(res)
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}