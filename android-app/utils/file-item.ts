import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteFiles, getFile, newFolder, recoveryFiles, recycleFiles } from "../api/file"
import { fileParams, NewFolderParams, RecoveryFiles, RecycleFiles } from "../types/file"


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
            await newFolder(params);
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
            await recycleFiles(params);
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}

export const useRecoveryFiles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (params: RecoveryFiles) => {
            await recoveryFiles(params);
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}

export const useDeleteFiles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (params: RecoveryFiles) => {
            await deleteFiles(params);
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}