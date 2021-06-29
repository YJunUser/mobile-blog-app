import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fileData } from '../../types/file';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { GetIcon } from './file-icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/auth-context';


interface FileItemProps {
    file: fileData,
    setSelect: (select: fileData[]) => void,
    select: fileData[],
    goFileScreen?: (params: fileData) => void,
    isRecycle?: boolean
}

export const FileItem = (props: FileItemProps) => {
    const { file, setSelect, select, goFileScreen, isRecycle = false } = props
    const [isCheck, setCheck] = useState<boolean>(false)
    const { isEdit, setEdit } = useAuth()


    const switchCheck = (file: fileData): void => {
        if (select.includes(file)) {
            const odd = select;
            odd.splice(odd.indexOf(file), 1);
            setSelect([...odd])
            setCheck(false)

        } else {
            select.push(file)
            setSelect([...select])
            setCheck(true)
        }
    }
    const itemPress = () => {
        if (isRecycle) {
            return isEdit ? switchCheck(file) : null
        } else {
            return isEdit ? switchCheck(file) : goFileScreen(file)
        }
    }

    return (
        <View style={[styles.container, styles.fileItem]}>
            <TouchableScale
                onPress={() => { itemPress() }}
                onLongPress={() => {
                    setEdit(true)
                }}
                style={styles.fileItem} >
                <GetIcon type={file.type}></GetIcon>
                <Text style={styles.itemName} numberOfLines={1}>{file.name}</Text>
            </TouchableScale>
            {
                isEdit ? <Icon
                    name={isCheck ? 'check-circle' : 'circle-thin'}
                    color={isCheck ? '#00bfff' : 'gray'}
                    size={16}
                >
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
        padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center', marginTop: 10
    },
    itemName: {
        width: 90,
        textAlign: 'center'
    }

})
