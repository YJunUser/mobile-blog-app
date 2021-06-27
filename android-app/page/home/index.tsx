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
import { useEffect } from 'react';


const HomeScreen = ({ navigation }: { navigation: any }) => {

  const reloadData = useReloadFile()
  const { renderRefreshControl } = useRefresh({ loadData: reloadData })

  const fileParams: fileParams = {
    fileStatus: 'unRecycled',
  }
  const { data: fileDatas, isError, isLoading, error } = useFileItem(fileParams)

  const [select, setSelect] = useState<fileData[]>([])


  useEffect(() => {
    console.log(select)

  }, [select])

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
    // <View style={{ height: '100%' }}>
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
      <EditModal selectedFiles={select}></EditModal>
    </ScrollView >
    // </View>
  );
};



export default HomeScreen

