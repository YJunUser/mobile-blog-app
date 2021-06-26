import RNFetchBlob from 'rn-fetch-blob'

interface UploadConfig {
    url: string;
    filePath: string;
    token: string;
}

export const uploadFiles = async (config: UploadConfig) => {
    const { url, filePath, token } = config

    const path = filePath.replace("file://", "");
    const formData = []

    formData.push({
        name: "file",
        filename: `photo.jpg`,
        data: RNFetchBlob.wrap(path)
    });

    const response = await RNFetchBlob.fetch(
        "POST",
        url,
        {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token
        },
        formData
    );

    return JSON.parse(response.data)
}