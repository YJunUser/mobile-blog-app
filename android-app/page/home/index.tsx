import React, { useState } from 'react';
import { Button, ScrollView, View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRefresh } from '../../components/refresh';
import Modal from 'react-native-modal';
import { ModalComponent } from '../../components/modal';


const list = [{
  icon: 'user',
  title: '本地图片'
}, {
  icon: 'user',
  title: '本地图片'
}, {
  icon: 'user',
  title: '本地图片'
}, {
  icon: 'user',
  title: '本地图片'
}, {
  icon: 'user',
  title: '本地图片'
}]

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
        <TouchableNativeFeedback onPress={() => { toggleModal() }}>
          <Icon name='pluscircle' size={40} color='skyblue'></Icon>
        </TouchableNativeFeedback>
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
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  }
})
export default HomeScreen