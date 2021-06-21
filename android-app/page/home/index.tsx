import React, { useRef, useState } from 'react';
import { Button, ScrollView, View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRefresh } from '../../components/refresh';
import Modal from 'react-native-modal';
import { ModalComponent } from '../../components/modal';
import { useMount } from '../../utils';


const list = [{
  icon: 'unknowfile1',
  title: '本地文件',
  color: '#ff7f50'
}, {
  icon: 'addfolder',
  title: '新建文件夹',
  color: '#6495ed'
}
]



const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { renderRefreshControl } = useRefresh()

  return (
    // <View style={{ height: '100%' }}>
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl()}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <ModalComponent list={list} isVisible={isModalVisible} toggleModal={toggleModal}>
      </ModalComponent>

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