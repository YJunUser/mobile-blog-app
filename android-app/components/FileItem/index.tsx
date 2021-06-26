import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fileData } from '../../types/file';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { GetIcon } from './file-icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/auth-context';

interface FileItemProps {
    file: fileData,
    setSelect: (select: number[]) => void,
    select: number[]
}

export const FileItem = (props: FileItemProps) => {
    const { file, setSelect, select } = props
    const [isCheck, setCheck] = useState<boolean>(false)
    const { isEdit, setEdit } = useAuth()

    const switchCheck = (id: number): void => {
        if (select.includes(id)) {
            const odd = select;
            odd.splice(odd.indexOf(id), 1);
            setSelect(odd)
            setCheck(false)
            console.log(select)
        } else {
            select.push(id)
            setSelect(select)
            setCheck(true)
            console.log(select)
        }
    }

    return (
        <View style={[styles.container, styles.fileItem]}>
            <TouchableScale
                onPress={() => console.log('im press')}
                onLongPress={() => {
                    setEdit(true)
                }}
                style={styles.fileItem} >
                <GetIcon type={file.type}></GetIcon>
                <Text>{file.name}</Text>
            </TouchableScale>
            {
                isEdit ? <Icon
                    name={isCheck ? 'check-circle' : 'circle-thin'}
                    color={isCheck ? '#00bfff' : 'gray'}
                    size={16}
                    onPress={() => { switchCheck(file.id) }}>
                </Icon> : null
            }
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        width: '33%', maxWidth: '33%'
    },
    fileItem: {
        padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center'
    }
})
