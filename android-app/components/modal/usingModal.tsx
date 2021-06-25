import React from 'react'
import { TextInput, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native';
import { ModalComponent } from '.';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import RNFileSelector from 'react-native-file-selector';
import {  useUsingModal } from './utils';

export const UsingModal = () => {
  const {isModalVisible, toggleFileSelector, toggleFolder, toggleModal, list, isFileSelectorVisible, isFolderVisible, isEdit} = useUsingModal()


  return (
    <>
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

      {
        isEdit ? null : <View style={styles.button}>
          <Icon name='pluscircle' size={40} color='#6495ed' onPress={toggleModal}></Icon>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
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