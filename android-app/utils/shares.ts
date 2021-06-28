import { useMutation, useQuery, useQueryClient } from "react-query"
import { createShares } from "../api/sharer";
import { SharerConfig } from "../types/sharer";






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
