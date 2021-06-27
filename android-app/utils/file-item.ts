import { useMutation, useQuery, useQueryClient } from "react-query"
import { getFile, newFolder } from "../api/file"
import { fileParams, NewFolderParams } from "../types/file"


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