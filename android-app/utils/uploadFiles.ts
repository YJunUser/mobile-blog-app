import RNFetchBlob from 'rn-fetch-blob'

interface UploadConfig {
    url: string;
    filePath: string;
    token: string;
    method: 'POST' | 'PUT'
}

export const uploadFiles = async (config: UploadConfig) => {
    const { url, filePath, token, method } = config

    const path = filePath.replace("file://", "");
    const arr = path.split('/')
    const name = arr[arr.length - 1]
    const formData = []

    formData.push({
        name: "file",
        filename: name,
        data: RNFetchBlob.wrap(path)
    });

    const response = await RNFetchBlob.fetch(
        method,
        url,
        {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token
        },
        formData
    );
    console.log(response)

    return response.data
}