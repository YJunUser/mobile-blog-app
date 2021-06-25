import { useQuery } from "react-query"
import { getFile } from "../api/file"
import { fileParams } from "../types/file"


export const useFileItem = (params: fileParams) => {
    return useQuery("fileData", async () => {
        const res = await getFile(params)
        return res.data.data
    })
}