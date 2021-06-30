import React from 'react';
import { ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { styles } from './style';
import { UsingModal } from '../../components/modal/usingModal';
import { fileParams } from '../../types/file';
import { FileItem } from '../../components/FileItem';
import { EditModal } from '../../components/modal/editModal';
import { useCommonModal } from '../../utils/commonModal';
import { Button, Card, Overlay } from 'react-native-elements';
import { SharerModal } from '../../components/modal/sharer';
import { GetIcon } from '../../components/FileItem/file-icon';


const HomeScreen = ({ navigation }: { navigation: any }) => {

  const fileParams: fileParams = {
    fileStatus: 'unRecycled',
  }

  const { renderRefreshControl, isLoading, fileDatas, select, setSelect, setVisible, visible, toggleOverlay, goFileScreen, fileModalVisible, setFileModalVisible, toggleFile, confirmDownload } = useCommonModal(fileParams, navigation)


  return (

    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl()}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {
        isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : <View style={styles.fileContainer}>
          {
            fileDatas?.map((item) => <FileItem file={item} key={item.name} setSelect={setSelect} select={select} goFileScreen={goFileScreen}></FileItem>)
          }
        </View>
      }
      {/**主要Modal, 包含上传文件 图片 拍照等功能 */}
      <UsingModal presentFolderId={0}></UsingModal>
      {/**EditModal 在编辑时打开,包含删除分享等功能 */}
      <EditModal selectedFiles={select} isRecycle={false} setSelect={setSelect} setSharerVisible={setVisible}></EditModal>
      {/**分享的Overlay */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ padding: 30, width: '100%', height: '70%', position: 'absolute', bottom: 0 }}>
        <SharerModal selectedFiles={select}></SharerModal>
      </Overlay>
      {/**显示文件信息的overlay */}
      <Overlay isVisible={fileModalVisible} onBackdropPress={() => setFileModalVisible(false)} overlayStyle={{ padding: 30, width: '100%', height: '70%', position: 'absolute', bottom: 0 }}>
        <Card>
          <Card.Title style={{ fontSize: 30 }}>Sharer</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10, textAlign: 'center' }}>
            {toggleFile?.name}
          </Text>
          <Card.Title>
            <GetIcon type={toggleFile?.type}></GetIcon>
          </Card.Title>
          <Button
           
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='下载'
            onPress={() => confirmDownload(toggleFile)} />
        </Card>
      </Overlay>
    </ScrollView >

  );
};



export default HomeScreen

