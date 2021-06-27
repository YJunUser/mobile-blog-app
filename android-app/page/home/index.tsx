import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRefresh } from '../../components/refresh';
import { styles } from './style';
import { UsingModal } from '../../components/modal/usingModal';
import { useFileItem } from '../../utils/file-item';
import { fileData, fileParams } from '../../types/file';
import { FileItem } from '../../components/FileItem';
import { EditModal } from '../../components/modal/editModal';
import { useQueryClient } from 'react-query';


const HomeScreen = ({ navigation }: { navigation: any }) => {

  const queryClient = useQueryClient()
  const reloadData = () => {
    return queryClient.invalidateQueries('fileData')
  }
  const { renderRefreshControl } = useRefresh({ loadData: reloadData })

  const fileParams: fileParams = {
    fileStatus: 'unRecycled',
  }

  const { data: fileData, isError, isLoading, error } = useFileItem(fileParams)
  const [select, setSelect] = useState<number[]>([])

  const goFileScreen = (params: fileData) => {
    navigation.push('FileScreen', {
      file: params
    })
  }


  return (
    // <View style={{ height: '100%' }}>
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl()}
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <View style={styles.fileContainer}>
        {
          fileData ? fileData?.map((item) => <FileItem file={item} key={item.name} setSelect={setSelect} select={select} goFileScreen={goFileScreen}></FileItem>) : null
        }
      </View>
      <UsingModal></UsingModal>
      <EditModal></EditModal>
    </ScrollView >
    // </View>
  );
};



export default HomeScreen

