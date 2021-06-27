import React from 'react'
import { TextInput, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native';
import { ModalComponent } from '.';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import RNFileSelector from 'react-native-file-selector';
import { useUsingModal } from './utils';
import { useState } from 'react';
import { useNewFolder } from '../../utils/file-item';

export const UsingModal = ({ presentFolderId }: { presentFolderId: number }) => {
  const { isModalVisible, toggleFileSelector, toggleFolder, toggleModal, list, isFileSelectorVisible, isFolderVisible, isEdit } = useUsingModal()
  const [folderName, setName] = useState<string>('')
  const { mutateAsync, isLoading } = useNewFolder()

  const toggleFolderDone = async () => {
    try {
      await mutateAsync({
        folderName: folderName,
        parentFolderId: presentFolderId
      })
    } catch (error) {
      console.log(error)
    }
    toggleFolder()
  }

  const toggleFolderQuit = () => {
    toggleFolder()
  }

  return (
    <>
      <ModalComponent list={list} isVisible={isModalVisible} toggleModal={toggleModal} title={'添加至云盘'} >
      </ModalComponent>

      <ModalComponent
        title={'新建文件夹'}
        isVisible={isFolderVisible}
        toggleModal={toggleFolder}
        ModalStyle={styles.folderModal}
        rightTopChildren={<TouchableNativeFeedback onPress={toggleFolderDone}><Text style={{ color: '#6a5acd', fontWeight: 'bold' }}>{isLoading ? '稍等...' : '完成'}</Text></TouchableNativeFeedback>}
        leftTopChildren={<TouchableNativeFeedback onPress={toggleFolderQuit}><Text style={{ color: '#000000' }}>取消</Text></TouchableNativeFeedback>}
        contentChildren={
          <View style={styles.folderModalContent}>
            <EntypoIcon name='folder' size={150} color={'#6495ed'}></EntypoIcon>
            <TextInput style={styles.folderName} placeholder={'新建文件夹'} focusable={true} value={folderName} onChangeText={setName}></TextInput>
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