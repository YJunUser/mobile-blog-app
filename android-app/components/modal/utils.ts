import { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { useCamera, useImagePicker } from '../../utils/camera';
import { useNewFolder } from '../../utils/file-item';
interface EditItem {
    icon: string;
    color: string;
    size?: number;
    name: string;
}
export const useEdit = () => {


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
        name: '删除'
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