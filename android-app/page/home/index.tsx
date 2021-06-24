import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback, TextInput, StyleSheet } from 'react-native';
import { useRefresh } from '../../components/refresh';
import { styles } from './style';
import { UsingModal } from '../../components/modal/usingModal';
import { useFileItem } from '../../utils/file-item';
import { fileParams } from '../../types/file';
import { useEffect } from 'react';
import { FileItem } from '../../components/FileItem';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const { renderRefreshControl } = useRefresh()
  const fileParams: fileParams = {
    fileStatus: 'unRecycled',
  }
  const { data: fileData, isError, isLoading, error } = useFileItem(fileParams)
  console.log(fileData)

  return (
    // <View style={{ height: '100%' }}>
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl()}
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <View style={styles.fileContainer}>
        {
          fileData?.map((item) => <FileItem file={item} key={item.name}></FileItem>)
        }
      </View>
      <UsingModal></UsingModal>
    </ScrollView >
    // </View>
  );
};



export default HomeScreen

