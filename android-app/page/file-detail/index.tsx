import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { useQueryClient } from 'react-query'
import { useRefresh } from '../../components/refresh'
import { styles } from './style'
import { useFileItem } from '../../utils/file-item'
import { FileItem } from '../../components/FileItem'
import { UsingModal } from '../../components/modal/usingModal'
import { EditModal } from '../../components/modal/editModal'
import { fileData, fileParams } from '../../types/file';



const FileScreen = ({ navigation }: { navigation: any }) => {
    const route = useRoute()
    const file: any = route.params['file']

    const queryClient = useQueryClient()
    const reloadData = () => {
        return queryClient.invalidateQueries('fileData')
    }
    const { renderRefreshControl } = useRefresh({ loadData: reloadData })

    const fileParams: fileParams = {
        fileStatus: 'unRecycled',
        folderId: file.id
    }

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


    return (
        <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={renderRefreshControl()}
            style={styles.container}
            contentContainerStyle={styles.content}
        >

            {
                isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : <View style={styles.fileContainer}>
                    {
                        fileDatas ? fileDatas?.map((item) => <FileItem file={item} key={item.name} setSelect={setSelect} select={select} goFileScreen={goFileScreen}></FileItem>) : null
                    }
                </View>
            }
            <UsingModal presentFolderId={file.id}></UsingModal>
            <EditModal selectedFiles={select} isRecycle={false}></EditModal>
        </ScrollView >
    )
}

export default FileScreen

