import React, { useState } from 'react'
import { View, Text } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { styles } from './style';


type ModalProps = Partial<React.ComponentProps<typeof Modal>>

type dataItem = {
  icon: string,
  title: string,
  color: string
}

interface ModalComponentProps extends Omit<ModalProps, 'list' | 'ref'> {
  list: dataItem[], // 传过来的数据
  toggleModal: () => void, // 改变是否可见的函数
}

export const ModalComponent = (props: ModalComponentProps) => {
  const { list, toggleModal, ...rest } = props

  return (
    <Modal onBackdropPress={toggleModal} {...rest}>
      <View style={styles.modal}>
        <View style={styles.closeBtn}>
          <Icon name='closecircle' color="#dcdcdc" size={16} onPress={toggleModal}></Icon>
        </View>

        <Text style={styles.title}>添加至云盘</Text>

        <View style={styles.modalContent}>
          {
            list.map((item, index) => {
              return (
                <View style={styles.modalItem} key={index}>
                  <Icon name={item.icon} size={40} color={item.color}></Icon>
                  <Text style={styles.modalItemTitle}>{item.title}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    </Modal>
  )
}