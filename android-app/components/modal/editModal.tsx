import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalComponent } from '.';
import { useAuth } from '../../context/auth-context';
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useEdit, useRecycle } from './utils';
import { fileData } from '../../types/file';
import EntypoIcon from 'react-native-vector-icons/Entypo';

interface EditModalProps {
    selectedFiles: fileData[];
    setSelect: (selectedFiles: fileData[]) => void;
    isRecycle: boolean;
    setSharerVisible?: (visible: boolean) => void;
}

export const EditModal = (editProps: EditModalProps) => {
    const { selectedFiles, setSelect, isRecycle, setSharerVisible } = editProps
    const { isEdit } = useAuth()
    const { editItemList, setName, folderName, toggleFolder, toggleFolderDone, toggleFolderQuit, isFolderVisible, renameLoading } = useEdit({ selectedFiles, setSelect, setSharerVisible })
    const recycleItemList = useRecycle(selectedFiles, setSelect)


    return (
        <>
            <ModalComponent
                hasBackdrop={false}
                isVisible={isEdit}
                ModalStyle={styles.editModal}
                ModalContentStyle={styles.editContent}
                coverScreen={false}
                showClose={false}
                showTitle={false}
                contentChildren={
                    <View style={styles.editContent}>
                        {
                            isRecycle ?
                                recycleItemList.map((item) => {
                                    return (
                                        <View style={styles.editItem} key={item.name}>
                                            <Icon name={item.icon} color={item.color} size={item.size || 18} onPress={item.handle}></Icon>
                                            <Text style={{ fontSize: 12, marginTop: 5, color: item.color }}>{item.name}</Text>
                                        </View>
                                    )
                                }) :
                                editItemList.map((item) => {
                                    return (
                                        <View style={styles.editItem} key={item.name}>
                                            <Icon name={item.icon} color={item.color} size={item.size || 18} onPress={item.handle}></Icon>
                                            <Text style={{ fontSize: 12, marginTop: 5, color: item.color }}>{item.name}</Text>
                                        </View>
                                    )
                                })
                        }
                    </View>
                }>

            </ModalComponent>

            <ModalComponent
                title={'重命名'}
                isVisible={isFolderVisible}
                toggleModal={null}
                ModalStyle={styles.folderModal}
                rightTopChildren={<Text style={{ color: '#6a5acd', fontWeight: 'bold' }} onPress={renameLoading ? null : toggleFolderDone}>{renameLoading ? '请稍等' : '完成'}</Text>}
                leftTopChildren={<Text style={{ color: '#000000' }} onPress={toggleFolderQuit}>取消</Text>}
                contentChildren={
                    <View style={styles.folderModalContent}>
                        <EntypoIcon name='folder' size={150} color={'#6495ed'}></EntypoIcon>
                        <TextInput style={styles.folderName} placeholder={'重命名'} focusable={true} value={folderName} onChangeText={setName}></TextInput>
                    </View>
                }
            >
            </ModalComponent>
        </>

    )
}


const styles = StyleSheet.create({
    editModal: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10
    },
    editContent: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    editItem: {
        justifyContent: 'center',
        alignItems: 'center'
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