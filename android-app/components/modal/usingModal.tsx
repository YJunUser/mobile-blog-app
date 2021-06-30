import React from 'react'
import { TextInput, View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { ModalComponent } from '.';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useUsingModal } from './utils';
import { useState } from 'react';
import { useNewFolder } from '../../utils/file-item';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button, Card, Input } from 'react-native-elements';

export const UsingModal = ({ presentFolderId }: { presentFolderId: number }) => {
  const { isModalVisible, toggleFolder, toggleModal, list, isFolderVisible, isEdit, uploadLoading, saveVisible, setSaveVisible, url, setUrl, confirmSaveArticle, saveArticleLoading } = useUsingModal(presentFolderId)
  const [folderName, setName] = useState<string>('')

  const { mutateAsync, isLoading } = useNewFolder()

  const toggleFolderDone = async () => {
    try {
      if(folderName) {
        await mutateAsync({
          folderName: folderName,
          parentFolderId: presentFolderId
        })
      } else {
        ToastAndroid.showWithGravity('文件夹必须有名字哦', ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
 
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
        toggleModal={null}
        ModalStyle={styles.folderModal}
        rightTopChildren={<Text style={{ color: '#6a5acd', fontWeight: 'bold' }} onPress={isLoading ? null : toggleFolderDone}>{isLoading ? '稍等...' : '完成'}</Text>}
        leftTopChildren={<Text style={{ color: '#000000' }} onPress={toggleFolderQuit}>取消</Text>}
        contentChildren={
          <View style={styles.folderModalContent}>
            <EntypoIcon name='folder' size={150} color={'#6495ed'}></EntypoIcon>
            <TextInput style={styles.folderName} placeholder={'新建文件夹'} focusable={true} value={folderName} onChangeText={setName}></TextInput>
          </View>
        }
      >
      </ModalComponent>

      <Overlay isVisible={uploadLoading}>
        <ActivityIndicator size="large" color="#00ff00" />
      </Overlay>

      <Overlay isVisible={saveVisible} style={{ width: '100%' }} onBackdropPress={() => { saveArticleLoading ? null : setSaveVisible(false) }}>
        <Card containerStyle={{ width: 300, height: 200, padding: 20 }}>
          <Card.Title>保存文章</Card.Title>
          <Input placeholder='输入url' value={url} onChangeText={setUrl}></Input>
          <Button
            icon={<Icon name='save' color='#ffffff' size={16} />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title={saveArticleLoading ? '保存中...' : '确定'}
            disabled={saveArticleLoading}
            onPress={confirmSaveArticle} />
        </Card>
      </Overlay>


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