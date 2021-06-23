import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useRefresh } from '../../components/refresh';
import { ModalComponent } from '../../components/modal';
import RNFileSelector from 'react-native-file-selector';
import { styles } from './style';
import { useCamera, useImagePicker } from '../../utils/camera';
import ImagePicker from 'react-native-image-crop-picker';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isFileSelectorVisible, setFileSelectorVisible] = useState<boolean>(false)
  const [isFolderVisible, setFolderVisible] = useState<boolean>(false)
  const openImagePicker = useImagePicker()
  const openCamera = useCamera()

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleFileSelector = () => {
    setFileSelectorVisible(!isFileSelectorVisible)
  }
  const toggleFolder = () => {
    setModalVisible(false)
    setFolderVisible(!isFolderVisible)
  }
  const getPictureByCamera = async () => {
    const result = await openCamera()
    console.log(result)
  }
  const getPictureByPicker = async () => {
    try {
      const result = await openImagePicker()
      console.log(result)
    } catch (error) {
      console.log(error)
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
    color: '#e9967a',
    handle: getPictureByPicker
  }, {
    icon: 'camerao',
    title: '拍照上传',
    color: '#00bfff',
    handle: getPictureByCamera
  }]

  const { renderRefreshControl } = useRefresh()

  return (
    // <View style={{ height: '100%' }}>
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl()}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <ModalComponent list={list} isVisible={isModalVisible} toggleModal={toggleModal} title={'添加至云盘'} >
      </ModalComponent>

      <ModalComponent
        title={'新建文件夹'}
        isVisible={isFolderVisible}
        toggleModal={toggleFolder}
        ModalStyle={styles.folderModal}
        rightTopChildren={<TouchableNativeFeedback onPress={toggleFolder}><Text style={{ color: '#6a5acd', fontWeight: 'bold' }}>完成</Text></TouchableNativeFeedback>}
        leftTopChildren={<TouchableNativeFeedback onPress={toggleFolder}><Text style={{ color: '#000000' }}>取消</Text></TouchableNativeFeedback>}
        contentChildren={
          <View style={styles.folderModalContent}>
            <EntypoIcon name='folder' size={150} color={'#6495ed'}></EntypoIcon>
            <TextInput style={styles.folderName} placeholder={'新建文件夹'} focusable={true}></TextInput>
          </View>
        }
      >
      </ModalComponent>


      <RNFileSelector title={"选择文件"} visible={isFileSelectorVisible} path={'/storage/emulated/0'} closeMenu={true} onDone={(path) => {
        console.log("file selected: " + path);
      }} onCancel={toggleFileSelector} />



      <View style={styles.button}>
        <Icon name='pluscircle' size={40} color='#6495ed' onPress={toggleModal}></Icon>
      </View>

    </ScrollView >
    // </View>
  );
};



export default HomeScreen