import { useMutation, useQuery, useQueryClient } from "react-query"
import { createShares, deleteShares, getShares } from "../api/sharer";
import { GetSharerParams, SharerConfig } from "../types/sharer";


export const useShares = (params: GetSharerParams) => {
    return useQuery(['sharers', params], async () => {
        const res = await getShares(params)
        return res.data.data
    })
}




export const useCreateShares = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (params: SharerConfig) => {
            const res = await createShares(params);
            return res.data.data
        },
        {
            onSuccess: () => queryClient.invalidateQueries('sharers')
        }
    )
}

export const useDeleteShares = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (shareId: number) => {
            const res = await deleteShares(shareId);
            return res.data.data
        },
        {
            onSuccess: () => queryClient.invalidateQueries('sharers')
        }
    )
}

