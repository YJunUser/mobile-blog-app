import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalComponent } from '.';
import { useAuth } from '../../context/auth-context';
import { StyleSheet, View, Text } from 'react-native'
import { useEdit } from './utils';


export const EditModal = () => {
    const { isEdit } = useAuth()
    const { editItemList } = useEdit()
    return (
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
                        editItemList.map((item) => {
                            return (
                                <View style={styles.editItem} key={item.name}>
                                    <Icon name={item.icon} color={item.color} size={item.size || 18}></Icon>
                                    <Text style={{ fontSize: 12, marginTop: 5, color: item.color }}>{item.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            }>

        </ModalComponent>
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
    }
})