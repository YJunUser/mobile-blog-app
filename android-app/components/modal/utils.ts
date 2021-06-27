import { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { useAuth } from '../../context/auth-context';
import { fileData } from '../../types/file';
import { useCamera, useImagePicker } from '../../utils/camera';
import { useRecycleFiles } from '../../utils/file-item';

interface EditItem {
    icon: string;
    color: string;
    size?: number;
    name: string;
    handle?: () => void
}
export const useEdit = (selectedFiles: fileData[]) => {
    const { mutateAsync } = useRecycleFiles()
    const confirmDelete = () => {
        Alert.alert('确认删除吗', '删除后可以在回收站中找到',
            [
                {
                    text: "取消",
                },
                {
                    text: "确认", onPress: () => {
                        console.log(selectedFiles)
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

    const editItemList: EditItem[] = [{
        icon: 'share',
        color: '#c0c0c0',
        name: '分享'
    }, {
        icon: 'star-o',
        color: '#c0c0c0',
        name: '收藏'
    }, {
        icon: 'arrow-circle-o-down',
        color: '#000000',
        name: '下载'
    }, {
        icon: 'arrow-circle-o-right',
        color: '#c0c0c0',
        name: '移动'
    }, {
        icon: 'close',
        color: 'red',
        name: '删除',
        handle: confirmDelete
    }]

    return { editItemList }
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