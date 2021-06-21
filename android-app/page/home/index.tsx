import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRefresh } from '../../components/refresh';
import { ModalComponent } from '../../components/modal';
import RNFileSelector from 'react-native-file-selector';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isFileSelectorVisible, setFileSelectorVisible] = useState<boolean>(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleFileSelector = () => {
    setFileSelectorVisible(!isFileSelectorVisible)
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
    color: '#6495ed'
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
      <ModalComponent list={list} isVisible={isModalVisible} toggleModal={toggleModal} title={'添加至云盘'}>
      </ModalComponent>

      <RNFileSelector title={"选择文件"} visible={isFileSelectorVisible} path={'/storage'} closeMenu={true} onDone={(path) => {
        console.log("file selected: " + path);
      }} onCancel={toggleFileSelector} />


      <View style={styles.button}>
        <Icon name='pluscircle' size={40} color='#6495ed' onPress={() => { toggleModal() }}></Icon>
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
  }
})
export default HomeScreen