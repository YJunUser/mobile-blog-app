import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteFiles, getFile, newFolder, recoveryFiles, recycleFiles, renameFile, saveArticle, saveFile } from "../api/file"
import { fileParams, NewFolderParams, RecoveryFiles, RecycleFiles, RenameConfig } from "../types/file"


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

export const useSaveFiles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (uploadCode: string) => {
            await saveFile(uploadCode);
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}

export const useRenameFiles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (renameParam: RenameConfig) => {
            await renameFile(renameParam);
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}

export const useSaveArticle = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (saveArticleParam: { url: string }) => {
            await saveArticle(saveArticleParam);
        },
        {
            onSuccess: () => queryClient.invalidateQueries('fileData')
        }
    )
}