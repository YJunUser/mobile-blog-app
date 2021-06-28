import React from 'react'
import { ActivityIndicator, ScrollView, View, Text } from 'react-native'

import { styles } from './style'
import {  fileParams } from '../../types/file';

import { FileItem } from '../../components/FileItem'
import { EditModal } from '../../components/modal/editModal'
import { useCommonModal } from '../../utils/commonModal'

const RecycleFileScreen = ({ navigation }: { navigation: any }) => {

    const fileParams: fileParams = {
        fileStatus: 'recycled',
    }

    const { renderRefreshControl, isLoading, fileDatas, select, setSelect } = useCommonModal(fileParams, navigation)


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