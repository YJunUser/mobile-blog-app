import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useRefresh } from '../../components/refresh';
import { ModalComponent } from '../../components/modal';
import RNFileSelector from 'react-native-file-selector';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isFileSelectorVisible, setFileSelectorVisible] = useState<boolean>(false)
  const [isFolderVisible, setFolderVisible] = useState<boolean>(false)

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
  }
  ]



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

      <RNFileSelector title={"选择文件"} visible={isFileSelectorVisible} path={'/storage'} closeMenu={true} onDone={(path) => {
        console.log("file selected: " + path);
      }} onCancel={toggleFileSelector} />


      <View style={styles.button}>
        <Icon name='pluscircle' size={40} color='#6495ed' onPress={toggleModal}></Icon>
      </View>
    </ScrollView >
    // </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: '100%',
    backgroundColor: '#ffffff'
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  folderModal: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: '100%'
  },
  folderModalContent: {
    alignItems: 'center',
    marginTop: 90,
    width: '100%',
  },
  folderName: { height: 40, backgroundColor: '#dcdcdc', borderRadius: 9, width: '100%', textAlign: 'center', }
})
export default HomeScreen