import React from 'react'
import { View, Text } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { styles } from './style';
import { StyleProp, ViewStyle } from 'react-native';


type ModalProps = Partial<React.ComponentProps<typeof Modal>>

type dataItem = {
  icon: string,
  title: string,
  color: string,
  handle?: (params: any) => void
}

interface ModalComponentProps extends Omit<ModalProps, 'list' | 'ref' | 'title'> {
  title: string;
  list?: dataItem[]; // 传过来的数据
  toggleModal?: () => void; // 改变是否可见的函数
  ModalStyle?: StyleProp<ViewStyle>, // modal的样式
  ModalContentStyle?: StyleProp<ViewStyle>, // modal中内容的样式
  leftTopChildren?: React.ReactNode, // 左上角子组件
  rightTopChildren?: React.ReactNode, // 右上角子组件
  contentChildren?: React.ReactNode // 内容组件
}

export const ModalComponent = (props: ModalComponentProps) => {
  const { list, toggleModal, title, ModalStyle, ModalContentStyle, rightTopChildren, leftTopChildren, contentChildren, ...rest } = props


  return (
    <Modal onBackdropPress={toggleModal} {...rest}>
      <View style={ModalStyle ? ModalStyle : styles.modal}>
        <View style={styles.leftCom}>
          {
            leftTopChildren
          }
        </View>
        <View style={styles.rightCom}>
          {
            rightTopChildren ? rightTopChildren : <Icon name='closecircle' color="#dcdcdc" size={16} onPress={toggleModal}></Icon>
          }
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={ModalContentStyle ? ModalContentStyle : styles.modalContent}>
          {
            contentChildren ? contentChildren :
              list?.map((item, index) => {
                return (
                  <View style={styles.modalItem} key={index}>
                    <Icon name={item.icon} size={40} color={item.color} onPress={item.handle}></Icon>
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