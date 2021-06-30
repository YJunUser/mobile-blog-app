import { useState } from "react";
import { useReloadFile } from ".";
import { useRefresh } from "../components/refresh";
import { useFileItem } from "./file-item";
import { fileData, fileParams } from '../types/file';
import { getFileDownLoadUrl } from "../api/file";
import { ToastAndroid } from "react-native";
import { goWeb } from "./goWeb";

export const useCommonModal = (fileParams: fileParams, navigation: any) => {
    const reloadData = useReloadFile()
    const { renderRefreshControl } = useRefresh({ loadData: reloadData })

    const [visible, setVisible] = useState<boolean>(false)
    const [fileModalVisible, setFileModalVisible] = useState<boolean>(false)
    const [toggleFile, setToggleFile] = useState<fileData>(null)

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const { data: fileDatas, isLoading } = useFileItem(fileParams)

    const [select, setSelect] = useState<fileData[]>([])

    const confirmDownload = async (file: fileData) => {
        try {
          const res = await getFileDownLoadUrl(file.id)
          const { url } = res.data.data
          goWeb(url)
          // Clipboard.setString(url)
          // ToastAndroid.showWithGravity('下载链接已复制到粘贴板', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } catch (error) {
          ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
      }

    const goFileScreen = (params: fileData) => {
        if (params.isDirectory) {
            navigation.push('FileScreen', {
                file: params
            })
        } else {
            //...
            setFileModalVisible(true)
            setToggleFile(params)
        }
    }
    return { renderRefreshControl, visible, setVisible, toggleOverlay, fileDatas, isLoading, select, setSelect, goFileScreen, fileModalVisible, setFileModalVisible, toggleFile, confirmDownload }
}