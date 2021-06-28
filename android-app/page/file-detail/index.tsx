import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { styles } from './style'
import { FileItem } from '../../components/FileItem'
import { UsingModal } from '../../components/modal/usingModal'
import { EditModal } from '../../components/modal/editModal'
import { fileParams } from '../../types/file';
import { useCommonModal } from '../../utils/commonModal'
import { Overlay } from 'react-native-elements'
import { SharerModal } from '../../components/modal/sharer'



const FileScreen = ({ navigation }: { navigation: any }) => {
    const route = useRoute()
    const file: any = route.params['file']

    const fileParams: fileParams = {
        fileStatus: 'unRecycled',
        folderId: file.id
    }
    const { renderRefreshControl, isLoading, fileDatas, select, setSelect, setVisible, visible, toggleOverlay, goFileScreen } = useCommonModal(fileParams, navigation)


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
            <EditModal selectedFiles={select} isRecycle={false} setSelect={setSelect} setSharerVisible={setVisible}></EditModal>
            {/**分享的Overlay */}
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ padding: 30, width: '100%', height: '70%', position: 'absolute', bottom: 0 }}>
                <SharerModal selectedFiles={select}></SharerModal>
            </Overlay>
        </ScrollView >
    )
}

export default FileScreen

