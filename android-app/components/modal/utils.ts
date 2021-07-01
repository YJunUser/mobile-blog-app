import { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { useAuth } from '../../context/auth-context';
import { fileData, FileType } from '../../types/file';
import { useCamera } from '../../utils/camera';
import { useDeleteFiles, useRecoveryFiles, useRecycleFiles, useRenameFiles, useSaveArticle, useSaveFiles } from '../../utils/file-item';
import * as RootNavigation from '../../RootNavigation'
import { getFileDownLoadUrl, getUploadUrl } from '../../api/file';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs'
import { goWeb } from '../../utils/goWeb';
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
    const { mutateAsync, isLoading: recycleLoading } = useRecycleFiles()
    const { mutateAsync: renameAsync, isLoading: renameLoading } = useRenameFiles()
    const { setEdit } = useAuth()
    const confirmDelete = () => {
        if (selectedFiles.length === 0) {
            ToastAndroid.showWithGravity('请至少选择一个文件', ToastAndroid.LONG, ToastAndroid.CENTER)
        } else {
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
                            setEdit(false)
                        }
                    },
                ]
            );
        }


    }
    const confirmSharer = () => {
        if (selectedFiles.length > 1) {
            ToastAndroid.showWithGravity('一次只能分享一个文件哦', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else if (selectedFiles.length === 0) {
            ToastAndroid.showWithGravity('请选择一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            setSharerVisible(true)
        }
        setEdit(false)
    }

    const confirmCollect = () => {
        ToastAndroid.showWithGravity('收藏功能升级中,敬请期待', ToastAndroid.SHORT, ToastAndroid.TOP)
    }

    const confirmDownload = async () => {
        if (selectedFiles.length > 1) {
            ToastAndroid.showWithGravity('一次只能下载一个文件哦', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else if (selectedFiles.length === 0) {
            ToastAndroid.showWithGravity('请选择一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            try {
                const res = await getFileDownLoadUrl(selectedFiles[0].id)
                const { url } = res.data.data
                goWeb(url)
            } catch (error) {
                ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }
        setEdit(false)
    }

    const confirmRename = () => {
        if (selectedFiles.length > 1) {
            ToastAndroid.showWithGravity('一次只能重命名一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else if (selectedFiles.length === 0) {
            ToastAndroid.showWithGravity('请选择一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            toggleFolder()
        }
        setEdit(false)
    }

    // 重命名文件modal
    const [isFolderVisible, setFolderVisible] = useState<boolean>(false)
    const [folderName, setName] = useState<string>('')

    const toggleFolder = () => {
        setFolderVisible(!isFolderVisible)
    }

    const toggleFolderDone = async () => {
        try {
            const { isDirectory, id } = selectedFiles[0]

            await renameAsync({
                id,
                renameParam: {
                    isDirectory,
                    newName: folderName
                }
            })
            ToastAndroid.showWithGravity('重命名成功', ToastAndroid.LONG, ToastAndroid.CENTER)
            setSelect([])
            setEdit(false)
        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.CENTER)
        }
        toggleFolder()
    }

    const toggleFolderQuit = () => {
        toggleFolder()
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
        color: '#000000',
        name: '下载',
        handle: confirmDownload
    }, {
        icon: 'arrow-circle-o-right',
        color: '#000000',
        name: '重命名',
        handle: confirmRename
    }, {
        icon: 'close',
        color: 'red',
        name: '删除',
        handle: confirmDelete
    }]

    return { editItemList, folderName, setName, toggleFolder, toggleFolderDone, toggleFolderQuit, isFolderVisible, renameLoading }
}

export const useRecycle = (selectedFiles: fileData[], setSelect: (selectFiles: fileData[]) => void) => {
    const { mutateAsync: recoveryAsync } = useRecoveryFiles()
    const { mutateAsync: deleteAsync } = useDeleteFiles()
    const { setEdit } = useAuth()
    const confirmDelete = () => {
        if (selectedFiles.length === 0) {
            ToastAndroid.showWithGravity('请至少选择一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
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
                            setEdit(false)
                        }
                    },
                ]
            );
        }

    }
    const confirmRecovery = () => {
        Alert.alert('确认恢复吗', '恢复后可在主页中找到',
            [
                {
                    text: "取消",
                },
                {
                    text: "确认", onPress: () => {
                        if (selectedFiles.length === 0) {
                            ToastAndroid.showWithGravity('请至少选择一个文件', ToastAndroid.SHORT, ToastAndroid.CENTER)
                        } else {
                            setSelect([])
                            selectedFiles.forEach(async (item) => {
                                await recoveryAsync({
                                    id: item.id,
                                    isDirectory: item.isDirectory
                                })
                            })
                            ToastAndroid.showWithGravity('恢复成功', ToastAndroid.LONG, ToastAndroid.CENTER)
                        }

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

export const useUsingModal = (presentFolderId: number) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [isFileSelectorVisible, setFileSelectorVisible] = useState<boolean>(false)
    const [isFolderVisible, setFolderVisible] = useState<boolean>(false)
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)
    const [saveVisible, setSaveVisible] = useState<boolean>(false)
    const [url, setUrl] = useState<string>('')

    const { mutateAsync: saveArticle, isLoading: saveArticleLoading } = useSaveArticle()

    const { isEdit, token } = useAuth()


    const { mutateAsync: saveFileAsync } = useSaveFiles()

    const openCamera = useCamera()

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleFileSelector = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            RNFS.readFile(res.uri, 'base64').then(data => {
                if (data) {
                    SelectFileDone(res.uri, res.name, data)
                }

            }).catch(err => {
                console.log(err)
            })

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else {
                throw err;
            }
        }
    }
    const toggleFolder = () => {
        setModalVisible(false)
        setFolderVisible(!isFolderVisible)
    }

    const getPictureByCamera = async () => {
        try {
            const result = await openCamera()
            const path = result.path
            const arr = path.split('/')
            const name = arr[arr.length - 1]

            RNFS.readFile(path, 'base64').then(data => {
                SelectFileDone(path, name, data)
            })

        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }
    const getPictureByPicker = async () => {
        try {

            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            RNFS.readFile(res.uri, 'base64').then(data => {
                SelectFileDone(res.uri, res.name, data)
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else {
                throw err;
            }
        }

    }


    const SelectFileDone = async (selectPath: string, fileName: string, data: string) => {
        try {
            setUploadLoading(true)
            const res = await getUploadUrl({ filename: fileName, folderId: presentFolderId })
            const { url, uploadCode } = res.data.data

            RNFetchBlob.fetch('PUT', url, {
                Authorization: token,
                'Dropbox-API-Arg': JSON.stringify({
                    path: selectPath,
                    mode: 'add',
                    autorename: true,
                    mute: false
                }),
                'Content-Type': 'application/octet-stream',
            }, data)
                .then(async () => {
                    await saveFileAsync(uploadCode)
                    setUploadLoading(false)
                    ToastAndroid.showWithGravity('上传成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
                })
                .catch((err) => {
                    console.log(err)
                    setUploadLoading(false)
                })

        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    const toggleSaveArticle = () => {
        setSaveVisible(true)
    }

    const confirmSaveArticle = async () => {
        try {
            if (url.length > 0) {
                await saveArticle({ url })
                ToastAndroid.showWithGravity('上传成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else {
                ToastAndroid.showWithGravity('url不能为空', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            setSaveVisible(false)
        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
            setSaveVisible(false)
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
        color: 'green',
        handle: getPictureByPicker
    }, {
        icon: 'camerao',
        title: '拍照上传',
        color: '#00bfff',
        handle: getPictureByCamera
    }, {
        icon: 'download',
        title: '保存文章',
        color: '#000000',
        handle: toggleSaveArticle
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
        getPictureByPicker,
        SelectFileDone,
        uploadLoading,
        saveVisible,
        setSaveVisible,
        url,
        setUrl,
        confirmSaveArticle,
        saveArticleLoading
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
        case 'image':
            return 'file'
        default:
            return 'folder'
    }
}
