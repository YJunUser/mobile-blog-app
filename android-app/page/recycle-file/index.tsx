import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, View, Text } from 'react-native'
import { useRefresh } from '../../components/refresh'
import { useReloadFile } from '../../utils/index'
import { styles } from './style'
import { fileData, fileParams } from '../../types/file';
import { useFileItem } from '../../utils/file-item'
import { FileItem } from '../../components/FileItem'
import { EditModal } from '../../components/modal/editModal'

const RecycleFileScreen = () => {
    const reloadData = useReloadFile()
    const { renderRefreshControl } = useRefresh({ loadData: reloadData })

    const fileParams: fileParams = {
        fileStatus: 'recycled',
    }
    const { data: fileDatas, isLoading } = useFileItem(fileParams)

    const [select, setSelect] = useState<fileData[]>([])


    return (
        <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={renderRefreshControl()}
            style={styles.container}
            contentContainerStyle={styles.content}
        >


            {
                isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : <View style={styles.fileContainer}>
                    {
                        fileDatas.length === 0 ? (<Text>空空如也</Text>) : fileDatas?.map((item) => <FileItem file={item} key={item.name} setSelect={setSelect} select={select} isRecycle={true} ></FileItem>)
                    }
                </View>
            }
            <EditModal selectedFiles={select} isRecycle={true} setSelect={setSelect}></EditModal>
        </ScrollView >
    )
}

export default RecycleFileScreen