import { useState } from "react";
import { useReloadFile } from ".";
import { useRefresh } from "../components/refresh";
import { useFileItem } from "./file-item";
import { fileData, fileParams } from '../types/file';

export const useCommonModal = (fileParams: fileParams, navigation: any) => {
    const reloadData = useReloadFile()
    const { renderRefreshControl } = useRefresh({ loadData: reloadData })

    const [visible, setVisible] = useState<boolean>(false)

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const { data: fileDatas, isLoading } = useFileItem(fileParams)

    const [select, setSelect] = useState<fileData[]>([])


    const goFileScreen = (params: fileData) => {
        if (params.isDirectory) {
            navigation.push('FileScreen', {
                file: params
            })
        } else {
            //...
        }
    }
    return { renderRefreshControl, visible, setVisible, toggleOverlay, fileDatas, isLoading, select, setSelect, goFileScreen }
}