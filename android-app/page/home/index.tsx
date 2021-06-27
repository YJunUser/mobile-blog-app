import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useRefresh } from '../../components/refresh';
import { styles } from './style';
import { UsingModal } from '../../components/modal/usingModal';
import { useFileItem } from '../../utils/file-item';
import { fileData, fileParams } from '../../types/file';
import { FileItem } from '../../components/FileItem';
import { EditModal } from '../../components/modal/editModal';
import { useReloadFile } from './utils';


const HomeScreen = ({ navigation }: { navigation: any }) => {

  const reloadData = useReloadFile()
  const { renderRefreshControl } = useRefresh({ loadData: reloadData })

  const fileParams: fileParams = {
    fileStatus: 'unRecycled',
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
      <UsingModal presentFolderId={0}></UsingModal>
      <EditModal selectedFiles={select} isRecycle={false}></EditModal>
    </ScrollView >
  
  );
};



export default HomeScreen

