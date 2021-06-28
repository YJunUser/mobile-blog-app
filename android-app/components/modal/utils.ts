import { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { useAuth } from '../../context/auth-context';
import { fileData, FileType } from '../../types/file';
import { useCamera, useImagePicker } from '../../utils/camera';
import { useDeleteFiles, useRecoveryFiles, useRecycleFiles } from '../../utils/file-item';
import * as RootNavigation from '../../RootNavigation'
interface EditItem {
    icon: string;
    color: string;
    size?: number;
    name: string;
    handle?: () => void
}

interface EditModalProps {
    selectedFiles: fileData[],
    setSelect: (selectFiles: fileData[]) => void,
    setSharerVisible: (visible: boolean) => void
}
export const useEdit = (props: EditModalProps) => {
    const { selectedFiles, setSelect, setSharerVisible } = props
    const { mutateAsync } = useRecycleFiles()
    const confirmDelete = () => {
        Alert.alert('确认删除吗', '删除后可以在回收站中找到',
            [
                {
                    text: "取消",
                },
                {
                    text: "确认", onPress: () => {
                        setSelect([])
                        selectedFiles.forEach(async (item) => {
                            await mutateAsync({
                                id: item.id,
                                isDirectory: item.isDirectory
                            })
                        })
                        ToastAndroid.showWithGravity('删除成功', ToastAndroid.LONG, ToastAndroid.CENTER)
                    }
                },
            ]
        );
    }
    const confirmSharer = () => {
        if (selectedFiles.length > 1) {
            ToastAndroid.showWithGravity('一次只能分享一个文件哦', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            setSharerVisible(true)
        }
    }

    const confirmCollect = () => {
        ToastAndroid.showWithGravity('收藏功能升级中,敬请期待', ToastAndroid.SHORT, ToastAndroid.TOP)
    }

    const confirmDownload = () => {
        ToastAndroid.showWithGravity('下载功能升级中,敬请期待', ToastAndroid.SHORT, ToastAndroid.TOP)
    }

    const confirmRename = () => {
        // ToastAndroid.showWithGravity('重命名功能升级中,敬请期待', ToastAndroid.SHORT, ToastAndroid.TOP)
        console.log(selectedFiles)
        if (selectedFiles.length > 1) {
            ToastAndroid.showWithGravity('一次只能重命名一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    const editItemList: EditItem[] = [{
        icon: 'share',
        color: '#000000',
        name: '分享',
        handle: confirmSharer
    }, {
        icon: 'star-o',
        color: '#c0c0c0',
        name: '收藏',
        handle: confirmCollect
    }, {
        icon: 'arrow-circle-o-down',
        color: '#c0c0c0',
        name: '下载',
        handle: confirmDownload
    }, {
        icon: 'arrow-circle-o-right',
        color: '#c0c0c0',
        name: '重命名',
        handle: confirmRename
    }, {
        icon: 'close',
        color: 'red',
        name: '删除',
        handle: confirmDelete
    }]

    return editItemList
}

export const useRecycle = (selectedFiles: fileData[], setSelect: (selectFiles: fileData[]) => void) => {
    const { mutateAsync: recoveryAsync } = useRecoveryFiles()
    const { mutateAsync: deleteAsync } = useDeleteFiles()
    const confirmDelete = () => {
        Alert.alert('确认清空吗', '清空后不可找回',
            [
                {
                    text: "取消",
                },
                {
                    text: "确认", onPress: () => {
                        setSelect([])
                        selectedFiles.forEach(async (item) => {
                            await deleteAsync({
                                id: item.id,
                                isDirectory: item.isDirectory
                            })
                        })
                        ToastAndroid.showWithGravity('删除成功', ToastAndroid.LONG, ToastAndroid.CENTER)

                    }
                },
            ]
        );
    }
    const confirmRecovery = () => {
        Alert.alert('确认恢复吗', '恢复后可在主页中找到',
            [
                {
                    text: "取消",
                },
                {
                    text: "确认", onPress: () => {
                        setSelect([])
                        selectedFiles.forEach(async (item) => {
                            await recoveryAsync({
                                id: item.id,
                                isDirectory: item.isDirectory
                            })
                        })
                        ToastAndroid.showWithGravity('恢复成功', ToastAndroid.LONG, ToastAndroid.CENTER)
                    }
                },
            ]
        );
    }

    const editItemList: EditItem[] = [{
        icon: 'repeat',
        color: '#000000',
        name: '恢复',
        handle: confirmRecovery
    }, {
        icon: 'close',
        color: 'red',
        name: '清空',
        handle: confirmDelete
    }]

    return editItemList
}

export const useUsingModal = () => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [isFileSelectorVisible, setFileSelectorVisible] = useState<boolean>(false)
    const [isFolderVisible, setFolderVisible] = useState<boolean>(false)
    const { isEdit } = useAuth()



    const openImagePicker = useImagePicker()
    const openCamera = useCamera()

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleFileSelector = () => {
        setFileSelectorVisible(!isFileSelectorVisible)
    }
    const toggleFolder = () => {
        setModalVisible(false)
        setFolderVisible(!isFolderVisible)
    }

    const getPictureByCamera = async () => {
        const result = await openCamera()
        console.log(result)
    }
    const getPictureByPicker = async () => {
        try {
            const result = await openImagePicker()
            console.log(result)
        } catch (error) {
            console.log(error)
        }

    }

    const goSharerScreen = () => {
        setModalVisible(false)
        setTimeout(() => {
            RootNavigation.navigate('SharerScreen')
        }, 500);
    }

    // dataList of modal
    const list = [{
        icon: 'unknowfile1',
        title: '本地文件',
        color: '#ff7f50',
        handle: toggleFileSelector
    }, {
        icon: 'addfolder',
        title: '新建文件夹',
        color: '#6495ed',
        handle: toggleFolder
    }, {
        icon: 'picture',
        title: '本地图片',
        color: '#e9967a',
        handle: getPictureByPicker
    }, {
        icon: 'camerao',
        title: '拍照上传',
        color: '#00bfff',
        handle: getPictureByCamera
    }, {
        icon: 'sharealt',
        title: '我的分享',
        color: '#00ffff',
        handle: goSharerScreen
    }]
    return {
        isEdit,
        isModalVisible,
        isFileSelectorVisible,
        isFolderVisible,
        setModalVisible,
        setFileSelectorVisible,
        setFolderVisible,
        list,
        toggleFileSelector,
        toggleFolder,
        toggleModal,
        getPictureByCamera,
        getPictureByPicker
    }
}


export function getSharerType(type: FileType): 'article' | 'file' | 'folder' {
    switch (type) {
        case 'doc':
            return 'file'
        case 'excel':
            return 'file'
        case 'md':
            return 'article'
        case 'pdf':
            return 'file'
        case 'sound':
            return 'file'
        case 'txt':
            return 'file'
        case 'zip':
            return 'file'
        case 'unknown':
            return 'file'
        case 'execute':
            return 'file'
        case 'ppt':
            return 'file'
        default:
            return 'folder'
    }
}
