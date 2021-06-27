import { useFocusEffect, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
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

    const { data: fileData, isError, isLoading, error } = useFileItem(fileParams)


    const [select, setSelect] = useState<number[]>([])

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

            <View style={styles.fileContainer}>
                {
                    fileData?.map((item) => <FileItem file={item} key={item.name} setSelect={setSelect} select={select} goFileScreen={goFileScreen}></FileItem>)
                }
            </View>
            <UsingModal presentFolderId={file.id}></UsingModal>
            <EditModal></EditModal>
        </ScrollView >
    )
}

export default FileScreen

